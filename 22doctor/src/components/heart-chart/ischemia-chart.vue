<template>
  <div :id="returnId" class="heart-chart" :class="isError&&'is-error'">
    <p v-if="isError" class="is-error-p">数据丢失</p>
  </div>
</template>

<script>
import { getHeart } from '@/api/arrhythmia-chart'
import decode from '@/utils/pako.js'
import _echarts from 'echarts'
import { deepClone } from '../../utils'
import resize from '@/components/Charts/mixins/resize'
export default {
  name: 'IschemiaChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    heartId: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    report: {
      type: Object,
      default: null
    },

    reportUrl: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      chart: null,
      isError: false,
      gainNum: 0
    }
  },
  computed: {
    returnId() {
      return this.id + this.heartId
    }
  },
  mounted() {
    this.getHeart()
  },
  methods: {
    initChart(res) {
      if (!res || !res.os || !res.heartRecord || res.heartRecord.length <= 0) {
        this.$notify({
          title: '心电图丢失！',
          type: 'warning'
        })
        this.isError = true
        return
      }
      this.chart = _echarts.init(document.getElementById(this.id + this.heartId))
      const option = this.setChartData(res)
      this.chart.setOption(option)
      this.chart.on('brushSelected', this.brushSelected)
    },
    setChartData(res) {
      const [icon_sava_img, icon_myReversal, icon_mySeeSmartWord, icon_mySeeWord, icon_myJia, icon_myJian] = [
        'path://M939.625 882.402c12.7 0 23.062-10.467 23.062-23.165v-500H916.53V787.648c0 26.793-21.734 48.563-48.493 48.563H104.99c-26.758 0-48.492-21.77-48.492-48.563v-715.462c0-26.791 21.733-48.563 48.492-48.563h428.587v-46.19H33.437c-12.732 0-23.096 10.468-23.096 23.165V859.237c0 12.698 10.362 23.165 23.096 23.165h906.188M821.719 312.842V121.94h190.796v-46.051H821.719v-190.902h-46.156V75.891H584.766v46.051h190.797v190.9h46.156m-508.06 377.34h0.35l0.174-0.14c9.209-15.071 81.601-134.386 137.455-226.766l20.232-33.214 21.421 32.375a40966.633 40966.633 0 0 0 77.241 116.942c22.256-33.631 115.058-174.295 143.314-217.276H114.175c17.723 30.144 189.471 312.868 198.683 327.798 0 0.001 0.172 0.281 0.801 0.281',
        'path://M484.4 621l-94.8-100.1c-10.3-10.8-27.6-10.8-37.9 0l-80.4 84.9-8.1 8.5c-7.7 8.1-9.3 20.1-4.2 30 1.6 3.1 3.2 6.2 4.9 9.2 23.1 41.3 55.7 75.8 94.8 100.1 2.1 1.3 4.2 2.6 6.4 3.9 10.5 6.1 23.8 4.2 32.2-4.6l6.6-7 80.4-84.9 2-2.1c9.5-10 9.5-25.7 0-35.7l-1.9-2.2z m-125.3 99.5c-25.8-18.6-48-42.3-65.3-69.7-6.4-10.1-5.2-23.3 3-32l54.9-57.9c10.3-10.8 27.6-10.8 37.9 0l59 62.3c9.5 10 9.5 25.7 0 35.7l-55.3 58.3c-8.9 9.4-23.6 10.9-34.2 3.3zM541.9 390.2l94 99.2c10.2 10.7 27.3 10.7 37.5 0l79.7-84.1 8-8.5c7.6-8 9.2-19.9 4.1-29.7-1.6-3.1-3.2-6.1-4.9-9.1-22.9-40.9-55.2-75-94-99.2-2.1-1.3-4.2-2.6-6.3-3.8-10.4-6.1-23.6-4.1-31.9 4.6l-6.6 6.9-79.7 84.1-2 2.1c-9.4 9.9-9.4 25.4 0 35.4l2.1 2.1z m124.2-98.6c25.5 18.4 47.5 41.9 64.7 69 6.3 10 5.2 23.1-3 31.7l-54.4 57.4c-10.2 10.7-27.3 10.7-37.5 0L577.4 388c-9.4-9.9-9.4-25.4 0-35.4l54.7-57.8c9-9.3 23.5-10.7 34-3.2zM429.2 253.6c-4.6-4.9-12.1-6.1-17.8-2.6-5 3-9.9 6.2-14.8 9.6-39.2 27.5-71.2 65.3-92.9 109.7-4.3 8.7-8 17.7-11.4 26.9l-9.9-14c-4.8-6.7-14.3-8.1-20.7-3-6 4.8-7.2 13.4-2.8 19.6l34.1 48c5.8 8.1 17.8 8.1 23.6 0l34.1-48c4.4-6.2 3.2-14.9-2.8-19.6l-11.9-9.4-1.9 2.6c20.3-37.1 48.7-68.5 82.9-91.4 3.2-2.1 6.4-4.2 9.7-6.2 7.8-4.7 9.1-15.4 2.9-22l-0.4-0.2z m-124.5 161l-5.1-7.2 5.9 6.2-0.8 1zM765.4 612.6l-34.1-48c-5.8-8.1-17.8-8.1-23.6 0l-34.1 48c-4.4 6.2-3.2 14.9 2.8 19.6 6.5 5.1 16 3.8 20.7-3l22.3-31.4 4.1 5.8-0.7-0.8c-4.2 9.2-8.9 18.1-14 26.7-25.3 42.1-61.5 76-104.5 97.5-3 1.5-6 3-9.1 4.3-9 4.1-11.2 15.7-4.4 22.9l0.2 0.3c4.2 4.4 10.8 5.9 16.4 3.4 6-2.7 12-5.6 17.8-8.8 42-23 77.8-56.8 103.9-98.1 4.5-7.1 8.5-14.6 12.4-22.1l9.1 12.8 11.9-9.4c6.1-4.8 7.4-13.4 2.9-19.7z',
        'path://M868.95177918 215.34678468H274.11312994c-10.26749627 0-19.00277466 3.6151618-26.30943653 10.88910739-7.22487113 7.23032433-10.89456058 15.97650768-10.89456059 26.20583515v370.75858453c0 10.24023245 3.66968946 18.95370022 10.89456059 26.22764579 7.30666259 7.22487113 16.04194099 10.86184429 26.30943653 10.86184429h594.83864924c10.28385442 0 19.04094415-3.63697315 26.28217344-10.86184429 7.30120941-7.27394558 10.9218244-15.98741334 10.92182439-26.22764579V252.44172722c0-10.2293275-3.62061501-18.97551083-10.92727686-26.20583516-7.23577681-7.27394558-15.99286582-10.8891081-26.27672097-10.88910738M274.09131931 141.21142578h594.83864924c30.77522572 0 57.07375657 10.86729676 78.86287773 32.59643853 21.78912116 21.74004671 32.66187112 47.91861806 32.66187114 78.62841045v370.76403699c0 30.68798176-10.87274996 56.91562756-32.66187114 78.63386293-21.78912116 21.72914105-48.08765274 32.59643853-78.86287773 32.59643851H608.68737796v74.15716953h111.5465602c10.26204379 0 19.03003849 3.6151618 26.28217344 10.8891081 7.29030445 7.22487113 10.91091874 15.97650768 10.91091872 26.20583518 0 10.24023245-3.62061501 18.98641651-10.91637192 26.20038195-7.25213496 7.28485125-16.01467717 10.90001305-26.27672024 10.90001379H422.80370787c-10.27840195 0-19.0191328-3.6151618-26.30943728-10.90001379-7.25213496-7.21396618-10.89456058-15.96014952-10.89456056-26.20038195 0-10.23477998 3.6478781-18.97551083 10.89456056-26.20583518 7.29030445-7.27394558 16.03103531-10.8891081 26.30943728-10.8891081h111.53565452v-74.15716953H274.09131931c-30.79703633 0-57.09011544-10.86729676-78.86287845-32.59643851C173.43931968 680.11593931 162.54475911 653.88829351 162.54475911 623.20031175V252.44172722C162.54475911 221.72648236 173.43931968 195.54791102 195.22844086 173.80786431 217.00665706 152.07872254 243.29428298 141.21142578 274.09131931 141.21142578',
        'path://M660.4 484c-30.1 0-58.5 11.8-79.8 33.1-21.3 21.4-32.9 49.7-32.8 79.9l0.8 174.1c0.1 12.4 7.5 23.5 18.9 28.4 11.4 4.8 24.6 2.4 33.5-6.1l268.2-256c9.2-8.7 12.1-22.2 7.4-33.9-4.7-11.8-16.1-19.5-28.8-19.5H660.4zM877.8 426.1H633.5c-39.3 0-76.2 15.3-104 43.2-27.7 27.9-42.9 64.8-42.7 104.2l1 227c0 2.2 0.2 4.3 0.6 6.4h-197c-82.6 0-149.7-67.2-149.7-149.7v-548.3c0-82.6 67.2-149.7 149.7-149.7h442c82.6 0 149.7 67.2 149.7 149.7V426.5c-1.8-0.2-3.6-0.4-5.3-0.4zM687 90.3H337.6c-18.7 0-33.8 15.1-33.8 33.8 0 18.7 15.1 33.8 33.8 33.8H687c18.7 0 33.8-15.1 33.8-33.8 0-18.6-15.2-33.8-33.8-33.8z m0 138.5H337.6c-18.7 0-33.8 15.1-33.8 33.8 0 18.7 15.1 33.8 33.8 33.8H687c18.7 0 33.8-15.1 33.8-33.8 0-18.6-15.2-33.8-33.8-33.8z',
        'path://M512 1024C229.248 1024 0 794.752 0 512 0 229.248 229.248 0 512 0 794.752 0 1024 229.248 1024 512 1024 794.752 794.752 1024 512 1024ZM768 448 576 448 576 256C576 220.672 547.328 192 512 192 476.672 192 448 220.672 448 256L448 448 256 448C220.672 448 192 476.672 192 512 192 547.328 220.672 576 256 576L448 576 448 768C448 803.328 476.672 832 512 832 547.328 832 576 803.328 576 768L576 576 768 576C803.328 576 832 547.328 832 512 832 476.672 803.328 448 768 448Z',
        'path://M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024zM307.2 563.2h409.6a51.2 51.2 0 0 0 0-102.4H307.2a51.2 51.2 0 0 0 0 102.4z'
      ]
      const option = {
        title: {
          text: '2020-12-30 12:30',
          subtext: 'QTC: 90; QRS: 90; 平均心率：80',
          subtextStyle: {
            color: '#264005',
            fontSize: 14
          }
        },

        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '10px',
          right: '44px',
          bottom: '44px',
          containLabel: true
        },
        toolbox: {
          feature: {
            restore: {
              title: '还原'
            },
            brush: {
              type: ['rect', 'lineX'],
              title: {
                rect: '数据测量',
                lineX: '数据测量2'
              }
            },
            myJia: {
              show: true,
              title: '增益',
              icon: icon_myJia,
              onclick: this.myJia
            },
            myJian: {
              show: true,
              title: '减益',
              icon: icon_myJian,
              onclick: this.myJian
            },
            myReversal: {
              show: true,
              title: '心电图反转',
              icon: icon_myReversal,
              onclick: this.myReversal
            },
            mySeeSmartWord: {
              show: true,
              title: '查看智能报告',
              icon: icon_mySeeSmartWord,
              onclick: this.mySeeSmartWord
            },
            mySeeWord: {
              show: true,
              title: '查看反馈报告',
              icon: icon_mySeeWord,
              onclick: this.mySeeWord
            },
            mySaveImg: {
              show: true,
              title: ' ',
              icon: icon_sava_img,
              onclick: this.saveImg
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
          min: 'dataMin',
          max: 'dataMax',
          splitLine: {
            show: true,
            interval: 1,
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
            show: false
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
          axisLine: {
            onZero: false
          },
          min: -10,
          max: 5,
          axisLabel: {
            show: false
          },
          interval: 0.5,
          // splitNumber: 10,
          axisTick: {
            show: false
          },
          scale: true,
          splitLine: {
            show: true,
            interval: 0.5,
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
            type: 'line',
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#558d0b'
                }
              }
            },
            connectNulls: false
          }
        ],
        dataZoom: [
          // x轴缩放配置
          {
            show: true,
            type: 'slider',
            filterMode: 'filter',

            xAxisIndex: 0
          },
          {
            show: true,
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'filter',

            zoomOnMouseWheel: 'alt'
          },

          // y轴缩放配置
          {
            show: true,
            type: 'slider',
            yAxisIndex: 0,
            rangeMode: 'value',
            startValue: -2,
            filterMode: 'empty',
            endValue: 2
          },
          {
            show: true,
            type: 'inside',
            zoomOnMouseWheel: 'alt',
            yAxisIndex: 0,
            rangeMode: 'value',
            filterMode: 'empty',

            startValue: -2,
            endValue: 2
          }
        ],
        graphic: {
          elements: []
        }
      }

      const initDataList = res.heartRecord.split('__MVTECH__')

      initDataList.forEach((item, index) => {
        const data = decode(item, res.os)

        // 洗数据 给每个 数据点添加 （取样时间） x坐标 每个点间隔 1/200 s
        const list = []
        let numAll = 0
        let [maxData, minData] = [0, 0]
        for (let i = 0; i < data.length; i++) {
          list.push([i * (1000 / 200), data[i].toFixed(3)])

          numAll += data[i]
          // 计算 数据中 最大最小值
          if (data[i] > maxData) {
            maxData = data[i]
          }
          if (data[i] < minData) {
            minData = data[i]
          }
        }
        minData = Math.floor(minData)
        maxData = Math.ceil(maxData)
        // 洗数据结束

        // 设置心电图 标题 副标题
        option.title.text = res.endTime
        option.title.subtext = this.subTitle

        // 计算 正常情况下数据显示最大最小值
        const centerNum = Math.round(numAll / data.length * 2) / 2

        const { dataZoomMinY, dataZoomMaxY, min, max } = this.computeData(minData, maxData, centerNum)

        option.dataZoom[2].startValue = dataZoomMinY
        option.dataZoom[2].endValue = dataZoomMaxY

        option.dataZoom[3].startValue = dataZoomMinY
        option.dataZoom[3].endValue = dataZoomMaxY

        // 设置心电图最大最小值
        option.yAxis.min = min
        option.yAxis.max = max

        // 设置心电图比例
        const lengthX = 200// x轴 单个格子 数据长度
        const yNum = 8// 初始 y轴 固定显示八个格子
        const cw = this.chart.getWidth() + 120
        const ch = this.chart.getHeight() - 50

        // ch/yNum 图表高度除以格子数 得到 每个格子 像素长度  cw除以格子像素长度 得到 该图表宽度下能显示多少个格子（X格子数）。然后 x格子数 乘以 lengthX（X轴格子数据长度） 得到 该图表宽度下一共能显示多少数据。
        const dataZoomMinX = cw / (ch / yNum) * lengthX

        // 设置X轴一页显示多少数据
        option.dataZoom[0].startValue = 0
        option.dataZoom[0].endValue = dataZoomMinX

        option.dataZoom[1].startValue = 0
        option.dataZoom[1].endValue = dataZoomMinX

        // 设置数据
        option.series[0].data = list
      })
      // const data = decode(res.heartRecord, res.os)
      // 设置 查看医生历史反馈的内容 按钮 如果有的话
      if (!this.report) {
        option.toolbox.feature.mySeeWord.show = false
      }
      return option
    },

    computeData(min, max, centerNum) {
      let dataZoomMaxY = 0
      let dataZoomMinY = 0

      if (centerNum + 2 > max && centerNum - 2 - (centerNum + 2 - max) >= min) {
        // 如果 上面无法 显示完全，但下方有有足够空间显示
        dataZoomMaxY = max
        dataZoomMinY = centerNum - 2 - (centerNum + 2 - max)
      } else if (centerNum + 2 > max && centerNum - 2 - (centerNum + 2 - max) < min) {
        // 如果 上面无法 显示完全，下方也无法显示完全
        dataZoomMaxY = centerNum + 2
        dataZoomMinY = centerNum - 2
        max = centerNum + 2
        min = centerNum - 2
      } else if (centerNum - 2 < min && centerNum + 2 + (centerNum - 2 - min) < max) {
        // 如果 下方无法显示完全，但上方可以显示完全
        dataZoomMaxY = centerNum + 2 + (min - (centerNum - 2))
        dataZoomMinY = min
      } else if (centerNum + 2 <= max && centerNum - 2 >= min) {
        // 如果 上下方都可以显示完全
        dataZoomMaxY = centerNum + 2
        dataZoomMinY = centerNum - 2
      }
      return { dataZoomMinY, dataZoomMaxY, min, max }
    },

    async getHeart() {
      const les = await getHeart({ heart_id: this.heartId })
      this.initChart(les.data)
    },

    //  图表相关操作方法
    myJia() {
      // 增益
      this.gainNum++
      this.gain(2)
    },
    myJian() {
      // 减益
      if (this.gainNum <= 0) {
        this.$notify({
          title: '已是原始数据，无法减益',
          type: 'warning'
        })
        return
      }
      this.gainNum--
      this.gain(0.5)
    },
    gain(coef) {
      // coef 为2 是增益，.5 为减益
      // 增益 减益 数据计算 设置
      const option = this.chart.getOption()
      const oldData = deepClone(option.series[0].data)
      let [minData, maxData, numAll] = [0, 0, 0]
      for (let i = 0; i < oldData.length; i++) {
        const data = parseFloat(oldData[i][1]) * coef
        data < minData ? minData = data : minData
        data > maxData ? maxData = data : maxData
        numAll += data
        oldData[i][1] = data.toString()
      }
      const centerNum = Math.round(numAll / oldData.length * 2) / 2
      const { dataZoomMinY, dataZoomMaxY, min, max } = this.computeData(minData, maxData, centerNum)

      option.dataZoom[2].startValue = dataZoomMinY
      option.dataZoom[2].endValue = dataZoomMaxY
      option.dataZoom[2].rangeMode = 'value'

      option.dataZoom[3].startValue = dataZoomMinY
      option.dataZoom[3].endValue = dataZoomMaxY
      option.dataZoom[3].rangeMode = 'value'

      option.yAxis[0].min = min
      option.yAxis[0].max = max

      option.series[0].data = oldData
      this.chart.setOption(option)
    },
    saveImg() {
      //  图表截图
      const img = this.chart.getConnectedDataURL(
        {
          type: 'png',
          pixelRatio: 1,
          backgroundColor: '#fff'
        }
      )
      this.$emit('appendImg', img)
    },
    myReversal() {
      // 心电图反转
      const option = this.chart.getOption()
      const list = deepClone(option.series[0].data)
      let [maxData, minData] = [0, 0]
      let numAll = 0

      for (const i in list) {
        list[i][1] = 0 - list[i][1]
        if (list[i][1] > maxData) {
          maxData = list[i][1]
        }
        if (list[i][1] < minData) {
          minData = list[i][1]
        }
        numAll += list[i][1]
      }
      minData = Math.floor(minData)
      maxData = Math.ceil(maxData)
      const centerNum = Math.round(numAll / list.length * 2) / 2

      const { dataZoomMinY, dataZoomMaxY, min, max } = this.computeData(minData, maxData, centerNum)

      option.dataZoom[2].startValue = dataZoomMinY
      option.dataZoom[2].endValue = dataZoomMaxY
      option.dataZoom[2].rangeMode = 'value'

      option.dataZoom[3].startValue = dataZoomMinY
      option.dataZoom[3].endValue = dataZoomMaxY
      option.dataZoom[3].rangeMode = 'value'

      option.yAxis[0].min = min
      option.yAxis[0].max = max

      option.series[0].data = list

      this.chart.setOption(option)
    },
    mySeeSmartWord() {
      // 打开智能报告
      if (!this.reportUrl || this.reportUrl.length <= 0) {
        this.$notify({
          title: '无智能报告！',
          type: 'warning'
        })
        return
      }
      window.open(this.reportUrl)
    },
    mySeeWord() {
      // 打开医生反馈报告
      if (this.report) {
        this.$emit('openDialog', this.report)
      } else {
        this.$notify({
          title: '无反馈报告！',
          type: 'warning'
        })
      }
    },
    brushSelected(params) {
      // 测量结果计算
      const chartOption = this.chart.getOption()
      if (params.batch[0].areas.length <= 0) {
        return
      }

      let [hc, sc, hr, maxL] = []

      // 判断是 矩形选框还是横向选框
      if (params.batch[0].areas[0].brushType === 'lineX') {
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
        const start = xList1[0]
        const end = xList1[1]

        hc = '横向差：' + Math.abs(start[0] - end[0]).toFixed(2) + ' ms'
        sc = '纵向差：' + Math.abs(start[1] - end[1]).toFixed(2) + ' mm/mv'
        hr = 'R点平均心律：' + parseInt(60 * 1000 / Math.abs(start[0] - end[0]).toFixed(2))

        maxL = hc.length > sc.length ? hc.length : sc.length
      } else if (params.batch[0].areas[0].brushType === 'rect') {
        const xl = params.batch[0].areas[0].coordRange[0]
        const yl = params.batch[0].areas[0].coordRange[1]

        hc = '横向差：' + Math.abs(xl[0] - xl[1]).toFixed(2) + ' ms'
        sc = '纵向差：' + Math.abs(yl[0] - yl[1]).toFixed(2) + ' mm/mv'
        hr = 'R点平均心律：' + parseInt(60 * 1000 / Math.abs(xl[0] - xl[1]).toFixed(2))

        maxL = hc.length > sc.length ? hc.length : sc.length
      }

      chartOption.graphic = {
        elements: [
          {
            type: 'group',
            width: maxL * 14,
            height: 56,
            right: 10,
            top: 60,
            z: 10001,
            children: [
              {
                type: 'rect',
                shape: {
                  x: 0,
                  y: 0,
                  width: maxL * 14,
                  height: 56
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
                left: 10,
                top: 68,
                style: {
                  text: hc + '\n' + sc + '\n' + hr,
                  fill: '#fff',
                  font: '16px'
                }
              }
            ]
          }
        ]
      }
      this.chart.setOption(chartOption)
    }
  }
}
</script>

<style scoped lang="scss">

  .is-error{
    border: 1px solid #666666;
  }
  .is-error-p{
    width: 100%;
    margin-top: 100px;
    text-align: center;
  }
  .heart-chart{
    width: 100%;
    height: 300px;
  }
</style>
