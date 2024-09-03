<template>
  <section>
    <page-header content="康复数据详情" />
    <el-card style="margin: 15px 25px;">
      <el-row :gutter="20" style="margin-top: 25px; margin-bottom: 25px;">
        <el-col v-if="patient.realname" :span="5" :offset="1">
          <el-input :value="patient.realname" />
        </el-col>
        <el-col v-if="patient.sex" :span="5">
          <el-input :value="patient.sex | gender" />
        </el-col>
        <el-col v-if="patient.age" :span="5">
          <el-input :value="patient.age" />
        </el-col>
        <el-col v-if="patient.mobile" :span="5">
          <el-input :value="patient.mobile" />
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="plan.current_cp" style="margin: 15px 25px;">
      <div slot="header" class="clearfix">
        <strong>当前计划</strong>
        <el-button style="float: right; padding: 3px 0" type="text" @click="onShowReferenceDialog">查看参考</el-button>
      </div>
      <el-row>
        <el-col :span="8">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <h3 style="margin:0;">当前阶段 {{ plan.day_duration }} 天内平均血压</h3>
              <el-alert type="info" :title="toCurrentRange(plan.day_duration)" :closable="false" style="margin-top: 10px;" />
            </div>
            <div style="display: flex; justify-content: center;">
              <div style="margin-right: 15px; text-align: center;">
                <p style="font-size: 14px;">上午(DBP/SBP)</p>
                <el-tag effect="dark" style="padding: 0 20px;">{{ plan.current_cp.diastolic_am_avg ? plan.current_cp.diastolic_am_avg : '暂无' }}/{{ plan.current_cp.systolic_am_avg ? plan.current_cp.systolic_am_avg : '暂无' }}</el-tag>
              </div>
              <div style="margin-left: 15px; text-align: center;">
                <p style="font-size: 14px;">下午(DBP/SBP)</p>
                <el-tag effect="dark" style="padding: 0 20px;">{{ plan.current_cp.diastolic_pm_avg ? plan.current_cp.diastolic_pm_avg : '暂无' }}/{{ plan.current_cp.systolic_pm_avg ? plan.current_cp.systolic_pm_avg : '暂无' }}</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" style="text-align: center;">
          <el-progress :width="180" type="dashboard" :percentage="plan.day_duration | toProgress" :format="() => plan.current_cp.cure_plan" :color="toFormatColor(plan.current_cp.systolic_avg, plan.current_cp.diastolic_avg) " />
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <strong style="font-size: 18px;">目前服药方案</strong>
              <el-button style="float: right; padding: 3px 0" type="text" @click="onShowPlanDialog">更改服药计划</el-button>
            </div>
            <div style="text-align: center;">
              <el-tag type="success" effect="dark" style="padding: 0 20px;">{{ plan.current_cp.cure_plan }}</el-tag>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin: 15px 25px;">
      <div slot="header" class="clearfix">
        <strong>历史计划</strong>
      </div>
      <el-table
        :data="plan.curl_plans"
        style="width: 100%"
        fit
      >
        <el-table-column
          prop="start_time"
          label="日期"
        >
          <template slot-scope="scope">
            {{ scope.row.dt_start | formatime('YYYY-MM-DD') }}
            -
            {{ scope.row.dt_end == '至今' ? '至今' : $options.filters.formatime(scope.row.dt_end, 'YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="which_day"
          label="DBP/SBP"
        >
          <template slot-scope="scope">
            {{ scope.row.systolic_avg || '暂无' }}/{{ scope.row.diastolic_avg || '暂无' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="服药方案"
        >
          <template slot-scope="scope">
            {{ scope.row.cure_plan || '暂无' }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card v-loading="!blood.data" style="margin: 15px 25px;">
      <div slot="header" class="clearfix">
        <strong>血压折线图</strong>
        <router-link :to="`/user/patient/detail/${patient.id}/record`"><el-button style="float: right; padding: 3px 0" type="text">查看测量数据<i class="el-icon-arrow-right" /></el-button></router-link>
      </div>
      <el-alert v-if="warning.warning" title="请注意当前患者近一周有异常测量数据" type="error" />
      <div style="text-align: center; margin-top: 15px">
        <el-radio-group v-model="filter.bloodTimeSlot">
          <el-radio-button label="am">上午</el-radio-button>
          <el-radio-button label="pm">下午</el-radio-button>
        </el-radio-group>
      </div>
      <blood-pressure-line :list="blood.data" />
      <div style="text-align: center">
        <el-radio-group v-model="filter.blood" style="margin-top: 15px">
          <el-radio-button label="ONE_WEEK">近一周</el-radio-button>
          <el-radio-button label="ONE_MONTH">近一月</el-radio-button>
          <el-radio-button label="SINCE_BIND">绑定以来</el-radio-button>
        </el-radio-group>
      </div>
    </el-card>
    <el-card v-loading="!pressure.data" style="margin: 15px 25px;">
      <div slot="header" class="clearfix">
        <strong>血压散点图</strong>
        <router-link :to="`/user/patient/detail/${patient.id}/record`"><el-button style="float: right; padding: 3px 0" type="text">查看测量数据<i class="el-icon-arrow-right" /></el-button></router-link>
      </div>
      <el-alert v-if="warning.warning" title="请注意当前患者近一周有异常测量数据" type="error" />
      <div style="text-align: center; margin-top: 15px">
        <el-radio-group v-model="filter.pressureTimeSlot">
          <el-radio-button label="am">上午</el-radio-button>
          <el-radio-button label="pm">下午</el-radio-button>
        </el-radio-group>
      </div>
      <div style="text-align: center">
        <blood-pressure-point :list="pressure.data" />
        <el-radio-group v-model="filter.pressure" style="margin-top: 15px;">
          <el-radio-button label="ONE_WEEK">近一周</el-radio-button>
          <el-radio-button label="ONE_MONTH">近一月</el-radio-button>
          <el-radio-button label="SINCE_BIND">绑定以来</el-radio-button>
        </el-radio-group>
      </div>
    </el-card>
    <el-card v-loading="!pulse.data" style="margin: 15px 25px;">
      <div slot="header" class="clearfix">
        <strong>心率折线图</strong>
        <router-link :to="`/user/patient/detail/${patient.id}/record`"><el-button style="float: right; padding: 3px 0" type="text">查看测量数据<i class="el-icon-arrow-right" /></el-button></router-link>
      </div>
      <div style="text-align: center; margin-top: 15px">
        <el-radio-group v-model="filter.pulseTimeSlot">
          <el-radio-button label="am">上午</el-radio-button>
          <el-radio-button label="pm">下午</el-radio-button>
        </el-radio-group>
      </div>
      <div style="text-align: center">
        <pulse-line :list="pulse.data" />
        <el-radio-group v-model="filter.pulse" style="margin-top: 15px;">
          <el-radio-button label="ONE_WEEK">近一周</el-radio-button>
          <el-radio-button label="ONE_MONTH">近一月</el-radio-button>
          <el-radio-button label="SINCE_BIND">绑定以来</el-radio-button>
        </el-radio-group>
      </div>
    </el-card>

    <el-dialog title="测量数据" :visible.sync="isShowDataDialog" @close="onHideDataDialog">
      <chart-data :ths="table.ths" :trs="table.trs" />
    </el-dialog>

    <el-dialog title="服药计划参考" :visible.sync="isShowReferenceDialog" @close="onHideReferenceDialog">
      <plan-reference />
    </el-dialog>

    <el-dialog title="更改服药计划" :visible.sync="isShowPlanDialog" @close="onHidePlanDialog">
      <plan-reference />
      <el-form :model="form" style="margin-top: 15px;">
        <el-form-item label="服药方案" prop="plan">
          <el-select v-model="form.plan" style="width: 300px;" placeholder="请选择">
            <el-option
              v-for="item in plans"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onChangePlan">提交更改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import moment from 'moment'
import request from '@/utils/request'
import PageHeader from '@/components/PageHeader'
import BloodPressureLine from './components/blood-pressure-line'
import BloodPressurePoint from './components/blood-pressure-point'
import PulseLine from './components/pulse-line'
import ChartData from './components/chart-data'
import PlanReference from './components/plan-reference'
import { mapGetters } from 'vuex'

export default {
  name: 'PatientDataDetail',
  filters: {
    toProgress(value) {
      if (value >= 14) {
        return 100
      } else {
        return value / 14 * 100
      }
    },
  },
  components: {
    PageHeader,
    BloodPressureLine,
    BloodPressurePoint,
    PulseLine,
    ChartData,
    PlanReference
  },
  data() {
    return {
      patient: {},
      plans: [],
      plan: {},
      visible: false,
      questionnaire: {},
      blood: {},
      warning: {
        warning: false
      },
      pressure: {},
      pulse: {},
      filter: {
        blood: 'ONE_WEEK',
        pressure: 'ONE_WEEK',
        pulse: 'ONE_WEEK',
        bloodTimeSlot: 'am',
        pressureTimeSlot: 'am',
        pulseTimeSlot: 'am'
      },
      // 数据展示
      isShowDataDialog: false,
      table: {
        ths: [],
        trs: []
      },
      isShowReferenceDialog: false,
      isShowPlanDialog: false,
      form: {
        plan: ''
      },
    }
  },
  computed: {
    ...mapGetters([
      'hospital'
    ])
  },
  watch: {
    'filter.blood'(newer, older) {
      if (newer === older) return

      this.getBloodPressData(this.filter.bloodTimeSlot)
    },
    'filter.pressure'(newer, older) {
      if (newer === older) return

      this.getBloodPressPointData(this.filter.pressureTimeSlot)
    },
    'filter.pulse'(newer, older) {
      if (newer === older) return

      this.getHeartRateData(this.filter.pulseTimeSlot)
    },
    'filter.bloodTimeSlot'(newer, older) {
      if (newer === older) return

      this.getBloodPressData(this.filter.bloodTimeSlot)
    },
    'filter.pressureTimeSlot'(newer, older) {
      if (newer === older) return

      this.getBloodPressPointData(this.filter.pressureTimeSlot)
    },
    'filter.pulseTimeSlot'(newer, older) {
      if (newer === older) return

      this.getHeartRateData(this.filter.pulseTimeSlot)
    }
  },
  async created() {
    this.getPatient()
    this.getPlan()
    this.getBloodPressData()
    this.getBloodPressPointData()
    this.getHeartRateData()
    this.getAllPlan()
    this.getBloodWaring()
  },
  methods: {
    toFormatColor(sbp, dbp) {
      if (sbp >= 180 || dbp >= 100) {
        return '#AE0000' // red
      } else if ((sbp >= 130 && sbp < 180) || (dbp < 100 && dbp >= 85)) {
        return '#FFD306' // yellow
      } else if (sbp >= 100 && sbp < 135 && dbp < 85) {
        return '#00BB00' // gree
      } else {
        return '#0072E3' // blue
      }
    },
    async getPatient() {
      let result
      try {
        result = await request.get(`/pc/admin/v1/patient/${this.$route.params.id}/shortInfo/?hospital_id=${this.hospital.id}`)
      } catch (error) {
        return console.log(error)
      }
      this.patient = result.data.data
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
    async getPlan() {
      let result
      try {
        result = await request.get(`/pc/admin/v1/patient/curlPlanHistory/?hospital_id=${this.hospital.id}&patient_id=${this.$route.params.id}`)
      } catch (error) {
        console.log('getPlan -> error', error)
        return this.$message.error('获取计划详情出错')
      }
      this.plan = result.data.data
    },
    async getBloodWaring() {
      let result
      try {
        result = await request.get(`/app/web/v1/userChartData/data_warning/?hospital_id=${this.hospital.id}&patient_id=${this.$route.params.id}`)
      } catch (error) {
        return this.$message.error(error)
      }
      this.warning = result.data.data
    },
    async getBloodPressData() {
      const params = {
        patient_id: this.$route.params.id,
        hospital_id: this.hospital.id
      }
      if (this.filter.blood || this.filter.bloodTimeSlot) {
        params.period = this.filter.blood
        params.time_slot = this.filter.bloodTimeSlot
      }
      let result
      try {
        result = await request.get(`/app/web/v1/userChartData/`, { params })
      } catch (error) {
        return console.log(error)
      }
      this.blood = result.data
      if (!result.data.data.length) {
        return this.$message.warning('暂无该时段血压数据')
      }
    },
    async getBloodPressPointData() {
      const params = {
        patient_id: this.$route.params.id,
        hospital_id: this.hospital.id
      }
      if (this.filter.pressure || this.filter.pressureTimeSlot) {
        params.period = this.filter.pressure
        params.time_slot = this.filter.pressureTimeSlot
      }
      let result
      try {
        result = await request.get(`/app/web/v1/userChartData/`, { params })
      } catch (error) {
        return console.log(error)
      }
      this.pressure = result.data
      if (!result.data.data.length) {
        return this.$message.warning('暂无该时段血压数据')
      }
    },
    async getHeartRateData() {
      const params = {
        patient_id: this.$route.params.id,
        hospital_id: this.hospital.id
      }
      if (this.filter.pulse || this.filter.pulseTimeSlot) {
        params.period = this.filter.pulse
        params.time_slot = this.filter.pulseTimeSlot
      }
      let result
      try {
        result = await request.get(`/app/web/v1/userChartData/`, { params })
      } catch (error) {
        return console.log(error)
      }
      this.pulse = result.data
      if (!result.data.data.length) {
        return this.$message.warning('暂无该时段心率数据')
      }
    },
    onFilterQuestionnaireStatus({ row }) {
      if (row.has_danger_answer) return 'custome-row-with-error'
      return ''
    },
    onShowDataDialog(type) {
      switch (type) {
        case 'BLOOD': {
          this.table = {
            ths: [{ value: 'detection_time', label: '日期' }, { value: 'systolic', label: '高压' }, { value: 'diastolic', label: '低压' }],
            trs: this.blood.data.map((item) => (
              {
                ...item,
                ...{ detection_time: moment(item.detection_time).format('YYYY-MM-DD HH:mm:ss') }
              }
            ))
          }
          break
        }
        case 'PRESSURE': {
          this.table = {
            ths: [{ value: 'detection_time', label: '日期' }, { value: 'systolic', label: '高压' }, { value: 'diastolic', label: '低压' }],
            trs: this.pressure.data.map((item) => (
              {
                ...item,
                ...{ detection_time: moment(item.detection_time).format('YYYY-MM-DD HH:mm:ss') }
              }
            ))
          }
          break
        }
        case 'PULSE': {
          this.table = {
            ths: [{ value: 'detection_time', label: '日期' }, { value: 'pulse', label: '心率' }],
            trs: this.pulse.data.map((item) => (
              {
                ...item,
                ...{ detection_time: moment(item.detection_time).format('YYYY-MM-DD HH:mm:ss') }
              }
            ))
          }
          break
        }
      }
      this.$nextTick(() => {
        this.isShowDataDialog = true
      })
    },
    onHideDataDialog() {
      this.table = {
        ths: [],
        trs: []
      }
    },
    onShowReferenceDialog(value) {
      this.isShowReferenceDialog = true
    },
    onHideReferenceDialog() {
      this.isShowReferenceDialog = false
    },
    onShowPlanDialog(value) {
      this.form.plan = this.plans.filter(item => item.name === this.plan.current_cp.cure_plan)[0].id
      this.isShowPlanDialog = true
    },
    onHidePlanDialog() {
      this.form = {
        plan: ''
      }
      this.isShowPlanDialog = false
    },
    async onChangePlan() {
      try {
        await request.put(`/pc/admin/v1/patient/${this.$route.params.id}/changeCPlan/?hospital_id=${this.hospital.id}`, {
          cure_plan_id: this.form.plan
        })
      } catch (error) {
        return this.$message.error(error)
      }

      this.$notify.success('操作成功')
      this.onHidePlanDialog()
      this.getPlan()
    },
    toCurrentRange(value) {
      return `${moment().subtract(value, 'd').format('YYYY-MM-DD')} - ${moment().format('YYYY-MM-DD')}`
    }
  }
}
</script>

<style>
.el-table .custome-row-with-error {
  background-color: #FCF0F0;
}
</style>>
