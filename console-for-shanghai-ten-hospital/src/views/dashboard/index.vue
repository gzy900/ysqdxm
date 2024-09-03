<template>
  <div class="dashboard-container">
    <panel-group :count="count" :average="average" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import PanelGroup from './components/PanelGroup'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
  },
  data() {
    return {
      count: {
        two_weeks: 0, // 两周
        three_month: 0, // 三个月
        six_month: 0, // 六个月
        change_plan: 0, // 更换方案
        data_warn: 0, // 数据异常
        not_measure: 0, // 测量不足
      },
      average: [],
    }
  },
  computed: {
    ...mapGetters(['hospital']),
    isAdmin() {
      return this.$store.getters.roles.includes('ADMIN')
    },
    isAssistant() {
      return this.$store.getters.roles.includes('ASSISTANT')
    },
  },
  watch: {
    hospital(value) {
      if (value) {
        this.getIndexAlert()
        this.getAverageComparedData()
        this.getNeedAddDrugPatient()
      }
    },
  },
  created() {
    if (!this.hospital.id) return
    this.getIndexAlert()
    this.getAverageComparedData()
    this.getNeedAddDrugPatient()
  },
  methods: {
    async getIndexAlert() {
      if (!this.hospital.name) {
        return this.$message.error('请先选择医院')
      }
      let result
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.2)',
      })
      try {
        result = await request.get(
          `/pc/admin/v1/patientFollow/?hospital_id=${this.hospital.id}&method=all`
        )
      } catch (error) {
        loading.close()
        return console.log(error)
      }
      const {
        two_weeks,
        three_month,
        six_month,
        change_plan,
        data_warn,
        not_measure,
      } = result.data.data
      this.count = {
        change_plan: change_plan,
        data_warn: data_warn,
        not_measure: not_measure,
        two_weeks: two_weeks,
        three_month: three_month,
        six_month: six_month,
      }
      loading.close()
    },
    async onHandleComplete(e, value) {
      e.target.parentNode.blur()

      if (confirm('你确定要提交该修改么吗？')) {
        try {
          await request.post(`/pc/admin/v1/patientFollow/`, {
            id: value,
          })
        } catch (error) {
          return this.$message.error(error)
        }
        this.$notify.success('操作成功')
        this.getIndexTask()
        console.log(value)
      } else {
        console.log(value)
      }
    },
    async getAverageComparedData() {
      let result
      try {
        result = await request.get(
          `/pc/admin/v1/patientDeviceData/EGCGBPAvg/?hospital_id=${this.hospital.id}`
        )
      } catch (error) {
        return console.error(error)
      }

      const { data } = result
      console.log(data.data)
      const { avg_CG_sbp, avg_CG_dbp, avg_EG_sbp, avg_EG_dbp } = data.data
      this.average = [
        { group: '对照组', systolic: avg_CG_sbp, diastolic: avg_CG_dbp },
        { group: '干预组', systolic: avg_EG_sbp, diastolic: avg_EG_dbp },
      ]
    },
    async getNeedAddDrugPatient() {
      let result
      try {
        result = await request.get(
          `/pc/admin/v1/shipping/count?hospital_id=${this.hospital.id}`
        )
      } catch (error) {
        return console.error(error)
      }
      const count = result.data.data
      this.count = {
        needer: count,
        ...this.count
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.compared-card {
  text-align: center;
}
.compared-table {
  width: 100%;
  display: inline-block;
}
</style>
