// pages/gift/gift.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshare: false,
    orderId: null,
    shareInfo: {
      title: '您的好友给您推荐了移视小程序',
      path: '/pages/index1/index',
      imageUrl: 'https://app.maillife.cn/files/photo//2023/04/06/57fb730982fb4f30a218d3eac99ff627fx.png',
      orderId: ''
    },
    isShareOrder: false
  },

  showShareOrder() {
    this.setData({
      isShareOrder: true
    })
  },

  hideShareOrder() {
    this.setData({
      isShareOrder: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)

    this.setData({
      orderId: options.orderId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  goinfo() {
    wx.navigateTo({
      url: '/pages/info/info?orderId=' + this.data.orderId + '&gift=0',
    })
  },
  goshare() {
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'PATCH',
      url: app.globalData.url + '/mini/clear?orderId=' + this.data.orderId,
      success: (res) => {
        console.log(res)
      },
      error: (error) => {
        console.log(error)
      },
      fail: () => {}
    })

    this.setData({
      shareInfo: {
        title: '您有一份来自好友的移视礼物请查收',
        path: '/pages/index1/index',
        imageUrl: 'https://app.maillife.cn/files/photo//2023/04/06/abc858f5ecec4075b7ab0b843511ee4bliwu.png',
        orderId: this.data.orderId
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('显示')
    if (this.data.isshare) {
      this.setData({
        isshare: false
      })
      wx.reLaunch({
        url: '/pages/index1/index',
      })
    }
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
    this.setData({
      isshare: true
    })
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