<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { getList } from '@/api/arrhythmia'
import { getList as getWeekList } from '@/api/week-report'

import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      // needTagsView: state => state.settings.tagsView,
      needTagsView: false,
      fixedHeader: state => state.settings.fixedHeader,
      userInfo: state => state.user.userInfo
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: false,
        mobile: false
      }
      // return {
      //   hideSidebar: !this.sidebar.opened,
      //   openSidebar: this.sidebar.opened,
      //   withoutAnimation: this.sidebar.withoutAnimation,
      //   mobile: this.device === 'mobile'
      // }
    }
  },
  data() {
    return {
      time: null
    }
  },
  mounted() {
    Notification.requestPermission()

    if (this.time === null) {
      this.time = setInterval(() => {
        this.getList()
      }, 1000 * 60 * 30)
    }
  },
  beforeDestroy() {
    clearInterval(this.time)
  },

  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    getList() {
      const ah_listQuery = {
        pageNo: 1,
        number: 10,
        content: null,
        state: 0,
        flag: '1',
        beginTime: '',
        endTime: '',
        doctorId: this.userInfo.doctorId
      }
      const cl_listQuery = {
        pageNo: 1,
        number: 10,
        content: null,
        state: 0,
        flag: '5',
        beginTime: '',
        endTime: '',
        doctorId: this.userInfo.doctorId
      }
      const week_listQuery = {
        pageNo: 1,
        number: 10,
        state: 0,
        doctorId: this.userInfo.doctorId
      }

      const arrhythmia = new Promise((resolve, reject) => {
        getList(ah_listQuery)
          .then(response => {
            let num = 0
            if (response.data) {
              num = response.data.count
            } else {
              num = 0
            }
            resolve(num)
          })
          .catch(error => {
            reject(error)
          })
      })
      const cardiacLoad = new Promise((resolve, reject) => {
        getList(cl_listQuery)
          .then(response => {
            let num = 0
            if (response.data) {
              num = response.data.count
            } else {
              num = 0
            }
            resolve(num)
          })
          .catch(error => {
            reject(error)
          })
      })
      const weekReport = new Promise((resolve, reject) => {
        getWeekList(week_listQuery)
          .then(response => {
            let num = 0
            if (response.data) {
              num = response.data.count
            } else {
              num = 0
            }
            resolve(num)
          })
          .catch(error => {
            reject(error)
          })
      })
      Promise.all([arrhythmia, cardiacLoad, weekReport])
        .then((result) => {
          let num = 0
          result.forEach((item) => {
            num += item
          })
          if (num === 0) {
            return
          }
          if (window.Notification && Notification.permission !== 'granted') {
            Notification.requestPermission()
          }
          if (window.Notification && Notification.permission !== 'denied') {
            Notification.requestPermission(function(status) {
              const n = new Notification('脉迩生活医生端',
                                         { body: '尊敬的医生您好，您目前尚有 ' + result[0] + ' 条心律失常, ' + result[1] + ' 条心脏负荷, ' + result[2] + ' 条周报,信息未反馈，请及时查看并给与患者反馈！！' })
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
