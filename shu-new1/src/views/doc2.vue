<template>
  <div ref="body" class="canvas-body">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { deepClone, drawDpiBegin } from "../util/index.js";


const canvas = ref(null)
const body = ref(null)
let ctx = null
let w = 0
let h = 0
onMounted(() => {
  initCanvas()
})

function initCanvas() {
  const domRect = body.value.getBoundingClientRect()

  ctx = canvas.value.getContext('2d')
  w = domRect.width
  h = domRect.height
  drawDpiBegin(canvas.value, ctx, w, h)


  img.onload = () => {
    drew()
  }
  img.src = '/public/1.png'
}


const img = new Image()


function drew() {
  const iw = img.width
  const ih = img.height

  const iww = iw * (h / ih)

  ctx.drawImage(img, 0, 0, iww, h)

  console.log(iw)
  console.log(ih)

  console.log(iww)

  console.log(w)
  console.log(h)

  const imgData = ctx.getImageData(0, 0, iww, h)
  const data = imgData.data

  // console.log(imgData.data)

  const threshold = 254

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] + data[i + 1] + data[i + 2] > threshold * 3) {
      data[i + 3] = 1
    }

    // if ((data[i] + data[i + 1]) / 2 - data[i + 2] > 10) {
    //   data[i + 3] = 0
    // }

    // if (data[i] > threshold) {
    //   data[i + 3] = 0
    // }
    // if (data[i + 1] > threshold) {
    //   data[i + 3] = 0
    // }
    // if (data[i + 2] > threshold) {
    //   data[i + 3] = 0
    // }
  }


  // ctx.clearRect(0, 0, w, h)
  ctx.putImageData(imgData, 0, 0, 0, 0, iww, h)
}

</script>

<style scoped>

.canvas-body {
  width: 100%;
  height: 100%;
}
</style>
