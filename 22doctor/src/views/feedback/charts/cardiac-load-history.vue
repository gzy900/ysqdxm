<template>
  <div class="chart-page1">
    <el-row style="margin-bottom: 10px">
      <div style="text-align: right">
        <el-date-picker
          v-model="listQuery.beginTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择起始日期"
        />
        -
        <el-date-picker
          v-model="listQuery.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束日期"
        />
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
    </el-row>

    <el-scrollbar
      style="height: calc( 100% - 46px )"
      wrap-class="scrollbar-wrapper"
    >
      <div
        ref="chart-history"
        v-infinite-scroll="getList"
        class="chartDiv"
        infinite-scroll-disabled="disabled"
        infinite-scroll-immediate="false"
      >
        <!--    <div :id="id" :class="className" :style="{height:height,width:width}" />-->
      </div>
      <p v-if="loading" class="load-tip">加载中...</p>
      <p v-if="noMore" class="load-tip">没有更多了</p>
    </el-scrollbar>

    <!--    //详情-->
    <el-dialog :append-to-body="true" :visible.sync="infoDialogVisible" :title="'历史反馈详情'" @close="closeDialog">

      <el-form ref="fromData" label-width="120px" label-position="right" :disabled="true">

        <el-form-item v-if="rowInfo.url" label="判读依据：">
          <el-col :span="24">

            <el-image
              v-for="item in rowInfo.url.split(',')"
              style="width: 100px; height: 100px"
              :preview-src-list="rowInfo.url.split(',')"
              class="basis-img"
              :src="item"
              :z-index="4000"
              @click="popDisplay=false"
            />

          </el-col>
        </el-form-item>

        <el-form-item label="反馈建议：">
          <el-col :span="24">
            <el-input
              v-model="rowInfo.explain"
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入反馈建议或者点击标签快速回复！"
            />
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import _echarts from 'echarts'
import decode from '@/utils/pako.js'
import { deepClone } from '@/utils'
import resize from '@/components/Charts/mixins/resize'
import { getList, getHeart } from '@/api/arrhythmia-chart'
import { getInfo } from '@/api/feedback'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart-load-history'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    option: {
      type: Object,
      default: null
    },
    row: {
      type: Object,
      default: null
    },
    uuid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: [],
      listQuery: {
        pageNo: 1,
        number: 2
      },
      pageSize: -1,
      infoDialogVisible: false,
      chartInfo: {},
      rowInfo: {},
      // 心电图测量工具
      measure: {
        step: 0,
        oneX: 0,
        oneY: 0
      },
      dataZoom: {
        start: null,
        end: null
      },

      xData: [
        122, 26, 123, 26, 122, 26, 123, 26, 122, 26, 121, 26, 122, 26, 122, 26, 121, 26, 121, 26, 120, 26, 121, 26, 120, 26, 121, 26, 119, 26, 121, 26, 120, 26, 121, 26, 119, 26, 122, 26, 119, 26, 122, 26, 119, 26, 123, 26, 121, 26, 122, 26, 120, 26, 123, 26, 122, 26, 121, 26, 124, 26, 122, 26, 124, 26, 122, 26, 123, 26, 122, 26, 121, 26, 122, 26, 121, 26, 121, 26, 121, 26, 121, 26, 122, 26, 119, 26, 121, 26, 119, 26, 121, 26, 120, 26, 120, 26, 118, 26, 121, 26, 119, 26, 121, 26, 119, 26, 122, 26, 120, 26, 122, 26, 121, 26, 122, 26, 122, 26, 121, 26, 123, 26, 121, 26, 123, 26, 121, 26, 123, 26, 121, 26, 121, 26, 122, 26, 121, 26, 120, 26, 121, 26, 120, 26, 121, 26, 119, 26, 121, 26, 119, 26, 121, 26, 120, 26, 120, 26, 119, 26, 121, 26, 119, 26, 120, 26, 119, 26, 122, 26, 120, 26, 122, 26, 121, 26, 122, 26, 121, 26, 122, 26, 123, 26, 122, 26, 124, 26, 121, 26, 122, 26, 122, 26, 121, 26, 121, 26, 122, 26, 121, 26, 120, 26, 120, 26, 122, 26, 119, 26, 121, 26, 119, 26, 121, 26, 120, 26, 121, 26, 119, 26, 121, 26, 118, 26, 121, 26, 119, 26, 122, 26, 120, 26, 122, 26, 121, 26, 121, 26, 122, 26, 122, 26, 124, 26, 122, 26, 123, 26, 121, 26, 123, 26, 122, 26, 121, 26, 122, 26, 121, 26, 120, 26, 121, 26, 120, 26, 122, 26, 120, 26, 121, 26, 115, 26, -46, 24, 3, 22, 126, 19, 85, 17, -108, 15, 39, 14, 10, 13, 15, 13, 126, 13, 36, 14, -3, 14, -82, 15, 65, 16, -81, 16, 2, 17, -57, 17, 100, 19, 67, 21, 7, 23, 112, 24, -100, 25, 66, 26, 103, 26, 0, 26, -92, 24, 36, 23, 116, 21, 64, 20, 91, 19, -71, 18, 104, 18, 86, 18, 88, 18, 32, 18, -85, 17, 71, 17, -6, 16, 47, 17, -50, 17, 33, 19, -74, 20, 40, 22, -125, 23, -86, 24, -87, 25, 69, 26, 110, 26, 115, 26, 119, 26, 119, 26, 121, 26, 120, 26, 120, 26, 120, 26, 121, 26, 119, 26, 120, 26, 119, 26, 120, 26, 119, 26, 121, 26, 118, 26, 121, 26, 120, 26, 120, 26, 118, 26, 120, 26, 118, 26, 120, 26, 31, 26, -121, 25, 5, 25, -127, 24, 20, 24, -66, 23, -110, 23, -119, 23, 91, 23, 8, 23, -46, 22, -102, 22, 111, 22, 120, 22, -56, 22, -12, 22, 39, 23, 55, 23, 121, 23, -3, 23, 115, 24, -2, 24, -78
      ],

      loading: false,

      chartsNum: 0,
      chartsOption: {
        title: {
          text: '2020-12-30 12:30',
          subtext: 'QTC: 90; QRS: 90; 平均心率：80',
          subtextStyle: {
            color: '#264005'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '14%',
          containLabel: true
        },
        toolbox: {
          feature: {
            mySaveImg: {
              show: true,
              title: ' ',
              icon: 'path://M939.625 882.402c12.7 0 23.062-10.467 23.062-23.165v-500H916.53V787.648c0 26.793-21.734 48.563-48.493 48.563H104.99c-26.758 0-48.492-21.77-48.492-48.563v-715.462c0-26.791 21.733-48.563 48.492-48.563h428.587v-46.19H33.437c-12.732 0-23.096 10.468-23.096 23.165V859.237c0 12.698 10.362 23.165 23.096 23.165h906.188M821.719 312.842V121.94h190.796v-46.051H821.719v-190.902h-46.156V75.891H584.766v46.051h190.797v190.9h46.156m-508.06 377.34h0.35l0.174-0.14c9.209-15.071 81.601-134.386 137.455-226.766l20.232-33.214 21.421 32.375a40966.633 40966.633 0 0 0 77.241 116.942c22.256-33.631 115.058-174.295 143.314-217.276H114.175c17.723 30.144 189.471 312.868 198.683 327.798 0 0.001 0.172 0.281 0.801 0.281',
              onclick: this.saveImg
            },
            brush: {
              type: ['lineX', 'clear']
            }
          }
        },
        brush: {
          xAxisIndex: 'all',
          brushLink: 'all',
          outOfBrush: {
            colorAlpha: 0.1
          },
          brushStyle: {
            color: 'rgba(0,0,255,.4)'
          },
          throttleType: 'debounce',
          throttleDelay: 500
        },
        xAxis: {
          type: 'value',
          interval: 200,
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: ['#bf1b25']
            }
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            onZero: false
          },
          axisTick: {
            show: true,
            length: 5
          },
          minorSplitLine: {
            show: true,
            lineStyle: {
              color: ['#eed4d2d6']
            }
          }
        },
        yAxis: {
          type: 'value',
          interval: 0.5,
          min: 'dataMin',
          max: 'dataMax',
          scale: true,
          axisLine: {
            onZero: false
          },
          splitLine: {
            show: true,
            interval: 1,
            lineStyle: {
              color: ['#bf1b25']
            }
          },
          minorSplitLine: {
            show: true,
            lineStyle: {
              color: ['#eed4d2d6']
            }
          }
        },
        series: [
          {
            markPoint: {
              data: [
                // {
                //   name: '某个坐标',
                //   yAxis: '116',
                //   xAxis: '2020-08-26 10:29',
                //   value: '当前数据'
                // }
              ]
            },
            type: 'line',
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#558d0b'
                }
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            type: 'inside',
            realtime: true,
            rangeMode: 'value',
            zoomLock: true,
            minValueSpan: 2000,
            maxValueSpan: 2000,
            xAxisIndex: [0]
          },
          {
            show: true,
            type: 'slider',
            realtime: true,
            rangeMode: 'value',

            minValueSpan: 2000,
            maxValueSpan: 2000,
            xAxisIndex: [0]
          }
        ],
        graphic: {
          elements: []
        }
      }
    }
  },
  computed: {
    noMore() {
      return this.listQuery.pageNo > this.pageSize
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  mounted() {
    this.getList()
  },
  // beforeDestroy() {
  //   if (!this.chart) {
  //     return
  //   }
  //   this.chart.dispose()
  //   this.chart = null
  // },
  methods: {

    handleSearch() {
      this.listQuery.pageNo = 1
      this.$refs['chart-history'].innerHTML = ''
      for (let i = 0; i < this.chart.length; i++) {
        this.chart[i].dispose()
      }
      this.getList()
    },

    // 查询心电数据
    async getList() {
      this.loading = true
      const les = await getList({ uuid: this.row.uuid, flag: '5', ...this.listQuery })
      this.getHeart(les.data.dataList, 0, les.data.dataList.length)

      this.pageSize = les.data.pageSize
      this.listQuery.pageNo++
    },

    // 查询心电数据
    async getHeart(dataList, num, numAll) {
      let isError = false
      if (dataList.length <= 0) {
        isError = true
      }
      if (!isError && !dataList[num].heart_id) {
        this.$notify({
          title: '心电图数据丢失',
          type: 'warning'
        })
        isError = true
      }
      const les = await getHeart({ heart_id: dataList[num].heart_id })
      if (!isError && !les.data.heartRecord) {
        this.$notify({
          title: '心电图数据丢失',
          type: 'warning'
        })
        isError = true
      }
      if (!isError && !les.data.os) {
        this.$notify({
          title: '心电图数据丢失',
          type: 'warning'
        })
        isError = true
      }

      if (isError) {
        num++
        if (num < numAll) {
          this.getHeart(dataList, num, numAll)
        } else {
          this.loading = false
        }
        return
      }

      this.xData = decode(les.data.heartRecord, les.data.os)
      this.getInfo(dataList, num, numAll)
    },

    async getInfo(dataList, num, numAll) {
      return new Promise((resolve, reject) => {
        getInfo({ privateId: dataList[num].report_id, type: 5 })
          .then(response => {
            if (response.data) {
              // this.initChart1(les.data.heartRecord, this.row)
              this.initChart(this.xData, dataList[num], response.data)
            } else {
              this.initChart(this.xData, dataList[num], null)
            }
            num++
            if (num < numAll) {
              this.getHeart(dataList, num, numAll)
            } else {
              this.loading = false
            }
          })
          .catch(error => {
            this.initChart(this.xData, dataList[num], null)
            num++
            if (num < numAll) {
              this.getHeart(dataList, num, numAll)
            } else {
              this.loading = false
            }
          })
      })
    },

    // 生成一个心电图图表
    initChart(data, row, info) {
      // 创建图表容器
      const node = document.createElement('div')
      node.setAttribute('id', this.id + '_' + this.chartsNum)
      node.setAttribute('style', 'height:' + this.height)
      this.$refs['chart-history'].append(node)
      // 创建图表并设置Data
      const chart = _echarts.init(document.getElementById(this.id + '_' + this.chartsNum))
      this.chartsOption.title.text = row.endTime

      const point = this.chart.push(chart)
      const self = this
      this.chartsOption.toolbox.feature.mySaveImg.onclick = function() {
        self.saveImg(point - 1)
      }

      this.chartInfo[point - 1] = info

      let subtext = 'SDN：' + row.heart_change + '; ' + 'PSI：' + row.PSI + '; ' + 'HR：' + row.heart_rate_avg + '; '

      this.chartsOption.toolbox.feature.mySeeSmartWord = {
        show: true,
        title: '查看这条数据的智能报告',
        icon: 'path://M868.95177918 215.34678468H274.11312994c-10.26749627 0-19.00277466 3.6151618-26.30943653 10.88910739-7.22487113 7.23032433-10.89456058 15.97650768-10.89456059 26.20583515v370.75858453c0 10.24023245 3.66968946 18.95370022 10.89456059 26.22764579 7.30666259 7.22487113 16.04194099 10.86184429 26.30943653 10.86184429h594.83864924c10.28385442 0 19.04094415-3.63697315 26.28217344-10.86184429 7.30120941-7.27394558 10.9218244-15.98741334 10.92182439-26.22764579V252.44172722c0-10.2293275-3.62061501-18.97551083-10.92727686-26.20583516-7.23577681-7.27394558-15.99286582-10.8891081-26.27672097-10.88910738M274.09131931 141.21142578h594.83864924c30.77522572 0 57.07375657 10.86729676 78.86287773 32.59643853 21.78912116 21.74004671 32.66187112 47.91861806 32.66187114 78.62841045v370.76403699c0 30.68798176-10.87274996 56.91562756-32.66187114 78.63386293-21.78912116 21.72914105-48.08765274 32.59643853-78.86287773 32.59643851H608.68737796v74.15716953h111.5465602c10.26204379 0 19.03003849 3.6151618 26.28217344 10.8891081 7.29030445 7.22487113 10.91091874 15.97650768 10.91091872 26.20583518 0 10.24023245-3.62061501 18.98641651-10.91637192 26.20038195-7.25213496 7.28485125-16.01467717 10.90001305-26.27672024 10.90001379H422.80370787c-10.27840195 0-19.0191328-3.6151618-26.30943728-10.90001379-7.25213496-7.21396618-10.89456058-15.96014952-10.89456056-26.20038195 0-10.23477998 3.6478781-18.97551083 10.89456056-26.20583518 7.29030445-7.27394558 16.03103531-10.8891081 26.30943728-10.8891081h111.53565452v-74.15716953H274.09131931c-30.79703633 0-57.09011544-10.86729676-78.86287845-32.59643851C173.43931968 680.11593931 162.54475911 653.88829351 162.54475911 623.20031175V252.44172722C162.54475911 221.72648236 173.43931968 195.54791102 195.22844086 173.80786431 217.00665706 152.07872254 243.29428298 141.21142578 274.09131931 141.21142578',
        onclick: function() {
          window.open(row.report_url)
        }
      }

      if (info !== null) {
        this.chartsOption.toolbox.feature.mySeeWord = {
          show: true,
          title: '查看这条数据的反馈记录',
          icon: 'path://M660.4 484c-30.1 0-58.5 11.8-79.8 33.1-21.3 21.4-32.9 49.7-32.8 79.9l0.8 174.1c0.1 12.4 7.5 23.5 18.9 28.4 11.4 4.8 24.6 2.4 33.5-6.1l268.2-256c9.2-8.7 12.1-22.2 7.4-33.9-4.7-11.8-16.1-19.5-28.8-19.5H660.4zM877.8 426.1H633.5c-39.3 0-76.2 15.3-104 43.2-27.7 27.9-42.9 64.8-42.7 104.2l1 227c0 2.2 0.2 4.3 0.6 6.4h-197c-82.6 0-149.7-67.2-149.7-149.7v-548.3c0-82.6 67.2-149.7 149.7-149.7h442c82.6 0 149.7 67.2 149.7 149.7V426.5c-1.8-0.2-3.6-0.4-5.3-0.4zM687 90.3H337.6c-18.7 0-33.8 15.1-33.8 33.8 0 18.7 15.1 33.8 33.8 33.8H687c18.7 0 33.8-15.1 33.8-33.8 0-18.6-15.2-33.8-33.8-33.8z m0 138.5H337.6c-18.7 0-33.8 15.1-33.8 33.8 0 18.7 15.1 33.8 33.8 33.8H687c18.7 0 33.8-15.1 33.8-33.8 0-18.6-15.2-33.8-33.8-33.8z',
          onclick: function() {
            self.seeWord(point - 1)
          }
        }
        if (info.isImport !== null) {
          subtext += '; 判读症状：' + info.isImport.replace(/======/g, '，')
        }
      }
      this.chartsOption.title.subtext = subtext

      // 设置心电图绘制比例
      const num = 200
      const cw = chart.getWidth() - 104
      const ch = chart.getHeight() - 50
      const max = Math.ceil(Math.max(...data))
      const min = Math.floor(Math.min(...data))

      const num_height = ch / ((max - min) * 2)
      const width_num = cw / num_height

      this.chartsOption.yAxis.min = max
      this.chartsOption.yAxis.max = min

      this.chartsOption.dataZoom[0].minValueSpan = width_num * num
      this.chartsOption.dataZoom[0].maxValueSpan = width_num * num

      this.chartsOption.dataZoom[1].minValueSpan = width_num * num
      this.chartsOption.dataZoom[1].maxValueSpan = width_num * num
      // 设置心电图绘制比例end

      const xData = []
      for (let i = 0; i < data.length; i++) {
        xData.push([i * 1000 / 200, data[i]])
      }
      this.chartsOption.series[0].data = xData
      chart.setOption(this.chartsOption)
      this.chartsNum++

      delete this.chartsOption.toolbox.feature.mySeeWord

      chart.on('brushSelected', (params) => {
        const chartOption = chart.getOption()
        if (params.batch[0].areas.length <= 0) {
          return
        }
        const xList = params.batch[0].areas[0].coordRange
        const xList1 = []
        for (let i = 0; i < xList.length; i++) {
          const g = xList[i] % 10 / 1
          let num = 0
          if (g < 2.5) {
            num = Math.floor(xList[i] / 10) * 10
          } else if (g >= 2.5 && g < 7.5) {
            num = parseInt(parseInt(xList[i] / 10).toString() + '5')
          } else if (g >= 7.5) {
            num = Math.ceil(xList[i] / 10) * 10
          }

          xList1.push(chartOption.series[0].data[num / 5])
        }
        const hc = '横向差：' + Math.abs((xList1[0][0] - xList1[1][0])).toFixed(2) + ' ms'
        const sc = '纵向差：' + Math.abs(xList1[0][1] - xList1[1][1]).toFixed(2) + ' mm/mv'

        const maxL = hc.length > sc.length ? hc.length : sc.length

        chartOption.graphic = {
          elements: [
            {
              type: 'rect',
              shape: {
                x: 0,
                y: 0,
                width: maxL * 9,
                height: 36
              },
              z: 10001,
              right: 10,
              top: 60,
              style: {
                fill: 'rgba(0,0,0,.7)'
              }
            },
            {
              type: 'text',
              z: 10001,
              right: 10,
              top: 68,
              style: {
                text: hc + '\n' + sc,
                fill: '#fff'
              }
            }
          ]
        }
        chart.setOption(chartOption)
      })
    },
    resizeChart() {
      this.$nextTick(() => {
        const { chart } = this
        if (Array.isArray(chart)) {
          for (const item in chart) {
            chart[item] && chart[item].resize()
          }
        } else {
          chart && chart.resize()
        }
      })
    },

    saveImg(point) {
      const img = this.chart[point].getConnectedDataURL(
        {
          type: 'png',
          pixelRatio: 1,
          backgroundColor: '#fff'
        }
      )
      this.$emit('appendImg', img)
    },
    seeWord(point) {
      this.infoDialogVisible = true
      this.rowInfo = deepClone(this.chartInfo[point])
    },
    closeDialog() {
      this.$refs.fromData.resetFields()
    }
  }
}
</script>

<style lang="scss">
  .chart-div{
    div + div{
      margin-top: 30px !important;
    }
  }
  .chart-page1{
    .scrollbar-wrapper{
      overflow-x: hidden !important;
    }
  }
</style>

<style scoped lang="scss">
  .chart-page1{
    width: 100%;
    height: 100%;
    .el-row{
      height: 36px;
    }
  }
  .chart-div{
    width: 100%;
  }
  .load-tip{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    overflow: hidden;
  }
</style>
