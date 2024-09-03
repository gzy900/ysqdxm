<!--
info: 十二导联 标注功能心电图
author:wanq
time:2020-08-03 17:15:48
-->
<template>
  <div class="main">
    <div class="header">
      <!--    读取本地文件容器-->
      <!--      <input id="files" ref="file" type="file" style="display: none" @change="handlePreview">-->
      <!--      <el-button type="primary" size="small" @click="handleOpenFile">-->
      <!--        读取文件-->
      <!--      </el-button>-->
      <!--      <el-button type="primary" size="small" @click="">-->
      <!--        渲染-->
      <!--      </el-button>-->
    </div>
    <div class="body">
      <!--      <el-tabs v-model="tabValue" type="border-card">-->
      <!--        <el-tab-pane name="tagging" label="完整心电图">-->
      <div
        id="chart"
        @mousemove="move"
        @mousedown="down"
        @mouseup="upLive"
      >
        <canvas id="canvas">您的浏览器不支持canvas</canvas>
      </div>
      <div class="slider">
        <el-slider
          v-model="value1"
          :step="0.001"
          :show-tooltip="false"
          @input="sliderInput"
        />
      </div>
      <!--        </el-tab-pane>-->
      <!--      </el-tabs>-->
    </div>

  </div>
</template>

<script>
import pako from 'pako'
import {deepClone} from '@/utils'

const cellSize = 25.6 // 一个格子的像素大小
const cellSizeDataX = 200 // 一个格子X轴的原始数据坐标大小
const rate = 128
let dataList = null
let can = null
let ctx = null
let originY = 0
let pageL = 0
let pageR = 0
let pageLen = 0
let dataLen = 0
let down = true
let pageW = 0
let pageH = 0
let oldX = 0
let oldY = 0
let dataMoveLen
const coordFormulaX = cellSize / (cellSizeDataX / (1000 / rate))
const coordFormulaY = cellSize / 102

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },
  name: 'Clothes',
  props: {
    data: {
      type: Array,
      default: null
    },
    dataMoveList: {
      type: Array,
      default: null
    },
    dataItemLen: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      value1: 0
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
    dataList = this.data
    dataLen = dataList[0].byteLength / 2
    dataMoveLen = this.dataItemLen / 16
    console.log(this.dataItemLen)
    this.initCanvas()
  },

  methods: {
    initCanvas() {
      can = document.getElementById('canvas')
      const dom = document.getElementById('chart')
      pageW = dom.clientWidth
      pageH = dom.clientHeight
      can.width = pageW
      can.height = pageH
      ctx = can.getContext('2d')

      pageR = Math.ceil(pageW / coordFormulaX)
      pageLen = pageR

      const lis = []
      for (let i = 0; i < 1280; i++) {
        lis.push(Number(dataList[0].getInt16((845847 + i) * 2)) / 102)
      }
      console.log(2222)
      console.log(lis)

      console.log(new DataView(dataList[0].buffer, 845770 * 2, 256 * 10 * 2))
    },
    calcPage(x, y) {
      const pageMove = Math.ceil(x / coordFormulaX)
      pageL += pageMove
      pageR += pageMove
      originY += y
      this.draw()
    },

    drawBg() {
      for (let i = 0.5; i < pageW; i += cellSize) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, pageH)
        ctx.strokeStyle = '#d3d8d6'
        ctx.lineWidth = 1
        ctx.stroke()
        for (let w = 1; w < 4; w++) {
          ctx.beginPath()
          ctx.moveTo(cellSize / 4 * w + i, 0)
          ctx.lineTo(cellSize / 4 * w + i, pageH)
          ctx.strokeStyle = '#e7e7e7'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
      for (let h = 0.5; h < pageH; h += cellSize) {
        ctx.beginPath()
        ctx.moveTo(0, h)
        ctx.lineTo(pageW, h)
        ctx.strokeStyle = '#d3d8d6'
        ctx.lineWidth = 1
        ctx.stroke()
        for (let w = 1; w < 4; w++) {
          ctx.beginPath()
          ctx.moveTo(0, cellSize / 4 * w + h)
          ctx.lineTo(pageW, cellSize / 4 * w + h)
          ctx.strokeStyle = '#e7e7e7'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    },
    draw() {
      if (pageR > dataLen) {
        pageL = dataLen - pageLen
        pageR = dataLen
      }
      if (pageL < 0) {
        pageL = 0
        pageR = pageLen
      }

      console.log(pageL)
      ctx.clearRect(0, 0, pageW, pageH)
      this.drawBg()
      for (let s = 0; s < 12; s++) {
        const data_one = dataList[s].getInt16(pageL * 2)
        ctx.beginPath()
        const dataMove = this.dataMoveList[s].getFloat64(Math.floor((pageL) / dataMoveLen) * 8)
        ctx.moveTo(0, (Number(data_one) + dataMove) * coordFormulaY + originY)
        for (let i = 1; i < pageR - pageL; i++) {
          const data = dataList[s].getInt16((i + pageL) * 2)
          const dataMove = this.dataMoveList[s].getFloat64(Math.floor((pageL + i) / dataMoveLen) * 8)
          ctx.lineTo(i * coordFormulaX, (Number(data) + dataMove) * coordFormulaY + originY)
        }
        ctx.strokeStyle = '#7fc4b3'
        ctx.stroke()
      }
    },
    sliderInput(e) {
      const move = Math.floor(dataLen / 100 * e)
      pageL = move
      pageR = move + pageLen
      this.draw()
    },
    down(e) {
      down = false
      e = e || {}
      oldX = e.clientX
      oldY = e.clientY
    },
    move(e) {
      if (down) {
        return
      }
      e = e || {}
      const moveX = oldX - e.clientX
      const moveY = oldY - e.clientY
      oldX = e.clientX
      oldY = e.clientY
      this.calcPage(moveX, -moveY)
    },
    upLive() {
      down = true
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
}

#chart {
  width: 100%;
  height: calc(100% - 40px);
}

.slider {
  height: 40px;
}
</style>
