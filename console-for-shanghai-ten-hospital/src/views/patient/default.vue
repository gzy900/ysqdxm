<template>
  <div class="container">
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-search" style="padding-right: 10px" />
        <span>患者查询</span>
      </div>
      <div style="padding-top: 10px">
        <el-form ref="SEARCH" :model="search" :inline="true" size="small" label-width="100px" label-position="right" @submit.native.prevent>
          <el-form-item label="患者姓名">
            <el-input v-model.trim="search.name" placeholder="输入姓名查询" style="width: 150px" clearable />
          </el-form-item>
          <el-form-item label="患者性别">
            <el-select v-model="search.gender" style="width: 150px;" placeholder="请选择">
              <el-option
                v-for="item in genders"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="患者年龄">
            <el-input v-model="search.age.min" type="number" placeholder="最低年龄" style="width: 142px;" clearable />
            -
            <el-input v-model="search.age.max" type="number" placeholder="最高年龄" style="width: 142px;" clearable />
          </el-form-item>
          <el-form-item label="患者电话">
            <el-input v-model.trim="search.mobile" placeholder="输入电话查询" style="width: 150px" clearable />
          </el-form-item>
          <div style=" margin-top: -25px; margin-bottom: -15px;">
            <el-divider />
          </div>

          <el-form-item label="" style=" margin-left: 40px;">
            <el-checkbox v-model="search.isNeedToChangePlan" @change="oneSearchIsNeedToChangePlanChange">需要更换服药方案的患者</el-checkbox>
          </el-form-item>
          <el-form-item label="服药方案" style="margin-left: 20px;">
            <el-checkbox-group v-model="search.plan" style="width: 300px; margin-left: 20px;" @change="onSearchDrugPlanChange">
              <el-checkbox label="T1" />
              <el-checkbox label="T2" />
              <el-checkbox label="T3" />
              <el-checkbox label="T4" />
            </el-checkbox-group>
          </el-form-item>
          <div style=" margin-top: -30px; margin-bottom: -5px;">
            <el-divider />
          </div>

          <div>
            <el-form-item label="时间段">
              <el-date-picker
                v-model="search.range"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                style="width: 300px;"
              />
            </el-form-item>
          </div>
          <el-form-item style=" margin-left: 40px;">
            <el-checkbox v-model="search.isBloodPressureOverflow">血压超限的患者</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="search.isDataAlert">血压异常的患者</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="search.isLessMeasure">测量不足的患者</el-checkbox>
          </el-form-item>
          <div style=" margin-top: -25px; margin-bottom: -5px;">
            <el-divider />
          </div>

          <el-form-item style=" margin-left: 40px;">
            <el-checkbox v-model="search.isInExperimentalGroup">已入干预组</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="search.isInControlGroup">已入对照组</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="search.isNotInGroup">未入组</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="search.isEnd">终止</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="search.isFellDown">含脱落</el-checkbox>
          </el-form-item>
        </el-form>
      </div>
      <div class="button-box">
        <el-button type="primary" size="medium" @click="onSearch">查询</el-button>
        <el-button type="primary" size="medium" @click="onResetSearchCondition">重置</el-button>
        <router-link to="/user/patient/add"><el-button type="primary" size="medium">添加</el-button></router-link>
      </div>
    </el-card>

    <div class="table-list">
      <el-card class="card-box" shadow="never">
        <div>
          <i class="el-icon-search" style="padding-right: 10px" />
          <span>患者列表</span>
        </div>
        <!--表格展示-->
        <el-table :data="patients" style="width: 100%" stripe fit>
          <el-table-column align="center" prop="hospital_num" label="编号" width="80" />
          <el-table-column align="center" prop="realname" label="姓名" width="70" />
          <el-table-column align="center" prop="sex" label="性别" width="50">
            <template slot-scope="scope">{{ scope.row.sex | gender }}</template>
          </el-table-column>
          <el-table-column align="center" prop="cp_screening.name" label="筛选期方案" width="70">
            <template slot-scope="scope">{{ scope.row.cp_screening ? scope.row.cp_screening.name : ' 无' }}</template>
          </el-table-column>
          <el-table-column align="center" prop="cp_first.name" label="起始期方案" width="70">
            <template slot-scope="scope">{{ scope.row.cp_first | toFilterCategoryDrugPlan(scope.row.category) }}</template>
          </el-table-column>
          <el-table-column align="center" prop="cure_plan.name" label="当前方案" width="50">
            <template slot-scope="scope">{{ scope.row.cure_plan | toFilterCategoryDrugPlan(scope.row.category) }}</template>
          </el-table-column>
          <el-table-column align="center" prop="is_change_cure_plan" label="是否更换方案" width="85">
            <template slot-scope="scope">{{ scope.row.is_change_cure_plan ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column align="center" prop="category" label="试验状态" width="60">
            <template slot-scope="scope">{{ scope.row.category | toFriendlyCategroy }}</template>
          </el-table-column>
          <el-table-column align="center" prop="is_fall_off" label="是否脱落" width="60">
            <template slot-scope="scope">{{ scope.row.is_fall_off ? '已脱落' : '无' }}</template>
          </el-table-column>
          <el-table-column align="center" prop="mobile" label="电话" width="110px" />
          <el-table-column align="center" prop="fourteen_days_countdown" label="两周随访倒计时(天)" width="85px" />
          <el-table-column align="center" prop="" label="健康数据" width="110px">
            <template slot-scope="scope">
              <router-link :to="`/user/patient/detail/${scope.row.id}`" tag="div"><el-button type="primary" size="mini">查看康复数据</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" label="备注" width="150">
            <template slot-scope="scope">
              <el-popover
                v-if="scope.row.remark"
                placement="top"
                width="160"
                trigger="hover"
              >
                <p>{{ scope.row.remark }}</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="onShowSetRemarkDialog(scope.row)">编辑</el-button>
                </div>
                <p slot="reference">{{ scope.row.remark && scope.row.remark.slice(0, 12) }}...</p>
              </el-popover>
              <el-button v-else size="mini" type="warning" :disabled="isDoctor" @click="onShowSetRemarkDialog(scope.row)">设置</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180px">
            <template slot-scope="scope">
              <router-link :to="`/user/patient/edit?id=${scope.row.id}`"><el-button size="mini">编辑</el-button></router-link>
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                title="确定删除该条数据吗？"
                @onConfirm="onDelete(scope.row.id)"
              >
                <el-button slot="reference" type="danger" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="sizes, total, prev, pager, next"
          style="text-align: center; margin-top: 20px"
          :total="total"
          :page-size="limit"
          :page-sizes="[5, 10, 20, 50]"
          @current-change="onCurrentPageChange"
          @size-change="onPageSizeChange"
        />
      </el-card>
    </div>

    <!-- Set remark -->
    <el-dialog title="设置备注" :visible.sync="isShowSetRemarkDialog">
      <el-form ref="REMARK" :model="remark" :rules="{ value: [{ required: true, message: '请输入备注信息', trigger: 'blur' }] }">
        <el-form-item label="备注信息" label-width="120" prop="value">
          <el-input v-model="remark.value" type="textarea" :autosize="{ minRows: 4, maxRows: 20}" placeholder="请输入备注信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowSetRemarkDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSetRemark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  components: {},
  filters: {
    toFriendlyCategroy(value) {
      switch (value) {
        case '0': return '未入组'
        case '1': return '干预组'
        case '2': return '对照组'
        case '3': return '终止'
      }
    },
    toFilterCategoryDrugPlan(value, category) {
      if (category === '2') {
        return '/'
      }
      if (value && value.name) {
        return value.name
      }
      return '无'
    }
  },
  data() {
    return {
      isLoadingDoctor: false,
      doctors: [],
      patients: [],
      isShowTip: false,
      types: [],
      genders: [
        { label: '未知', value: '0' },
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
      search: {
        doctors: '',
        name: '',
        gender: '',
        age: {
          min: '',
          max: ''
        },
        mobile: '',
        isNeedToChangePlan: false,
        plan: [],
        range: [],
        isBloodPressureOverflow: false,
        isDataAlert: false,
        isLessMeasure: false,
        isInExperimentalGroup: true,
        isInControlGroup: false,
        isNotInGroup: false,
        isFellDown: false
      },
      total: 0,
      page: 1,
      limit: 50,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      isShowBindDeviceDialog: false,
      devices: [],
      deviceRules: {
        sn: [
          { required: true, message: '请填写要绑定的设备SN', trigger: 'blur' }
        ]
      },
      device: {
        sn: '',
        patient: ''
      },
      isShowReportDataDialog: false,
      illness_id: '',
      patient_id: '',
      isShowSetRemarkDialog: false,
      remark: {
        value: '',
        id: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'hospital'
    ]),
    isDoctor() {
      return this.$store.getters.roles.includes('DOCTOR')
    },
    isAdmin() {
      return this.$store.getters.roles.includes('ADMIN')
    }
  },
  watch: {
    hospital(value) {
      if (value) {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      const params = { page: this.page, pagesize: this.limit, hospital_id: this.hospital.id }
      if (Array.isArray(this.search.doctors) && this.search.doctors.length > 0) {
        params.doctor_ids = JSON.stringify(this.search.doctors)
      }
      if (this.search.range.length) {
        const [start, end] = this.search.range
        params.start_date = start
        params.end_date = end
      }
      if (this.search.name) {
        params.s_realname = this.search.name
      }
      if (this.search.mobile) {
        params.s_mobile = this.search.mobile
      }
      if (this.search.gender) {
        params.sex = this.search.gender
      }
      if (this.search.age.min && this.search.age.max) {
        params.age_min = this.search.age.min
        params.age_max = this.search.age.max
      }
      if (this.search.isNeedToChangePlan) {
        params.is_change_cp = this.search.isNeedToChangePlan
      }
      if (this.search.isLessMeasure) {
        params.is_no_measure = this.search.isLessMeasure
      }
      if (this.search.isBloodPressureOverflow) {
        params.is_bp_danger = this.search.isBloodPressureOverflow
      }
      if (this.search.isDataAlert) {
        params.is_data_abn = this.search.isDataAlert
      }
      if (this.search.idInGroup) {
        params.in_group = this.search.isInExperimentalGroup
      }
      if (this.search.plan.length) {
        params.curl_plans = JSON.stringify(this.search.plan)
      }
      const categorys = []
      if (this.search.isInExperimentalGroup) {
        categorys.push('1')
      }
      if (this.search.isInControlGroup) {
        categorys.push('2')
      }
      if (this.search.isNotInGroup) {
        categorys.push('0')
      }
      if (this.search.isEnd) {
        categorys.push('3')
      }
      if (categorys.length > 0) {
        params.categorys = JSON.stringify(categorys)
      }
      if (this.search.isFellDown) {
        params.contain_fall_off = true
      }
      let result
      try {
        result = await request.get('/pc/admin/v1/patient/', { params })
      } catch (error) {
        loading.close()
        return this.$message.error(error)
      }
      const { count, data } = result.data
      this.patients = data
      this.total = count
      loading.close()
    },
    oneSearchIsNeedToChangePlanChange() {
      if (this.search.isNeedToChangePlan) {
        this.search.isInExperimentalGroup = true
      }
    },
    onSearchDrugPlanChange() {
      if (this.search.plan.length > 0) {
        this.search.isInExperimentalGroup = true
      }
    },
    onSearch() {
      this.getList()
    },
    onResetSearchCondition() {
      this.search = {
        range: [],
        name: '',
        gender: '',
        mobile: '',
        age: {
          min: '',
          max: ''
        },
        plan: [],
        isBloodPressureOverflow: false,
        isLessMeasure: false,
        isNeedToChangePlan: false,
        isDataAlert: false,
        isInExperimentalGroup: true,
        isInControlGroup: false,
        isNotInGroup: false,
        isFellDown: false
      }
      this.$nextTick(() => {
        this.getList({ page: this.page, limit: this.limit })
      })
    },
    onShowHelpMessage() {
      return this.$message({
        type: 'error',
        message: '请先分配随访计划'
      })
    },
    onShowSetOPSDialog(id) {
      this.isShowSetOPSDialog = true
      this.ops = {
        date: '',
        patient: id
      }
    },
    onShowBindDeviceDialog(id) {
      this.isShowBindDeviceDialog = true
      this.device = {
        sn: '',
        patient: id
      }
    },
    onPageSizeChange(size) {
      console.log(size)
      this.limit = size
      this.getList({ limit: size, page: this.page })
    },
    onCurrentPageChange(page) {
      console.log(page)
      this.page = page
      this.getList({ page: page, limit: this.limit })
    },
    onViewIllnessReportData(illness) {
      this.illness_id = `${illness.id}`
      this.patient_id = `${illness.patient_id}`
      this.onToggleIllnessReportDataDialog()
    },
    onToggleIllnessReportDataDialog() {
      this.isShowReportDataDialog = !this.isShowReportDataDialog
    },
    onShowSetRemarkDialog(value) {
      this.isShowSetRemarkDialog = true
      this.remark = {
        value: value.remark || '',
        id: value.id
      }
    },
    async onDelete(value) {
      try {
        await request.delete(`/pc/admin/v1/patient/deleteItems/?hospital_id=${this.hospital.id}`, {
          data: {
            items: [value]
          }
        })
      } catch (error) {
        return this.$message.error(error)
      }

      this.$notify.success('操作成功')
      this.getList()
    },
    async onSetRemark() {
      if (!(this.remark && this.remark.value && this.remark.id)) {
        return this.$message.error('请输入备注信息')
      }

      try {
        await this.$confirm('此操作将保存备注信息到服务器, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (error) {
        return this.$message({
          type: 'info',
          message: '已取消'
        })
      }

      try {
        await request.put(`/pc/admin/v1/patient/${this.remark.id}/changeRemark/?hospital_id=${this.hospital.id}`, {
          remark: this.remark.value
        })
      } catch (error) {
        console.error(error)
        return this.$message.error(error)
      }

      this.$notify.success('保存成功')
      this.isShowSetRemarkDialog = false
      this.$nextTick(() => {
        this.getList()
      })
    },
    async onSearchRemoteDoctor(value) {
      this.isLoadingDoctor = true
      let result
      try {
        result = await request.get('/pc/admin/v1/doctor/', {
          params: {
            hospital_id: this.hospital.id,
            pagesize: 100,
            search: value
          }
        })
      } catch (error) {
        this.isLoadingDoctor = false
        return this.$message.error(error)
      }
      this.isLoadingDoctor = false
      this.doctors = result.data.data.data
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
  .container {
    margin: 10px 30px 10px 30px;
  }
  .card-header {
    padding: 5px 5px;
  }
  .button-box {
    margin: 5px 50px 20px 0;
    float: right;

  }
  .table-list {
    margin-top: 30px;
    width: 100%;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
