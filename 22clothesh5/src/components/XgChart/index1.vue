<template>
  <div class="xin-geng">
    <swiper
        :modules="data.modules"
        class="mySwiper"
        :pagination='data.pagination'>
      <swiper-slide>
        <div ref="chartDom" style="width:100%;" :style="data.style" :id="'chart'+id"></div>
      </swiper-slide>
      <swiper-slide v-if="isSwiper">
        <div style="width:100%;" :style="data.style" :id="'chart'+id+'1'"></div>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination mt5" :class="'swiper-pagination'+props.id"></div>

  </div>
</template>

<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper'
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/pagination"
import * as echarts from "echarts/core";
import { onMounted, reactive, toRaw, watch, nextTick, ref } from "vue";
import * as options from "./option/option";


import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  GridComponent,
  DatasetComponent,
  TitleComponent,
} from 'echarts/components';
import { deepClone } from "../../utils";
import { series } from "./option/option";

echarts.use([
  LineChart,
  DatasetComponent,
  CanvasRenderer,
  GridComponent,
  TitleComponent
])


const props = defineProps({
  chartData: {
    type: Object,
    required: false,
    default: {}
  },
  xList: {
    type: Array,
    required: false,
    default: []
  },
  yList: {
    type: Array,
    required: false,
    default: []
  },
  id: {
    type: String,
    required: false,
    default: Math.random() * 100 + ''
  },
  isSwiper: {
    type: Boolean,
    required: false,
    default: false
  },
  isSleep: {
    type: String,
    required: false,
    default: '1'
  },
  ecgv: {
    type: String,
    required: false,
    default: '2'
  },
  rate: {
    type: Number,
    required: false,
    default: 250
  }
});


const data = reactive({
  style: {
    height: 0
  },
  pagination: {
    type: 'bullets',
    el: '.swiper-pagination' + props.id
  },
  modules: [
    Pagination
  ]
})


let yList, xList = []
const rate = props.rate

console.log(1234)
console.log(rate)
const chartTime = 7.2
for (let x = 0; x < chartTime * rate; x++) {
  xList.push(x)
}


const chartDom = ref(null)
let gridHeight = 80

function setChartStyle() {
  const dom = chartDom.value
  const latticeNumX = rate / 50 * 7.2
  const latticeSize = dom.clientWidth / latticeNumX
  gridHeight = latticeSize * 6
  const isEr = props.isSwiper ? .5 : 1
  data.style.height = (Math.ceil(yList.length * isEr) * gridHeight + 1) + 'px'
}


function initChart() {


  yList = Object.values(toRaw(props.chartData.data))
  const list = Object.values(toRaw(props.chartData.data))
  const num = 3
  const itemNum = 3
  const avg = []
  list.forEach((item, index) => {
    let allNum = 0
    item.forEach((i_num, i_i) => {
      if (isNaN(i_num)) {
        i_num = 0
      }
      allNum += i_num
    })
    avg.push(allNum / item.length)
  })

  list.forEach((item, index) => {
    const rateNum = (6 - (index % 6) - .5) * itemNum

    item.forEach((i_num, i_i) => {
      item[i_i] -= (avg[index] - rateNum)
    })
  })
  yList = list
  // 以下代码为切换完美测试数据
  // yList = JSON.parse(options.data)
  // console.log(1234)
  // console.log(JSON.stringify(yList))
  setChartStyle()


  nextTick(() => {
    const chart1 = echarts.init(document.getElementById('chart' + props.id))
    chart1.setOption(initChartOption())
    if (props.isSwiper) {
      const chart2 = echarts.init(document.getElementById('chart' + props.id + '1'))
      chart2.setOption(initChartOption(yList.length / 2))
    }
  })
}


function initChartOption(offset = 0) {
  const option = deepClone(options.option)
  if (props.isSleep === '3') {
    option.backgroundColor = '#1E1D2B'
  }
  option.dataset.source = [
    ...yList,
    xList
  ]

  const xAxis = deepClone(options.xAxis)
  const yAxis = deepClone(options.yAxis)
  const grid = deepClone(options.grid)


  if (props.ecgv === '1') {
    xAxis.axisLine.lineStyle.color = '#bcbcbc'
    yAxis.splitLine.lineStyle.color = ['#efefef', '#efefef', '#efefef', '#efefef', '#efefef', '#efefef', '#bcbcbc']
  }

  for (let i = 0; i < yList.length / 2; i++) {

    const title = deepClone(options.title)
    title.text = options.titleNameList[i + offset]
    title.top = (i + 1) * gridHeight - 20
    option.title.push(title)

    const series = deepClone(options.series)

    // xAxis.gridIndex = i
    // yAxis.gridIndex = i
    // series.xAxisIndex = i
    // series.yAxisIndex = i


    if (props.ecgv === '1') {
      series.lineStyle.color = 'rgba(137, 189, 187, 1)'
    }

    series.encode.y = i + offset
    if (props.isSleep === '3') {
      yAxis.splitLine.lineStyle.color = 'rgba(220, 220, 220, 0.05)'
      xAxis.splitLine.lineStyle.color = 'rgba(220, 220, 220, 0.05)'
      xAxis.axisLine.lineStyle.color = 'rgba(121, 117, 138, 1)'
    }
    option.series.push(series)
  }

  const isEr = props.isSwiper ? .5 : 1
  grid.height = yList.length * isEr * gridHeight
  option.grid.push(grid)
  option.xAxis.push(xAxis)
  option.yAxis.push(yAxis)


  return option
}

onMounted(() => {
  initChart()
})


watch(
    () => props.chartData,
    (newValue) => {
      // initChart()
    }
)


const onSwiper = (swiper) => {

};
const onSlideChange = () => {

};

</script>

<style scoped>
.xin-geng {
  position: relative;
}

.swiper-pagination {
  width: 2.3rem;
  position: relative;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: .5rem;
  left: 50%;
  transform: translateX(-50%);
  height: .8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-pagination {
  color: rgba(0, 0, 0, 0.4);
  --swiper-theme-color: #fff;

  --swiper-pagination-bullet-inactive-color: #fff;
  --swiper-pagination-bullet-inactive-opacity: 1;
}

.swiper-pagination-ecg1 {
  color: rgba(65, 105, 220, 1);
  --swiper-theme-color: rgba(65, 105, 220, 1);

  --swiper-pagination-bullet-inactive-color: #fff;
  --swiper-pagination-bullet-inactive-opacity: 1;
}


</style>
