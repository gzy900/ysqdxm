<!--
info: 心率失常（QTC,HR,QRS），心脏负荷(SDN,HR,PSI)，血压(高压，低压，心率)，BMI(BMI)
author:wanq
time:2020-08-03 17:15:48
-->
<template>
  <div class="charts"
       v-loading="loading"
       element-loading-text="正在加载数据..."
       element-loading-background="rgba(0, 0, 0, 0.6)">
    
    <div class="charts-body">
      <div id="charts" ref="charts"></div>
    </div>
    <!--    <div-->
    <!--      class="charts-dataZoom"-->
    <!--      ref="charts-dataZoom"-->
    <!--      @touchstart.prevent="handleTouchStart"-->
    <!--      @touchmove="handleTouchMove"-->
    <!--      @touchend="handleTouchEnd"-->
    <!--    >-->
    <!--      <p-->
    <!--        ref="charts-dataZoom-p"-->
    <!--        :style="'transform: translateX('+ dataZoomX +'px);'"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>

<script>
  import {option as options} from "./js/chartsOption";
  import _echarts from 'echarts'
  // const chart = require('echarts');
  import {getList} from '../../api/health-trends'
  import {decode} from '../../utils/pako'
  import {deepClone} from "../../utils";


  export default {
    metaInfo() {
      return {
        title: this.title,
      }
    },
    name: "arrhythmia",
    data() {
      return {
        title: '健康趋势',
        fromData: null,
        loading: false,
        listQuery: {
          s_id: this.$route.params.s_id,
          token: this.$route.params.token,
        },

        touch: false,
        oldPageX: 0,
        dataZoomX: 0,
        dataZoomXMax: 0,
        chartsName: [
          'Ⅰ',
          'Ⅱ',
          'Ⅲ',
          'AVR',
          'AVL',
          'AVF',
          'V1',
          'V2',
          'V3',
          'V4',
          'V5',
          'V6',
        ]
      }
    },
    computed: {},
    created() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroy() {
    },
    mounted() {
      // this.dataZoomXMax = this.$refs['charts-dataZoom'].clientWidth - this.$refs['charts-dataZoom-p'].clientWidth
      this.getList()
    },

    methods: {
      async getList() {
        let res = await getList(this.listQuery)
        const data = decode(res.data.ecg_data, '1')
        res = null
        this.initChartsData(data)
      },
      // 初始化图表
      initCharts(option) {
        this.chart = _echarts.init(document.getElementById('charts'))
        console.log(option)
        this.chart.setOption(option)
      },
      // 初始化图表数据
      initChartsData(data) {
        const option = deepClone(options)
        const dataList = []
        const param = []
        data = data || []
        data.forEach((item, index) => {
          const num = Math.floor(index / 12)  //  取整除，整除代表位置
          const remainder = index % 12  //  取余数，余数代表第几导联

          if (Array.isArray(dataList[remainder])) {
            dataList[remainder].push([num * (1000 / 256), item])
          } else {
            dataList[remainder] = []
            dataList[remainder].push([num * (1000 / 256), item])
          }

          if (num === 0) {
            param[remainder] = {
              min: 0,
              max: 0,
              in: 0,
              all: 0
              // all: window.BigInt(0)
            }
          }
          if (item > param[remainder].max) {
            param[remainder].max = item
          }
          if (item < param[remainder].min) {
            param[remainder].min = item
          }
          param[remainder].all += item

        })

        dataList.forEach((item, index) => {
          const series = {
            type: 'line',
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#558d0b'
                }
              }
            },
            label: {
              show: false
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            sampling: 'lttb',
            zlevel: 99,
            connectNulls: false,
          }
          const xAxis = {
            type: 'value',
            interval: 200,
            min: 'dataMin',
            max: 'dataMax',
            gridIndex: 0,

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
              onZero: false,
              show: false
            },
            axisTick: {
              show: false
            },
            minorSplitLine: {
              show: true,
              lineStyle: {
                color: ['#eed4d2']
              }
            },
            data: []
          }

          const yAxis = {
            type: 'value',
            axisLine: {
              onZero: false,
              show: false,
            },
            min: -2,
            max: 2,
            axisLabel: {
              show: false
            },
            interval: 0.5,
            // splitNumber: 10,
            axisTick: {
              show: false
            },
            gridIndex: 0,
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
                color: ['#eed4d2']
              }
            }
          }

          const dataZoom = {
            show: false,
            zoomLock: true,
            type: 'inside',
            zoomOnMouseWheel: 'alt',
            yAxisIndex: 0,
            rangeMode: 'value',
            filterMode: 'empty',
            throttle: '0',
            // startValue: -2,
            // endValue: 2,
            preventDefaultMouseMove: true
          }

          const grid = {
            left: '1px',
            right: '1px',
            bottom: '1px',
            height: '240px',

            top: '300px',
          }

          const {dataZoomMinY, dataZoomMaxY} = this.handleDataZoom(param[index].min, param[index].max, param[index].all / item.length)
          // console.log(dataZoomMinY + '---' + dataZoomMaxY)

          dataZoom.yAxisIndex = index
          dataZoom.startValue = dataZoomMinY
          dataZoom.endValue = dataZoomMaxY
          option.dataZoom.push(dataZoom)

          // xAxis.data = xAxisData
          xAxis.gridIndex = index
          xAxis.min = 0
          xAxis.max = item.length * (1000 / 256)
          option.xAxis.push(xAxis)

          grid.top = (index * 260) + 'px'
          option.grid.push(grid)

          yAxis.gridIndex = index
          yAxis.min = dataZoomMinY
          yAxis.max = dataZoomMaxY
          // yAxis.min = param[index].min
          // yAxis.max = param[index].max
          option.yAxis.push(yAxis)

          const dataZoomX = this.handleDataZoomX()
          option.dataZoom[0].endValue = dataZoomX

          // const data = []
          // item.forEach((item, index) => {
          //   data.push([index * (1000 / 200), item])
          // })
          series.data = item
          series.xAxisIndex = index
          series.yAxisIndex = index
          option.series.push(
            series
          )
        })


        this.initCharts(option)
      },


      handleTouchStart(e) {
        this.oldPageX = e.touches[0].pageX || e.changedTouches[0].pageX || e.targetTouches[0].pageX
        this.touch = true
      },
      handleTouchMove(e) {
        if (this.touch === true) {
          const pageX = e.touches[0].pageX || e.changedTouches[0].pageX || e.targetTouches[0].pageX

          this.setDateZoomX(this.oldPageX - pageX)
          this.oldPageX = pageX
        }
      },
      handleTouchEnd() {
        console.log('end')
        this.touch = false
      },

      handleDataZoomX() {
        const deviation = 2
        const height = 240
        const width = document.body.clientWidth
        const itemData = 200

        const itemHeight = height / (deviation * 2 * 2)  // 获取Y轴每个单元格的高度，一共有 偏移量 * 2 * 2 的格子 因为 上下各自偏移 并且 每 .5 画出一个格子，
        const widthItemNum = width / itemHeight  // 正方形格子， X轴与Y轴格子宽度相同，算出X轴一共画出多少格子。
        const dataZoomX = itemData * widthItemNum  // x轴格子 数据显示为每格 200，乘以X轴 可显示的格子数得到X轴一页共显示多少数据。并返回
        return dataZoomX
      },
      handleDataZoom(min, max, centerNum) {
        let dataZoomMaxY = 0
        let dataZoomMinY = 0

        const deviation = 2   //偏移量

        if (centerNum + deviation > max && centerNum - deviation - (centerNum + deviation - max) >= min) {
          // 如果 上面无法 显示完全，但下方有有足够空间显示
          dataZoomMaxY = max
          dataZoomMinY = centerNum - deviation - (centerNum + deviation - max)
        } else if (centerNum + deviation > max && centerNum - deviation - (centerNum + deviation - max) < min) {
          // 如果 上面无法 显示完全，下方也无法显示完全
          dataZoomMaxY = centerNum + deviation
          dataZoomMinY = centerNum - deviation
          max = centerNum + deviation
          min = centerNum - deviation
        } else if (centerNum - deviation < min && centerNum + deviation + (centerNum - deviation - min) < max) {
          // 如果 下方无法显示完全，但上方可以显示完全
          dataZoomMaxY = centerNum + deviation + (min - (centerNum - deviation))
          dataZoomMinY = min
        } else if (centerNum + deviation <= max && centerNum - deviation >= min) {
          // 如果 上下方都可以显示完全
          dataZoomMaxY = centerNum + deviation
          dataZoomMinY = centerNum - deviation
        }
        return {dataZoomMinY, dataZoomMaxY}
      },
      setDateZoomX(x) {
        this.dataZoomX -= x
        if (this.dataZoomX < 0)
          this.dataZoomX = 0
        // if (this.dataZoomX > this.dataZoomXMax) {
        //   this.dataZoomX = this.dataZoomXMax
        // }
      }
    }
  }

</script>

<style scoped lang="css">
  .charts {
    width: 100%;
    height: 100%;
    position: relative;
    
  }
  
  .charts-body {
    width: 100%;
    /*height: calc(100% - 50px);*/
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .charts-dataZoom {
    /*width: calc(100% - 20px);*/
    /*margin: 0 10px;*/
    width: calc(100%);
    margin: 0 0px;
    height: 50px;
    border: 1px solid rgba(74, 175, 246, .5);
    overflow: hidden;
    background-color: rgba(74, 175, 246, .5);
  }
  
  .charts-dataZoom p {
    width: 10%;
    height: 100%;
    background-color: #ffffff;
  }
  
  #charts {
    width: 100%;
    height: 3300px;
    /*height: 100%;*/
  }
</style>
