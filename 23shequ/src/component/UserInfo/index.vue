<template>
  <div class="user-info-body">
    <div class="user-info-body-scr">

      <div class="user-info-body-content">
        <div class="user-info-body-form-menu" v-if="userInfoLook ==='base'">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
            >
              <a :href="'#'+activity.href" style="cursor: pointer">
                {{ activity.content }}
              </a>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="user-info-body-form" v-if="userInfoDialogType==='add'||getInfoLoading">
          <el-scrollbar wrap-class="scrollbar-wrapper" style="overflow-x: hidden">
            <el-form
              ref="form"
              label-suffix="："
              :model="form"
              label-width="220px"
              :rules="rules"
              style="height:100%;overflow: auto"
            >

              <el-form-item v-if="userInfoDialogType!=='add'" label="患者唯一编码">
                <el-col :span="12">
                  <el-input v-model="CODE" disabled></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="联系方式" prop="cellphone">
                <el-col :span="12">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="form.cellphone"
                    placeholder="请输入患者联系方式，多个以逗号 , 隔开"
                  ></el-input>
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
            </el-form>
          </el-scrollbar>
        </div>
      </div>

      <div class="user-info-body-btn">
        <template v-if="formDisabled">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button type="info" @click="handleDownloadPDF('form')">导出PDF</el-button>

          <!--        <el-button type="primary" @click="handleUp">修改</el-button>-->
        </template>

        <template v-else>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="formDisabled = true">取消修改</el-button>
        </template>
        <!--      <el-button type="danger" @click="visible = false">关闭窗口</el-button>-->
      </div>
    </div>

    <el-dialog append-to-body :visible.sync="imgDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { deepClone, isString, toHump, getAge } from '@/utils'
import { addData, upData, getInfo } from '@/api/patient'
import { getToken } from '@/utils/auth'
import { validIdCard, validPhone } from '@/utils/validate'

const default_form = {
  timeArrayList: [],

  // userInfo
  // id: null,
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

  pathFactors: "string",
  physiFactors: "string",
  diagnose: "string",
  suggestion: "string",
  deviceNum: "string",
  address: "string",
}

