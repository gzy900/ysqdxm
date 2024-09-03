// pages/pay/index.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: null,
    orderId: null,
    orderNum: 0,
    shareInfo: {
      title: '您的好友给您推荐了移视小程序',
      path: '/pages/index1/index',
      imageUrl: 'https://app.maillife.cn/files/photo//2023/04/06/57fb730982fb4f30a218d3eac99ff627fx.png',
      orderId: ''
    },
    discountCode: app.inviteCode || '',
    alertShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      uuid: app.userInfo.uuid,
      orderNum: app.orderNum,
      serviceType: Math.floor(options.goodId),
      description: '月度服务',
      discountCode: app.inviteCode || ''
    })
  },

  alertHide() {
    this.setData({
      alertShow: false
    })
  },

  confirmcode() {
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'GET',
      url: app.globalData.url + '/mini/getDiscount?inviteCode=' + this.data.discountCode,
      success: (res) => {
        console.log(res.data)
        if (res.data.code === '200') {
          const data = res.data.data || 1
          app.inviteCode = this.data.discountCode
          wx.navigateTo({
            url: "/pages/goods/index?discount=" + data
          })
        } else {
          this.setData({
            alertShow: true
          })
        }
      },
      error: (error) => {
        console.log(error)
        alert('错误,请重新输入！')
      },
      fail: () => {}
    })
  },

  noConfirmcode() {
    wx.navigateTo({
      url: "/pages/goods/index"
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
        title: '您的好友给您推荐了移视小程序',
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