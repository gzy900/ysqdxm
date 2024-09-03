<template>
  <div class="container">
    <page-header content="编辑患者" />
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-plus" style="padding-right: 10px" />
        <span>编辑</span>
      </div>
      <div style="padding-top: 10px">
        <el-form ref="FORM" :model="form" :rules="rules" inline size="small" label-width="100px" label-position="right" @submit.native.prevent>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>患者信息</span>
            </div>
            <el-form-item label="姓名" prop="name">
              <el-input v-model.trim="form.name" placeholder="输入患者姓名" style="width: 300px;" clearable />
            </el-form-item>
            <el-form-item label="性别" prop="gender" label-width="120px">
              <el-select v-model="form.gender" style="width: 300px;" placeholder="请选择">
                <el-option
                  v-for="item in genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="form.mobile" placeholder="输入手机号" style="width: 300px;" clearable />
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" placeholder="输入年龄" style="width: 300px;" clearable />
            </el-form-item>
            <el-form-item label="绑定设备" prop="device" label-width="120px">
              <el-select
                v-model="form.device"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="onFilterDevice"
                :loading="isInQuerying"
                style="width: 300px;"
              >
                <el-option
                  v-for="item in devices"
                  :key="item.id"
                  :label="item.sn"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="所属医生" prop="doctor">
              <el-select v-model="form.doctor" style="width: 300px;" placeholder="请选择">
                <el-option
                  v-for="(item, index) in doctors"
                  :key="index"
                  :label="item.hospital_doctor"
                  :value="item.hospital_doctor"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="服药方案">
              <el-select v-model="form.plan" style="width: 300px;" placeholder="请选择">
                <el-option
                  v-for="item in plans"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="筛选期服药方案" label-width="120px">
              <el-select v-model="form.screening" style="width: 300px;" placeholder="请选择">
                <el-option
                  v-for="item in plans"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <br>
            <el-form-item label="组别" prop="category">
              <el-select v-model="form.category" style="width: 300px;" placeholder="请选择">
                <el-option
                  v-for="item in categories"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-show="isShowTag" label="是否脱落标签" label-width="120px">
              <el-switch
                v-model="form.isFellOff"
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="width: 300px;"
              />
            </el-form-item>
            <div>
              <el-form-item label="送药地址" prop="age">
                <el-input v-model="form.address" placeholder="输入收药地址" style="width: 300px;" clearable />
              </el-form-item>
              <el-form-item label="14 天倒计时" prop="">
                <el-input v-model="form.fourteen_days_countdown" placeholder="输入倒计时" style="width: 120px;" :disabled="isDoctor">
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <div>
                <el-form-item label="当日持有药物" />
              </div>
              <el-form-item label="开素达" prop="">
                <el-input v-model="form.ksd" placeholder="数量" style="width: 120px;" @change="onChangeKSD">
                  <template slot="append">片</template>
                </el-input>
              </el-form-item>
              <el-form-item label="纳催离" prop="">
                <el-input v-model="form.ncl" placeholder="数量" style="width: 120px;" @change="onChangeNCL">
                  <template slot="append">片</template>
                </el-input>
              </el-form-item>
              <el-form-item label="螺内酯" prop="">
                <el-input v-model="form.lnz" placeholder="数量" style="width: 120px;" @change="onChangeLNZ">
                  <template slot="append">片</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="备注">
                <el-input v-model="form.remark" :autosize="{ minRows: 6}" style="width: 700px;" type="textarea" />
              </el-form-item>
            </div>
          </el-card>
        </el-form>
      </div>
      <div class="button-box" style="text-align: right; margin-right: 20px; margin-top: 20px;">
        <el-button type="primary" size="medium" @click="onAdd">编辑</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'
