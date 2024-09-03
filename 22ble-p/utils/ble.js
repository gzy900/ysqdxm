var pako = require('./pako')
import { fromByteArray } from './base64.min';

var ctx = null
var canvas = {
  width: 0,
  height: 0,
  lattice_size: 0,
  lattice_data_x: 200,
  lattice_data_y: .5,
  max_data_x: 0,
  max_data_y: 0,
  data_index: 0,
  rate: 200,
  center_diff: 0,
  unit_min_x: 0,
  prev_y: 0,

  init: function (id) {
    const self = this
    const query = wx.createSelectorQuery()
    query.select('#' + id)
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        ctx = canvas.getContext('2d')
        let sysinfo = wx.getSystemInfoSync();
        let canvaswidth = sysinfo.windowWidth;
        let canvasHeight = sysinfo.windowHeight;
        // canvas.width = res[0].width * dpr
        canvas.width = canvaswidth
        canvas.height = canvasHeight / 2
        self.width = canvaswidth
        self.height = canvasHeight / 2
        self.lattice_size = self.height / 20
        self.max_data_x = Math.floor(self.width / self.lattice_size * (self.lattice_data_x / (1000 / self.rate)))
        self.unit_min_x = self.lattice_size / (self.lattice_data_x / (1000 / self.rate))

        // const dpr = sysinfo.pixelRatio
        // ctx.scale(dpr, dpr)
        // ctx.moveTo(0, 0)
        // ctx.lineTo(self.width, self.height)
        // ctx.stroke()
      })
  },
  accept_data: function (data) {
    const self = this
    const dataList = Array.prototype.slice.call(new Int8Array(data.value))

    if (self.data_index > self.max_data_x - 10) {
      self.data_index = 0
      ctx.clearRect(0, 0, self.width, self.height)
    }

    ctx.beginPath()
    for (let i = 0; i < 20; i += 2) {
      const listOne = dataList[i] >= 0 ? dataList[i] : dataList[i] + 256
      const item = 0 - ((listOne + (dataList[i + 1] * 256)) / 640) + 6

      let y = item / self.lattice_data_y * self.lattice_size
      if (self.data_index === 0) {
        self.center_diff = y - self.height / 2
        y = self.height / 2
      }
      if (i === 0) {
        if (self.data_index === 0) {
          ctx.moveTo(self.data_index * self.unit_min_x, 0 - y - self.center_diff)
        } else {
          ctx.moveTo(self.data_index * self.unit_min_x, self.prev_y)
        }
      } else {
        ctx.lineTo(self.data_index * self.unit_min_x, 0 - y - self.center_diff)
      }
      if (i >= 18) {
        self.prev_y = 0 - y - self.center_diff
      }
      self.data_index++
    }
    ctx.stroke()
    // ctx.draw(true)
  },
}

