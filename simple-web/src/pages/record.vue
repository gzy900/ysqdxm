<!-- record.vue Created by xh on 2018-3-27  -->
<template>
  <div v-if="homeData" class="record-page">
    <div>
      <v-home />
    </div>
    <div id="minirefresh" class="minirefresh-wrap">
      <div class="minirefresh-scroll">
        <div class="drop-box">
          <div class="badge-item" @click="dropFn('trend')">
            <div class="badge-cell_bd">健康趋势</div>
            <div class="badge-cell_ft"><i class="tip-icon" :class="trendActive ? 'down' : 'up'" /></div>
          </div>
          <div v-show="trendActive" class="drop-body">
            <div class="panel">
              <div class="panel-header">
                <em><i />血压趋势图</em>
                <!-- <span @click="goMore('blood-pressure-trend')">更多</span> -->
              </div>
              <div class="radio-group">
                <el-radio-group v-model="filter.pressureLineTimeSlot" size="small">
                  <el-radio-button label="am">上午</el-radio-button>
                  <el-radio-button label="pm">下午</el-radio-button>
                </el-radio-group>
              </div>
              <div class="graph-2">
                <chart ref="bloodPressure" :options="bloodPressureOptions" auto-resize />
              </div>
              <span />
              <div class="radio-group">
                <el-radio-group v-model="filter.pressureLine" size="small">
                  <el-radio-button label="ONE_WEEK">近一周</el-radio-button>
                  <el-radio-button label="ONE_MONTH">近一月</el-radio-button>
                  <el-radio-button label="SINCE_BIND">测量以来</el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="panel">
              <div class="panel-header">
                <em><i />血压散点图</em>
                <!-- <span @click="goMore('blood-pressure-point-trend')">更多</span> -->
              </div>
              <div class="radio-group">
                <el-radio-group v-model="filter.pressurePointTimeSlot" size="small">
                  <el-radio-button label="am">上午</el-radio-button>
                  <el-radio-button label="pm">下午</el-radio-button>
                </el-radio-group>
              </div>
              <div class="graph">
                <chart ref="pointBloodPressure" :options="pointBloodPressureOptions" auto-resize />
              </div>
              <span />
              <div class="radio-group">
                <el-radio-group v-model="filter.pressurePoint" size="small">
                  <el-radio-button label="ONE_WEEK">近一周</el-radio-button>
                  <el-radio-button label="ONE_MONTH">近一月</el-radio-button>
                  <el-radio-button label="SINCE_BIND">测量以来</el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="panel">
              <div class="panel-header">
                <em><i />心率趋势图</em>
                <!-- <span @click="goMore('pulse-trend')">更多</span> -->
              </div>
              <div class="radio-group">
                <el-radio-group v-model="filter.pulseLineTimeSlot" size="small">
                  <el-radio-button label="am">上午</el-radio-button>
                  <el-radio-button label="pm">下午</el-radio-button>
                </el-radio-group>
              </div>
              <div class="graph-2">
                <chart ref="pulse" :options="pulseOptions" auto-resize />
              </div>
              <span />
              <div class="radio-group">
                <el-radio-group v-model="filter.pulseLine" size="small">
                  <el-radio-button label="ONE_WEEK">近一周</el-radio-button>
                  <el-radio-button label="ONE_MONTH">近一月</el-radio-button>
                  <el-radio-button label="SINCE_BIND">测量以来</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>
        <div class="drop-box">
          <div class="badge-item" @click="dropFn('history')">
            <div class="badge-cell_bd">历史测量</div>
            <div class="badge-cell_ft"><i class="tip-icon" :class="historyActive ? 'down' : 'up'" /></div>
          </div>
          <div v-show="historyActive" class="drop-body">
            <div class="panel">
              <div class="panel-header calendar-filter">
                <div>本月共测量&nbsp;{{ totalCount }}&nbsp;次&nbsp;</div>
                <span id="calendar" :value="datetimeReformatter">{{ datetimeFormatter }}<i /></span>
              </div>
              <div v-if="bloodPressTableData.length > 0">
                <el-table
                  v-for="(item, index) in bloodPressTableData"
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
                        <div v-for="(amData, j) in scope.row.am" :key="j" style="min-height:50px; border-bottom: 0.3em solid	#EBEEF5">
                          <el-row>
                            <el-col :span="12" style="text-align: center">{{ amData.count !== undefined ? `第${amData.count}次` : '' }}</el-col>
                            <el-col :span="12" style="text-align: center">{{ amData.systolic !== undefined ? `${amData.systolic}/${amData.diastolic}` : '' }}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12" style="text-align: center">{{ amData.time }}</el-col>
                            <el-col :span="12" style="text-align: center">{{ amData.pulse }}</el-col>
                          </el-row>
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column
                      align="center"
                      label="下午"
                    >
                      <template slot-scope="scope">
                        <div v-for="(pmData, k) in scope.row.pm" :key="k" style="min-height:50px; border-bottom: 0.3em solid	#EBEEF5">
                          <el-row>
                            <el-col :span="12" style="text-align: center">{{ pmData.count !== undefined ? `第${pmData.count}次` : '' }}</el-col>
                            <el-col :span="12" style="text-align: center">{{ pmData.systolic !== undefined ? `${pmData.systolic}/${pmData.diastolic}` : '' }}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12" style="text-align: center">{{ pmData.time }}</el-col>
                            <el-col :span="12" style="text-align: center">{{ pmData.pulse }}</el-col>
                          </el-row>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <p v-if="item[0].raw_am.length > 3 || item[0].raw_pm.length > 3" slot="append" style="text-align: center;"><el-button type="text" @click="onExpand(item, index)">{{ item[0].isExpanded ? '收起' : '查看更多...' }}</el-button>
                  </p>
                </el-table>
              </div>
              <div v-else style="text-align: center">暂无数据</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/scatter'
