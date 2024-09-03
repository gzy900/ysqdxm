<script setup>
import { ref, onMounted } from 'vue'
import { drawDpiBegin, drawDpiEnd, parseTime } from "../util/index.js";
import { lrc } from "./lrc/lrc.js";

const lrcList = lrc.split('\n')
const lrcTxtTime = []
lrcList.forEach(item => {
  const text = item.split(']')[1] || ''
  const timeStr = item.split(']')[0].split('[')[1]
  const timeList = timeStr.split(':').map(item => {
    return parseInt(item)
  })
  const time = timeList[0] * 60 * 1000 + timeList[1] * 1000 + timeList[2] * 10
  lrcTxtTime.push({
    text,
    time
  })
})
defineProps({
  msg: String,
})

const canvas = ref(null)
const txtCanvas = ref(null)
let ctx = null
let txtCtx = null
let w = 0
let h = 0
onMounted(() => {
  initCanvas()
})

function initCanvas() {
  const domRect = canvas.value.getBoundingClientRect()

  ctx = canvas.value.getContext('2d')
  txtCtx = txtCanvas.value.getContext('2d')
  w = domRect.width
  h = domRect.height
  drawDpiBegin(txtCanvas.value, txtCtx, 30, h)
  drawDpiBegin(canvas.value, ctx, w, h)


  initPart()
  gameStart = true
  loopTimeStart = new Date().getTime()
  loop()
}

const partList = []

function initPart() {
  for (let i = 0; i < 5000; i++) {
    partList.push(new Particle(Math.random() * w, Math.random() * 60, 2))
  }
}

function Particle(x = 0, y = 0, radius = 2) {
  this.x = x
  this.y = y
  this.radius = radius
  this.speedY = Math.random() * 2 + 2
}

Particle.prototype.run = function () {
  if (this.y > h + 100) {
    this.y = -100
  }
  this.y += this.speedY
}
Particle.prototype.draw = function () {
  ctx.beginPath()
  ctx.fillStyle = '#fff'
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
  ctx.fill()
}


function drawTxt(txt = '') {
  const txtList = txt.split('')
  txtCtx.clearRect(0, 0, 30, h)
  txtList.forEach((item, index) => {
    txtCtx.font = "24px Georgia";
    txtCtx.fillStyle = '#fff'
    txtCtx.fillText(item, 0, index * 30 + 100);
  })
}

function getTxtData() {
  const txtData = txtCtx.getImageData(0, 0, 30, h)
  const data = txtData.data
  const txt = []
  for (let i = 3; i < data.length; i += 8) {
    if (data[i] >= .4) {
      txt.push(i)
    }
  }
  console.log(txt)
}

let gameStart = false

let loopTimeStart = 0
let loopTimeCurrent = 0
let lycTimeLength = lrcTxtTime[lrcTxtTime.length - 1].time
let txtCurrent = ''

function loop() {
  ctx.clearRect(0, 0, w, h)
  loopTimeCurrent = new Date().getTime()
  let flagTxtChange = false
  for (let i = lrcTxtTime.length - 1; i >= 0; i--) {
    if (loopTimeCurrent - loopTimeStart >= lrcTxtTime[i].time) {
      if (txtCurrent !== lrcTxtTime[i].text) {
        flagTxtChange = true
      }
      txtCurrent = lrcTxtTime[i].text
      break
    }
  }

  drawTxt(txtCurrent)
  if (flagTxtChange) {
    getTxtData()
  }

  for (let i = 0; i < partList.length; i++) {
    partList[i].run()
    partList[i].draw()
  }
  if (gameStart) {
    requestAnimationFrame(loop)
  }
}

</script>
<template>
  <div class="container">
    <canvas class="main-canvas" ref="canvas"></canvas>
    <canvas class="txt-canvas" ref="txtCanvas"></canvas>
  </div>
</template>


<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: #000;
}

.container .main-canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
}

.txt-canvas {
  width: 30px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
}
</style>