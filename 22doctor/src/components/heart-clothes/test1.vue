<template>
  <div class="main">
    <div class="header">
      <!--    读取本地文件容器-->
      <input id="files" ref="file" type="file" style="display: none" @change="handlePreview">
      <el-button type="primary" size="small" @click="handleOpenFile">
        读取文件
      </el-button>
      <el-button type="primary" size="small" @click="initChart">
        渲染
      </el-button>
    </div>
    <div class="body">
      <el-tabs v-model="tabValue" type="border-card">
        <el-tab-pane name="tagging" label="完整心电图">
          <div id="chart" />
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { getInfo } from '@/api/heart-clothes'
import pako from 'pako'

import { option as options } from './js/chartsOption'
// import _echarts from 'echarts'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as _echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
  LineChart
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  MarkAreaComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
  CanvasRenderer
} from 'echarts/renderers'
import { deepClone } from '@/utils'

// 注册必须的组件
_echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, DataZoomComponent, MarkAreaComponent]
)

let chart = null
let sDataList = null
export default {
  name: 'Test',
  data() {
    return {
      tabValue: 'tagging',
      infoQuery: {
        l_id: 'c50476cfc594469cbb0859a528989e10',
        serial_number: -1
      },
      defaultData: null,
      chart: null,

      // 心电图 格子参数
      cellSize: 30, // 一个心电图格子大小
      cellLenX: 200, //  一个心电图格子 X轴 承载的数据大小
      cellLenY: 0.5, // 一个心电图格子 Y轴 承载的数据大小
      rate: 256, // 采样率， 一秒钟 64 个数据点
      seriesMove: 2,
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
        'V6'
      ]
    }
  },
  created() {
  },
  methods: {

    loop() {
      sDataList = []
      for (let len = 0; len < 24; len++) {
        sDataList.push([])
      }

      // for (let i = 0; i < this.defaultData.length - 1; i++) {
      //   this.decode(this.defaultData[i], i)
      // }
      for (let i = 0; i < 1; i++) {
        this.decode(this.defaultData[i], i)
      }
      chart = _echarts.init(document.getElementById('chart'))

      // this.initChart()
      // const file = new Blob(sDataList)
      // console.log(file)
    },
    decode(encodedData, longDataNum) {
      console.log('开始解压数据' + longDataNum)
      console.log(new Date().getTime())

      const decodedData = window.atob(encodedData)

      // 字符串转数组 在循环返回一个 Unicode表所在位置的新数组
      const charData = decodedData.split('').map(x => x.charCodeAt(0))

      // Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
      const binData = pako.inflate(new Uint8Array(charData))

      // 调用pako 解析
      // return pako.inflate(binData)

      console.log('解压结束，洗数据开始' + longDataNum)
      console.log(new Date().getTime())

      const seriesMove = 2
      const rate = 256

      const encodedList = Array.from(binData)

      const data = []
      const param = []

      for (let d_l = 0; d_l < 12; d_l++) {
        data.push([])
        param.push(0)
      }

      let pointI = 0
      for (let i = 0; i < encodedList.length; i += 2) {
        const listOne = encodedList[i]
        const item = 0 - ((listOne + (encodedList[i + 1] * 256)) / 102)

        const remainder = (i % 16) / 2 //  取余数，余数代表第几导联
        const diff = remainder <= 1 ? remainder : remainder + 4
        if (diff === 0) {
          pointI = item
        }
        if (diff === 1) {
          // 在第二导联计算 III VR VL VF 导联的数据
          const pointIII = item - pointI
          const pointVR = -(item + pointI) / 2
          const pointVL = (pointI - (item - pointI)) / 2
          const pointVF = (item + (item - pointI)) / 2

          data[2].push(pointIII)
          data[3].push(pointVR)
          data[4].push(pointVL)
          data[5].push(pointVF)

          param[2] += pointIII
          param[3] += pointVR
          param[4] += pointVL
          param[5] += pointVF
        }
        data[diff].push(item)
        param[diff] += item
      }

      const data_length = data[0].length
      const reduce = 2
      const threshold = Math.floor(data_length / reduce)
      const every = data_length / threshold

      data.forEach((item, index) => {
        const sampled = []
        const sampledX = []
        let sampled_index = 0
        let a = 0
        let max_area_point // 目前面积最大的点y坐标
        let max_area_point_x // 目前面积最大的点x坐标
        let max_area
        let area
        let next_a
        const positionCenter = (index * seriesMove) + (seriesMove / 2) // 计算 十二导联 心电图应处于的位置
        const dataMove = positionCenter - (param[index] / data_length) // 计算 十二导联 心电图 目前的数据位置与 其应处于的位置的偏差

        sampledX[sampled_index] = 0
        sampled[sampled_index++] = item[a] + dataMove

        for (let i = 0; i < threshold - 2; i++) {
          let avg_x = 0
          let avg_y = 0
          let avg_range_start = Math.floor((i + 1) * every) + 1 // 第三个点的开始的 下标
          let avg_range_end = Math.floor((i + 2) * every) + 1 // 第三个点的结束的 下标
          avg_range_end = avg_range_end < data_length ? avg_range_end : data_length // 第三个点结束的下标不能大于源数据长度
          const avg_range_length = avg_range_end - avg_range_start
          for (; avg_range_start < avg_range_end; avg_range_start++) {
            avg_x += (avg_range_start * 1000 / 256)
            avg_y += item[avg_range_start] * 1
          }
          avg_x /= avg_range_length // 求的 第三个点的 平均X值
          avg_y /= avg_range_length // 求的 第三个点的 平均y值
          let range_offs = Math.floor((i + 0) * every) + 1
          const range_to = Math.floor((i + 1) * every) + 1
          const point_a_x = a * 1000 / 256 //  横坐标
          const point_a_y = item[a] * 1
          max_area = area = -1
          for (; range_offs < range_to; range_offs++) {
            area = Math.abs((point_a_x - avg_x) * (item[range_offs] - point_a_y) -
              (point_a_x - range_offs) * (avg_y - point_a_y)
            ) * 0.5
            if (area > max_area) {
              max_area = area
              max_area_point = item[range_offs] + dataMove
              max_area_point_x = (range_offs * 1000 / 256) + (longDataNum * 1000 * 60 * 10)
              next_a = range_offs
            }
          }
          sampledX[sampled_index] = max_area_point_x
          sampled[sampled_index++] = max_area_point
          a = next_a
        }
        sampledX[sampled_index] = ((data_length - 1) * 1000 / 256) + (longDataNum * 1000 * 60 * 10) // 此处还需检查，需要添加以十分钟为节点的偏移量
        sampled[sampled_index++] = item[data_length - 1] + dataMove
        sDataList[index * 2] = sDataList[index * 2].concat(sampled)
        sDataList[index * 2 + 1] = sDataList[index * 2 + 1].concat(sampledX)

        // item.forEach((item_data, i_index) => {
        //   const num = Math.floor(i_index / (rate * 20))
        //   // [Math.floor(i_index * 1000 / rate) + longDataNum * 1000 * 60 * 10, Math.floor(item_data + dataMove)]
        // })
      })
      console.log('方法结束')
      console.log(new Date().getTime())

      // 压缩
      // const deData = pako.deflate(JSON.stringify(data))
      // const btoaData = window.btoa(deData)
      // console.log(btoaData)
      // sDataList.push(btoaData)
      // return []
    },

    initChart() {
      const option = deepClone(options)
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
            color: '#d3d8d6'
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
            color: '#e7e7e7'
          }
        }
      }

      const grid = {
        left: '0px',
        right: '1px',
        bottom: '45px',
        top: '0px'
      }
      const yAxis = {
        type: 'value',
        axisLine: {
          onZero: false,
          show: false
        },
        min: -10,
        max: 6,
        minInterval: 0.5,
        axisLabel: {
          show: false
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
            color: '#d3d8d6'
          }
        },
        minorSplitLine: {
          show: true,
          lineStyle: {
            color: '#e7e7e7'
          }
        }
      }
      const dimensions = []
      this.chartsName.forEach((item) => {
        dimensions.push(
          { name: item, type: 'float' }
        )
        dimensions.push(
          { name: item + 'x', type: 'float' }
        )
      })
      const dataset = {
        dimensions: dimensions,
        source: sDataList,
        sourceHeader: false
      }
      option.dataset = dataset

      const { lenCellX, lenCellY } = this.handlePageDataLen()
      this.lenCellX = lenCellX
      const height = chart.getHeight()

      // option.dataZoom[0].startValue = -400
      // option.dataZoom[0].endValue = lenCellX - 400  // 心电图开始标记 预留的位置

      option.dataZoom[0].startValue = 0
      option.dataZoom[0].endValue = lenCellX

      option.dataZoom[1].endValue = lenCellY
      option.dataZoom[1].startValue = 0
      option.dataZoom[2].top = height - 45
      option.dataZoom[2].endValue = lenCellX

      // xAxis.min = -400
      xAxis.min = 0
      xAxis.max = 1000 * 60 * 60 * 24
      option.xAxis = xAxis

      yAxis.min = 0
      yAxis.max = this.seriesMove * 12
      option.yAxis = yAxis

      option.grid = grid
      for (let index = 0; index < 12; index++) {
        const itemLogoMove = index * this.seriesMove
        // const newItem = [[-380, 120 + itemLogoMove], [-270, 120 + itemLogoMove], [-270, 20 + itemLogoMove], [-160, 20 + itemLogoMove], [-160, 120 + itemLogoMove], [-50, 120 + itemLogoMove], [-1, null]]
        // 心电图标记
        const newItem = []
        const series = {
          type: 'line',
          encode: { x: (index * 2 + 1), y: (index * 2) },
          seriesLayoutBy: 'row',
          name: this.chartsName[index],
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
            silent: false,
            data: [
              [
                {
                  name: this.chartsName[index],
                  yAxis: index * this.seriesMove,
                  label: {
                    color: '#666'
                  }
                },
                {
                  yAxis: (index + 1) * this.seriesMove
                }
              ]
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
          connectNulls: false
        }
        option.series.push(
          series
        )
      }
      console.log(option)
      chart.setOption(option)
    },

    handlePageDataLen() {
      const width = chart.getWidth()
      const height = chart.getHeight()
      const cellX = width / this.cellSize
      const cellY = height / this.cellSize // 一个格子固定 像素  ，屏幕宽高 除以 格子像素 等于 显示多少个格子。

      return { lenCellX: cellX * this.cellLenX, lenCellY: cellY * this.cellLenY } // 返回X轴与Y轴总共能显示的数据
    },
    handlePreview() {
      const file = this.$refs.file.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        const content = reader.result
        this.defaultData = content.split('MAILFILEGAP')
        this.$refs.file.value = ''
        this.loop()
      }
      reader.readAsText(file)
    },

    handleOpenFile() {
      this.$refs.file.dispatchEvent(new MouseEvent('click'))
    },

    async getInfo() {
      return new Promise((resolve, reject) => {
        getInfo(this.infoQuery)
          .then(response => {
            const res = response.data
            if (res) {
              console.log(res)
            } else {
              this.$notify({
                title: '数据丢失',
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  flex: none;
}

.body {
  flex: auto;
  margin-top: 20px;
}

#chart {
  width: 100%;
  height: 100%;
}
</style>
