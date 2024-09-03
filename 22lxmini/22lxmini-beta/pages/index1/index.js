// pages/index1/index.js
const util = require('../../utils/util.js')
const app = getApp()

let countTime = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    json: '',
    guideShow: false,
    guideHide: false,
    url: '',
    userInfo: null,
    orderNum: 0,
    shareOrderNum: 0,
    dataList: [],
    sexList: [
      '男',
      '女'
    ],
    alertShow: false,
    serviceList: [
      '',
      '灵心一月',
      '灵心一季',
      '灵心半载',
      '灵心一年',
    ],
    giftTypeList: [
      '我的订单',
      '我赠送的礼物',
      '我的礼物',
    ],
    shareInfo: {
      title: '',
      path: '/pages/index1/index',
      orderId: '',
      imageUrl: 'https://app.maillife.cn/files/photo//2023/04/06/57fb730982fb4f30a218d3eac99ff627fx.png'
    },
    shareOrderId: '',
    isShareOrder: 0,
    scrollTop: 0,
    countNum: {
      s: 0,
      i: 0,
      h: 0,
      d: 0
    },
    defineOrder: false,
    orderAvailable: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      url: app.globalData.url
    })
    console.log('进入')
    console.log(options)
    if (options.shareId) {
      app.inviteCode = options.shareId
    }

    if (options.orderId && options.orderId.length > 0) {
      this.setData({
        shareOrderId: options.orderId
      })
      // this.alertOpen()
      // 如果分享链接中带了orderId 那么这是订单分享。需要判断这条订单是否已经被接受然后进行弹窗
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  goinfo(e) {
    console.log(e)
    app.globalData.orderInfo = e.currentTarget.dataset.order
    wx.navigateTo({
      url: "/pages/info/info"
    })
  },

  getShareOrderNum() {
    // 
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'GET',
      url: app.globalData.url + '/mini/countByCode?inviteCode=' + this.data.userInfo.inviteCode,
      success: (res) => {
        console.log(7)
        console.log(res)
        this.setData({
          shareOrderNum: res.data.data
        })
      },
      error: (error) => {
        console.log(error)
      },
      fail: () => {}
    })
  },

  goShareInfo() {
    wx.navigateTo({
      url: "/pages/info/info?orderId=" + this.data.shareOrderId + '&isShareOrder=' + this.data.isShareOrder
    })
  },
  alertOpen() {
    this.setData({
      alertShow: true
    })
  },
  alertHide() {
    this.setData({
      alertShow: false
    })
  },

  showYinDao() {
    const count = 1690819200
    let surplus = count - Math.floor(new Date().getTime() / 1000)
    countTime = setInterval(() => {
      surplus--
      // {y}-{m}-{d} {h}:{i}:{s}
      let s = surplus % 60
      let i = Math.floor(surplus / 60) % 60
      let h = Math.floor(surplus / 60 / 60) % 24
      let d = Math.floor(surplus / 60 / 60 / 24)

      if (s < 10) {
        s = '0' + s.toString()
      }
      if (i < 10) {
        i = '0' + i.toString()
      }
      if (h < 10) {
        h = '0' + h.toString()
      }
      this.setData({
        'countNum.s': s,
        'countNum.i': i,
        'countNum.h': h,
        'countNum.d': d,
      })

    }, 1000)
    // && app.userInfo.show === true
    if (app.isOneShowYinDao === true) {
      app.isOneShowYinDao = false
      this.setData({
        guideShow: true,
        guideHide: true
      })
    }
  },

  pageHide() {
    this.setData({
      guideHide: false
    })
  },
  gogoods() {
    console.log(1)
    wx.navigateTo({
      url: "/pages/goods/index"
    })
  },

  washDataList(data = []) {
    data.forEach((item) => {
      if (item.gift === null || item.gift === 0) {
        item.giftType = 0
      }
      if (item.gift === 1 && item.giftUser !== this.data.userInfo.uuid) {
        item.giftType = 1
      }
      if (item.gift === 1 && item.giftUser === this.data.userInfo.uuid) {
        item.giftType = 2
      }

      if (!item.area) {
        item.area = ''
      }
      if (!item.address) {
        item.address = ''
      }

      if ((item.address + item.area).length <= 0) {
        item.addressarea = '无'
      } else {
        item.addressarea = item.address + ' ' + item.area
      }

      item.createTimeFormat = util.parseTime(Math.floor(item.createTime) * 1000)
      item.createTimeFormat1 = util.parseTime((Math.floor(item.createTime) + 60 * 60 * 24 * 90) * 1000, '{y}-{m}-{d}')
    })
    this.setData({
      dataList: data
    })
  },
  getList() {
    console.log('list')
    console.log(this.data.userInfo.uuid)
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'GET',
      dataType: 'json',
      url: this.data.url + '/mini/info?uuid=' + this.data.userInfo.uuid,
      success: (res) => {
        console.log('列表返回')
        console.log(res)
        this.getShareOrderNum()
        this.washDataList(res.data.data.records || [])
        this.isTcshow()
      },
      fail: (err) => {
        this.setData({
          json: JSON.stringify(err)
        })
      },
      complete: () => {

      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('首页显示')
    if (app.userInfo) {
      this.setData({
        userInfo: app.userInfo,
        orderNum: app.orderNum
      })

      this.showYinDao()
      this.getList()
    } else {
      app.userInfoCallback = res => {
        this.setData({
          userInfo: app.userInfo,
          orderNum: app.orderNum
        })
        this.showYinDao()
        this.getList()
      }
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

  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },


  showDefineOrder(e) {
    this.setData({
      defineOrder: true,
      'shareInfo.orderId': e.currentTarget.dataset.orderid,
    })
  },
  hideDefineOrder() {
    this.setData({
      defineOrder: false,
      'shareInfo.orderId': ''
    })
  },

  orderShare1(e) {

    this.setData({
      'shareInfo.title': '您有一份来自好友的灵心礼物请查收',
      'shareInfo.imageUrl': "https://app.maillife.cn/files/photo//2023/04/06/abc858f5ecec4075b7ab0b843511ee4bliwu.png"
    })
    this.setData({
      defineOrder: false,
    })
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'PATCH',
      url: app.globalData.url + '/mini/clear?orderId=' + this.data.shareInfo.orderId,
      success: (res) => {
        console.log(res)
      },
      error: (error) => {
        console.log(error)
      },
      fail: () => {}
    })

  },

  orderShare(e) {
    console.log(e)
    this.setData({
      // 'shareInfo.path': '/pages/info/info',
      'shareInfo.orderId': e.currentTarget.dataset.orderid,
      'shareInfo.title': '您有一份来自好友的灵心礼物请查收',
      'shareInfo.imageUrl': "https://app.maillife.cn/files/photo//2023/04/06/abc858f5ecec4075b7ab0b843511ee4bliwu.png"
    })
  },
  shareLx() {

    this.setData({
      'shareInfo.title': '您的好友给您推荐了灵心小程序',
      'shareInfo.imageUrl': "https://app.maillife.cn/files/photo//2023/04/06/57fb730982fb4f30a218d3eac99ff627fx.png",
      'shareInfo.orderId': '',
      'shareInfo.page': '/pages/index1/index'
    })
  },

  /**
   * 用户点击右上角分享
   */

  // 礼物 https://app.maillife.cn/files/photo//2023/04/06/abc858f5ecec4075b7ab0b843511ee4bliwu.png
  // https://app.maillife.cn/files/photo//2023/04/06/57fb730982fb4f30a218d3eac99ff627fx.png
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

  // getInfo

  getInfo(orderId) {
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'GET',
      url: app.globalData.url + '/mini/getInfoByOrderId?orderId=' + orderId,
      success: (res) => {
        console.log(res)
        console.log('info')
        let giftUser = null

        if (res && res.data) {
          giftUser = res.data.data.giftUser
        }

        console.log(giftUser)
        if (!giftUser) {
          // 礼物接收人为空，此礼物现在无人认领，可直接弹窗去填写信息
          this.setData({
            isShareOrder: 1
          })
          this.alertOpen()
        } else {
          this.setData({
            isShareOrder: 0
          })
          this.showOrderAvailable()
        }
      },
      error: (error) => {
        console.log(error)
      },
      fail: () => {}
    })
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
  },

  // 判断是否显示去填写订单信息 弹窗
  isTcshow() {
    // 每次从微信 第一次进入首页
    let flag = false
    const flagDataDefault = this.dataListIsDataDefault()

    if (this.data.shareOrderId && this.data.shareOrderId.length > 0) {
      flag = true
      console.log(this.orderIslist(this.data.shareOrderId))
      if (this.orderIslist(this.data.shareOrderId)) {
        flag = false
        console.log('在订单')
        this.setData({
          shareOrderId: null
        })

      } else {
        console.log('不在订单')
        this.getInfo(this.data.shareOrderId)
        return
      }
    }
    console.log('99')
    flag = flagDataDefault
    if (flag && app.isOneShowTc) {
      app.isOneShowTc = false
      this.alertOpen()
    }
  },

  dataListIsDataDefault() {
    let flag = false
    const cross = ['userName', 'sex', 'size', 'phone', 'address', 'area', 'height', 'weight']
    const dataList = util.deepClone(this.data.dataList)

    dataList.forEach((item) => {
      let itemDefault = true
      cross.forEach(name => {
        if (item[name] === null || item[name] === undefined || item[name].toString().length <= 0) {
          console.log('找到了')
          itemDefault = false
          if (item.gift !== 1) {
            flag = true
            app.globalData.orderInfo = item
          }
        }
      })
      item.itemDefault = itemDefault
    })
    this.setData({
      dataList,
    })
    console.log(this.data.dataList)
    return flag
  },
  orderIslist(orderId) {
    let flag = false
    this.data.dataList.forEach((item) => {
      if (item.orderId === orderId) {
        flag = true
      }
    })
    return flag
  },

  goHome() {
    this.setData({
      guideShow: false,
    })
  }
})