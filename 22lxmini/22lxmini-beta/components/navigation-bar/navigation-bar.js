const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    // defaultData（父页面传递的数据）
    defaultData: {
      type: Object,
      value: {
        title: "灵心"
      },
      observer: function (newVal, oldVal) {}
    },
    scrollTop: {
      type: Number,
      value: 0
    },
    isShowGoBack: {
      type: Number,
      value: 1
    }
  },
  lifetimes: {
    read: () => {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuTop: app.globalData.menuTop,
    menuHeight: app.globalData.menuHeight,
    menuLeft: app.globalData.menuLeft,
    windowWidth: app.globalData.windowWidth
  },
  methods: {
    goback() {
      if (this.data.isShowGoBack) {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
})