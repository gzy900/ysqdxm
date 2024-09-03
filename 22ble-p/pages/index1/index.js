import {
  ble
} from "../../utils/ble";
import {
  heart_data
} from './data'


// pages/index1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceList: [],
    battery: 0
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
    

    // this.handleGetTestList()
    // this.handleGetReport()

    // this.handleAddECGData()
    // this.handleAddECReport()
    // this.handleAddECGRecord()
    // this.handleGetTestList()
  },

  connect(e) {
    const id = e.target.dataset.id.deviceId || '4C:24:98:70:7C:13'
    // const id = '4C:24:98:70:7C:13'

    ble.connect({
      device_id: id,
      success: this.handleConnectSuccess,
      fail: (res) => {
        console.log(res)
      }
    })
  },
  handleSearchSuccess(res) {
    console.log('蓝牙搜索回调')
    console.log(res)
    const devices = res.devices
    const deviceList = this.data.deviceList
    deviceList.push(...devices)
    this.setData({
      deviceList
    })
    this.connect()
  },
  handleConnectSuccess(res) {
    console.log(res)
    this.get_battery()
    this.get_data_real_time()
  },

  get_search(){
    ble.search({
      success: this.handleSearchSuccess
    })
  },
  get_battery() {
    this.setData({
      battery: ble.get_battery()
    })
  },

  get_data_real_time() {
    ble.get_data_real_time({
      time: .2,
      callback: (res) => {
        console.log(new Date().getTime() / 1000)
        console.log(res)
        if (res.past_time >= .5 * 60) {
          this.handleGetReport(res.data)
        }
      },
      canvas_id: 'canvas'
    })
  },

  // 请求 生成智能报告
  handleGetReport(resData) {
    const data = resData || heart_data
    wx.request({
      url: 'https://aireport.maillife.cn/1report/',
      method: 'post',
      data: {
        "uuid": 'jgmc' + "12341234", // 机构代码 + 用户标识 ,代码jgmc 移视科技提供
        "flag": '1',
        "heartData": data,
        "name": "大王2",
        "gender": "未知",
        "age": 18,
        "license_id": "43060311111111251X",
        "address": "中南海",
        "phone": "13212341234",
        "medication": "0",
        "test_date": "0",
        "symptom": "心肌梗死",
        "activity_record": "不活动"
      },
      header: {
        'content-type': 'application/json', // 默认值
        // 'distinction': 'wc'
      },
      success: (res) => {
        console.log(res.data)
        this.handleAddECGData(res.data)
      }
    })
  },



  // 请求 新增心电数据
  handleAddECGData(resData) {
    const data = heart_data
    const params = {
      "uuid": 'jgmc' + "12341234", // 机构代码 + 用户标识 ,代码jgmc 移视科技提供
      "flag": '1',
      'os': '1',
      "heartRecord": data, // 心电数据
      "startTime": "2022-07-05 00:00:00", //开始测量时间 2022-07-05 00:00:00
      "endTime": "2022-07-05 00:05:00", //结束测量时间
    }
    wx.request({
      url: 'http://192.168.10.23:8082/healthRecord/addHeartData',
      method: 'post',
      data: params,
      header: {
        "accept": "application/json",
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'distinction': 'wc'
      },
      success: (res) => {
        console.log(res.data)
        this.handleAddECReport(res.data, resData)
      }
    })
  },


  // 请求 新增AI报告 记录
  handleAddECReport(data, resData) {
    console.log(111)
    console.log(data.data)
    const params = {
      "uuid": 'jgmc' + "12341234", // 机构代码 + 用户标识 ,jgmc移视科技提供
      "orgName": 'jgmc', // 机构代码
      'heart_id': data.data.heart_id, //心电数据唯一标识 新增心电数据接口获得

      "reportUrl": resData.reportUrl, // AI报告地址
      "cardiac_stress": resData.cardiac_stress, //心脏压力指数
      "fatigue": resData.fatigue, //疲劳指数
      "excitement": resData.excitement, //兴奋指数
      "hr_mean": resData.hr_mean, //平均心率
      "sdnn": resData.sdnn, //心率变异性
      "feedbackState": 0,
      "createTime": new Date().getTime(), //测量时间 时间戳

      'lockState': 1, // 锁定状态，固定传1
    }
    wx.request({
      url: 'http://192.168.10.23:8082/healthRecord/addWcRecord',
      method: 'post',
      data: params,
      header: {
        "accept": "application/json",
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'distinction': 'wc'
      },
      success: (res) => {
        console.log(res.data)

        this.handleGetTestList(data, resData)
      }
    })
  },



  // 请求 获取测量记录
  handleGetTestList() {
    wx.request({
      url: 'http://192.168.10.23:8082/healthRecord/getFeedbackList',
      method: 'post',
      data: {
        "uuid": 'jgmc' + "12341234", // 机构代码 + 用户标识 ,jgmc移视科技提供
        "pageNo": "1", // 页码
        "number": "10", // 条数
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'distinction': 'wc'
      },
      success(res) {
        console.log(res.data)
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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