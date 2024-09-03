// pages/blue/blue.js

let deviceId = null

let pos = 0

let w
let h
let ctx
let oldData = []
let d_i = 0

const heartData = new ArrayBuffer(1024 * 1024)
const heartDataDataView = new DataView(heartData)
const heartDataList = []
// for (let i = 0; i < 12; i++) {
//   heartDataList.push
// }
let h_i = 0

let lattice = 25.6
let rate = 64
let rateY = .5

let spot_x = lattice / (rate / 5)
let spot_y = lattice / rateY / 102
// let spot_y = .1

let midpoint, midpointList = []

function getHeight4(data) { //获取高四位
  let height;
  height = ((data & 0xf0) >> 4);
  return height;
}

function getLow4(data) { //获取低四位
  let low;
  low = (data & 0x0f);
  return low;
}


function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

function drew(list) {


  if (d_i * 2 % w === 0) {
    midpointList = []
    for (let i = 0; i < list.length; i++) {
      midpointList.push(list[i] * spot_y - (i + .5) * midpoint)
    }

  }

  if (oldData.length <= 0) {
    oldData = list
    return
  }

  // console.log(list[0])
  for (let i = 0; i < list.length; i++) {
    ctx.beginPath()
    ctx.moveTo((d_i - 1) * spot_x, oldData[i] * spot_y - midpointList[i])
    ctx.lineTo(d_i * spot_x, list[i] * spot_y - midpointList[i])


    // ctx.moveTo(d_i * spot_x, oldData[i])
    // ctx.lineTo(d_i * spot_x, list[i])
    ctx.stroke()
  }
  // ctx.clearRect(d_i * spot_x, 0, lattice * 2, h)
  d_i++

  oldData = list

  if (d_i * 2 % w === 0) {
    d_i = 0
    ctx.clearRect(0, 0, w, h)
  }
}

