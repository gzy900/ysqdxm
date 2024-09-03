<template>
  <div class="chart-page1">
    <div ref="chartDiv" class="currentChart" />
    <div style="height: calc( 100% - 340px )">
      <iframe name="ifd" width="100%" height="100%" style="border: 0" :src="report_url" />
    </div>
  </div>
</template>

<script>
import _echarts from 'echarts'
import decode from '@/utils/pako.js'
import resize from '@/components/Charts/mixins/resize'
import { getList, getHeart } from '@/api/arrhythmia-chart'
import { getDanDaoById } from '@/api/arrhythmia'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart-load'
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
    isImport: {
      type: String,
      default: ''
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
      report_url: '',

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
          left: '10px',
          right: '10px',
          bottom: '44px',
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
          axisLabel: {
            show: true
          },
          interval: 0.5,
          // splitNumber: 10,
          min: '',
          max: '',
          axisTick: {
            show: false
          },
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
    this.getHeart([this.row], 0, 1)
    this.getDanDaoById(this.row.report_id)
  },
  // beforeDestroy() {
  //   if (!this.chart) {
  //     return
  //   }
  //   this.chart.dispose()
  //   this.chart = null
  // },
  methods: {

    async getDanDaoById(report_id) {
      const res = await getDanDaoById({ 'report_id': report_id })
      this.report_url = res.data.report_url
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
    async getHeart(dataList, num, numAll, current = false) {
      if (!dataList[num].heart_id) {
        this.$notify({
          title: '心电图数据丢失',
          type: 'warning'
        })
        return
      }
      const les = await getHeart({ heart_id: dataList[num].heart_id })
      if (!les.data.heartRecord) {
        this.$notify({
          title: '心电图数据丢失',
          type: 'warning'
        })
        return
      }
      if (!les.data.os) {
        this.$notify({
          title: '心电图数据丢失',
          type: 'warning'
        })
        return
      }

      this.initChart(decode(les.data.heartRecord, les.data.os), dataList[num], current)
      num++
      if (num < numAll) {
        this.getHeart(dataList, num, numAll)
      }
      this.loading = false
    },

    // 生成一个心电图图表
    initChart(data, row) {
      // 创建图表容器

      const node = document.createElement('div')
      node.setAttribute('id', this.id + '_' + this.chartsNum)
      node.setAttribute('style', 'height:' + this.height)
      this.$refs.chartDiv.append(node)
      // 创建图表并设置Data
      const chart = _echarts.init(document.getElementById(this.id + '_' + this.chartsNum))
      this.chartsOption.title.text = row.endTime
      let subtext = 'SDN：' + row.heart_change + '; ' + 'PSI：' + row.PSI + '; ' + 'HR：' + row.heart_rate_avg

      this.chartsOption.toolbox.feature.mySeeSmartWord = {
        show: true,
        title: '查看这条数据的智能报告',
        icon: 'path://M868.95177918 215.34678468H274.11312994c-10.26749627 0-19.00277466 3.6151618-26.30943653 10.88910739-7.22487113 7.23032433-10.89456058 15.97650768-10.89456059 26.20583515v370.75858453c0 10.24023245 3.66968946 18.95370022 10.89456059 26.22764579 7.30666259 7.22487113 16.04194099 10.86184429 26.30943653 10.86184429h594.83864924c10.28385442 0 19.04094415-3.63697315 26.28217344-10.86184429 7.30120941-7.27394558 10.9218244-15.98741334 10.92182439-26.22764579V252.44172722c0-10.2293275-3.62061501-18.97551083-10.92727686-26.20583516-7.23577681-7.27394558-15.99286582-10.8891081-26.27672097-10.88910738M274.09131931 141.21142578h594.83864924c30.77522572 0 57.07375657 10.86729676 78.86287773 32.59643853 21.78912116 21.74004671 32.66187112 47.91861806 32.66187114 78.62841045v370.76403699c0 30.68798176-10.87274996 56.91562756-32.66187114 78.63386293-21.78912116 21.72914105-48.08765274 32.59643853-78.86287773 32.59643851H608.68737796v74.15716953h111.5465602c10.26204379 0 19.03003849 3.6151618 26.28217344 10.8891081 7.29030445 7.22487113 10.91091874 15.97650768 10.91091872 26.20583518 0 10.24023245-3.62061501 18.98641651-10.91637192 26.20038195-7.25213496 7.28485125-16.01467717 10.90001305-26.27672024 10.90001379H422.80370787c-10.27840195 0-19.0191328-3.6151618-26.30943728-10.90001379-7.25213496-7.21396618-10.89456058-15.96014952-10.89456056-26.20038195 0-10.23477998 3.6478781-18.97551083 10.89456056-26.20583518 7.29030445-7.27394558 16.03103531-10.8891081 26.30943728-10.8891081h111.53565452v-74.15716953H274.09131931c-30.79703633 0-57.09011544-10.86729676-78.86287845-32.59643851C173.43931968 680.11593931 162.54475911 653.88829351 162.54475911 623.20031175V252.44172722C162.54475911 221.72648236 173.43931968 195.54791102 195.22844086 173.80786431 217.00665706 152.07872254 243.29428298 141.21142578 274.09131931 141.21142578',
        onclick: () => {
          window.open(this.report_url)
        }
      }

      if (this.isImport !== null) {
        subtext += '; --判读症状：' + this.isImport.replace(/======/g, '，')
      }
      this.chartsOption.title.subtext = subtext
      const point = this.chart.push(chart)
      const self = this
      this.chartsOption.toolbox.feature.mySaveImg.onclick = function() {
        self.saveImg(point - 1)
      }

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
  .currentChart{
    height: auto;
  }
</style>
