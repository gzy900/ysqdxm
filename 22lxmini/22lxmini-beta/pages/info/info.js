// pages/info/info.js
const util = require('../../utils/util.js')
const app = getApp()
let nameinputdelayed = null
let nameNum = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareInfo: {
      title: '您的好友给您推荐了灵心小程序',
      path: '/pages/index1/index',
      imageUrl: 'https://app.maillife.cn/files/photo//2023/04/06/57fb730982fb4f30a218d3eac99ff627fx.png',
      orderId: ''
    },
    scrollTop: 0,
    sexList: [
      '男',
      '女',
    ],
    menuheight: app.globalData.navBarHeight,
    ageList: [],
    weightList: [],
    heightList: [],
    sizeList: [
      'S',
      'M',
      'L',
      'XL',
      'XXL',
      'XXXL',
    ],
    orderAvailable: false,

    area: '',
    userName: null,
    phone: null,
    verify: {
      phone: true,
    },
    fromData: {
      "orderId": "",
      "userName": null,
      "sex": 0,
      "height": null,
      "weight": null,
      "size": "S",
      "serviceType": null,
      "phone": null,
      "gift": 0,
      "address": null,
      "area": null,
      "age": null,
      "giftUser": '',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(123)
    console.log(options)
    console.log(app.globalData.orderInfo)

    if (options.isShareOrder && options.isShareOrder === '1') {
      this.setData({
        'fromData.gift': 1
      })
      this.setData({
        'fromData.giftUser': app.userInfo.uuid
      })
    } else {
      this.setData({
        'fromData.gift': 0
      })
    }
    if (options.orderId) {
      this.setData({
        'fromData.orderId': options.orderId
      })
    } else {
      this.setData({
        fromData: app.globalData.orderInfo,
        userName: app.globalData.orderInfo.userName,
        phone: app.globalData.orderInfo.phone,
        area: app.globalData.orderInfo.area,
      })
    }
    console.log(1111)
    console.log(this.data.fromData)
    const age = []
    for (let i = 10; i <= 120; i++) {
      age.push(i)
    }

    const weight = []
    for (let i = 30; i <= 200; i++) {
      weight.push(i)
    }
    const height = []
    for (let i = 140; i < 220; i++) {
      height.push(i)
    }

    this.setData({
      ageList: age,
      weightList: weight,
      heightList: height,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  showOrderAvailable() {
    this.setData({
      orderAvailable: true
    })
  },
  hideOrderAvailable() {
    this.setData({
      orderAvailable: false
    })
    wx.reLaunch({
      url: '/pages/index1/index',
    })
  },

  getInfo() {
    const orderId = this.data.fromData.orderId
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'GET',
      url: app.globalData.url + '/mini/getInfoByOrderId?orderId=' + orderId,
      success: (res) => {
        console.log(res)
        console.log('info')
        const giftUser = res?.data?.data?.giftUser || null
        if (giftUser === null || giftUser === app.userInfo.uuid) {
          this.handleSubmit()
        } else {
          this.showOrderAvailable()
          // 该礼物已被他人接受
        }
      },
      error: (error) => {
        console.log(error)
      },
      fail: () => {}
    })
  },

  handleSubmit() {
    const fromData = util.deepClone(this.data.fromData)
    fromData.area = this.data.area
    fromData.userName = this.data.userName
    fromData.phone = this.data.phone
    console.log(fromData)
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'PATCH',
      url: app.globalData.url + '/mini/updOrder',
      dataType: 'json',
      data: fromData,
      success: (res) => {
        console.log(res)

        wx.reLaunch({
          url: '/pages/index1/index',
        })
      },
      fail: () => {
        console.log(12)
      }
    })
  },

  regionsinput(e) {
    var str = e.detail.value.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, ""); // 表情的正则表达式 
    console.log("替换后的值" + e.detail.value)
    console.log("替换后的值" + str)
    this.setData({
      area: str
    })
  },

  nameinputReolace(str) {

  },
  delayedCall(callback, num) {
    nameNum = num
    let callback1 = callback
    if (nameinputdelayed === null) {
      nameinputdelayed = setInterval(() => {
        if (nameNum <= 0) {
          clearInterval(nameinputdelayed)
          nameinputdelayed = null
          callback1()
        } else {
          nameNum -= 100
        }
      }, 100)
    }
  },
  nameinput(e) {
    let str = e.detail.value || ''
    console.log('触发按键')

    clearTimeout(nameinputdelayed)
    nameinputdelayed = setTimeout(() => {
    console.log('触发防抖')
      str = str.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g, '')
      str = str.slice(0, 4)
      this.setData({
        userName: str
      })
    }, 500)
  },


  phonebulr(e) {
    let flag = true
    const value = e.detail.value || ''
    if (value === '') {
      this.setData({
        'verify.phone': flag
      })
      return
    }
    const rstr = /^1[3-9]\d{9}$/
    flag = rstr.test(value)

    this.setData({
      'verify.phone': flag
    })
  },

  sexChange(e) {
    console.log(e)
    this.setData({
      'fromData.sex': Number(e.detail.value)
    })
  },
  ageChange(e) {
    this.setData({
      'fromData.age': this.data.ageList[Number(e.detail.value)]
    })
  },
  sizeChange(e) {
    console.log(111)
    this.setData({
      'fromData.size': this.data.sizeList[Number(e.detail.value)]
    })
  },

  weightChange(e) {
    this.setData({
      'fromData.weight': this.data.weightList[Number(e.detail.value)]
    })
  },
  heightChange(e) {
    this.setData({
      'fromData.height': this.data.heightList[Number(e.detail.value)]
    })
  },

  addressChange(e) {
    this.setData({
      'fromData.address': e.detail.value.join('/')
    })
    console.log(e)
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
  },
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
})