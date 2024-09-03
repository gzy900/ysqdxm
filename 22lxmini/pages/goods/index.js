// pages/index0/index.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 100,
    shareInfo: {
      title: '您的好友给您推荐了移视小程序',
      path: '/pages/index1/index',
      imageUrl: 'https://app.maillife.cn/files/photo//2023/04/06/57fb730982fb4f30a218d3eac99ff627fx.png',
      orderId: ''
    },
    discount: 1,
    taocanList: []
  },

  meiri(originalPrice) {
    return originalPrice * discount / 365
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      discount: options.discount || 1
    })
    console.log(options.discount)
    this.getTaoCan()
  },

  getTaoCan() {
    wx.request({
      header: {
        Authorization: 'test',
      },
      method: 'POST',
      query: {
        pageNum: 1,
        pageSize: 10,
      },

      url: app.globalData.url + '/mini/web/taocanList?pageNum=1&pageSize=10&enableFlag=1',
      success: (res) => {
        if (res.data.code === '200') {
          const list = res.data.data.records || []
          for (let i = 0; i < list.length; i++) {
            const content = list[i].content || ''
            if (content && content.length > 0) {
              list[i].contentList = content.split('，')
            } else {
              list[i].contentList = []
            }
          }

          this.setData({
            taocanList: list
          })
        } else {

        }
      },
      error: (error) => {},
      fail: () => {}
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  gopay(e) {
    console.log(e)
    const id = e.currentTarget.dataset.goodid || ''
    if (id.length <= 0) {
      return '错误'
    }

    const list = this.data.taocanList
    let taocan = {}
    for (let i = 0; i < list.length; i++) {
      if (id === list[i].id) {
        taocan = list[i]
      }
    }

    wx.navigateTo({
      url: '/pages/pay/index?goodId=' + id + '&price=' + taocan.originalPrice + '&discount=' + this.data.discount + '&name=' + taocan.taocanName + '&content=' + taocan.content,
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
  },
  // onPageScroll(e) {
  //   this.setData({
  //     scrollTop: e.scrollTop
  //   })
  // },
})