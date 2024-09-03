<template>
  <section style="padding: 15px;">
    <el-form inline style="text-align: center;">
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-input :value="patient.realname" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-input :value="patient.sex | gender" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-input :value="patient.age" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-card shadow="never">
      <div slot="header">
        <el-row>
          <el-col :span="12" style="line-height: 40px;">
            <span>本月测量{{ count }}次</span>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-date-picker
              v-model="month"
              type="month"
              placeholder="选择月"
              value-format="yyyy-MM"
              @change="onChangeDatePicker"
            />
            <el-button type="success" style="margin-left: 10px;" @click="onExportRecord">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <div v-if="bloodpresses.length > 0">
        <el-table
          v-for="(item, index) in bloodpresses"
          :key="index"
          :data="item"
          style="width: 100%; margin-top: 15px;"
          fit
        >
          <el-table-column :label="item[0].label" align="center">
            <el-table-column
              align="center"
              label="上午"
            >
              <template slot-scope="scope">
                <div v-for="(am, j) in scope.row.am" :key="j" style="min-height:50px; border-bottom: 0.3em solid	#EBEEF5">
                  <el-row>
                    <el-col :span="12" style="text-align: center">{{ am.count !== undefined ? `第${am.count}次` : '' }}</el-col>
                    <el-col :span="12" style="text-align: center">{{ am.systolic !== undefined ? `${am.systolic}/${am.diastolic}` : '' }}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" style="text-align: center">{{ am.time }}</el-col>
                    <el-col :span="12" style="text-align: center">{{ am.pulse }}</el-col>
                  </el-row>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="下午"
            >
              <template slot-scope="scope">
                <div v-for="(pm, k) in scope.row.pm" :key="k" style="min-height:50px; border-bottom: 0.3em solid	#EBEEF5">
                  <el-row>
                    <el-col :span="12" style="text-align: center">{{ pm.count !== undefined ? `第${pm.count}次` : '' }}</el-col>
                    <el-col :span="12" style="text-align: center">{{ pm.systolic !== undefined ? `${pm.systolic}/${pm.diastolic}` : '' }}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" style="text-align: center">{{ pm.time }}</el-col>
                    <el-col :span="12" style="text-align: center">{{ pm.pulse }}</el-col>
                  </el-row>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <p v-if="item[0].raw_am && item[0].raw_pm && item[0].raw_am.length > 3 || item[0].raw_pm.length > 3" slot="append" style="text-align: center;">
            <el-button type="text" @click="onExpand(item, index)">{{ item[0].isExpanded ? '收起' : '查看更多...' }}</el-button>
          </p>
        </el-table>
      </div>
      <div v-else style="text-align: center">暂无数据</div>
    </el-card>
  </section>
</template>

<script>
import moment from 'moment'
import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      patient: {},
      month: moment().format('YYYY-MM'),
      count: 0,
      records: [],
      bloodpresses: [],
    }
  },
  computed: {
    ...mapGetters([
      'hospital'
    ])
  },
  created() {
    this.getPatient()
    this.getBloodPress()
  },
  methods: {
    async getPatient() {
      let result
      try {
        result = await request.get(`/pc/admin/v1/patient/${this.$route.params.id}/shortInfo/?hospital_id=${this.hospital.id}`)
      } catch (error) {
        return console.log(error)
      }
      this.patient = result.data.data
    },
    onChangeDatePicker() {
      this.$nextTick(() => {
        this.getBloodPress()
      })
    },
    async onExportRecord() {
      try {
        await this.$confirm('此操作将导出所选内容的数据, 是否继续?', '提示', {
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

      if (!this.count) {
        return this.$message.error('所选月份暂无数据可导出')
      }

      const options = {
        url: '/web/export/',
        method: 'GET',
        params: {
          hospital_id: this.hospital.id,
          patient_id: this.patient.id,
          month: this.month
        },
        responseType: 'blob'
      }

      let result
      try {
        result = await request(options)
      } catch (error) {
        const text = await (new Response(error)).text()
        return this.$message({
          type: 'error',
          message: JSON.parse(text).error
        })
      }

      const blob = new Blob([result.data], {
        type: 'application/vnd.ms-excel'
      })
      const objectURL = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectURL
      a.download = `${this.patient.realname}_${this.month}_测量数据.xls`
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
      window.URL.revokeObjectURL(blob)

      this.$notify.success('数据导出成功')
    },
    onExpand(list, index) {
      if (list[0].isExpanded) {
        this.bloodpresses[index][0].isExpanded = false
        this.bloodpresses[index][0].am = this.bloodpresses[index][0].am.slice(0, 3)
        this.bloodpresses[index][0].pm = this.bloodpresses[index][0].pm.slice(0, 3)
        return
      }
      this.bloodpresses[index][0].isExpanded = true
      this.bloodpresses[index][0].am = this.bloodpresses[index][0].raw_am
      this.bloodpresses[index][0].pm = this.bloodpresses[index][0].raw_pm
    },
    async getBloodPress(month) {
      const params = {
        hospital_id: this.hospital.id,
        month: this.month,
        patient_id: this.$route.params.id
      }
      let result
      try {
        result = await request.get(`/app/web/v1/userTableData/`, { params })
      } catch (error) {
        return console.log(error)
      }
      const { count, data } = result.data.data
      this.count = count
      this.bloodpresses = data
      this.bloodpresses.forEach(item => {
        item[0].am = item[0].am.slice(0, 3)
        item[0].pm = item[0].pm.slice(0, 3)
      })
    },
  }
}

</script>
