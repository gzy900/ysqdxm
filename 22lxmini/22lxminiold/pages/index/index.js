// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false, // 如需尝试获取用户信息可改为false
    uuid: null,
    serviceType: 1,
    description: '月度服务',
    url: 'https://xindianyi.mvheartcare.net',
    // http://192.168.10.91:8083
  },


  // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
    this.wxLogin()
  },
  getPhoneNumber(e) {
    console.log(e.detail.code)
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // this.userLogin(res)
      }
    })
  },

  payplay() {
    // console.log(this.uuid)
    // console.log(this.serviceType)
    // console.log(this.description)
    // return
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'POST',
      url: this.data.url + '/mini/order',
      dataType: 'json',
      data: {
        uuid: this.data.uuid,
        serviceType: this.data.serviceType,
        description: this.data.description
      },
      success: (res) => {
        console.log(res)
        const res1 = res.data.data
        console.log(res1)
        this.payStart(res1)
      },
      fail: () => {
        console.log(12)
      }
    })
  },

  payStart(res1) {
    // res1 = {
    //     "timeStamp": "1677836759",
    //     "signType": "HMAC-SHA256",
    //     "package": "prepay_id=wx0317455991545874e3d3751746b6670000",
    //     "paySign": "KJqQB9fJHSVr8QhyBjgMLAVdjZWkVozj/QzyY8SQj5GoMP8gw5JKUUEes3jFn42arRoDsTyDzIkytoRyOz004z0pe0NDkhOGOBuyoXpVR16P0D7fY3TMLRjdZxY+hgBkYE77B2FiyimcoSQ6jUhw7yWh6sS7PY2diLfxw2oq9/5NHX2i4pgtPmRLQzPp3ql43cM/pYWTBWaSM1iGGaUfXxv6bxOnp96D48qwbhtw6wumUJcgEN17AUy4RsNpM3xWk6cFBkACNX0T/8hwWSuiw+PgyL8JM7ySSCIjfotmx3J+h5kJa+PeAvxf7tVQhRyQy9EjBTwg3cgiG4o643ioYQ==",
    //     "nonceStr": "425a631210024abb96cd968142978c62"
    //   },
    res1.package = res1.packageStr
    wx.requestPayment({
      ...res1,
      success(res2) {
        console.log(res2)
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  wxLogin() {
    wx.login({
      success: (res) => {
        this.userLogin(res.code)
      },
    })
  },

  userLogin(data) {
    console.log(data)
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'POST',
      url: this.data.url + '/mini/login?code=' + data,
      data: {
        code: data
      },
      success: (res) => {
        console.log(1234)
        console.log(res)
        this.setData({
          uuid: res.data.data.uuid
        })
      },
      error: (error) => {
        console.log(error)
      },
      fail: () => {}
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})