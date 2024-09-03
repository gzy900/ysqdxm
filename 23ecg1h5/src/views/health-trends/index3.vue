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
      <div id="charts" ref="charts" :style="canvasStyle"></div>
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
        title: '心电图',
        fromData: null,
        loading: false,
        listQuery: {
          s_id: this.$route.params.s_id,
          token: this.$route.params.token,
        },
        canvasStyle: {
          width: '',
          height: ''
        },

        // 心电图 格子参数
        cellSize: 25,  // 一个心电图格子大小
        cellLenX: 200,  // 一个心电图格子 X轴 承载的数据大小
        cellLenY: .5,  // 一个心电图格子 Y轴 承载的数据大小

        chartDom: null,

        seriesMove: -1,

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
        console.log(this.canvasStyle)
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

          const x = num * (1000 / 256)
          const y = item + (this.seriesMove * remainder)  // // 添加数据时给数据加上 系列 乘以 固定偏差 以 让其从上往下排列

          if (Array.isArray(dataList[remainder])) {
            dataList[remainder].push([x, y])
          } else {
            dataList[remainder] = []
            dataList[remainder].push([x, y])
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
          if (y > param[remainder].max) {
            param[remainder].max = y
          }
          if (y < param[remainder].min) {
            param[remainder].min = y
          }
          param[remainder].all += y

        })


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
              color: ['#d3d8d6']
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
              color: ['#e7e7e7']
            }
          },
        }

        // xAxis.data = xAxisData
        // xAxis.min = 0
        // xAxis.max = item.length * (1000 / 256)
        // xAxis.data = dataListX
        this.canvasStyle = this.handleCanvasSize(data.length / 12 * 200, param[0].max - param[11].min)

        console.log(this.canvasStyle)

        xAxis.min = 0
        xAxis.max = data.length / 12 * 200
        option.xAxis = xAxis


        const grid = {
          left: '0px',
          right: '1px',
          bottom: '1px',
          top: '0px'
        }
        option.grid = grid

        const yAxis = {
          type: 'value',
          axisLine: {
            onZero: false,
            show: false,
          },
          min: -10,
          max: 6,
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
              color: ['#d3d8d6']
            }
          },
          minorSplitLine: {
            show: true,
            lineStyle: {
              color: ['#e7e7e7']
            }
          }
        }

        yAxis.min = param[11].min
        yAxis.max = param[0].max
        option.yAxis = yAxis


        dataList.forEach((item, index) => {
          const series = {
            type: 'line',
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#7fc4b3'
                }
              }
            },
            label: {
              show: false
            },
            sampling: 'lttb',
            zlevel: 99,
            connectNulls: false,
          }
          // const data = []
          // item.forEach((item, index) => {
          //   data.push([index * (1000 / 200), item])
          // })
          series.data = item
          option.series.push(
            series
          )
        })


        this.$nextTick(() => {
          this.initCharts(option)

        })
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

      handleCanvasSize(xMax, yMax) {
        return {
          width: (xMax / this.cellLenX * this.cellSize) + 'px',
          height: (yMax / this.cellLenY * this.cellSize) + 'px'
        }   // canvas 大小
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
    overflow-x: auto;
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
    /*width: 100%;*/
    /*height: 100%;*/
  }
</style>
