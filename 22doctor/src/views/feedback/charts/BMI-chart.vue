<template>
  <div>
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

    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import _echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import { getList } from '@/api/BMI-chart'
import { parseTime } from '@/utils/index'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chartBMI'
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
      chart: null,
      listQuery: {
        pageNo: 1,
        number: 10,
        beginTime: '',
        endTime: ''
      },

      // 图表相关
      pageNumber: [],
      pageSize: 0,
      isLoad: false,
      batch: 0,
      batchStart: 0,
      batchEnd: 0,
      dataRudder: 0,

      sourceTimeData: [],
      bmi: [],

      chartsOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        toolbox: {
          feature: {
            mySaveImg: {
              show: true,
              title: ' ',
              icon: 'path://M939.625 882.402c12.7 0 23.062-10.467 23.062-23.165v-500H916.53V787.648c0 26.793-21.734 48.563-48.493 48.563H104.99c-26.758 0-48.492-21.77-48.492-48.563v-715.462c0-26.791 21.733-48.563 48.492-48.563h428.587v-46.19H33.437c-12.732 0-23.096 10.468-23.096 23.165V859.237c0 12.698 10.362 23.165 23.096 23.165h906.188M821.719 312.842V121.94h190.796v-46.051H821.719v-190.902h-46.156V75.891H584.766v46.051h190.797v190.9h46.156m-508.06 377.34h0.35l0.174-0.14c9.209-15.071 81.601-134.386 137.455-226.766l20.232-33.214 21.421 32.375a40966.633 40966.633 0 0 0 77.241 116.942c22.256-33.631 115.058-174.295 143.314-217.276H114.175c17.723 30.144 189.471 312.868 198.683 327.798 0 0.001 0.172 0.281 0.801 0.281',
              onclick: this.saveImg
            }
          }
        },
        axisPointer: {
          link: { xAxisIndex: 'all' }
        },

        title: {
          text: 'BMI',
          subtext: 'M.A.I.L',
          left: 'center'
        },

        grid: [
          {
            left: 30,
            right: 20,
            height: '160px'
          }
        ],
        // visualMap: {
        //   type: 'piecewise',
        //   show: false,
        //   pieces: [
        //     {lt: 18.4,  color: 'rgba(84, 190, 208, 1)'},
        //     {lt: 23.9,  color: 'rgba(142, 187, 48, 1)'},
        //     {lt: 27.9,  color: 'rgba(255, 176, 52, 1)'},
        //     {gt: 27.9,  color: 'rgba(252, 115, 54, 1)'},
        //   ]
        // },

        dataZoom: [
          {
            show: false,
            type: 'inside',
            realtime: true,
            startValue: 10,
            endValue: 20,
            rangeMode: 'value',
            xAxisIndex: 0
          }
        ],

        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            boundaryGap: false,
            axisLine: { onZero: false }
            // data: this.timeData  //数据，稍后配置
          }
        ],
        yAxis: [
          {
            name: 'BMI(身高体重比²)',
            type: 'value',
            min: 10,
            max: 40,
            nameTextStyle: {
              align: 'left'
            }
            // max: 10
          }
        ],
        series: [
          {
            markArea: {
              silent: true,
              data: [
                [
                  {
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '偏低',
                    itemStyle: {
                      color: {

                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(84, 190, 208, 1)' // 0% 处的颜色
                        }],
                        global: false
                      }
                    }
                  },
                  {
                    yAxis: 18.4
                  }
                ],
                [{
                  label: {
                    show: true,
                    position: 'inside'
                  },
                  name: '正常',
                  yAxis: 18.4,
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: 'rgba(142, 187, 48, 1)' // 0% 处的颜色
                      }],
                      global: false
                    }
                  }
                }, {
                  yAxis: 23.9
                }],
                [{
                  label: {
                    show: true,
                    position: 'inside'
                  },
                  name: '偏胖',
                  yAxis: 23.9,
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: 'rgba(255, 176, 52, 1)' // 0% 处的颜色
                      }],
                      global: false
                    }
                  }
                }, {
                  yAxis: 27.9
                }],
                [{
                  label: {
                    show: true,
                    position: 'inside'
                  },
                  name: '肥胖',
                  yAxis: 27.9,
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: 'rgba(252, 115, 54, 1)' // 0% 处的颜色
                      }],
                      global: false
                    }
                  }
                }, {}]
              ]
            },
            itemStyle: {
              color: function(param) {
                let color = ''
                if (param.value <= 18.4) {
                  color = 'rgba(84, 190, 208, 1)'
                }
                if (param.value > 18.4 && param.value <= 23.9) {
                  color = 'rgba(142, 187, 48, 1)'
                }
                if (param.value > 23.9 && param.value <= 27.9) {
                  color = 'rgba(255, 176, 52, 1)'
                }
                if (param.value > 27.9) {
                  color = 'rgba(252, 115, 54, 1)'
                }
                return color
              }
            },

            name: 'BMI',
            type: 'line',
            symbolSize: 6,
            hoverAnimation: false
            // itemStyle: {
            //   normal: {
            //     color: 'rgba(84, 190, 208, 1)',
            //   }
            // },
            // lineStyle: {
            //   color: '#ddd' //改变折线颜色
            // }

            // data: this.qtcData   //数据，稍后配置
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {

    // 搜索
    handleSearch() {
      this.sourceTimeData = []
      this.bmi = []
      this.listQuery.pageNo = 1
      this.pageNumber = []
      this.getList()
    },

    initChart() {
      if (this.row) {
        this.chartsOption.series[0].markPoint = {
          data: [
            {
              name: '当前坐标',
              yAxis: this.row.BMI,
              xAxis: parseTime(this.row.releasetime, '{y}-{m}-{d} {h}:{i}'),
              value: '当前数据'
            }
          ]
        }
      } else {
        this.initTime()
      }

      this.chart = _echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.chartsOption)
      this.getList()

      const self = this
      this.chart.on('datazoom', function(param) {
        if (!param) {
          return
        }

        let zoom
        if (param.batch) {
          zoom = param.batch[0]
        }

        if (param.start !== undefined) {
          zoom = param
        }

        if (parseInt(zoom.start - zoom.end) !== self.batch) {
          self.batch = parseInt(zoom.start - zoom.end)
          return
        }

        // 如果 此时可以加载数据 && 左侧坐标 小于 0 && 左侧坐标 小于 上次的左侧坐标
        if (!self.isLoad && zoom.start <= 0 && zoom.start < self.batchStart) {
          self.dataRudder = 0
          if (self.pageNumber[0] === self.pageSize) {
            self.alert('已经是最早的数据了！')
            return
          }
          self.listQuery.pageNo = self.pageNumber[0] + 1

          self.getList()
        }
        // 如果 此时可以加载数据 && 右侧坐标 大于 100 && 右侧坐标 大于 上次的右侧坐标
        if (!self.isLoad && zoom.end >= 100 && zoom.end > self.batchEnd) {
          self.dataRudder = 1
          if (self.pageNumber[self.pageNumber.length - 1] === 1) {
            self.alert('已经是最新的数据了！')
            return
          }
          self.listQuery.pageNo = self.pageNumber[self.pageNumber.length - 1] - 1

          self.getList()
        }

        // self.isLoad = true;  // 不能同时发起多次请求，请求时将此变量置为 true ，请求完成后置为 false;
        self.batchStart = zoom.start
        self.batchEnd = zoom.end
      })
    },

    initTime() {
      const data = new Date('2020-11-15')
      const dayTime = 1000 * 60 * 60 * 24
      const currentTime = data.getTime()
      const week = data.getDay()

      if (week === 0) {
        this.listQuery.beginTime = parseTime(currentTime - dayTime * (7 + 6), '{y}-{m}-{d}')
        this.listQuery.endTime = parseTime(currentTime - dayTime * 7, '{y}-{m}-{d}')
      } else {
        this.listQuery.beginTime = parseTime(currentTime - dayTime * (week + 6), '{y}-{m}-{d}')
        this.listQuery.endTime = parseTime(currentTime - dayTime * week, '{y}-{m}-{d}')
      }
    },

    getList() {
      return new Promise((resolve, reject) => {
        getList({ ...this.listQuery, uuid: this.uuid })
          .then(response => {
            if (response.data) {
              // this.$notify({
              //   title: '数据查询成功',
              //   type: 'success'
              // })
              this.setOption(response.data.dataList)
              this.pageSize = response.data.pageSize
              this.isLoad = false
            } else {
              this.$notify({
                title: response.msg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    setOption(dataList) {
      const [bmiList, timeList] = [[], [], [], []]
      for (let i = dataList.length - 1; i >= 0; i--) {
        bmiList.push(dataList[i].BMI)
        timeList.push(parseTime(dataList[i].releasetime, '{y}-{m}-{d} {h}:{i}'))
      }

      this.setPageNumber([
        {
          metaData: this.bmi,
          newData: bmiList
        },
        {
          metaData: this.sourceTimeData,
          newData: timeList
        }
      ])
      this.chart.setOption(
        {
          dataZoom: [
            {
              startValue: dataList.length,
              endValue: dataList.length + 10,
              rangeMode: 'value'
            }
          ],
          xAxis: [
            {
              data: this.arrayMerge(this.sourceTimeData)
            }
          ],
          series: [
            {
              data: this.arrayMerge(this.bmi)
            }
          ]
        }, {
          notMerge: false
        }
      )
    },

    // 数组合并
    arrayMerge(list) {
      let reList = []
      for (let i = 0; i < list.length; i++) {
        reList = [...reList, ...list[i]]
      }
      return reList
    },

    saveImg(point) {
      const img = this.chart.getConnectedDataURL(
        {
          type: 'png',
          pixelRatio: 1,
          backgroundColor: '#fff'
        }
      )
      this.$emit('appendImg', img)
    },

    alert(msg) {
      this.$notify({
        title: msg,
        type: 'warning'
      })
    },

    // 得到数据后排列
    setPageNumber(list = []) {
      // 如果是向左边添加数据的话
      if (this.dataRudder === 0) {
        // 循环传过来的list数据 从头部（左）添加
        for (let i = 0; i < list.length; i++) {
          list[i].metaData.unshift(list[i].newData)
        }

        // 将 当前页码从头部（左） 添加进数组
        this.pageNumber.unshift(this.listQuery.pageNo)

        // 如果页码超过3页
        if (this.pageNumber.length > 3) {
          // 循环删除最右边的数据
          for (let i = 0; i < list.length; i++) {
            list[i].metaData.pop()
          }

          // 删除最右边的页码
          this.pageNumber.pop()
        }
      } else {
        // 如果是向右边添加数据的话

        // 循环数据从尾部 （右）添加
        for (let i = 0; i < list.length; i++) {
          list[i].metaData.push(list[i].newData)
        }

        // 将 当前页码从尾部（右） 添加进数组
        this.pageNumber.push(this.listQuery.pageNo)

        // 如果页码超过3页
        if (this.pageNumber.length > 3) {
          // 循环删除最左边（头）的数据
          for (let i = 0; i < list.length; i++) {
            list[i].metaData.shift()
          }

          // 删除最左边（头）的页码
          this.pageNumber.shift()
        }
      }
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
    }
  }
}
</script>