import moment from 'moment'

// import spectrum from '../assets/js/spectrum'
import bloodPressureOptions from '../assets/js/bloodPressure'
import pulseOptions from '../assets/js/pulse'
import pointBloodPressureOptions from '../assets/js/pointBloodPressure'

import datePicker from '../assets/js/vue-ios-datepicker/index'
import home from '../pages/home'

export default {
  components: {
    chart: Echarts,
    'v-home': home
  },
  data() {
    return {
      homeData: {},
      bloodPressLineData: [],
      bloodressPointData: [],
      bloodPuluseData: [],
      bloodPressTableData: [],
      totalCount: 0,
      trendActive: false,
      historyActive: false,
      seconds: -1,
      currentMonth: '',
      minirefresh: null,
      listData: [],
      // spectrum, // 柱状图
      bloodPressureOptions, // 折线图
      pulseOptions, // 折线图
      pointBloodPressureOptions, // 散点图
      filter: {
        pressureLine: 'ONE_WEEK',
        pressurePoint: 'ONE_WEEK',
        pulseLine: 'ONE_WEEK',
        pressureLineTimeSlot: 'am',
        pressurePointTimeSlot: 'am',
        pulseLineTimeSlot: 'am'
      }
    }
  },
  computed: {
    // 日期拼接
    datetimeFormatter() {
      var temp = this.currentMonth.match(/\d+/g) || []
      temp.map((v, k, arr) => {
        if (!v.includes('0') && v < 10) arr[k] = `0${v}`
      })
      return temp.join('-').replace(/\-/, '年') + '月'
    },
    // 格式化月份，前面补0
    datetimeReformatter() {
      var temp = this.currentMonth.match(/\d+/g) || []
      temp.map((v, k, arr) => {
        if (!v.includes('0') && v < 10) arr[k] = `0${v}`
      })
      return temp.join('-')
    },
    token() {
      return this.$store.state.token
    },
    patient() {
      return this.$store.state.patientInfo.patient_id
    },
    hospital() {
      return this.$store.state.patientInfo.hospital_id
    }
  },
  watch: {
    'filter.pressureLine'(newer, older) {
      if (newer === older) return
      this.getBloodPressData(newer, 'pressureLine', this.filter.pressureLineTimeSlot)
    },
    'filter.pressurePoint'(newer, older) {
      if (newer === older) return
      this.getBloodPressData(newer, 'pressurePoint', this.filter.pressurePointTimeSlot)
    },
    'filter.pulseLine'(newer, older) {
      if (newer === older) return
      this.getBloodPressData(newer, 'pulseLine', this.filter.pulseLineTimeSlot)
    },
    'filter.pressureLineTimeSlot'(newer, older) {
      if (newer === older) return
      this.getBloodPressData(this.filter.pressureLine, 'pressureLine', newer)
    },
    'filter.pressurePointTimeSlot'(newer, older) {
      if (newer === older) return
      this.getBloodPressData(this.filter.pressurePoint, 'pressurePoint', newer)
    },
    'filter.pulseLineTimeSlot'(newer, older) {
      if (newer === older) return
      this.getBloodPressData(this.filter.pulseLine, 'pulseLine', newer)
    }
  },
  created() {
    var tempType = this.$route.params.type
    if (tempType === 'history') {
      this.trendActive = false
    }
    this.getBloodPressData('ONE_WEEK', null, 'am')
      .then(() => {
        // 初始化datePicker
        this.getMonthDate()
        // this.minirefreshFn()
      }).then(() => {
        this.getBloodPressTableData()
      })
  },
  mounted() {
    scrollTo(0, 0)
  },
  methods: {
    goMore(type) {
      if (type !== 'heart-trend') {
        this.$router.push(`/record/more/${type}`)
      } else {
        this.$router.push(`/record/heartMore`)
      }
    },
    getBloodPressTableData(month) {
      return this.$http.get('/app/web/v1/userTableData/',
        {
          params: { patient_id: this.patient, month: month, hospital_id: this.hospital },
          headers: { Authorization: `Token ${this.token}` }
        }
      ).then((res) => {
        const resultData = res.data.data
        const foramtData = resultData.data
        this.$set(this, 'totalCount', resultData.count)
        this.$set(this, 'currentMonth', resultData.current_month)

        foramtData.forEach(item => {
          item[0].am = item[0].am.slice(0, 3)
          item[0].pm = item[0].pm.slice(0, 3)
        })
        this.$set(this, 'bloodPressTableData', foramtData)
      })
        .catch((err) => {
          console.log(err)
        })
    },
    getBloodPressData(period, flag, timeSlot) {
      /*
      * period: 周期，ONE_WEEK, ONE_MONTH, SINCE_BIND
      * flag: 图名称，pressureLine，pressurePoint，pulseLine
      * timeSlot: 时间段 am pm
      */
      return this.$http.get('/app/web/v1/userChartData/',
        {
          params: { patient_id: this.patient, period: period, hospital_id: this.hospital, time_slot: timeSlot },
          headers: { Authorization: `Token ${this.token}` }
        }
      ).then((res) => {
        const resultData = res.data
        if (flag === 'pressureLine') {
          this.$set(this, 'bloodPressLineData', resultData.data)
          this.bloodPressureInit()
        } else if (flag === 'pressurePoint') {
          this.$set(this, 'bloodressPointData', resultData.data)
          this.pointBloodPressureInit()
        } else if (flag === 'pulseLine') {
          this.$set(this, 'bloodPuluseData', resultData.data)
          this.pulseInit()
        } else {
          this.$set(this, 'bloodPressLineData', resultData.data)
          this.bloodPressureInit()
          this.$set(this, 'bloodressPointData', resultData.data)
          this.pointBloodPressureInit()
          this.$set(this, 'bloodPuluseData', resultData.data)
          this.pulseInit()
        }
      })
        .catch((err) => {
          console.log(err)
        })
    },

    bloodPressureInit() {
      const bloodPressure = this.$refs.bloodPressure
      const dateTimeData = []
      const systolicData = []
      const diastolicData = []
      if (this.bloodPressLineData.length > 0) {
        this.bloodPressLineData.forEach(item => {
          dateTimeData.push(moment(item.dt).format('MM/DD'))
          systolicData.push(item.systolic)
          diastolicData.push(item.diastolic)
        })
        var lineAsync = {
          xAxis: {
            data: dateTimeData
          },
          series: [
            {
              name: '收缩压',
              data: systolicData
            },
            {
              name: '舒张压',
              data: diastolicData
            }
          ],
          title: {
            show: false
          }
        }
      } else {
        var lineAsync = {
          title: {
            show: true,
            extStyle: {
              color: "grey",
              fontSize: 20
            },
            text: "暂无数据",
            left: "center",
            top: "center"
          },
          xAxis: {
            data: dateTimeData
          },
          series: [
            {
              name: '收缩压',
              data: systolicData
            },
            {
              name: '舒张压',
              data: diastolicData
            }
          ]
        }
      }

      bloodPressure.mergeOptions(lineAsync)
    },
    pointBloodPressureInit() {
      const pointBloodPressure = this.$refs.pointBloodPressure
      var pointBloodPressureData = []
      if (this.bloodressPointData.length > 0) {
        pointBloodPressureData = this.bloodressPointData.map(item => [item.systolic, item.diastolic])
        var pointAsync = {
          series: [
            {
              symbolSize: 10,
              data: pointBloodPressureData,
              type: 'scatter'
            }
          ],
          title: {
            show: false
          }
        }
      } else {
        var pointAsync = {
          title: {
            show: true,
            extStyle: {
              color: "grey",
              fontSize: 20
            },
            text: "暂无数据",
            left: "center",
            top: "center"
          },
          series: [
            {
              symbolSize: 10,
              data: pointBloodPressureData,
              type: 'scatter'
            }
          ]
        }
      }
      pointBloodPressure.mergeOptions(pointAsync)
    },
    pulseInit() {
      const pulse = this.$refs.pulse
      const dateTimeData = []
      const pulseData = []
      if (this.bloodPuluseData.length > 0) {
        this.bloodPuluseData.forEach(item => {
          dateTimeData.push(moment(item.dt).format('MM/DD'))
          pulseData.push(item.pulse)
        })
        var lineAsync = {
          xAxis: {
            data: dateTimeData
          },
          yAxis: {},
          series: [
            {
              name: '心率',
              data: pulseData
            }
          ],
          title: {
            show: false
          }
        }
      } else {
        var lineAsync = {
          title: {
            show: true,
            extStyle: {
              color: "grey",
              fontSize: 20
            },
            text: "暂无数据",
            left: "center",
            top: "center"
          },
          xAxis: {
            data: dateTimeData
          },
          yAxis: {},
          series: [
            {
              name: '心率',
              data: pulseData
            }
          ]
        }
      }
      pulse.mergeOptions(lineAsync)
    },
    upCallback() {
      var self = this
      self.minirefresh.endUpLoading(true)
      // if (!self.listData || self.listData.length < 1) {
      //   self.minirefresh.endUpLoading(true)
      // } else {
      //   self.$http.get(`/api/wx/data/home/records?maxId=${self.getMaxId(self.listData)}`)
      //     .then((res) => {
      //       if (res.data.code !== 0 || res.data.data.dataList.length < 1) {
      //         self.minirefresh.resetUpLoading()
      //       } else {
      //         self.listData = self.listData.concat(res.data.data.dataList)
      //         self.minirefresh.endUpLoading(true)
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err)
      //     })
      // }
    },
    dropFn(type) {
      this[`${type}Active`] = !this[`${type}Active`]
      setTimeout(() => {
        this.$refs.bloodPressure.resize()
        this.$refs.pulse.resize()
        this.$refs.pointBloodPressure.resize()
      }, 50)
    },
    getMonthDate() {
      const self = this
      // eslint-disable-next-line new-cap
      const calendar = new datePicker()
      const now = new Date()
      const maxDateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
      calendar.init({
        trigger: '#calendar',
        type: 'ym',
        minDate: '2020-01-01',
        maxDate: maxDateString,
        onSubmit: function() {
          self.currentMonth = calendar.value
          self.filterByMonth()
        }
      })
    },
    filterByMonth() {
      var self = this
      self.getBloodPressTableData(this.currentMonth)
    },
    minirefreshFn() {
      // 下拉加载
      const self = this
      // eslint-disable-next-line no-undef
      self.minirefresh = new MiniRefresh({
        container: '#minirefresh',
        down: {
          isLock: true
        },
        up: {
          isAuto: false,
          toTop: {
            isEnable: false
          },
          callback: self.upCallback
        }
      })
    },
    onExpand(list, index) {
      if (list[0].isExpanded) {
        this.bloodPressTableData[index][0].isExpanded = false
        this.bloodPressTableData[index][0].am = this.bloodPressTableData[index][0].am.slice(0, 3)
        this.bloodPressTableData[index][0].pm = this.bloodPressTableData[index][0].pm.slice(0, 3)
        return
      }
      this.bloodPressTableData[index][0].isExpanded = true
      this.bloodPressTableData[index][0].am = this.bloodPressTableData[index][0].raw_am
      this.bloodPressTableData[index][0].pm = this.bloodPressTableData[index][0].raw_pm
    }
  }
}
</script>

