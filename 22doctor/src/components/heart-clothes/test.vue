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
          v-if="loading"
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
import { getInfo } from '@/api/heart-clothes'
import { encode, decode, atob as jsAtob } from 'js-base64'
import pako from 'pako'
import { deepClone } from '@/utils'

const chart = null
let sDataList = null
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

export default {
  name: 'Test',
  props: {
    dData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      tabValue: 'tagging',
      infoQuery: {
        l_id: 'c50476cfc594469cbb0859a528989e10',
        serial_number: -1
      },
      loading: false,
      defaultData: null,
      chart: null,
      value1: 0,
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
  mounted() {
    this.initCanvas()
    // this.defaultData = deepClone(this.d_data)
    // console.log(111)
    // console.log(this.defaultData)
    // this.loop()
  },
  methods: {

    loop() {
      sDataList = []
      for (let len = 0; len < 12; len++) {
        sDataList.push(new DataView(new ArrayBuffer(2 * 128 * 60 * 60 * 24 + 12)))
      }

      for (let i = 0; i < this.defaultData.length - 1; i++) {
        this.decode(this.defaultData[i], i)
      }
      // for (let i = 0; i < 10; i++) {
      //   this.decode(this.defaultData[i], i)
      // }
      this.dataChange1()
      this.loading = true
    },
    initCanvas() {
      can = document.getElementById('canvas')
      const dom = document.getElementById('chart')
      pageW = dom.clientWidth
      pageH = dom.clientHeight
      can.width = pageW
      can.height = pageH
      ctx = can.getContext('2d')

      const cellSize = 32
      const cellLenX = 200
      const cellLenY = 0.5
      pageR += Math.ceil(pageW / cellSize * cellLenX / (1000 / 128))
      pageLen = pageR
    },

    calcPage(x, y) {
      const cellSize = 32
      const cellLenX = 200
      const cellLenY = 0.5
      pageL += Math.ceil(x / cellSize * cellLenX / (1000 / 128))
      pageR += Math.ceil(x / cellSize * cellLenX / (1000 / 128))
      originY += y
      this.draw()
    },

    drawBg() {
      const cellSize = 32
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
      ctx.clearRect(0, 0, pageW, pageH)
      this.drawBg()
      for (let s = 0; s < 12; s++) {
        const data_one = sDataList[s].getInt16(pageL * 2)
        ctx.beginPath()
        ctx.moveTo(0, data_one * 60 + originY)
        for (let i = 0; i < pageR - pageL - 1; i++) {
          const data = sDataList[s].getInt16((i + pageL) * 2)
          ctx.lineTo(i * 1000 / 128 * (32 / 200), data * 60 + originY)
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
    },
    dataChange1() {
      this.$emit('dataChange')
    },
    dataChange(data) {
      console.log('开始数据1111')
      // console.log(data)
      this.defaultData = deepClone(data)
      this.loop()
    },

    decode(encodedData, longDataNum) {
      console.log('开始解压数据' + longDataNum)
      console.log(new Date().getTime())

      const decodedData = jsAtob(encodedData)
      // const decodedData = window.atob(encodedData)
      // 694430 atob
      // 657607 decode
      // // 字符串转数组 在循环返回一个 Unicode表所在位置的新数组
      const charData = decodedData.split('').map(x => x.charCodeAt(0))
      // console.log(new Uint8Array(charData))
      console.log(decodedData)

      // Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
      const binData = pako.inflate(new Uint8Array(charData))

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
      for (let j = 0; j < encodedList.length; j += 32) {
        for (let i = 0; i < 16; i += 2) {
          const listOne = encodedList[i + j]
          let item = listOne + (encodedList[i + j + 1] * 256)

          const remainder = i / 2 //  取导联
          const diff = remainder <= 1 ? remainder : remainder + 4

          if (diff === 0) {
            pointI = -(item & 8191)
            item = pointI
          } else {
            item = -(item)
          }
          if (diff === 1) {
            // 在第二导联计算 III VR VL VF 导联的数据
            const pointIII = item - pointI
            const pointVR = -(item + pointI) / 2
            const pointVL = (pointI - (item - pointI)) / 2
            const pointVF = (item + (item - pointI)) / 2

            data[2].push(pointIII / 102)
            data[3].push(pointVR / 102)
            data[4].push(pointVL / 102)
            data[5].push(pointVF / 102)

            param[2] += pointIII / 102
            param[3] += pointVR / 102
            param[4] += pointVL / 102
            param[5] += pointVF / 102
          }
          data[diff].push(item / 102)
          param[diff] += item / 102
        }
      }
      const data_length = data[0].length
      dataLen += data_length

      data.forEach((item, index) => {
        const positionCenter = (index * seriesMove) + (seriesMove / 2) // 计算 十二导联 心电图应处于的位置
        const dataMove = positionCenter - (param[index] / data_length) // 计算 十二导联 心电图 目前的数据位置与 其应处于的位置的偏差
        item.forEach((d, d_i) => {
          sDataList[index].setInt16((longDataNum * 10 * 60 * 128 + d_i) * 2, d + dataMove)
        })
      })

      console.log('方法结束')
      console.log(new Date().getTime())
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
  height: calc(100% - 40px);
}

.slider {
  height: 40px;
}
</style>
