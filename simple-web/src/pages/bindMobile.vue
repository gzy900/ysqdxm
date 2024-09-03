<!-- bindMobile.vue Created by xh on 2017-10-20  -->
<template>
  <div class="bindMobile-page">
    <div class="form-box">
      <div class="form-ele">
        <label for="mobile">手机号码：</label>
        <div class="input-box">
          <input id="mobile" v-model="formData.mobile" type="number" name="mobile" placeholder="请输入您的手机号码" autocomplete="off">
        </div>
      </div>
      <div class="form-ele">
        <label for="verifyCode">验证码：</label>
        <div class="input-box">
          <input id="verifyCode" v-model="formData.code" type="number" name="verifyCode" placeholder="请输入验证码" autocomplete="off">
          <span class="getVerifyCode" :class="{disabled: verifyCodeBtnState}" @click="getVerifyCode">{{ labelText }}</span>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <div class="btn" @click="bindMobile">确定</div>
    </div>
  </div>
</template>

<script>
// import datePicker from 'vue-ios-datepicker'
export default {
  data() {
    return {
      formData: {
        mobile: '',
        purpose: '3'
      },
      labelText: '获取验证码',
      verifyCodeBtnState: false,
      sexMap: {
        MALE: '2', // 男性
        FEMALE: '3' // 女性
      }
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  mounted() {
    scrollTo(0, 0)
  },
  methods: {
    bindMobile() {
      if (!this.formData.mobile || this.formData.mobile === '') {
        alert('请输入手机号码！')
        return false
      } else {
        if (!(/^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/.test(this.formData.mobile))) {
          alert('手机号码格式不正确！')
          return false
        }
      }
      if (!this.formData.code || this.formData.code === '') {
        alert('请输入验证码！')
        return false
      }

      const headers = { Authorization: `Token ${this.token}` }
      this.$http.post(`/app/web/v1/bindMobile/`, this.formData,
        { headers: headers }
      )
        .then((res) => {
          alert(res.data.data)
          this.$router.replace({ path: '/' })
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    },
    getVerifyCode() {
      if (this.verifyCodeBtnState) {
        return false
      }
      if (!this.formData.mobile || this.formData.mobile === '') {
        alert('请输入手机号码！')
        return false
      } else {
        if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.formData.mobile))) {
          alert('手机号码格式不正确！')
          return false
        }
      }
      const formData = {
        mobile: this.formData.mobile,
        purpose: '3' // 固定字符串'3'
      }
      this.$http.post('/pc/common/v1/sms/',
        formData
      ).then(res => {
        this.interval(60)
      })
        .catch((err) => {
          alert(err.response.data.error)
        })
    },
    interval(end = 0) {
      for (let i = 0; i <= (end + 1); i++) {
        setTimeout(() => {
          this.$set(this, 'labelText', `${end - i}s后可重新发送`)
          this.verifyCodeBtnState = true
          if (i === (end + 1)) {
            this.labelText = `重新发送验证码`
            this.verifyCodeBtnState = false
          }
        }, i * 1000)
      }
    },
    disableInput() {
      document.activeElement.blur()
    }
  }
}
</script>

<style lang="less">
    .bindMobile-page{
        margin-bottom: 50px;
        .form-box{
            margin: 30px;
            border-radius: 10px;
            padding: 40px 30px;
            background-color: #fff;
            .form-ele{
                margin: 30px 0;
                label{
                    display: block;
                    font-size: 30px;
                    color: #333;
                    margin-bottom: 30px;
                }
                .input-box{
                    display: flex;
                }
                input{
                    flex: 1;
                    border: 2px solid #dee9f8; /*no*/
                    background-color: #ecf4ff;
                    height: 80px;
                    font-size: 30px;
                    padding-left: 1em;
                    outline: 0;
                    width: 1px;
                    box-sizing: border-box;
                }
                .getVerifyCode{
                    display: block;
                    margin-left: 30px;
                    color: #fff;
                    padding: 0 10px;
                    font-size: 30px;
                    line-height: 78px;
                    border-radius: 10px;
                    background-color: #529dff;
                    cursor: pointer;
                    white-space: nowrap;
                    flex: 1;
                    text-align: center;
                    &.disabled{
                        color: #999;
                        background-color: #ddd;
                    }
                }
                .sex{
                    margin-right: 50px;
                    font-size: 30px;
                    i{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        border: 6px solid #ddd; /*no*/
                        border-radius: 100%;
                        vertical-align: -8px;
                        margin-right: 10px;
                        cursor: pointer;
                    }
                    &.checked, &:hover{
                        i{
                            background-color: #529dff;
                        }
                    }
                }
            }
        }
        .btn-box{
            width: 420px;
            margin: 80px auto 0;
            .btn{
                border-radius: 50px;
                text-align: center;
                line-height: 68px;
                color: #fff;
                font-size: 30px;
                background-color: #529dff;
            }
        }
    }
</style>
