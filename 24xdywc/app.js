// app.js
App({
  onLaunch() {



    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    const that = this;
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

    console.log(systemInfo)
    that.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    that.globalData.menuTop = menuButtonInfo.top;
    that.globalData.menuHeight = menuButtonInfo.height;
    that.globalData.menuLeft = menuButtonInfo.left;
    that.globalData.windowWidth = systemInfo.windowWidth;
  },
  globalData: {
    userInfo: null,
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuTop: 0, // 胶囊距顶部间距
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    menuLeft: 0, // 胶囊距离左原点的宽度
    windowWidth: 0, // 页面宽度
    url: 'https://xindianyi.maillife.cn'  // https://xindianyi.mvheartcare.net  https://xindianyi.maillife.cn  http://192.168.10.94:8083
  }
})
