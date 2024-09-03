<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // 在页面加载时读取localStorage里的状态信息
    // sessionStorage.getItem('userInfo') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem('userInfo'))))
    // 在页面刷新时将vuex里的信息保存到localStorage里

    // 关闭提醒
    // window.addEventListener('beforeunload', (e) => {
    //
    //   sessionStorage.setItem('userInfo', JSON.stringify(this.$store.state))
    //   sessionStorage.setItem('userMenus', JSON.stringify(this.$store.getters.menusList))
    //   if (e) {
    //     e.returnValue = '确认关闭？'
    //   } else {
    //     return '关闭提示'
    //   }
    // })
  }
}
</script>
