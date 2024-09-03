<template>
  <div class="container">
    <div class="content">
      <div class="title-class">SIMPLE研究患者招募</div>
      <div class="sub-title">纳入标准：</div>
      <div>1）年龄18-75岁</div>
      <div>2）原发性高血压且口服降压药物，血压控制不佳，诊室收缩压>140mmHg 或 诊室舒张压>90 mmHg</div>
      <div>3）同意参与并签署知情同意书</div>
      <div class="sub-title">排除标准：</div>
      <div>1）诊室收缩压>180mmHg 或 诊室舒张压>100 mmHg</div>
      <div>2）继发高血压</div>
      <div>3）正在服用的高血压药物超过3种以上</div>
      <div>4）使血压测量不准的心律失常，如房颤</div>
      <!-- eslint-disable-next-line -->
      <div>5）糖尿病，慢性肾功能不全（eGFR<30 mL/min/1.73m2），冠心病，心衰，和既往脑卒中或心梗史</div>
      <div>6）对任何抗高血压药物存在禁忌症（如妊娠、哮喘、肾功能不全等）</div>
      <div>7）参与了其他的临床试验</div>
      <div>8）失忆症或老年痴呆</div>
      <div>9）严重心脏瓣膜性疾病</div>
      <div>10）配偶已入组</div>
      <div>11）没有一部可用于远程信息交流的手机</div>
      <div>12）存在其他不符合的条件</div>
      <br>
      <!-- eslint-disable-next-line -->
      <div class="radio">&nbsp;&nbsp;&nbsp;&nbsp;<input :checked="accecptChecked" type="radio" @click="onClickInput" style="zoom: 120%;"> 我符合纳入标准，并不存在排除标准任何一项</div>
      <br>
      <br>
      <div class="form">
        <span class="required">*</span>
        <!-- eslint-disable-next-line -->
        <span>姓名： <input type="text" v-model="form.name" placeholder="请输入姓名"></span>
      </div>
      <div class="form">
        <span class="required">*</span>
        <!-- eslint-disable-next-line -->
        <span>性别： <input type="radio" value="1" v-model="form.sex" style="margin-top:-2px;margin-bottom:1px;"> 男 <input type="radio" value="2" v-model="form.sex" style="margin-top:-2px;margin-bottom:1px;"> 女</span>
      </div>
      <div class="form">
        <span class="required">*</span>
        <!-- eslint-disable-next-line -->
        <span>年龄：<input type="number" v-model="form.age" placeholder="请输入年龄"></span>
      </div>
      <div class="form">
        <span class="required">*</span>
        <!-- eslint-disable-next-line -->
        <span>电话：<input type="number" v-model="form.mobile" placeholder="请输入手机号"></span>
      </div>
    </div>
    <div class="btn"><button @click="onSubmit">报名</button></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      accecptChecked: false,
      form: {
        name: '',
        sex: '',
        age: '',
        mobile: '',
        hospital_id: ''
      }
    }
  },
  created() {
    const hospital_id = this.$route.query.hospital_id
    this.form.hospital_id = hospital_id
  },
  methods: {
    onClickInput() {
      this.accecptChecked = !this.accecptChecked
    },
    onSubmit() {
      if (!this.accecptChecked) {
        alert('请先阅读标准并勾选同意')
        return
      }

      if (this.form.hospital_id === undefined || this.form.hospital_id === '') {
        alert('无效的请求')
        return
      }

      const { ret, info } = this.validate(this.form)
      if (!ret) {
        alert(info)
        return
      } else {
        return axios.post('http://60.205.179.20:10010/pc/admin/v1/patientCollect/collection/', this.form).then(res => {
          alert(res.data.data)
        }).catch(error => {
          console.log(error)
          alert('重复的信息录入')
        })
      }
    },
    validate(data) {
      let res = { ret: true, info: '' }
      const { name, sex, age, mobile } = this.form
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!name) {
        res = { ret: false, info: '姓名不能为空' }
      } else if (!sex) {
        res = { ret: false, info: '性别不能为空' }
      } else if (!age) {
        res = { ret: false, info: '年龄不能为空' }
      } else if (!reg.test(mobile)) {
        res = { ret: false, info: '手机号不合法' }
      }
      return res
    }
  }
}
</script>

<style lang='less' scoped>
  .container {
    display: flex;
    flex-direction: column;
    .content {
      font-size: 25px;
      margin: 10px;
      &:nth-child(1) {
        div {
          margin: 10px;
        }
      }
      .title-class {
        text-align: center;
        font-weight: 900;
      }
      .sub-title {
        font-size: 30;
        font-weight: 900;
      }
      .required {
        color: red;
      }
      .form {
        padding: 5px;
      }
    }
    .btn {
      margin: 30px auto;
      button {
      background-color: #4d88b8;
      color: white;
      padding: 10px 40px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>
