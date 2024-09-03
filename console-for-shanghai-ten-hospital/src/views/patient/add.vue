<template>
  <div class="container">
    <page-header content="添加患者" />
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-plus" style="padding-right: 10px" />
        <span>添加</span>
      </div>
      <div style="padding-top: 10px">
        <el-form
          ref="FORM"
          :model="form"
          :rules="rules"
          inline
          size="small"
          label-width="100px"
          label-position="right"
          @submit.native.prevent
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>患者信息</span>
            </div>
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model.trim="form.name"
                placeholder="输入患者姓名"
                style="width: 300px"
                clearable
              />
            </el-form-item>
            <el-form-item label="性别" prop="gender" label-width="120px">
              <el-select
                v-model="form.gender"
                style="width: 300px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input
                v-model="form.mobile"
                placeholder="输入手机号"
                style="width: 300px"
                clearable
              />
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model="form.age"
                placeholder="输入年龄"
                style="width: 300px"
                clearable
              />
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
                style="width: 300px"
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
              <el-select
                v-model="form.doctor"
                style="width: 300px"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in doctors"
                  :key="index"
                  :label="item.hospital_doctor"
                  :value="item.hospital_doctor"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="组别" prop="category">
              <el-select
                v-model="form.category"
                style="width: 300px"
                placeholder="请选择"
                @change="onCategoryChange"
              >
                <el-option
                  v-for="item in categories"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="isShowDrugPlan" label="服药方案">
              <el-select
                v-model="form.plan"
                style="width: 300px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in plans"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="筛选期服药方案"
              label-width="120px"
            >
              <el-select
                v-model="form.screening"
                style="width: 300px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in plans"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <div>
              <el-form-item label="送药地址" prop="age">
                <el-input v-model="form.address" placeholder="输入收药地址" style="width: 300px;" clearable />
              </el-form-item>
            </div>
            <div>
              <div>
                <el-form-item label="当日持有药物" />
              </div>
              <el-form-item label="开素达" prop="">
                <el-input v-model.number="form.ksd" placeholder="数量" style="width: 120px;" @change="onValideDrugInputer">
                  <template slot="append">片</template>
                </el-input>
              </el-form-item>
              <el-form-item label="纳催离" prop="">
                <el-input v-model.number="form.ncl" placeholder="数量" style="width: 120px;" @change="onValideDrugInputer">
                  <template slot="append">片</template>
                </el-input>
              </el-form-item>
              <el-form-item label="螺内酯" prop="">
                <el-input v-model.number="form.lnz" placeholder="数量" style="width: 120px;" @change="onValideDrugInputer">
                  <template slot="append">片</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="备注">
                <el-input
                  v-model="form.remark"
                  :autosize="{ minRows: 6 }"
                  style="width: 700px"
                  type="textarea"
                />
              </el-form-item>
            </div>
          </el-card>
        </el-form>
      </div>
      <div
        class="button-box"
        style="text-align: right; margin-right: 20px; margin-top: 20px"
      >
        <el-button type="primary" size="medium" @click="onAdd">添加</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'
import PageHeader from '@/components/PageHeader'

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      form: {
        name: '',
        mobile: '',
        age: '',
        device: '',
        gender: '',
        doctor: '',
        plan: '',
        screening: '',
        category: '',
        address: '',
        ksd: 0,
        ncl: 0,
        lnz: 0,
        remark: '',
      },
      rules: {
        name: [{ required: true, message: '请输入患者姓名', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        device: [
          { required: true, message: '请输入设备编号', trigger: 'blur' },
        ],
        doctor: [{ required: true, message: '请选择医生', trigger: 'change' }],
        category: [
          { required: true, message: '请选择组别', trigger: 'change' },
        ],
      },
      // mock data
      genders: [
        { label: '未知', value: '0' },
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
      doctors: [],
      isInQuerying: false,
      devices: [],
      plans: [],
      categories: [
        { label: '未入组', value: '0' },
        { label: '干预组', value: '1' },
        { label: '对照组', value: '2' },
      ],
      isShowTag: false,
      isShowDrugPlan: true,
    }
  },
  computed: {
    hospital() {
      return this.$store.getters.hospital
    },
  },
  watch: {
    hospital(value) {
      if (value) {
        this.getAllDoctor()
      }
    },
  },
  created() {
    this.getAllDoctor()
    this.getAllPlan()
  },
  methods: {
    async getAllDoctor() {
      let result
      try {
        result = await request.get(
          `/pc/admin/v1/hospitalDoctor/?hospital_id=${this.hospital.id}`
        )
      } catch (error) {
        return this.$message.error(error)
      }
      this.doctors = result.data.data
    },
    async getAllPlan() {
      let result
      try {
        result = await request.get(
          `/pc/admin/v1/curePlan/?hospital_id=${this.hospital.id}`
        )
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
          result = await request.get(
            `/pc/admin/v1/device/?hospital_id=${this.hospital.id}&page=1&pagesize=50&search=${value}`
          )
        } catch (error) {
          this.isInQuerying = false
          return this.$message.error(error)
        }
        this.devices = result.data.data.data.filter(
          (item) => item.bind_info && !item.bind_info.is_bind
        )
        this.isInQuerying = false
      }
    },
    onCategoryChange() {
      if (this.form.category === '2') {
        this.isShowDrugPlan = false
        return
      }
      this.isShowDrugPlan = true
    },
    async onAdd() {
      try {
        await this.$refs['FORM'].validate()
      } catch (error) {
        return this.$message({
          type: 'error',
          message: '内容不能为空',
        })
      }
      const {
        name,
        mobile,
        age,
        device,
        gender,
        doctor,
        plan,
        screening,
        category,
        address,
        ksd,
        ncl,
        lnz,
        remark,
      } = this.form

      const data = {
        realname: name,
        mobile,
        sex: parseInt(gender),
        age: parseInt(age),
        doctor_id: parseInt(doctor),
        cure_plan_id: parseInt(plan),
        cp_screening_id: parseInt(screening),
        category: parseInt(category),
        device_id: parseInt(device),
        address,
        drug_ksd: parseFloat(ksd),
        drug_ncl: parseFloat(ncl),
        drug_lnz: parseFloat(lnz),
        remark,
      }
      try {
        await request.post(
          `/pc/admin/v1/patient/?hospital_id=${this.hospital.id}`,
          data
        )
      } catch (error) {
        return this.$message.error(error)
      }
      this.$notify.success('添加成功')
      this.$router.back()
    },
    onValideDrugInputer(value) {
      if (Number.isNaN(parseFloat(value))) {
        return this.$message.error('请输入合法的数字')
      }
    }
  },
}
</script>
