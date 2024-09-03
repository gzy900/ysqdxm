<!-- tab.vue Created by xh on 2018-3-27  -->
<template>
  <div class="tab-page">
    <div class="tab-box">
<!--      <div class="tab-item" :class="{hover: hover === 'dynamic'}" @click="goTab('dynamic')">-->
<!--        <i class="dynamic" />-->
<!--        <strong>动态</strong>-->
<!--      </div>-->
      <div class="tab-item" :class="{hover: hover === 'record'}" @click="goTab('record')">
        <i class="record" />
        <strong>数据</strong>
      </div>
      <div class="tab-item" :class="{hover: hover === 'user'}" @click="goTab('user')">
        <i class="user" />
        <strong>我的</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover: ''
    }
  },
  watch: {
    '$route': 'setActive'
  },
  mounted() {
    this.setActive()
  },
  methods: {
    goTab(type) {
      this.hover = type
      switch (type) {
        // case 'dynamic':
        //   this.$router.push(`/dynamic`)
        //   break
        case 'record':
          this.$router.replace(`/record/record`)
          break
        case 'user':
          this.$router.replace(`/user/info`)
          break
        default:
          break
      }
    },
    setActive() {
      if (this.$route.path.includes('user')) {
        this.hover = 'user'
      } else if (this.$route.path.includes('record')|| this.$route.name === 'record') {
        this.hover = 'record'
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .tab-box{
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100px;
        background-color: #fff;
        box-shadow: 0 4px 12px 0 #D9E9FF;
        z-index: 10;
        .tab-item{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #999;
            &:active, &.hover{
                color: #6FA5FE;
                .dynamic{
                    background-image: url('../assets/images/ic_dynamic_press@3x.png');
                }
                .record{
                    background-image: url('../assets/images/ic_record_press@3x.png');
                }
                .user{
                    background-image: url('../assets/images/ic_user_press@3x.png');
                }
            }
            i{
                background-position: 0 0;
                background-repeat: no-repeat;
                &.dynamic{
                    width: 40px;
                    height: 36px;
                    background-image: url('../assets/images/ic_dynamic@3x.png');
                    background-size: 40px 36px;
                }
                &.record{
                    width: 36px;
                    height: 40px;
                    background-image: url('../assets/images/ic_record@3x.png');
                    background-size: 36px 40px;
                }
                &.user{
                    width: 36px;
                    height: 40px;
                    background-image: url('../assets/images/ic_user@3x.png');
                    background-size: 36px 40px;
                }
            }
            strong{
                margin-top: 16px;
                font-size: 20px;
                font-family: 'PingFangSC-Regular';
                font-weight: normal;
            }
        }
    }
</style>
