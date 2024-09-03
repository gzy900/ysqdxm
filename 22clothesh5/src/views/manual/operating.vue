<template>
  <div>
    <div style="width: 100vw;height: 100vh;overflow-y: auto;overflow-x: hidden" ref="canvasContainer"></div>
  </div>
</template>
<script setup>
import * as pdfjsLib from 'pdfjs-dist';
import { onMounted, ref } from "vue";
import 'pdfjs-dist/build/pdf.worker.entry'

import pdfUrl from '../../assets/operating.pdf'
import { drawDpiBegin } from '../../utils/index'
//
// console.log(pdfUrl)

// const pdfUrl = new URL('../../assets/operating.pdf', import.meta.url)


let pdf = null, currentPage = 1
const canvasContainer = ref(null)

async function loadPdf() {
  // const url = '/public/operating.pdf'
  const loadingTask = pdfjsLib.getDocument(pdfUrl)
  pdf = await loadingTask.promise
  renderPage(currentPage)
}

function renderPage() {

  for (let i = 1; i <= pdf.numPages; i++) {
    pdf.getPage(i).then(page => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const viewport = page.getViewport(document.body.clientWidth / page.view[2])
      // canvas.width = document.body.clientWidth
      // canvas.height = document.body.clientHeight

      const scale = document.body.clientWidth / viewport.width
      viewport.scale = scale


      const cw = viewport.width * scale
      const ch = viewport.height * scale
      canvas.width = viewport.width * scale
      canvas.height = viewport.height * scale
      // console.log(viewport)

      drawDpiBegin(canvas, context, cw, ch)

      canvasContainer.value.appendChild(canvas)

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
  }

}

onMounted(() => {
  loadPdf()
})
</script>

<style lang="css" scoped>
canvas {
  pointer-events: none
}
</style>