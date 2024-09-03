<template>
  <div>
    <el-dialog append-to-body title="康复数据" :visible="show" @close="onCloseDialog">
      <el-form :model="form" inline>
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="form.interval"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchReportDataByInterval">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list">
        <el-table-column property="date" label="日期" width="100" />
        <el-table-column property="height" label="身高" />
        <el-table-column property="report" label="报告详情" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.report" size="mini" type="primary" @click="onShowReportViewer(scope.row)">查看报告</el-button>
            <p v-else>未提交</p>
          </template>
        </el-table-column>
        <el-table-column property="waistline" label="腰围" />
        <el-table-column property="weight" label="体重" />
        <el-table-column property="systolic" label="高压" />
        <el-table-column property="diastolic" label="低压" />
        <el-table-column property="before_food" label="饭前血糖" />
        <el-table-column property="after_food" label=" 饭后血糖" />
      </el-table>
    </el-dialog>
    <!-- 查看检查报告 -->
    <el-dialog
      title="检查报告"
      :visible.sync="isShowReportViewer"
      width="800px"
      :before-close="onCloseReportViewer"
    >
      <div>
        <el-card
          v-for="(report, index) in reports"
          :key="index"
          style="width: 30%; display: inline-block; margin: 10px; text-align: center;"
          :body-style="{ padding: '15px' }"
        >
          <el-image
            style="width: 100px; height: 100px; margin-right: 15px;"
            :src="report.url_upyun_thn"
            :preview-src-list="[report.url_upyun_down]"
          />
          <div style="padding: 14px;">
            <span>{{ report.type_report }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ report.detection_time | formatime }}</time>
            </div>
          </div>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowReportViewer = false">取 消</el-button>
        <el-button type="primary" @click="isShowReportViewer = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getIllnessReportDataById, getIllnessPatientReportByIdAndDate } from '../../../api/illness'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    illnessId: {
      type: String,
      default: ''
    },
    patientId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      form: {
        interval: ''
      },
      // 是否显示查看检查报告
      isShowReportViewer: false,
      reports: []
    }
  },
  watch: {
    show(isShow) {
      if (isShow) {
        this.onSearchReportDataByInterval()
      }
    }
  },
  methods: {
    /**
     * 关闭 Dialog
     */
    onCloseDialog() {
      this.list = []
      this.$emit('close')
    },
    // 选择日期跨度搜索检查数据
    async onSearchReportDataByInterval() {
      const loading = this.$loading({
        body: true,
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const [start_date = '', end_date = ''] = Array.isArray(this.form.interval) ? this.form.interval : []
      let result
      try {
        result = await getIllnessReportDataById(this.illnessId, {
          start_date,
          end_date
        })
      } catch (error) {
        loading.close()
        return console.error(error)
      }
      this.list = result.data.data.map((item) => {
        const { date, height, report, waistline, weight, systolic, diastolic, before_food, after_food } = item
        const format = (_) => _.join(', ') || '未测量'
        return {
          date,
          height: height.length > 0 ? format(height) : '未测量',
          report,
          waistline: waistline.length > 0 ? format(waistline) : '未测量',
          weight: weight.length > 0 ? format(weight) : '未测量',
          systolic: systolic.length > 0 ? format(systolic) : '未测量',
          diastolic: diastolic.length > 0 ? format(diastolic) : '未测量',
          before_food: before_food.length > 0 ? format(before_food) : '未测量',
          after_food: after_food.length > 0 ? format(after_food) : '未测量'
        }
      })

      loading.close()
    },
    async onGetPatientReportByIdAndDate(patient_id, date) {
      const loading = this.$loading({
        body: true,
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let result
      try {
        result = await getIllnessPatientReportByIdAndDate({
          patient_id,
          date
        })
      } catch (error) {
        loading.close()
        return console.error(error)
      }
      console.log(result)
      this.reports = result.data.data

      loading.close()
    },
    async onShowReportViewer(row) {
      await this.onGetPatientReportByIdAndDate(this.patientId, row.date)
      this.isShowReportViewer = true
    },
    onCloseReportViewer() {
      this.isShowReportViewer = false
      this.report = []
    }
  }
}
</script>

<style>

</style>
