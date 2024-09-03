<template>
  <div class="frame">
    <router-view/>
    <Tab/>
  </div>
</template>
<script>
import Tab from '../components/tab'

export default {
  components: {
    Tab
  },
  data() {
    return {
      stateResult: '-1'
    }
  },

  mounted() {
    this.checkState()
  },

  methods: {
    checkState() {
      const pubOpenid = this.$route.query.pub_openid || this.$store.state.pubOpenid
      // 做测试，有数据
      // const pubOpenid = 'ontqy55N_6oGXQ8KOND9dNc2FAek'
      // 做测试，无数据
      // const pubOpenid = 'aaaaaa'
      this.$http.get(`/app/web/v1/login/?pub_openid=${pubOpenid}`)
          .then((res) => {
            console.log('1234')
            const data = res.data.data
            this.$set(this, 'stateResult', JSON.stringify(data))

            // 更新vuex用户状态
            this.$store.commit('logined',
                {
                  userId: data.id,
                  patientInfo: data.patient_info,
                  token: data.token,
                  pubOpenid: pubOpenid
                })
            if (JSON.stringify(data.patient_info) === '{}' || data.patient_info.is_bind_mobile === false) {
              this.$router.replace({ path: '/bindMobile' })
            } else if (data.patient_info.is_bind_device === false) {
              this.$router.replace({ path: '/warn' })
              // this.$router.replace({ path: '/bindDevice' })
            } else {
              const path = this.$router.currentRoute.path
              if (!path.includes('/record/analysis')) {
                this.$router.replace({ path: '/record/record' })
              }
            }
          })
          .catch(err => {
            alert('即将关闭该页面，请重新打开访问')
            setTimeout('WeixinJSBridge.call("closeWindow")', 500)
          })
    }
  }
}
</script>