<style lang="less" scoped>
.minirefresh-wrap
{
 margin-top: 750px;
}
    .panel{
        .radio-group{
        display: flex;
        justify-content:center;

        }
        padding: 0 30px;
        .panel-header{
            display: flex;
            padding: 28px 0;
            justify-content: space-between;
            em{
                font-size: 34px;
                color: #333;
                font-style: normal;
            }
            span{
                color: #639eff;
                font-size: 32px;
                line-height: 40px;
            }
        }
        .pure-table {
            border-collapse: collapse;
            border-spacing: 0;
            empty-cells: show;
            border: 1px solid #cbcbcb;
            .td-title {
              line-height: 12px;
              width: 20%;
              font-size: 20px;
              font-weight: bolder;
              text-align: center;
            }
            .td-time {
              line-height: 12px;
              width: 40%;
              font-size: 20px;
              font-weight: bolder;
              text-align: center;
            }
            .td-value{
              font-size: 24px;
              font-weight: 200;
              text-align: center;
            }
        }
        .pure-table caption {
            color: #000;
            font: italic 85%/1 arial,sans-serif;
            padding: 1em 0;
            text-align: center;
        }
        .pure-table td,.pure-table th {
            border-left: 1px solid #cbcbcb;
            border-width: 0 0 0 1px;
            font-size: inherit;
            margin: 0;
            overflow: visible;
            padding: .5em 1em;
        }

        .pure-table thead {
            background-color: #e0e0e0;
            color: #000;
            text-align: left;
            vertical-align: bottom;
        }

        .pure-table td {
            background-color: transparent;
        }

        .pure-table-bordered td {
            border-bottom: 1px solid #cbcbcb;
        }

        .pure-table-bordered tbody>tr:last-child>td {
            border-bottom-width: 0;
        }
        &:nth-child(1){
            .panel-header em i{
                display: inline-block;
                width: 22px;
                height: 42px;
                margin-right: 18px;
                background: url('../assets/images/blood_pressure.png') no-repeat 0 0;
                background-size: 22px 42px;
                vertical-align: -6px;
            }
        }
        &:nth-child(2){
            .panel-header em i{
                display: inline-block;
                width: 41px;
                height: 35px;
                margin-right: 18px;
                background: url('../assets/images/heart_rate.png') no-repeat 0 0;
                background-size: 41px 35px;
                vertical-align: -6px;
            }
        }
        &:nth-child(3){
            .panel-header em i{
                display: inline-block;
                width: 41px;
                height: 35px;
                margin-right: 18px;
                background: url('../assets/images/spectrum.png') no-repeat 0 0;
                background-size: 41px 35px;
                vertical-align: -6px;
            }
        }
        &:nth-child(4){
            .panel-header em i{
                display: inline-block;
                width: 36px;
                height: 36px;
                margin-right: 18px;
                background: url('../assets/images/history.png') no-repeat 0 0;
                background-size: 36px 36px;
                vertical-align: -6px;
            }
        }
    }
    .graph{
        width: 100%;
        height: 660px;
        border-radius: 10px;
        background-color: #fff;
        .echarts{
            width: 100%;
            height: 100%;
        }
    }
    .graph-2{
        width: 100%;
        height: 300px;
        border-radius: 10px;
        background-color: #fff;
        .echarts{
            width: 100%;
            height: 100%;
        }
    }
    .history-box{
        .history-item{
            border-radius: 10px;
            margin-bottom: 24px;
            background-color: #fff;
            .history-header{
                position: relative;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px dashed #dbe9fa;
                padding: 0 30px;
                line-height: 68px;
                em{
                    font-size: 30px;
                    color: #89b7f9;
                    font-style: normal;
                    font-family: Arial, Helvetica, sans-serif;
                }
                span{
                    display: inline-block;
                    height: 46px;
                    padding: 0 26px;
                    font-size: 26px;
                    color: #fff;
                    font-family: 'microsoft yahei';
                    background-color: #529dff;
                    line-height: 50px;
                    margin-top: 12px;
                    border-radius: 25px;
                }
                &:before, &:after{
                    position: absolute;
                    bottom: 0;
                    content: '';
                    width: 30px;
                    height: 30px;
                    border-radius: 100%;
                    background-color: #ecf4ff;
                }
                &:before{
                    left: 0;
                    transform: translate(-50%, 50%);
                }
                &:after{
                    right: 0;
                    transform: translate(50%, 50%);
                }
            }
            .history-content{
                padding: 25px 0;
                display: flex;
                font-family: 'microsoft yahei';
                .rate{
                    display: flex;
                    align-content: center;
                    flex-wrap: wrap;
                    justify-content: center;
                    width: 180px;
                    color: #529dff;
                    border-right: 1px dashed #dbe9fa;
                    b{
                        display: block;
                        font-size: 60px;
                    }
                    em{
                        font-size: 24px;
                        font-style: normal;
                    }
                }
                .params-table{
                    flex: 1;
                    padding: 0 40px;
                    table{
                        width: 100%;
                        font-size: 100px;
                        // em{
                        //     color: #999;
                        //     font-style: normal;
                        // }
                        // b{
                        //     font-weight: normal;
                        //     color: #333;
                        // }
                    }
                }
            }
        }
    }
    .drop-box{
        margin-bottom: 20px;
        .badge-item{
            display: flex;
            padding: 30px 40px;
            border-bottom: 2px solid #f6f6f6;
            align-items: center;
            background-color: #fff;
            .badge-cell_bd{
                font-size: 32px;
                color: #333;
            }
            .badge-cell_ft{
                position: relative;
                flex: 1;
                text-align: right;
                font-size: 28px;
                color: #999;
            }
            .tip-icon{
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid #ddd; /*no*/
                border-width: 0 0 2px 2px;
                vertical-align: middle;
                &.up{
                    border-width: 0 0 2px 2px;
                    transform: rotateZ(-45deg) translateY(-50%);
                }
                &.down{
                    border-width: 2px 2px 0 0;
                    transform: rotateZ(-45deg) translate(-50%, -25%);
                }
            }
        }
    }
    .record-page{
        position: absolute;
        left:0;
        top: 0;
        right: 0;
        bottom: 0;
        margin-bottom: 100px;
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;
    }
    .calendar-filter{
        font-family: 'PingFangSC-Medium';
        line-height: 40px;
        div{
            flex: 1;
            font-size: 28px;
            color: #999;
            strong{
                color: #FF3300;
            }
        }
        span{
            &::after{
                display: inline-block;
                content: '';
                width: 0;
                height: 0;
                border-width: 10px 8px 0;
                border-style: solid;
                border-color: #333 transparent;
                vertical-align: middle;
                margin-left: 10px;
            }
        }
    }
</style>