import PageHeader from '@/components/PageHeader'
import { mapGetters } from 'vuex'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        device: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        doctor: [
          { required: true, message: '请选择医生', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请选择组别', trigger: 'change' }
        ]
      },
      form: {
        name: '',
        mobile: '',
        age: '',
        device: '',
        gender: '',
        doctor: '',
        plan: '',
        screening: '',
        isFellOff: false,
        address: '',
        ksd: '',
        ncl: '',
        lnz: '',
        remark: '',
        category: '',
        fourteen_days_countdown: 0,
      },
      // mock data
      genders: [
        { label: '未知', value: '0' },
        { label: '男', value: '1' },
        { label: '女', value: '2' }
      ],
      doctors: [],
      isInQuerying: false,
      devices: [],
      plans: [],
      categories: [
        { label: '未入组', value: '0' },
        { label: '干预组', value: '1' },
        { label: '对照组', value: '2' },
        { label: '终止', value: '3' }
      ],
      isShowTag: false,
    }
  },
  computed: {
    ...mapGetters([
      'hospital'
    ]),
    isDoctor() {
      return this.$store.getters.roles.includes('DOCTOR')
    },
  },
  watch: {
    'form.category'(value) {
      if (value !== this.categories[0].value) {
        this.isShowTag = true
      } else {
        this.isShowTag = false
      }
    },
    hospital(value) {
      if (value) {
        this.getAllDoctor()
        this.getAllPlan()
      }
    }
  },
  async created() {
    this.getAllDoctor()
    this.getAllPlan()
    this.getPatientById(this.$route.query.id)
  },
  methods: {
    async getPatientById(id) {
      let result
      try {
        result = await request.get(`/pc/admin/v1/patient/${id}/?hospital_id=${this.hospital.id}`)
      } catch (error) {
        return this.$message.error(error)
      }

      const patient = result.data.data
      this.form = {
        name: patient.realname,
        mobile: patient.mobile,
        age: patient.age,
        device: patient.device.id,
        gender: patient.sex,
        doctor: patient.doctor.name,
        plan: patient.cure_plan_id,
        screening: patient.cp_screening_id,
        isFall0ff: patient.is_fall_off,
        address: patient.address,
        ksd: patient.drug_ksd,
        ncl: patient.drug_ncl,
        lnz: patient.drug_lnz,
        remark: patient.remark,
        category: patient.category,
        fourteen_days_countdown: patient.fourteen_days_countdown
      }
      this.getDeviceById(patient.device.id)
    },
    async getDeviceById(id) {
      let result
      try {
        result = await request.get(`/pc/admin/v1/device/${id}/?hospital_id=${this.hospital.id}`)
      } catch (error) {
        return this.$message.error(error)
      }
      this.devices = [result.data.data]
    },
    async getAllDoctor() {
      let result
      try {
        result = await request.get(`/pc/admin/v1/hospitalDoctor/?hospital_id=${this.hospital.id}`)
      } catch (error) {
        return this.$message.error(error)
      }
      this.doctors = result.data.data
    },
    async getAllPlan() {
      let result
      try {
        result = await request.get(`/pc/admin/v1/curePlan/?hospital_id=${this.hospital.id}`)
      } catch (error) {
        return this.$message.error(error)
      }
      this.plans = result.data.data.data
    },
    async onFilterDevice(value) {
      if (value) {
        this.isInQuerying = true
        let result
        try {
          result = await request.get(`/pc/admin/v1/device/?hospital_id=${this.hospital.id}&page=1&pagesize=50&search=${value}`)
        } catch (error) {
          this.isInQuerying = false
          return this.$message.error(error)
        }
        this.devices = result.data.data.data.filter((item) => item.bind_info && !item.bind_info.is_bind)
        this.isInQuerying = false
      }
    },
    async onAdd() {
      try {
        await this.$refs['FORM'].validate()
      } catch (error) {
        return this.$message({
          type: 'error',
          message: '内容不能为空'
        })
      }
      const {
        name,
        mobile,
        age,
        device,
        gender,
        category,
        doctor,
        plan,
        screening,
        isFellOff,
        address,
        ksd,
        ncl,
        lnz,
        remark,
        fourteen_days_countdown
      } = this.form

      const data = {
        realname: name,
        mobile,
        sex: parseInt(gender),
        age: parseInt(age),
        doctor_id: parseInt(doctor),
        cure_plan_id: parseInt(plan),
        cp_screening_id: parseInt(screening),
        is_fall_off: isFellOff,
        device_id: parseInt(device),
        category: parseInt(category),
        address,
        drug_ksd: parseFloat(ksd),
        drug_ncl: parseFloat(ncl),
        drug_lnz: parseFloat(lnz),
        remark,
        fourteen_days_countdown
      }
      try {
        await request.put(`/pc/admin/v1/patient/${this.$route.query.id}/?hospital_id=${this.hospital.id}`, data)
      } catch (error) {
        return this.$message.error(error)
      }
      this.$notify.success('编辑成功')
      this.$router.back()
    },
    onChangeKSD(value) {
      const isInvalid = Number.isNaN(parseFloat(value))
      if (isInvalid) return this.$message.error('请输入数量')
      this.form.ksd = parseFloat(value)
    },
    onChangeNCL(value) {
      const isInvalid = Number.isNaN(parseFloat(value))
      if (isInvalid) return this.$message.error('请输入数量')
      this.form.ncl = parseFloat(value)
    },
    onChangeLNZ(value) {
      const isInvalid = Number.isNaN(parseFloat(value))
      if (isInvalid) {
        return this.$message.error('请输入数量')
      }
      this.form.lnz = parseFloat(value)
    }
  }
}
</script>