var ble = {
  name: '',
  ble_status: 0, // 0，未打开状态，1，已打开未连接具体设备，2已连接到设备
  connect_status: false,
  device_id: '',
  battery: 0,
  cv_change_callback: false,
  ecg_data: null,
  ecg_data_view: null,
  ecg_index: 0,

  service_list: {
    write: {
      serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB',
      characteristicId: '',
      isread: false,
      desc: '发送'
    },
    read: {
      serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB',
      characteristicId: '',
      isread: false,
      desc: '接收'
    },
    ecg: {
      serviceId: '0000FFB1-0000-1000-8000-00805F9B34FB',
      characteristicId: '',
      isread: false,
      desc: '心电'
    },
    battery: {
      serviceId: '0000180F-0000-1000-8000-00805F9B34FB',
      characteristicId: '',
      isread: false,
      desc: '电池'
    },
  },

  // 封装方法
  search: function ({
    success: success_callback = null,
    fail: fail_callback = null,
  } = {}) {
    const self = this
    return new Promise((reslove, reject) => {
      self.open_ble().then(res => {
        console.log("openBluetoothAdapter res=>", res);
        self.ble_status = 1
        self.open_search_ble()
      }).then(res => {
        console.log("startBluetoothDevicesDiscovery res=>", res);
        if (typeof success_callback == "function") {
          self.search_callback_ble(success_callback)
          console.log('开启搜索')
        }
      }).catch(err => {
        console.log(err)
        if (typeof fail_callback == "function") {
          self.close_search()
          fail_callback(err)
        }
      })
    })
  },
  close_search: function () {
    wx.stopBluetoothDevicesDiscovery({
      success(res) {
        console.log('蓝牙搜索关闭')
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  connect: function ({
    device_id,
    success: success_callback,
    fail: fail_callback
  } = {}) {
    if (!device_id) {
      console.error('缺少蓝牙设备Id')
      if (typeof fail_callback == "function") {
        fail_callback({
          msg: '缺少蓝牙设备Id'
        })
      }
      return
    }
    const self = this
    self.close_search()
    return new Promise((reslove, reject) => {
      self.connect_ble(device_id).then(async (res) => {
        console.log('蓝牙连接成功')
        self.device_id = device_id
        const data = await self.get_service(device_id)
        return data
      }).then(async (res) => {
        console.log('搜索服务成功')
        console.log(res)
        let services = res.services;
        const p_list = []
        services.forEach((it) => {
          if (it.isPrimary) {
            const p = self.get_characteristic(device_id, it.uuid)
            p_list.push(p)
          }
        });
        Promise.all(p_list).then(res => {
          console.log('全部完成')
          console.log(res)
          res.forEach(item => {
            for (let service in self.service_list) {
              let ser = self.service_list[service]
              if (item.service_id === ser.serviceId) {
                ser.isread = true
                ser.characteristicId = item.characteristics[0].uuid
              }
            }
          })
          const battery = self.service_list.battery
          self.notify(self.device_id, battery.serviceId, battery.characteristicId).then(res => {
            self.notify_callback((res) => {
              if (res.characteristicId === '00002A19-0000-1000-8000-00805F9B34FB') {
                const dataView = new DataView(res.value)
                self.battery = dataView.getUint8(0)
                console.log(self.battery)
              }
              if (typeof success_callback == "function") {
                success_callback('蓝牙连接成功，现在get_battery get_data方法已可用')
              }
            })
            self.read(self.device_id, battery.serviceId, battery.characteristicId)
          })
          reslove(res)
        })
      }).catch(err => {
        if (typeof fail_callback == "function") {
          fail_callback(err)
        }
      })
    })
  },
  close_connect: function () {
    const self = this
    wx.closeBluetoothAdapter({
      success(res) {
        console.log('蓝牙链接关闭')
        // console.log(res)
      },
      fail(err) {
        console.error(err)
      }
    })
  },
  get_battery: function () {
    const self = this
    return self.battery
  },
  get_data_real_time: function ({
    time = 2,
    callback,
    canvas_id = null
  } = {}) {
    if (typeof callback !== "function") {
      console.error('需要传入回调方法callback')
      return
    }
    time = time * 60
    const self = this
    self.ecg_data = new ArrayBuffer(time * 200 * 2)
    self.ecg_data_view = new DataView(self.ecg_data)
    if (canvas_id !== null) {
      canvas.init(canvas_id)
    }
    return new Promise((reslove, reject) => {
      const ecg = self.service_list.ecg
      self.notify(self.device_id, ecg.serviceId, ecg.characteristicId).then(res => {
        self.notify_callback((data) => {
          self.append_data(data.value, self.ecg_index)
          self.ecg_index++
          if (self.ecg_index % (200 / 10) === 0) {
            const res_code = {
              code: 200,
              status: 1, // 0,未开始，1，进行中，2，已完成
              past_time: self.ecg_index / (200 / 10), // 已过去的时间 s
              data: ''
            }
            if (self.ecg_index / (200 / 10) === time) {
              self.ecg_index = 0
              res_code.status = 2
              self.close_connect()
              res_code.data = self.compress_data()
            }
            callback(res_code)
          }
          if (canvas_id !== null && data.characteristicId === self.service_list.ecg.characteristicId) {
            canvas.accept_data(data)
          }
        })
      })
    })
  },

  init: function () {},
  reset: function () {},
  compress_data: function () {
    const self = this
    // byte 数组,心电图原始二进制数据
    const ecg_data = new Uint8Array(self.ecg_data)
    // gzip 压缩调用,返回byte数组
    const de_data = pako.gzip(ecg_data)
    // base64 转码.将压缩后的byte数组转码
    const base_data = fromByteArray(de_data)
    return base_data
  },

  // 实现方法
  open_ble: function () {
    const self = this
    return new Promise((reslove, reject) => {
      wx.openBluetoothAdapter({
        success(res) {
          reslove(res);
        },
        fail(err) {
          console.log("openBluetoothAdapter err=>", err);
          if (err && err.errMsg.indexOf("openBluetoothAdapter:fail") >= 0) {
            err.errCode = 10000;
          }
          reject(err)
        }
      })
    })

  },
  open_search_ble: function () {
    const self = this
    return new Promise((reslove, reject) => {
      wx.startBluetoothDevicesDiscovery({
        services: ['0000FFB1-0000-1000-8000-00805F9B34FB'],
        allowDuplicatesKey: false,
        // powerLevel:"high",
        success(res) {
          reslove(res)
        },
        fail(err) {
          console.log("startBluetoothDevicesDiscovery err=>", err)
          reject(err)
        }
      })
    })
  },
  search_callback_ble: function (callback) {
    const self = this
    wx.onBluetoothDeviceFound(function (res) {
      callback(res)
    })
  },
  connect_ble: function (device_id) {
    return new Promise((reslove, reject) => {
      wx.createBLEConnection({
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        // timeout: timeout, // number		否	超时时间，单位ms，不填表示不会超时
        deviceId: device_id,
        // serial: false,  // 会闪退的
        success(res) {
          reslove(res)
        },
        fail(err) {
          console.log("createBLEConnection err,useTime=>", err);
          reject(err)
        }
      });
    })
  },
  get_service: function (device_id) {
    return new Promise((reslove, reject) => {
      wx.getBLEDeviceServices({
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId: device_id,
      }).then(res => {
        reslove(res)
      }).catch(err => {
        console.log('device services err=>', err);
        reject(err)
      })
    })
  },
  get_characteristic: function (device_id, service_id) {
    return new Promise((reslove, reject) => {

      wx.getBLEDeviceCharacteristics({
        deviceId: device_id,
        serviceId: service_id
      }).then(res => {
        console.log('获取特征成功')
        console.log('device getBLEDeviceCharacteristics:', res.characteristics)
        reslove({
          service_id: service_id,
          characteristics: res.characteristics
        })
      }).catch(err => {
        console.log('device getBLEDeviceCharacteristics err=>', err)
        reject(err)
      })
    })
  },
  write: function (device_id, service_id, characteristic_id, value) {
    return new Promise((reslove, reject) => {
      wx.writeBLECharacteristicValue({
        deviceId: device_id,
        serviceId: service_id,
        characteristicId: characteristic_id,
        // 这里的value是ArrayBuffer类型
        value: value,
        success: (res) => {
          reslove(res)
        },
        fail: (err) => {
          console.log('writeBLECharacteristicValue err', err)
          reject(err)
        },
      })
    })
  },
  read: function (device_id, service_id, characteristic_id) {
    return new Promise((reslove, reject) => {
      wx.readBLECharacteristicValue({
        deviceId: device_id,
        serviceId: service_id,
        characteristicId: characteristic_id,
        success(res) {
          console.log('readBLECharacteristicValue:', res)
          reslove(res)
        },
        fail(err) {
          console.log('readBLECharacteristicValue err', err)
          reject(err)
        }
      })
    })
  },
  notify: function (device_id, service_id, characteristic_id) {
    return new Promise((reslove, reject) => {
      wx.notifyBLECharacteristicValueChange({
        state: true, // 启用 notify 功能
        type: 'notification',
        deviceId: device_id,
        serviceId: service_id,
        characteristicId: characteristic_id,
        success(res) {
          console.log('notifyBLECharacteristicValueChange success', res.errMsg)
          reslove(res)
        },
        fail(err) {
          console.log('notifyBLECharacteristicValueChange err', err)
          reject(err)
        }
      })
    })
  },
  notify_callback: function (callback) {
    const self = this
    if (self.cv_change_callback) {
      wx.offBLECharacteristicValueChange(() => {
        self.cv_change_callback = false
      })
    }
    wx.onBLECharacteristicValueChange(function (res) {
      // console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
      // console.log(ab2hex(res.value))
      self.cv_change_callback = true
      callback(res)
    })
    console.log('数据回调注册成功')
  },

  append_data: function (buffer, index) {
    const self = this
    const data_view = new DataView(buffer)
    for (let i = 0; i < 20; i++) {
      self.ecg_data_view.setUint8(index * 20 + i, data_view.getUint8(i))
    }
  }
}

module.exports = {
  ble
}