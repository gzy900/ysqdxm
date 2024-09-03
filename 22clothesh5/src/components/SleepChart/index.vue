<template>
  <div id="sleep-chart" style="width: 100%;height: 2.5rem;border-radius: .25rem;overflow: hidden">
    <canvas :id="'sleep-canvas'+id"></canvas>
  </div>
</template>

<script setup>

const { id, chartData, rotate } = defineProps({
  id: {
    default: ''
  },
  chartData: {
    default: []
  },
  rotate: {
    default: false
  }
})
import { onMounted, defineExpose, toRaw } from "vue"
import { drawDpiBegin } from "../../utils"


let canParent, pageW, pageH, can, ctx

function drew(data) {
  // console.log(4444)
  // console.log(data)
  const len = data.length
  ctx.fillStyle = "rgba(130, 98, 254, 1)";
  ctx.fillRect(0, 0, pageW, pageH)
  for (let d = 0; d < data.length; d++) {
    if (data[d] === '1') {
      ctx.beginPath()
      if (rotate) {
        ctx.moveTo(0, Math.floor(d * (pageH / len)))
        ctx.lineTo(pageW, Math.floor(d * (pageH / len)))
      } else {
        ctx.moveTo(Math.floor(d * (pageW / len)), 0)
        ctx.lineTo(Math.floor(d * (pageW / len)), pageH)
      }
      ctx.strokeStyle = "rgba(185, 167, 254, 1)";
      ctx.stroke()
    }
    if (data[d] === '2') {
      ctx.beginPath()
      if (rotate) {
        ctx.moveTo(0, Math.floor(d * (pageH / len)))
        ctx.lineTo(pageW, Math.floor(d * (pageH / len)))
      } else {
        ctx.moveTo(Math.floor(d * (pageW / len)), 0)
        ctx.lineTo(Math.floor(d * (pageW / len)), pageH)
      }
      ctx.strokeStyle = "rgba(215, 205, 255, 1)";
      ctx.stroke()
    }
  }
}

function init() {
  canParent = document.getElementById('sleep-chart')
  if (rotate) {
    pageW = canParent.clientWidth
    pageH = canParent.clientWidth
  } else {
    pageW = canParent.clientWidth
    pageH = canParent.clientHeight
  }

  can = document.getElementById("sleep-canvas" + id)
  ctx = can.getContext("2d")
  drawDpiBegin(can, ctx, pageW, pageH)
}

function getCanvasBase64(chartData) {
  drew(chartData || [])
  return can.toDataURL('image/png') || ''
}

onMounted(() => {
  init()
  drew(toRaw(chartData))
})

defineExpose({
  getCanvasBase64
})
</script>

<style scoped>

</style>