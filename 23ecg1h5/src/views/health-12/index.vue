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
    <p class="input" v-show="inputShow">
      <el-input v-model="value"/>
      <button @click="confirmInput">确认</button>
    </p>
    <p class="txt">
      纸速：25mm/s 灵敏度：10mm/mv
    </p>
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
        value: '',
        inputShow: false,
        inputUpdateName: '',
        coordRange: null,
        listQuery: {
          s_id: '05385b1dd8e741a29b8da72880a9bf55',
          token: 'af955d8f81592f9af8cedd5b2c982772',
        },

        // listQuery: {
        //   s_id: this.$route.params.s_id,
        //   token: this.$route.params.token,
        // },
        //


        // 心电图 格子参数
        cellSize: 30,  // 一个心电图格子大小
        cellLenX: 200,  // 一个心电图格子 X轴 承载的数据大小
        cellLenY: .5,  // 一个心电图格子 Y轴 承载的数据大小

        seriesMove: 2,

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
        const data = decode(res.data.long_data, '1')
        res = null
        this.initChartsData(data)
      },
      // 初始化图表
      initCharts(option) {
        this.chart = _echarts.init(document.getElementById('charts'))
        this.chart.setOption(option)
        this.chart.on('brushEnd', this.brushSelected)
        this.chart.on('click', {seriesName: 'tagging'}, this.handleClickTagging);
      },
      handleClickTagging(event) {
        event = event || {}
        this.inputUpdateName = event.name
        this.inputShow = true
      },

      brushSelected(params) {
        if (!params.areas && params.areas.length <= 0) {
          return
        }
        this.coordRange = params.areas[0].coordRange
        this.inputUpdateName = ''
        this.inputShow = true

      },
      confirmInput() {
        this.inputShow = false
        this.chart.dispatchAction({
          type: 'brush',
          areas: []
        })
        const option = this.chart.getOption()

        let addOption = {}
        let isTagging = false
        option.series.forEach((item) => {
          if (item.id === 'tagging') {
            isTagging = true
            addOption = {
              series: [
                item
              ]
            }
          }
        })
        if (!isTagging) {
          addOption = {
            series: [
              {
                type: 'line',
                id: 'tagging',
                name: 'tagging',
                markArea: {
                  data: []
                }
              }
            ]
          }
        }
        const taggingList = addOption.series[0].markArea.data
        if (this.inputUpdateName.length > 0) {
          taggingList.forEach((item) => {
            console.log(item)
            if (item[0].name === this.inputUpdateName) {
              item[0].name = this.value
            }
          })

        } else {
          taggingList.push(
            [
              {
                name: this.value,
                coord: [this.coordRange[0]],
                itemStyle: {
                  color: 'rgba(255,255,255,0)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 1
                },
                label: {
                  show: true,
                  position: 'insideTop',
                  distance: 10,
                  offset: [0, 0]
                },
              },
              {
                coord: [this.coordRange[1]],
              },
            ]
          )
        }
        this.chart.setOption(addOption)
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

          const y = item

          if (Array.isArray(dataList[remainder])) {
            dataList[remainder].push(y)
          } else {
            dataList[remainder] = []
            dataList[remainder].push(y)
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
            show: false,

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

        const grid = {
          left: '0px',
          right: '1px',
          bottom: '45px',
          top: '0px',
        }
        const yAxis = {
          type: 'value',
          axisLine: {
            onZero: false,
            show: false,
          },
          min: -10,
          max: 6,
          minInterval: 2,
          axisLabel: {
            show: false,
          },
          inverse: true,
          interval: 0.5,
          // splitNumber: 10,
          axisTick: {
            show: false
          },
          gridIndex: 0,
          scale: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#d3d8d6']
            },
          },
          minorSplitLine: {
            show: true,
            lineStyle: {
              color: ['#e7e7e7']
            }
          }
        }

        const {lenCellX, lenCellY} = this.handlePageDataLen()
        const height = document.body.clientHeight

        option.dataZoom[0].startValue = -400
        option.dataZoom[0].endValue = lenCellX - 400
        option.dataZoom[1].endValue = lenCellY
        option.dataZoom[1].startValue = 0
        option.dataZoom[2].top = height - 45
        option.dataZoom[2].endValue = lenCellX

        xAxis.min = -400
        xAxis.max = data.length / 12 * 1000 / 64
        option.xAxis = xAxis

        yAxis.min = 0
        yAxis.max = this.seriesMove * 12
        option.yAxis = yAxis

        option.grid = grid


        dataList.forEach((item, index) => {

          const positionCenter = (index * this.seriesMove) + (this.seriesMove * .5)   // 计算 十二导联 心电图应处于的位置
          const dataMove = positionCenter - (param[index].all / item.length)    // 计算 十二导联 心电图 目前的数据位置与 其应处于的位置的偏差

          const itemLogoMove = index * this.seriesMove
          const newItem = [[-380, 1.2 + itemLogoMove], [-270, 1.2 + itemLogoMove], [-270, .2 + itemLogoMove], [-160, .2 + itemLogoMove], [-160, 1.2 + itemLogoMove], [-50, 1.2 + itemLogoMove], [-1, null]]
          item.forEach((item_data, index) => {
            newItem.push([index * 1000 / 64, parseFloat((item_data + dataMove).toFixed(2))])
          })

          const series = {
            type: 'line',
            name: 'data',
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#7fc4b3'
                }
              }
            },
            label: {
              show: true,
              formatter: '123'
            },
            animation: false,
            markArea: {
              silent: true,
              data: [
                [
                  {
                    name: this.chartsName[index],
                    yAxis: index * this.seriesMove,
                  },
                  {
                    yAxis: (index + 1) * this.seriesMove
                  }
                ],
                // [
                //   {
                //     name: '医生选框标注',
                //     xAxis: 1000,
                //     itemStyle: {
                //       color: '#000'
                //     },
                //     label: {
                //       show: true,
                //       position: 'insideTop',
                //       distance: 10,
                //       offset: [0, 0]
                //     },
                //   },
                //   {xAxis: 2000},
                // ]
              ],

              label: {
                show: true,
                position: 'insideTopLeft',
                distance: 10,
                offset: [24, 0]
              },
              itemStyle: {
                color: 'rgba(0,0,0,0)'
              },
              z: 999
            },
            // sampling: 'lttb',
            connectNulls: false,
          }
          // const data = []
          // item.forEach((item, index) => {
          //   data.push([index * (1000 / 200), item])
          // })
          series.data = newItem
          option.series.push(
            series
          )
        })

        // option.series[11].markArea =


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
        this.touch = false
      },

      handlePageDataLen() {
        const width = document.body.clientWidth
        const height = document.body.clientHeight
        const cellX = width / this.cellSize
        const cellY = height / this.cellSize   // 一个格子固定 像素  ，屏幕宽高 除以 格子像素 等于 显示多少个格子。

        return {lenCellX: cellX * this.cellLenX, lenCellY: cellY * this.cellLenY}   // 返回X轴与Y轴总共能显示的数据
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
    height: 100%;
  }
  
  .txt {
    width: 100%;
    line-height: 30px;
    font-size: 14px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: right;
    color: #676767;
    padding: 0 10px;
  }
  
  .input {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
  }
</style>
