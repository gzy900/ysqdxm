<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" style="overflow-x: hidden">
    <el-form
      ref="form"
      label-suffix="："
      :model="form"
      label-width="220px"
      :rules="rules"
      style="overflow: hidden"
    >
      <!--          :disabled="formDisabled"-->

      <!--      <el-divider content-position="left">基础信息</el-divider>-->
      <el-form-item label="患者唯一编码">
        <el-col :span="12">
          <el-input v-model="form.patientId" disabled></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="手机号" prop="cellphone">
        <el-col :span="12">
          <el-input v-model="form.cellphone"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="姓名" prop="patientName">
        <el-col :span="4">
          <el-input v-model="form.patientName"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="身份证号" prop="idCard">
        <el-col :span="12">
          <el-input v-model="form.idCard"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="出生日期" prop="birthday">
        <el-col :span="6">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="身高" prop="height">
        <el-col :span="6">
          <el-input v-model="form.height">
            <template slot="append">cm</template>
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="体重" prop="weight">
        <el-col :span="6">
          <el-input v-model="form.weight">
            <template slot="append">kg</template>
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="BMI">
        <el-col :span="6">
          <el-input :value="(form.weight / ((form.height/100) * (form.height/100))).toFixed(2)" disabled>
            <template slot="append">BMI</template>
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="所属机构" prop="orgId">
        <el-col :span="6">
          <el-select v-model="form.orgId" placeholder="请选择所属机构" @change="jigou">
            <el-option v-for="item in orgList" :label="item.orgName" :value="item.orgId"></el-option>
            <!--                <el-option label="上海移视科技" :value="1"></el-option>-->
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="操作">
        <el-col :span="24">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button type="warning" @click="handleSubmit">返回</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </el-scrollbar>
</template>

<script>
import {validIdCard, validPhone} from "@/utils/validate";
import {deepClone, getAge} from "@/utils";
import {addData} from "@/api/patient";

export default {
  name: "Base",
  props: {
    orgList: {
      type: Array,
      default: null
    },
    userInfoDialogType:{
      type:String,
      default:'add'
    }
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      console.log(value)
      if (validPhone(value)) {
        callback()
      } else {
        callback(new Error(rule.message))
      }
    }
    const checkIdCard = (rule, value, callback) => {
      console.log(value)
      if (validIdCard(value)) {
        callback()
      } else {
        callback(new Error(rule.message))
      }
    }
    return {
      form: {
        patientId: null,
        patientName: null,
        gender: null,
        birthday: null,
        idCard: null,
        height: null,
        weight: null,
        cellphone: null,
        orgId: null,
        orgName: '上海移视科技',
        remark: '无',
        timeArrayList: ''
      },
      rules: {
        patientName: [{required: true, message: '请输入患者姓名', trigger: 'blur'}],
        idCard: [
          {required: true, message: '请输入患者身份证号码', trigger: 'blur'},
          {validator: checkIdCard, message: '请输入正确的身份证号码！', trigger: 'blur'}
        ],
        gender: [{required: true, message: '请选择患者性别', trigger: 'change'}],
        birthday: [{required: true, message: '请选择患者的出生日期', trigger: 'blur'}],
        height: [{required: true, message: '请输入患者身高', trigger: 'blur'}],
        weight: [{required: true, message: '请输入患者体重', trigger: 'blur'}],
        orgId: [{required: true, message: '请选择患者所属机构', trigger: 'change'}],
        cellphone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {validator: checkPhone, message: '请输入正确的手机号码', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    'form.idCard': {
      handler(newValue) {
        if (newValue && newValue.length === 18) {
          this.form.birthday = getAge(newValue)
        }
      }
    },
  },
  methods: {
    jigou(e) {
      this.orgList.forEach((item) => {
        if (item.orgId === e) {
          this.form.orgName = item.orgName
        }
      })
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const form = deepClone(this.form)
          if (this.userInfoDialogType === 'add') {
            return new Promise((resolve, reject) => {
              delete this.form.patientId
              delete this.form.id
              form.timeArrayList = this.surgeryTimeList()
              addData(form).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.handleRefresh()
                this.handleReturn()
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          }
        }
      })
    },
    surgeryTimeList() {
      const time = []
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      const day = date.getDate()

      const interval = [1, 2, 3, 6, 6, 6, 6, 6, 6, 6] // 每次累加的月数。第一次随访在一个月后，所以+1。第二次随访在三个月后。在第一个月的基础上+2。1，3，6，12。
      interval.forEach((item) => {
        // month = (month + item) % 12 + 1
        month += item
        if (month > 12) {
          year++
          month -= 12
        }
        const push_date = new Date(year + '/' + month + '/' + day).getTime()
        time.push(push_date)
      })
      return time.join(',')
    },
    handleRefresh() {
      console.log('handleRefresh')
      this.$emit('handleRefresh')
    },
    handleReturn() {
      console.log('userInfoDialogVisible')
      this.$emit('update:visible', false)
    },
  }
}
</script>

<style scoped>

</style>
