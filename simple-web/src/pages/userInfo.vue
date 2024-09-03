<!-- userInfo.vue Created by xh on 2018-3-27  -->
<template>
  <div>
    <div class="userInfo-page">
      <div class="badge-box">
        <div class="badge-item">
          <div class="badge-cell_bd">头像</div>
          <div class="badge-cell_ft">
            <img :src="pageData.avatar" :alt="pageData.realname">
            <!-- <i class="tip-icon" /> -->
            <!-- <input class="upload-btn" type="file" accept="image/*" @change="uploadHandle($event)"> -->
          </div>
        </div>
        <div class="badge-item">
          <div class="badge-cell_bd">姓名</div>
          <div class="badge-cell_ft"><input ref="realname" v-model="pageData.realname" type="text"></div>
        </div>
        <div class="badge-item" @click="setSex">
          <div class="badge-cell_bd">性别</div>
          <div class="badge-cell_ft">{{ pageData.sex === '2' ? '女': pageData.sex === '1' ? '男' : '' }}&nbsp;<i class="tip-icon" /></div>
        </div>
        <div class="badge-item">
          <div class="badge-cell_bd">出生年月</div>
          <div id="birthday" class="badge-cell_ft">{{ pageData.birthday }}&nbsp;<i class="tip-icon" /></div>
        </div>
        <div class="badge-item">
          <div class="badge-cell_bd">手机号</div>
          <div class="badge-cell_ft"><input v-model="pageData.mobile" type="number" readonly></div>
        </div>
        <div class="badge-item">
          <div class="badge-cell_bd">身高</div>
          <div class="badge-cell_ft"><input v-model="pageData.height" type="number">
            <span class="badge-cell_bd">cm</span>
          </div>
        </div>
        <div class="badge-item">
          <div class="badge-cell_bd">体重</div>
          <div class="badge-cell_ft"><input v-model="pageData.weight" type="number">
            <span class="badge-cell_bd">kg</span>
          </div>
        </div>
        <div class="badge-item">
          <div class="badge-cell_bd">腰围</div>
          <div class="badge-cell_ft"><input v-model="pageData.waistline" type="number">
            <span class="badge-cell_bd">cm</span>
          </div>
        </div>
        <div class="badge-item">
          <div class="badge-cell_bd">设备信息</div>
          <div class="badge-cell_ft">{{ pageData.device_info.sn }}
          </div>
        </div>
      </div>
      <div class="btn-box">
        <div class="btn" @click="saveFn">保存</div>
      </div>
    </div>

    <TabSelectBox :options="tabSelectBoxOpts" @select="selectFn" />
  </div>
</template>

<script>
import TabSelectBox from '../components/tabSelectBox'
import datePicker from 'vue-ios-datepicker'
import lrz from 'lrz'

export default {
  components: {
    TabSelectBox
  },
  data() {
    return {
      pageData: {
        avatar: '',
        sex: '',
        birthday: '',
        mobile: '',
        realname: '',
        age: '',
        waistline: '',
        weight: '',
        height: '',
        device_info: {}
      },
      formData: null,
      tabSelectBoxOpts: {
        active: false,
        opts: [
          {
            '2': '女'
          },
          {
            '1': '男'
          }
        ]
      }
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    },
    patient() {
      return this.$store.state.patientInfo.patient_id
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    scrollTo(0, 0)
    this.calendarInit()

    // 解决IOS原生输入法输入中文时，无法有效绑定的问题
    this.$refs.realname.addEventListener('input', function() {
      const newValue = self.$refs.realname.value
      if (self.pageData.realname !== self.$refs.realname.value) {
        // eslint-disable-next-line no-undef
        $set(self, 'pageData.realname', newValue)
      }
    })
  },
  methods: {
    getData() {
      this.$http.get(`/app/web/v1/userInfo/${this.patient}/`,
        { headers: { Authorization: `Token ${this.$store.state.token}` }})
        .then((res) => {
          this.$set(this, 'pageData', res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    selectFn(k, v) {
      if (v) {
        this.$set(this.pageData, 'sex', k)
      }
      this.$set(this.tabSelectBoxOpts, 'active', false)
    },
    setSex() {
      this.$set(this.tabSelectBoxOpts, 'active', true)
    },
    calendarInit() {
      const self = this
      // eslint-disable-next-line new-cap
      const calendar = new datePicker()
      const now = new Date()
      const maxDateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
      calendar.init({
        // 触发id名称
        trigger: '#birthday',
        type: 'date',
        minDate: '1900-01-01',
        maxDate: maxDateString,
        onSubmit: function() {
          self.pageData.birthday = calendar.value
        }
      })
    },
    uploadHandle(e) {
      const files = e.target.files; let file
      // eslint-disable-next-line no-unused-vars
      const _this = this
      if (files && files.length > 0) {
        file = files[0]
        // 清除input file的值
        e.target.value = null
        // 限制图片类型 jpg,png,gif
        if (!/\/(jpeg|png|gif)/i.test(file.type)) {
          alert('不支持的图片格式')
          return false
        }

        if (file.size > 1024 * 1024 * 5) {
          alert('图片过大，限制在5M以内')
          return
        }

        lrz(file, { width: null, height: null, quality: 0.9 })
          .then((rst) => {
            return this.$http.post(`/app/web/v1/upload/`, rst.formData)
          })
          .then((res) => {
            this.$set(this.pageData, 'avatar', res.data.data)
          })
          .catch((err) => {
            alert(err.response.data.error)
          })
      }
    },
    saveFn() {
      var _this = this
      var formData = {
        avatar: '', // 头像
        realname: '', // 姓名
        sex: '', // 性别
        birthday: '', // 生日
        height: '', // 身高
        weight: '', // 体重
        waistline: '' // 腰围
      }

      // eslint-disable-next-line no-unused-vars
      for (var [k, v] of Object.entries(formData)) {
        formData[k] = _this.pageData[k]
      }
      _this.$http.put(`/app/web/v1/userInfo/${this.patient}/`, formData,
        {
          headers: { Authorization: `Token ${this.token}` }
        })
        .then((res) => {
          alert('保存成功')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
    .userInfo-page{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin-bottom: 100px;
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;
        background-color: #fff;
    }
    .badge-box{
        .badge-item{
            display: flex;
            margin-left: 40px;
            padding: 30px 40px 30px 0;
            border-bottom: 2px solid #f6f6f6;
            align-items: center;
            .badge-cell_bd{
                font-size: 32px;
                color: #333;
            }
            .badge-cell_ft{
                position: relative;
                flex: 1;
                text-align: right;
                font-size: 28px;
                color: #999;
            }
            .tip-icon{
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid #ddd; /*no*/
                border-width: 0 2px 2px 0;
                transform: rotateZ(-45deg);
                vertical-align: middle;
            }
            img{
                margin-right: 20px;
                display: inline-block;
                width: 100px;
                height: 100px;
                // border: 1px solid #000;
                border-radius: 36px;
                vertical-align: middle;
            }
            input{
                border: 0;
                outline: 0;
                text-align: right;
                color: #999;
            }
            .upload-btn{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }
    }
    .btn-box{
        width: 80%;
        margin: 50px auto;
        .btn{
            border-radius: 50px;
            text-align: center;
            line-height: 80px;
            color: #fff;
            font-size: 28px;
            font-family: 'PingFangSC-Regular';
            background: linear-gradient(to right, #6ca2db, #2574ca);
            &:hover{
                opacity: .7;
            }
        }
    }
</style>
