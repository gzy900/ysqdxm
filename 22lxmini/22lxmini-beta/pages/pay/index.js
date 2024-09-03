// pages/pay/index.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: null,
    serviceType: 1,
    description: '月度服务',
    orderId: null,
    orderNum: 0,
    shareInfo: {
      title: '您的好友给您推荐了灵心小程序',
      path: '/pages/index1/index',
      imageUrl: 'https://app.maillife.cn/files/photo//2023/04/06/57fb730982fb4f30a218d3eac99ff627fx.png',
      orderId: ''
    },
    goodList: [{},
      {
        name: '灵心一月',
        priceNew: '3500',
        num: "1",
        priceOld: '',
        priceDay: '116.66'
      },
      {
        name: '灵心一季',
        num: "3",
        priceNew: '4500',
        priceOld: '5000',
        priceDay: '50'
      },
      {
        name: '灵心半载',
        num: "6",
        priceNew: '6500',
        priceOld: '7678',
        priceDay: '36'
      },
      {
        name: '灵心一年',
        num: "12",
        priceNew: '8500',
        priceOld: '10625',
        priceDay: '23'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(1)
    console.log(app.userInfo.uuid)
    this.setData({
      uuid: app.userInfo.uuid,
      orderNum: app.orderNum,
      serviceType: Math.floor(options.goodId),
      description: '月度服务'
    })
  },

  addOrderNum() {
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'POST',
      // ?num=' + (this.data.orderNum + 1)
      url: app.globalData.url + '/mini/count',
      success: (res) => {
        console.log(6)
        console.log(res)
        app.orderNum = res.data.data
        wx.navigateTo({
          url: '/pages/gift/gift?orderId=' + this.data.orderId,
        })
      },
      error: (error) => {
        console.log(error)
      },
      fail: () => {}
    })
  },
  payplay() {
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'POST',
      url: app.globalData.url + '/mini/order',
      dataType: 'json',
      data: {
        uuid: this.data.uuid,
        serviceType: this.data.serviceType,
        description: this.data.description,
        inviteCode: app.inviteCode
      },
      success: (res) => {
        console.log(res)
        const res1 = res.data.data
        console.log(res1)
        this.setData({
          orderId: res1.orderId
        })
        console.log(this.data.orderId)
        this.payStart(res1)
      },
      fail: () => {
        console.log(12)
      }
    })
  },

  payStart(res1) {
    res1.package = res1.packageStr
    wx.requestPayment({
      ...res1,
      success: (res2) => {

        console.log('订单支付完成')
        console.log(res2)

        this.addOrderNum()

      },
      fail(res) {
        console.log(res)
      }
    })
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
    const shareInfo = util.deepClone(this.data.shareInfo)
    this.setData({
      shareInfo: {
        title: '您的好友给您推荐了灵心小程序',
        path: '/pages/index1/index',
        imageUrl: 'https://app.maillife.cn/files/photo//2023/04/06/57fb730982fb4f30a218d3eac99ff627fx.png',
        orderId: ''
      }
    })
    console.log(shareInfo)
    return {
      title: shareInfo.title,
      path: shareInfo.path + '?shareId=' + app.userInfo.inviteCode + '&orderId=' + shareInfo.orderId,
      imageUrl: shareInfo.imageUrl
    }
  }
})