function drewLattice(ctx1) {

  // latticeCanvas

  for (let i = 0; i < w; i += lattice) {
    ctx1.beginPath()
    ctx1.moveTo(i, h)
    ctx1.lineTo(i, 0)
    ctx1.stroke()
  }

  for (let i = 0; i < h; i += lattice) {
    ctx1.beginPath()
    ctx1.moveTo(w, i)
    ctx1.lineTo(0, i)
    ctx1.stroke()
  }

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    devicesList: []
  },

  handleOpenBlue() {



    wx.onBluetoothDeviceFound((res) => {
      var devices = res.devices;

      const list = this.data.devicesList

      if (devices[0].name === 'M.A.I.LW II 2401130020' || devices[0].name === 'WeCardio 8L') {
        let isOne = true
        for (let i = 0; i < list.length; i++) {
          if (list[i].deviceId === devices[0].deviceId) {
            isOne = false
            break
          }
        }
        if (isOne) {
          list.push(devices[0])
          this.setData({
            devicesList: list
          })
        }
      }

    })

    wx.openBluetoothAdapter({
      success: (res) => {
        this.handleSeachBlue()
      }
    })
  },

  handleClickDevice(e) {
    console.log(e)
    deviceId = e.target.dataset.id
    this.handleConnection()
  },

  handleInitCanvas() {

    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr

        w = res[0].width
        h = res[0].height

        midpoint = h / 12

        ctx.strokeStyle = 'rgba(255,0,0,1)'
        console.log(res)
        console.log(dpr)


        ctx.scale(dpr, dpr)
      })

    const query1 = wx.createSelectorQuery()

    query1.select('#latticeCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        const ctx1 = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr

        ctx1.scale(dpr, dpr)
        drewLattice(ctx1)
      })
  },





  handleGetHeartData() {
    const serviceId = '0000FFC1-0000-1000-8000-00805F9B34FB' // 蓝牙回复服务id
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log(res)
        // const characteristicId = res.characteristics[1].uuid
        // const characteristicId = res.characteristics[0].uuid
        const characteristicId = '0000FFC2-0000-1000-8000-00805F9B34FB'



        console.log(characteristicId)

        wx.notifyBLECharacteristicValueChange({
          state: true, // 启用 notify 功能
          // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
          deviceId,
          // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
          serviceId,
          // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
          characteristicId,
          success(res) {
            console.log('notifyBLECharacteristicValueChange success', res.errMsg)

            wx.onBLECharacteristicValueChange(function (res) {

              let dataViewRes = new DataView(res.value)

              let buffer

              if (h_i > 1536 * 100) {
                console.log(heartData)
                return
              }
              if (res.value.byteLength > 15) {

                // console.log(dataViewRes.getUint16(4))
                // console.log(dataViewRes.getUint8(6))


                // console.log(res.value)
                // console.log(res.value.slice(8, 20))

                buffer = res.value.slice(8, 20)



                // console.log(ab2hex(res.value))
                // console.log(pos)
                pos = 0
              } else {
                buffer = res.value.slice(0, 12)

                pos += 12
              }

              let dataView = new DataView(buffer)
              const list = []
              for (let i = 0; i < buffer.byteLength; i += 3) {
                let byte1 = dataView.getUint8(i)
                let byte2 = dataView.getUint8(i + 1)
                let byte3 = dataView.getUint8(i + 2)

                const byte2Height = getHeight4(byte2)
                const byte2Low = getLow4(byte2)

                const ba = new ArrayBuffer(4)
                const baDataView = new DataView(ba)
                baDataView.setUint8(0, byte2Height)
                baDataView.setUint8(1, byte1)

                const lead1 = baDataView.getUint16(0)

                baDataView.setUint8(0, byte2Low)
                baDataView.setUint8(1, byte3)

                const lead2 = baDataView.getUint16(0)

                heartDataDataView.setInt16(h_i, lead1)
                heartDataDataView.setInt16(h_i + 2, lead2)


                list.push(lead1)
                list.push(lead2)


                if (h_i % 24 === 0) {
                  const lead3 = lead2 - lead1
                  const leadAVR = -(lead2 + lead1) >> 1
                  const leadAVL = lead1 - lead2 >> 1
                  const leadAVF = lead2 - lead1 >> 1

                  heartDataDataView.setInt16(h_i, lead3)
                  heartDataDataView.setInt16(h_i + 2, leadAVR)
                  heartDataDataView.setInt16(h_i + 4, leadAVL)
                  heartDataDataView.setInt16(h_i + 6, leadAVF)

                  list.push(lead3)
                  list.push(leadAVR)
                  list.push(leadAVL)
                  list.push(leadAVF)
                  h_i += 8
                }

                h_i += 4
              }
              drew(list)




            })

            // wx.writeBLECharacteristicValue({
            //   deviceId,
            //   serviceId,
            //   characteristicId: characteristicId1,
            //   value: buffer,
            //   success(res) {
            //     console.log('writeBLECharacteristicValue success', res.errMsg)
            //   },
            //   fail(err) {
            //     console.log(err)
            //   }
            // })
          }
        })
      }
    })
  },

  handleGetInfo() {
    const serviceId = '0000FFB1-0000-1000-8000-00805F9B34FB' // 蓝牙回复服务id
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log(res)
        const characteristicId = res.characteristics[0].uuid
        // 0000FFB2-0000-1000-8000-00805F9B34FB
        console.log(characteristicId)
        // 向蓝牙设备发送一个0x00的16进制数据
        let buffer = new ArrayBuffer(1)
        let dataView = new DataView(buffer)
        dataView.setUint8(0, 8)

        wx.notifyBLECharacteristicValueChange({
          state: true, // 启用 notify 功能
          // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
          deviceId,
          // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
          serviceId,
          // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
          characteristicId,
          success(res) {
            console.log('notifyBLECharacteristicValueChange success', res.errMsg)

            wx.onBLECharacteristicValueChange(function (res) {
              console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
              console.log(ab2hex(res.value))
              console.log(res.value)

              let dataViewRes = new DataView(res.value)

              console.log(dataViewRes.getUint8(4))
              console.log(dataViewRes.getUint32(5))

            })


            wx.getBLEDeviceCharacteristics({
              deviceId,
              serviceId: '0000FFA1-0000-1000-8000-00805F9B34FB',
              success: (res) => {
                console.log(res)
                const characteristicId = res.characteristics[0].uuid

                wx.writeBLECharacteristicValue({
                  deviceId,
                  serviceId: '0000FFA1-0000-1000-8000-00805F9B34FB',
                  characteristicId: characteristicId,
                  value: buffer,
                  success(res) {
                    console.log('writeBLECharacteristicValue success', res.errMsg)
                  },
                  fail(err) {
                    console.log(err)
                  }
                })
              }
            })


          }
        })


      }
    })
  },

  handleConnection() {
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        console.log(res)

        wx.getBLEDeviceServices({
          deviceId,
          success: (res) => {
            console.log('服务')
            console.log(res)
            // const serviceId = res.services[0].serviceId
          }
        })
      }
    })
  },


  handleSeachBlue() {
    wx.startBluetoothDevicesDiscovery({
      // services: [],
      success: (res) => {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {


  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

    console.log('渲染')
    this.handleInitCanvas()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})