export default {
  name: 'UserInfo',
  props: {
    row: {
      type: Object,
      default: null
    },
    userInfoDialogType: {
      type: String,
      default: 'add'
    },
    userInfoLook: {
      type: String,
      default: 'user'
    },
    visible: {
      type: Boolean,
      default: false
    },
    orgList: {
      type: Array,
      default: null
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

      activities: [{
        content: '房颤信息',
        timestamp: '',
        href: 'time_fc'
      }, {
        content: '既往手术史',
        timestamp: '',
        href: 'time_jwss'
      }, {
        content: '评分',
        timestamp: '',
        href: 'time_pf'
      }, {
        content: '检验',
        timestamp: '',
        href: 'time_jy'

      }, {
        content: '检查',
        timestamp: '',
        href: 'time_jc'

      }, {
        content: 'Holter',
        timestamp: '',
        href: 'time_ht'

      }, {
        content: '心超',
        timestamp: '',
        href: 'time_xc'

      }, {
        content: '其他',
        timestamp: '',
        href: 'time_qt'

      }],

      token: getToken(),

      ecgFileUrl: [],
      hrFileUrl: [],
      eyFileUrl: [],
      is_refluxTypeAorta: false,
      is_refluxTypeTwo: false,
      is_refluxTypeThree: false,

      imgDialogVisible: false,
      dialogImageUrl: '',
      formDisabled: false,
      getInfoLoading: false,
      operationAuthorOption: [
        {
          label: '赵冬冬',
          value: '赵冬冬'
        },
        {
          label: '徐亚伟',
          value: '徐亚伟'
        },
        {
          label: '郭荣',
          value: '郭荣'
        }
      ],
      operationOption: [
        {
          label: '冷冻消融',
          value: '0'
        },
        {
          label: '射频消融',
          value: '1'
        },
        {
          label: '左心耳封堵',
          value: '2'
        },
        {
          label: '永久起搏器植入术',
          value: '3'
        },
        {
          label: '房室结消融',
          value: '4'
        }
      ],
      OperationStatus: [],
      form: {},
      surgeyFromList: [],
      rules: {
        patientName: [{ required: true, message: '请输入患者姓名', trigger: 'blur' }],
        idCard: [
          { required: true, message: '请输入患者身份证号码', trigger: 'blur' },
          { validator: checkIdCard, message: '请输入正确的身份证号码！', trigger: 'blur' }
        ],
        gender: [{ required: true, message: '请选择患者性别', trigger: 'change' }],
        birthday: [{ required: true, message: '请选择患者的出生日期', trigger: 'blur' }],
        // height: [{required: true, message: '请输入患者身高', trigger: 'blur'}],
        // weight: [{required: true, message: '请输入患者体重', trigger: 'blur'}],
        orgId: [{ required: true, message: '请选择患者所属机构', trigger: 'change' }],
        cellphone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          // {validator: checkPhone, message: '请输入正确的手机号码', trigger: 'blur'}

        ]
      },

      is_pacemaker: false
    }
  },
  beforeMount() {
    this.form = deepClone(default_form)
    if (this.userInfoDialogType === 'add') {
      this.formDisabled = false
    } else {
      this.formDisabled = true
      this.form = {
        ...this.row
      }
      this.getInfo()
    }
  },
  mounted() {
  },
  watch: {
    'form.idCard': {
      handler(newValue) {
        if (newValue && newValue.length === 18) {
          this.form.birthday = getAge(newValue)
        }
      }
    },
    is_pacemaker: {
      handler(newValue) {
        if (!newValue) {
          this.form.pacemaker = null
        }
      }
    },
    userInfoDialogType(value) {
      value === 'add' ? this.formDisabled = false : this.formDisabled = true
    }
  },
  computed: {

    // 计算属性的 getter
    HAS_BLED: function () {
      console.log(this.form.drinking)
      return this.form.bledHypertension + this.form.liverFunction + this.form.kidneyFunction + this.form.stroke + this.form.bleeding + this.form.inrStable + this.form.bledAge + this.form.drug + this.form.drinking
    },
    VASC: function () {
      return this.form.heartFailure + this.form.vascHypertension + this.form.vascAge + this.form.diabetes + this.form.strokeTiaThrombosis + this.form.vascularDisease + this.form.vascGender
    },
    CODE: function () {
      const code = 'NSH'
      let org = ''

      this.orgList.forEach((item) => {
        if (item.orgId === this.form.orgId) {
          org = item.id.toString() || ''
        }
      })
      while (org.length < 4) {
        org = '0' + org
      }
      let uid = this.form.id.toString() || ''
      while (uid.length < 8) {
        uid = '0' + uid
      }
      const uid1 = uid.substr(0, 4)
      const uid2 = uid.substr(4, 4)
      return code + '-' + org + '-' + uid1 + '-' + uid2
    }
  },
  methods: {
    togglesOperationStatus(index) {
      this.$set(this.OperationStatus, index, !this.OperationStatus[index])
      // this.OperationStatus[index] = !this.OperationStatus[index]
    },
    handleDownloadPDF(ref) {
      localStorage.setItem('PDF_info', JSON.stringify({ title: '患者信息', content: this.$refs[ref].$el.innerHTML }))
      const routeData = this.$router.resolve({ path: '/pdf/download' })
      window.open(routeData.href, '_blank')
    },
    handleUp() {
      this.formDisabled = false
    },

    async getInfo() {
      const data = await getInfo({ patientId: this.row.patientId })
      const info = deepClone(data.data)
      for (const item in info) {
        const itemData = info[item]
        for (const i in itemData) {
          if (isString(itemData[i]) && itemData[i].indexOf('_isList_') >= 0) {
            const d = itemData[i].split('_isList_')[0]
            if (d.length > 0) {
              itemData[i] = d.split('-,-')
            } else {
              itemData[i] = []
            }
          }
          if (i.indexOf('_') >= 0) {
            const f1 = toHump(i)
            itemData[f1] = itemData[i]
            delete itemData[i]
          }

          if (itemData[i] === null || itemData[i] === undefined || itemData[i].length <= 0) {
            delete itemData[i]
          }
        }
        this.form = {
          ...this.form,
          ...itemData
        }
      }
    },

    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const form = deepClone(this.form)
          form.ecgFileUrl = []
          form.hrFileUrl = []
          form.eyFileUrl = []

          this.ecgFileUrl.forEach((item) => {
            item.response.data.split(';').forEach((p) => {
              if (p.length > 0) {
                form.ecgFileUrl.push(p)
              }
            })
          })
          this.hrFileUrl.forEach((item) => {
            item.response.data.split(';').forEach((p) => {
              if (p.length > 0) {
                form.hrFileUrl.push(p)
              }
            })
          })
          this.eyFileUrl.forEach((item) => {
            item.response.data.split(';').forEach((p) => {
              if (p.length > 0) {
                form.eyFileUrl.push(p)
              }
            })
          })

          for (const f in form) {
            if (Object.prototype.toString.call(form[f]) === '[object Array]') {
              form[f] = form[f].join('-,-') + '_isList_'
            }
          }
          console.log(2)

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
          } else {
            return new Promise((resolve, reject) => {
              upData(form).then(response => {
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
        } else {
          this.$message({
            message: '数据格式不对，请检查表单内标红提示！',
            type: 'error'
          })
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
    jigou(e) {
      this.orgList.forEach((item) => {
        if (item.orgId === e) {
          this.form.orgName = item.orgName
        }
      })
    },

    handleRemove(file, name) {
      const index = this[name].indexOf(file)
      if (index > -1) {
        this[name].splice(index, 1)
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    handleDownload(file) {
      window.open(file.url)
      console.log(file)
    },
    handleUploadSuccessECG(res, file, fileList) {
      this.ecgFileUrl = fileList
    },
    handleUploadSuccessHR(res, file, fileList) {
      this.hrFileUrl = fileList
    },
    handleUploadSuccessEY(res, file, fileList) {
      this.eyFileUrl = fileList
      console.log(this.eyFileUrl)
    },

    handleRefresh() {
      console.log('handleRefresh')
      this.$emit('handleRefresh')
    },
    handleReturn() {
      console.log('userInfoDialogVisible')
      this.$emit('update:visible', false)
    },
    handleTimeLine(id) {
      console.log(id)
    }
  }

}
</script>

<style scoped lang="scss">
.user-info-body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 15px 20px;
}

.user-info-body-scr {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.user-info-body-content {
  width: 100%;
  flex: auto;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.user-info-body-btn {
  height: 40px;
  flex: none;
  text-align: right;
}

.user-info-body-form {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex: auto;
}

.user-info-body-form-menu {
  width: 120px;
  height: 100%;
  flex: none;
  margin-top: 20px;
  margin-right: 20px;
}

.el-timeline {
  margin: 0;
  padding: 0;
}

.CHA-num {
  .el-checkbox {
    display: block;
  }
}

.el-divider__text {
  font-weight: bold;
  color: #606266;
}

.addOperation {
  p {
    width: 100%;
    height: 100%;
    text-align: center;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;

    border: 1px solid #e6ebf5;

    //border: 0;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }

  p:hover {
    border: 1px dashed #ccc;
    box-shadow: 0 0 0 0 rgb(0 0 0);
  }
}

//.form-item-title{
//  font-weight: bold;
//  font-size: 18px;
//}

</style>
