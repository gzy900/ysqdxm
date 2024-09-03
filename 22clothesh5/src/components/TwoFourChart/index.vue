<template>
  <div class="T-F-chart" id="T-F-chart" :style="{height:(94 + 16 + 94 + 80 + 16 + 94 + 16+94)+'px'}">

  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts/core";
import {onMounted, watch, toRaw} from "vue";
import {option} from "./option/option";


import {LineChart, BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  GridComponent,
  DatasetComponent,
  TitleComponent
} from 'echarts/components';
import {deepClone} from "../../utils";

echarts.use([
  LineChart,
  DatasetComponent,
  BarChart,
  CanvasRenderer,
  GridComponent,
  TitleComponent
])

const props = defineProps({
  data: { // 图标名称与assets/icon/svg下使用的文件名一致
    type: Object,
    required: false,
    default: {}
  },
  id: {
    type: String,
    required: false,
    default: new Date().getTime().toString() + Math.floor(Math.random() * 100).toString()
  },
  isSwiper: {
    type: Boolean,
    required: false,
    default: false
  }
});


onMounted(() => {
  initChart()
  initChartOption(props.data)
})

let chart

function initChart() {
  chart = echarts.init(document.getElementById('T-F-chart'))
}

function initChartOption(value) {
  const data = toRaw(value)
  console.log(134)
  console.log(data)
  // return
  if (Object.keys(data).length > 0) {
    option.dataset.source = data

    const hr_5min_max = Math.max(...data.hr_5min)
    const hr_5min_min = Math.min(...data.hr_5min)
    const hr_5min_interval = (hr_5min_max - hr_5min_min) * .25
    option.yAxis[0].interval = hr_5min_interval
    option.yAxis[0].min = hr_5min_min
    option.yAxis[0].max = hr_5min_max

    const sdnn_5min_max = Math.max(...data.sdnn_5min)
    const sdnn_5min_min = Math.min(...data.sdnn_5min)
    const sdnn_5min_interval = (sdnn_5min_max - sdnn_5min_min) * .25
    option.yAxis[1].interval = sdnn_5min_interval
    option.yAxis[1].min = sdnn_5min_max
    option.yAxis[1].max = sdnn_5min_min

    const pv_5min_max = Math.max(...data.picVentricular)
    const pv_5min_min = Math.min(...data.picVentricular)
    const pv_5min_interval = (pv_5min_max - pv_5min_min) * .15
    option.yAxis[3].interval = pv_5min_interval
    option.yAxis[3].min = pv_5min_min
    option.yAxis[3].max = pv_5min_max

    const psv_5min_max = Math.max(...data.picSupraVentricular)
    const psv_5min_min = Math.min(...data.picSupraVentricular)
    const psv_5min_interval = (psv_5min_max - psv_5min_min) * .15
    option.yAxis[4].interval = psv_5min_interval
    option.yAxis[4].min = psv_5min_min
    option.yAxis[4].max = psv_5min_max
    chart.setOption(option)
  }
}


watch(
    () => props.data,
    (newValue, oldValue) => {
      initChartOption(newValue)
    }
)
</script>

<style scoped>

.T-F-chart {
  height: 700px;
}
</style>
