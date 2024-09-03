// app.js
App({
  globalData: {
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuTop: 0, // 胶囊距顶部间距
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    menuLeft: 0, // 胶囊距离左原点的宽度
    windowWidth: 0, // 页面宽度
    url: 'https://xindianyi.maillife.cn'  // https://xindianyi.mvheartcare.net  https://xindianyi.maillife.cn  http://192.168.10.94:8083
  },
  orderNum: 0,
  userInfo: null,
  inviteCode: null,
  isOneShowYinDao: true,
  isOneShowTc: true,

  onHide: function () {
    const that = this;
    // that.isOneShowTc = true
    // that.isOneShowYinDao = true

    console.log('页面关闭')
  },
  onLaunch: function (options) {
    const that = this;
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    console.log(systemInfo)
    console.log(menuButtonInfo)
    // 导航栏高度 = 状态栏高度 + 44(所有机型都适用)
    that.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    that.globalData.menuTop = menuButtonInfo.top;
    that.globalData.menuHeight = menuButtonInfo.height;
    that.globalData.menuLeft = menuButtonInfo.left;
    that.globalData.windowWidth = systemInfo.windowWidth;

    wx.login({
      success: res => {
        this.login(res.code)
      },
      fail: () => {}
    })
  },

  getOrderNum: function (userInfo) {
    const that = this
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'GET',
      url: that.globalData.url + '/mini/count',
      success: (res) => {
        console.log(4)
        console.log(res)
        that.orderNum = res.data.data
        that.userInfo = userInfo
        if (that.userInfoCallback && typeof that.userInfoCallback === 'function') {
          that.userInfoCallback()
        }
      },
      error: (error) => {
        console.log(error)
      },
      fail: () => {}
    })
  },
  login: function (data) {
    const that = this
    wx.request({
      header: {
        Authorization: 'test'
      },
      method: 'POST',
      url: that.globalData.url + '/mini/login?code=' + data,
      data: {
        code: data
      },
      success: (res) => {
        console.log(1234)
        that.getOrderNum(res.data.data)
      },
      error: (error) => {
        console.log(error)
      },
      fail: () => {}
    })
  },
})