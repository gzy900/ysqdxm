<template>
  <div class="week">
    <!--    <div style="opacity: 1;height: auto">-->
    <!--      <SleepChart ref="sleepChartRef" :rotate="true" class="mt3"></SleepChart>-->
    <!--    </div>-->
    <span class="week-title-bar"></span>

    <p class="week-title-time">
      {{ parseTime(params.startTime, '{m}.{d}') + '-' + parseTime(params.endTime, '{m}.{d}') }}
    </p>

    <div class="week-body mt8">
      <span class="week-body-bar" style="background: #4272FF;"></span>
      <div class="week-body-content">

        <div class="week-body-bg">
          <svg v-for="(item,index) in svgPath"
               opacity="0.2"
               :class="'svg-bg-'+index" width="100%" height="88px" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                opacity="0.2"
                :d="item"
                fill="rgba(65, 105, 221, 1)"
            />
          </svg>
        </div>


        <p class="week-body-title">本周你完成了，</p>
        <p class="week-body-item mt8">
          <span class="week-body-item-bar"
                style="background: linear-gradient(180deg, #00E3AB 2.67%, #5C4EF6 100%, #4F6CEE 100%);"></span>
          日常筛查 <span class="crude" style="color: rgba(65, 105, 221, 1)">{{ dataInfo.info.now.dailyTime }}</span> 次
        </p>
        <p class="week-body-item mt8">
          <span class="week-body-item-bar"
                style="background: linear-gradient(180deg, #F4C54A -2.33%, #E53449 100%);"></span>
          运动筛查 <span class="crude" style="color: rgba(250, 62, 62, 1)">{{ dataInfo.info.now.sportTime }}</span> 次
        </p>
        <p class="week-body-item mt8">
          <span class="week-body-item-bar"
                style="background: linear-gradient(141.19deg, #8B3BC9 22.29%, #6F4AFF 76.6%);"></span>
          睡眠筛查 <span class="crude" style="color: rgba(130, 98, 255, 1)">{{ dataInfo.info.now.sleepTime }}</span> 次
        </p>

        <p class="week-body-bom mt8">
          <span class="text">同比{{
              dataInfo.info.now.dailyTime + dataInfo.info.now.sportTime + dataInfo.info.now.sleepTime - dataInfo.info.last.total > 0 ? '增长' : '减少'
            }}</span>
          <span class="num">
            {{
              Percentage(dataInfo.info.now.dailyTime + dataInfo.info.now.sportTime + dataInfo.info.now.sleepTime - dataInfo.info.last.total, dataInfo.info.last.total)
            }}
          </span>
          <span class="symbol">%</span>
          <svg-icon
              v-if="dataInfo.info.now.dailyTime + dataInfo.info.now.sportTime + dataInfo.info.now.sleepTime - dataInfo.info.last.total > 0"
              class="icon-up" icon-class="icon-up"></svg-icon>
          <svg-icon v-else class="icon-down" icon-class="icon-down"></svg-icon>
        </p>

      </div>
    </div>

    <div class="week-body mt8">
      <span class="week-body-bar" style="background: rgba(185, 167, 254, 1);"></span>
      <div class="week-body-content">

        <div class="week-body-bg">
          <svg v-for="(item,index) in svgPath"
               opacity="0.2"
               :class="'svg-bg-'+index" width="100%" height="88px" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                opacity="0.2"
                :d="item"
                fill="rgba(65, 105, 221, 1)"
            />
          </svg>
        </div>


        <template v-if="dataInfo.info.now?.sleep?.length>0">
          <p class="week-body-title">
            本周睡眠质量
            <span class="crude" style="color: rgba(65, 105, 221, 1)">良</span>
          </p>

          <div ref="sleepChartDom" id="week-sleep-chart" style="margin: 1rem 0;" :style="{height:sleepChartHeight+'px'}">

          </div>

          <p class="week-body-bom" style="text-align: center">
            <span class="text">建议注意休息</span>
          </p>
        </template>
        <p v-else>本周无睡眠记录</p>

      </div>
    </div>

    <div class="week-body mt8">
      <span class="week-body-bar" style="background: rgba(255, 69, 92, 1);"></span>
      <div class="week-body-content">

        <div class="week-body-bg">
          <svg v-for="(item,index) in svgPath"
               opacity="0.2"
               :class="'svg-bg-'+index" width="100%" height="88px" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                opacity="0.2"
                :d="item"
                fill="rgba(238, 110, 92, 1)"
            />
          </svg>
        </div>


        <template v-if="dataInfo.info.now?.sport?.length>0">
          <p class="week-body-title">
            本周运动时长共计
            <span class="crude" style="color: rgba(255, 166, 86, 1)">{{ Math.ceil(nowSport.sport_time / 60) }}</span> 分钟，
            较上周{{ nowSport.sport_time - lastSport.sport_time >= 0 ? '增加' : '减少' }} <span class="crude"
                                                                                                style="color: rgba(229, 52, 73, 1)">{{
              Math.abs(Math.ceil((nowSport.sport_time - lastSport.sport_time) / 60))
            }}</span>分钟，
            平均心率 <span class="crude" style="color: rgba(20, 166, 147, 1)">{{
              Math.ceil(nowSport.avg_heart_rate)
            }}</span><span
              style="color: rgba(20, 166, 147, 1)">dpm</span>，
            静息心率 <span class="crude" style="color: rgba(65, 105, 220, 1)">{{
              Math.ceil(nowSport.rest_heart_rate)
            }}</span> <span
              style="color: rgba(65, 105, 220, 1)">dpm</span>达到目标心率时长
            总计<span class="crude" style="color: rgba(255, 101, 132, 1)">{{ Math.ceil(nowSport.over_time / 60) }}</span>分钟，
            同比{{
              nowSport.over_time - lastSport.over_time >= 0 ? '增长' : '减少'
            }}<span class="crude" style="color: rgba(20, 166, 147, 1)">{{
              Percentage(nowSport.over_time - lastSport.over_time, lastSport.over_time)
            }}</span><span
              style="color: rgba(20, 166, 147, 1)">%</span> 注意劳逸结合。
          </p>

          <div id="week-motion-chart" style="height: 194px;margin-top: 2.2rem;margin-bottom: 2.6rem"></div>
        </template>
        <p v-else>本周无运动记录</p>
      </div>
    </div>

    <div class="week-body mt8">
      <span class="week-body-bar" style="background: rgba(0, 227, 171, 1);"></span>
      <div class="week-body-content">

        <div class="week-body-bg">
          <svg v-for="(item,index) in svgPath"
               opacity="0.2"
               :class="'svg-bg-'+index" width="100%" height="88px" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                opacity="0.2"
                :d="item"
                fill="rgba(0, 227, 171, 1)"
            />
          </svg>
        </div>


        <!--        <template v-if="dataInfo.info.now?.event?.length>0">-->
        <p class="week-body-title">
          本周日常筛查心律事件统计
        </p>

        <!--        <pie></pie>-->
        <pie :names="dataInfo.pieData.names" :nums="dataInfo.pieData.nums"></pie>

        <p class="week-body-bom" style="overflow: hidden">
          <span class="proposal">建议注意饮食</span>
          <span class="text">同比{{ dataInfo.nowValue - dataInfo.lastValue >= 0 ? '增长' : '减少' }}</span>
          <span class="num">{{ Percentage(dataInfo.nowValue - dataInfo.lastValue, dataInfo.lastValue) }}</span>
          <span class="symbol">%</span>
          <svg-icon v-if="dataInfo.nowValue - dataInfo.lastValue>=0" class="icon-up" icon-class="icon-up"></svg-icon>
          <svg-icon v-else class="icon-down" icon-class="icon-down"></svg-icon>
        </p>
        <!--        </template>-->
        <!--        <p v-else>本周无数据记录</p>-->
      </div>
    </div>

    <div class="loading" :class="loading?'':'hide'">

      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_900_11132)">
          <path
              d="M34.9355 24.6125L35.9677 23.611C38.6774 20.9821 38.6774 16.6006 35.9677 13.9717C33.2581 11.3428 28.7419 11.3428 26.0323 13.9717L25 14.9732L23.9677 13.9717C21.2581 11.3428 16.7419 11.3428 14.0323 13.9717C11.3226 16.6006 11.3226 20.9821 14.0323 23.611L15.0645 24.6125L25 33L34.9355 24.6125Z"
              fill="#D7DCE5"/>
          <path
              d="M19.2113 33.9535C18.9246 33.9535 18.4945 33.8101 18.2077 33.6667L14.05 30.0825C13.4766 29.509 13.3332 28.6488 13.9067 28.0753C14.4801 27.5018 15.3404 27.3585 15.9138 27.9319L19.068 30.656L29.2472 21.9104L30.2508 20.9069C32.9748 18.3262 32.9748 14.1685 30.3941 11.7312C27.9569 9.29395 23.7991 9.29395 21.3619 11.7312L20.2149 12.8782C19.6414 13.4517 18.7812 13.4517 18.2077 12.8782L17.2042 11.7312C14.7669 9.29395 10.6092 9.29395 8.1719 11.7312C5.59126 14.1685 5.59126 18.3262 8.1719 20.7635C8.60201 21.337 8.60201 22.1972 8.1719 22.7707C7.7418 23.3441 6.73821 23.3441 6.16473 22.7707C2.58051 19.1864 2.58051 13.3083 6.16473 9.72406C9.74896 6.13983 15.6271 6.13983 19.2113 9.72406V9.86743L19.3547 9.72406C22.9389 6.13983 28.8171 6.13983 32.4013 9.72406C35.9855 13.3083 35.9855 19.1864 32.4013 22.7707L31.2543 23.9176L20.0715 33.6667C19.9282 33.8101 19.6414 33.9535 19.2113 33.9535Z"
              fill="#C4C7CE"/>
          <path
              d="M16.4875 26.4982C16.4875 26.4982 16.3441 26.4982 16.4875 26.4982C16.0573 26.4982 15.6272 26.2114 15.4839 25.7813L12.6165 17.4659L12.043 19.6165C11.8996 20.0466 11.4695 20.3333 11.0394 20.3333H1.00358C0.430108 20.3333 0 19.9032 0 19.3297C0 18.7563 0.430108 18.3261 1.00358 18.3261H10.1792L11.4695 13.7383C11.6129 13.3082 12.043 13.0215 12.4731 13.0215C12.9032 13.0215 13.3333 13.3082 13.4767 13.7383L16.3441 22.4839L19.2115 15.172C19.3548 14.7419 19.7849 14.4552 20.2151 14.4552C20.6452 14.4552 21.0753 14.7419 21.2186 15.172L22.509 18.3261H28.6738C29.2473 18.3261 29.6774 18.7563 29.6774 19.3297C29.6774 19.9032 29.2473 20.3333 28.6738 20.3333H21.7921C21.362 20.3333 20.9319 20.0466 20.7885 19.6165L20.2151 18.1828L17.3477 25.7813C17.2043 26.2114 16.9176 26.4982 16.4875 26.4982Z"
              fill="#E7EBF0"/>
          <path
              d="M38.5665 20.7635C39.3583 20.7635 40.0002 20.1216 40.0002 19.3298C40.0002 18.538 39.3583 17.8961 38.5665 17.8961C37.7747 17.8961 37.1328 18.538 37.1328 19.3298C37.1328 20.1216 37.7747 20.7635 38.5665 20.7635Z"
              fill="#E7EBF0"/>
        </g>
        <defs>
          <clipPath id="clip0_900_11132">
            <rect width="40" height="26.9534" fill="white" transform="translate(0 7)"/>
          </clipPath>
        </defs>
      </svg>

      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">


        <g clip-path="url(#clip)">
          <path
              d="M34.9355 24.6125L35.9677 23.611C38.6774 20.9821 38.6774 16.6006 35.9677 13.9717C33.2581 11.3428 28.7419 11.3428 26.0323 13.9717L25 14.9732L23.9677 13.9717C21.2581 11.3428 16.7419 11.3428 14.0323 13.9717C11.3226 16.6006 11.3226 20.9821 14.0323 23.611L15.0645 24.6125L25 33L34.9355 24.6125Z"
              fill="#E53449" fill-opacity="0.2"/>
          <path
              d="M19.2113 33.9535C18.9246 33.9535 18.4945 33.8101 18.2077 33.6667L14.05 30.0825C13.4766 29.509 13.3332 28.6488 13.9067 28.0753C14.4801 27.5018 15.3404 27.3585 15.9138 27.9319L19.068 30.656L29.2472 21.9104L30.2508 20.9069C32.9748 18.3262 32.9748 14.1685 30.3941 11.7312C27.9569 9.29395 23.7991 9.29395 21.3619 11.7312L20.2149 12.8782C19.6414 13.4517 18.7812 13.4517 18.2077 12.8782L17.2042 11.7312C14.7669 9.29395 10.6092 9.29395 8.1719 11.7312C5.59126 14.1685 5.59126 18.3262 8.1719 20.7635C8.60201 21.337 8.60201 22.1972 8.1719 22.7707C7.74179 23.3441 6.73821 23.3441 6.16473 22.7707C2.58051 19.1864 2.58051 13.3083 6.16473 9.72406C9.74896 6.13983 15.6271 6.13983 19.2113 9.72406V9.86743L19.3547 9.72406C22.9389 6.13983 28.8171 6.13983 32.4013 9.72406C35.9855 13.3083 35.9855 19.1864 32.4013 22.7707L31.2543 23.9176L20.0715 33.6667C19.9282 33.8101 19.6414 33.9535 19.2113 33.9535Z"
              fill="#E53449"/>
          <path
              d="M16.4875 26.4982C16.4875 26.4982 16.3441 26.4982 16.4875 26.4982C16.0573 26.4982 15.6272 26.2114 15.4839 25.7813L12.6165 17.4659L12.043 19.6165C11.8996 20.0466 11.4695 20.3333 11.0394 20.3333H1.00358C0.430108 20.3333 0 19.9032 0 19.3297C0 18.7563 0.430108 18.3261 1.00358 18.3261H10.1792L11.4695 13.7383C11.6129 13.3082 12.043 13.0215 12.4731 13.0215C12.9032 13.0215 13.3333 13.3082 13.4767 13.7383L16.3441 22.4839L19.2115 15.172C19.3548 14.7419 19.7849 14.4552 20.2151 14.4552C20.6452 14.4552 21.0753 14.7419 21.2186 15.172L22.509 18.3261H28.6738C29.2473 18.3261 29.6774 18.7563 29.6774 19.3297C29.6774 19.9032 29.2473 20.3333 28.6738 20.3333H21.7921C21.362 20.3333 20.9319 20.0466 20.7885 19.6165L20.2151 18.1828L17.3477 25.7813C17.2043 26.2114 16.9176 26.4982 16.4875 26.4982Z"
              fill="#F4C44A"/>
          <path
              d="M38.5665 20.7635C39.3583 20.7635 40.0002 20.1216 40.0002 19.3298C40.0002 18.538 39.3583 17.8961 38.5665 17.8961C37.7747 17.8961 37.1328 18.538 37.1328 19.3298C37.1328 20.1216 37.7747 20.7635 38.5665 20.7635Z"
              fill="#F4C54A"/>
        </g>


        <defs>
          <clipPath id="clip" y="10">
            <path id="wavePath" d="M-40 9 Q-30 6 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V40 H-40z"
                  mask="url(#mask)" fill="url(#gradient)">
              <animateTransform attributeName="transform" begin="0s" dur="1.3s" type="translate" from="0,0" to="40,0"
                                repeatCount="indefinite"/>
            </path>
          </clipPath>
        </defs>
      </svg>

      <!--      <svg viewbox="0 0 100 20">-->
      <!--        <path id="wavePath" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z" mask="url(#mask)" fill="url(#gradient)">-->
      <!--          <animateTransform attributeName="transform" begin="0s" dur="1.5s" type="translate" from="0,0" to="40,0" repeatCount="indefinite" />-->
      <!--        </path>-->
      <!--      </svg>-->
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted, nextTick} from 'vue'
import {useRoute} from 'vue-router'
import pie from '../../components/PieChart/index.vue'

import * as echarts from "echarts/core";

// 引入柱状图图表，图表后缀都为 Chart
import {BarChart} from 'echarts/charts';
import {heartRateChartOption, heartbeatChartOption} from './option/chartOption.js';

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  GridComponent,
  DatasetComponent,
  TransformComponent,
  AriaComponent
} from 'echarts/components';
// 全局过渡动画等特性
import {LabelLayout, UniversalTransition} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from 'echarts/renderers';
import SleepChart from '../../components/SleepChart/index.vue'

import {getWeek} from '../../api/report.js'
import {deepClone, parseTime, Percentage} from "../../utils";

// 注册必须的组件
echarts.use([
  BarChart,
  CanvasRenderer,
  UniversalTransition,
  TransformComponent,
  GridComponent,
  DatasetComponent,
  LabelLayout,
  AriaComponent,
]);
import {weekMotionChartOption, weekSleepChartOption, weekSleepSeriesDefault, weekSleepSeries} from "./option/chartOption.js";


const sleepChartDom = ref(null)
const route = useRoute()
let params = reactive(route.params)
let loading = ref(true)

let sleepChartHeight = ref(216)
let sleepChartX = []
let chartDataX = []
let chartDataFormat = []
let dataInfo = reactive({
  info: {
    now: {
      dailyTime: 0,
      sportTime: 0,
      sleepTime: 0,
    },
    last: {
      total: 0
    }
  },
  lastValue: 0,
  nowValue: 0,
  pieData: {
    names: [],
    nums: [],
  }
})


async function getData() {
  const res = await getWeek(params)
  const res_data = res.data.data
  dataInfo.info = res_data

  nextTick(() => {
    setSport(res_data)
    setPieData(res_data)
    setSleepData(res_data)
    loading.value = false
  })
}

function setSleepData(data) {

  console.log(2)
  const sleepList = data.now?.sleep || []
  if (sleepList.length <= 0) {
    return
  }
  // const sleepList = [
  //   {
  //     start_time: 1670810400 + 60 * 60 * 2,
  //     end_time: 1670810400 + 60 * 60 * 4
  //   },
  //   {
  //     start_time: 1670810400 + 60 * 60 * 6,
  //     end_time: 1670810400 + 60 * 60 * 12
  //   },
  //   {
  //     start_time: 1670810400 + 60 * 60 * 18,
  //     end_time: 1670810400 + 60 * 60 * 31
  //   },
  //   {
  //     start_time: 1670810400 + 60 * 60 * 31,
  //     end_time: 1670810400 + 60 * 60 * 38
  //   },
  // ]
  console.log(sleepList)
  let maxEndTime = 60 * 24
  const unitData = 60 * 6
  const shift = 60 * 60 * 10

  const dataObj = {}

  let maxLength = 0
  sleepList.forEach((item, index) => {
    const startTime = (item.start_time - shift) * 1000
    const endTime = (item.end_time - shift) * 1000

    const timeLabel = parseTime(startTime, '{m}-{d}')
    const start = new Date(startTime).getHours() * 60 + new Date(startTime).getMinutes()
    const end = Math.floor((endTime - startTime) / 1000 / 60) + start
    const d = {
      start,
      end,
    }
    if (!dataObj[timeLabel]) {
      dataObj[timeLabel] = []
    }
    dataObj[timeLabel].push(d)

    if (end > maxEndTime) {
      maxEndTime = end
    }
    if (dataObj[timeLabel].length > maxLength) {
      maxLength = dataObj[timeLabel].length
    }
  })


  maxEndTime = Math.ceil(maxEndTime / unitData) * unitData

  const yList = []
  const seriesList = []

  console.log(chartDataFormat)
  console.log(dataObj)

  for (let i = 0; i < maxLength; i++) {
    seriesList.push(deepClone(weekSleepSeriesDefault))
    seriesList.push(deepClone(weekSleepSeries))

    seriesList[i * 2 + 1].encode.y = i * 2 + 1 + 1
    seriesList[i * 2].encode.y = i * 2 + 1

    yList.push([])
    yList.push([])

    chartDataFormat.forEach((item) => {
      if (dataObj[item] && dataObj[item][i]) {
        const obj = dataObj[item][i]
        yList[i * 2 + 1].push(obj.end - obj.start)
        let prevEnd
        if (i > 0) {
          prevEnd = dataObj[item][i - 1].end
        } else {
          prevEnd = 0
        }
        yList[i * 2].push(obj.start - prevEnd)
      } else {
        yList[i * 2].push(0)
        yList[i * 2 + 1].push(0)
      }
    })
  }

  const xList = [.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5]
  console.log(maxEndTime)
  console.log(yList)

  const source = [
    chartDataFormat,
    ...yList,
    chartDataFormat
  ]

  weekSleepChartOption.dataset.source = source
  weekSleepChartOption.yAxis.max = maxEndTime
  // weekSleepChartOption.yAxis.min = 0 - maxEndTime
  weekSleepChartOption.series = seriesList

  nextTick(() => {
    const dom = sleepChartDom.value
    const width = dom.clientWidth - 41
    const unitSize = width / 7
    const height = unitSize * (maxEndTime / unitData)
    sleepChartHeight.value = height + 40

    weekSleepChartOption.grid.height = height
    console.log(sleepChartHeight)

    nextTick(() => {

      console.log(weekSleepChartOption)
      const weekSleepChart = echarts.init(document.getElementById('week-sleep-chart'))
      weekSleepChart.setOption(weekSleepChartOption)
    })
  })

}


function setPieData(data) {
  if (data.now.event.length <= 0) {
    return
  }
  const nowList = setPieEvent(data.now.event)
  const lastList = setPieEvent(data.last.event)

  // const nowTotal = deepClone(nowList[0])
  const nowTotal = {
    '正常': 0,
    '房颤': 0,
    '房室阻滞': 0,
    '室性早搏': 0,
    '二度传导阻滞': 0,
    '噪音': 0,
    '其它': 0,
    '心动过缓': 0,
    '室上性心动过速': 0,
    '室性心动过速': 0,
    'WPW预激综合征': 0,
  }

  let nowValue = 0
  nowList.forEach((item, index) => {
    for (let i in item) {
      // if (index > 0) {
      nowTotal[i] += item[i]
      // }
      if (i !== '正常') {
        nowValue += item[i]
      }
    }
  })

  console.log('圆球')
  console.log(nowValue)

  for (let i in nowTotal) {
    if (nowTotal[i] <= 0) {
      delete nowTotal[i]
    }
  }
  const names = Object.keys(nowTotal)
  const nums = Object.values(nowTotal)
  const sortNums = []
  const sortNames = []
  for (let i = 0; i < nums.length; i++) {
    let s = 0
    let st = 0
    while (s < sortNums.length) {
      if (nums[i] > sortNums[s]) {
        sortNums.splice(s, 0, nums[i])
        sortNames.splice(s, 0, names[i])
        st = 1
        break
      }
      s++
    }
    if (!st) {
      sortNums.push(nums[i])
      sortNames.push(names[i])
    }
  }
  dataInfo.pieData.names = sortNames
  dataInfo.pieData.nums = sortNums


  console.log(lastList)
  console.log(data)
  // const lastTotal = deepClone(lastList[0])
  const lastTotal = {
    '正常': 0,
    '房颤': 0,
    '房室阻滞': 0,
    '室性早搏': 0,
    '二度传导阻滞': 0,
    '噪音': 0,
    '其它': 0,
    '心动过缓': 0,
    '室上性心动过速': 0,
    '室性心动过速': 0,
    'WPW预激综合征': 0,
  }
  let lastValue = 0
  lastList.forEach((item, index) => {
    for (let i in item) {
      // if (index > 0) {
      lastTotal[i] += item[i]
      // }
      if (i !== '正常') {
        lastValue += item[i]
      }
    }
  })
  dataInfo.nowValue = nowValue
  dataInfo.lastValue = lastValue

  console.log(12344)
  console.log(dataInfo)
}

function setPieEvent(data) {
  const list = data.map((item) => {
    if (!item || item === 'null' || item.length === 0) {
      return {}
    } else {

      const item1 = JSON.parse(item)
      delete item1['噪音']
      delete item1['其它']
      return item1
    }

  })

  console.log(parseTime(1689868800 * 1000, '{y}/{m}/{d}'))
  console.log(parseTime(1690473599 * 1000, '{y}/{m}/{d}'))
  console.log(list)
  return list
}

const lastSport = reactive({
  avg_heart_rate: 0,
  over_time: 0,
  rest_heart_rate: 0,
  sport_time: 0,
})

const nowSport = reactive({
  avg_heart_rate: 0,
  over_time: 0,
  rest_heart_rate: 0,
  sport_time: 0,
})


function setSport(data) {


  if (data.now.sport?.length <= 0) {
    console.log('本周运动为空')
    return
  }


  const last = data.last.sport || []
  const now = data.now.sport || []
  for (let i = 0; i < last.length; i++) {
    const item = last[i]
    for (let l in lastSport) {
      lastSport[l] += item[l] || 0
    }
  }

  for (let i = 0; i < now.length; i++) {
    const item = now[i]
    for (let n in nowSport) {
      const itemValue = Number(item[n]) || 0
      nowSport[n] += itemValue || 0
    }
  }
  lastSport.avg_heart_rate = Math.floor(lastSport.avg_heart_rate / last.length)
  lastSport.rest_heart_rate = Math.floor(lastSport.rest_heart_rate / last.length)

  nowSport.avg_heart_rate = Math.floor(nowSport.avg_heart_rate / now.length)
  nowSport.rest_heart_rate = Math.floor(nowSport.rest_heart_rate / now.length)


  const startTime = new Date(parseTime(params.startTime, '{y}/{m}/{d}')).getTime()
  const endTime = new Date(parseTime(params.endTime, '{y}/{m}/{d}')).getTime()


  chartDataX = []
  const chartDataY = []
  sleepChartX = []
  chartDataFormat = []
  for (let s = 0; startTime + s * 1000 * 60 * 60 * 24 <= endTime; s++) {
    chartDataX.push(s + .5)
    sleepChartX.push(startTime + s * 1000 * 60 * 60 * 24)
    const format = parseTime(startTime + s * 1000 * 60 * 60 * 24, '{m}-{d}')
    chartDataFormat.push(format)

    let yd = 0
    for (let i = 0; i < now.length; i++) {
      const item = now[i]
      const time = parseTime(item.time, '{m}-{d}')
      if (time === format) {
        yd += now[i].sport_time
      }
    }
    chartDataY.push(yd)
  }

  console.log(parseTime(1686240000 * 1000, '{m}-{d}'))
  console.log(parseTime(1686844799 * 1000, '{m}-{d}'))
  console.log(chartDataX)
  console.log(chartDataY)
  console.log(chartDataFormat)


  const weekMotionChart = echarts.init(document.getElementById('week-motion-chart'))
  let max = Math.max(...chartDataY)
  if (max === 0) {
    max = 10
  }
  weekMotionChartOption.dataset.source[0] = chartDataX
  weekMotionChartOption.dataset.source[1] = chartDataY
  weekMotionChartOption.dataset.source[2] = chartDataFormat
  weekMotionChartOption.yAxis[0].max = max * (1 + .2)
  weekMotionChartOption.yAxis[0].interval = max * (1 + .2) / 4
  weekMotionChart.setOption(weekMotionChartOption)
  console.log('运动表')
  console.log(weekMotionChartOption)
}

const svgStrList = [
  'M43.5 0C19.9 0 4.33333 7.66667 -0.5 11.5L-1.5 16L3.5 185L374.5 188V28.5C365.5 25.5 340.3 19.5 311.5 19.5C275.5 19.5 240 54.5 205.5 52C171 49.5 73 0 43.5 0Z',
  'M104 0.211877C49.2 3.01188 11.8333 23.0452 0 32.7119V172.212L348.5 176.712V13.2119C325.5 22.3786 273.8 40.4119 251 39.2119C222.5 37.7119 172.5 -3.28812 104 0.211877Z',
  'M90 32.4999C54 43.2999 16.6667 43.9999 2.5 42.9999L0.5 141L343 143V18.9999C325 13.1665 276.8 1.29987 228 0.49987C167 -0.50013 135 18.9999 90 32.4999Z',
]
const reg = /[a-z,A-Z]/g
const order = []
const regPathList = []
const regList = []
for (let i = 0; i < 3; i++) {
  regPathList.push([])
  regList.push(svgStrList[i].replace(reg, ' 20000 ').split(' ') || [])
  order.push(svgStrList[i].match(reg) || [])
}
//

const d_w = document.documentElement.clientWidth
regList.forEach((list_i, index) => {
  list_i.forEach((item) => {
    if (item === '') {
    } else if (item === '20000') {
      regPathList[index].push(order[index].shift())
    } else {
      regPathList[index].push(Number(item) * (d_w / 350))
    }
  })
})
const svgPath = reactive([])
for (let s = 0; s < 3; s++) {
  svgPath.push(regPathList[s].join(' '))
}


function getCanvasBase64(e, item) {
}

const sleepChartRef = ref(null)

function initSleepChart() {
  nextTick(() => {
    const imgList = []
    for (let i = 0; i < 7; i++) {
      const data = []
      for (let i = 0; i < 10 * 60 * 2; i++) {
        const mr = Math.random()
        if (mr > .9 && mr < 1) {
          data.push(1)
        } else if (mr > .7 && mr < 8) {
          data.push(2)
        } else {
          data.push(0)
        }
      }
      // const img = sleepChartRef.value.getCanvasBase64(data)
      // imgList.push({
      //   // 'symbol': 'image://' + img,
      //   image: img,
      //   repeat: 'no-repeat',
      //   x: 0,
      //   y: 0,
      //   x2: 1,
      //   y2: 1,
      // })
    }

    // setWeekSleepChartOption(imgList)
    setWeekSleepChartOption()
  })
}

function setWeekSleepChartOption() {
  // const weekSleepChart = echarts.init(document.getElementById('week-sleep-chart'))
  // weekSleepChartOption.color = imgList

  // weekSleepChartOption.series[1].itemStyle.color = (e) => {
  //   return imgList[e.dataIndex]
  // }
  // weekSleepChart.setOption(weekSleepChartOption)
}

onMounted(() => {

  initSleepChart()

  getData()
})

</script>

<style scoped>
.week {
  padding: .8rem;
  background: linear-gradient(170.27deg, #FF5E56 7.34%, #F97536 42.46%, #FFD7B9 92.7%);
}

.week-title-bar {
  width: 1.5rem;
  height: .2rem;
  display: block;
  background: linear-gradient(90deg, #FFC633 0%, #FCFF5C 100%);
  border-radius: .5rem;
}

.week-title-time {
  font-weight: 700;
  color: #ffffff;
  font-size: 1.4rem;
  margin-top: .5rem;
}

.week-body {
  padding-top: .25rem;
  position: relative;
  overflow: hidden;
}

.week-body-content {
  background: #FFFFFF;
  box-shadow: 0px 0px 1rem rgba(187, 187, 187, 0.2);
  border-radius: .8rem;
  padding: .9rem .8rem;
  position: relative;
  overflow: hidden;
}

.week-body-bar {
  position: absolute;
  top: 0;
  width: 5rem;
  height: .5rem;
  left: calc(50% - 2.5rem);
  border-radius: .5rem;
  z-index: 1;
}

.week-body-title {
  font-weight: 500;
  font-size: 1rem;
  vertical-align: top;

}

.week-body-item {
  color: #20222F;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}


.week-body .crude {
  font-size: 1.4rem;
}

.week-body-bg {
  width: 100%;
  position: absolute;
  height: 88px;
  z-index: 0;
  overflow: hidden;
  bottom: 0;
  left: 0;
}

.week-body-bg svg {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.week-body-bg .svg-bg-0 {
  top: 0;
}

.week-body-bg .svg-bg-1 {
  top: .9rem;
}

.week-body-bg .svg-bg-2 {
  top: 2rem;
}

.week-body-bom {
  border-top: 1px solid #DCDCDC;
  color: #333333;
  font-size: .7rem;
  text-align: right;
  vertical-align: bottom;
  position: relative;
  z-index: 1;
  padding-top: .8rem;
  line-height: 1.4rem;
}

.week-body-bom .symbol {
  font-size: .8rem;
}

.week-body-bom .text {
  font-weight: 500;
}

.week-body-bom .proposal {
  display: inline-block;
  float: left;
  line-height: .7rem;
  height: 0.7rem;
  margin-top: 0.5rem;
}


.week-body-bom .num {
  font-size: 1.4rem;
  font-weight: 700;
}

.week-body-bom .icon-up {
  vertical-align: top;
}

.week-body-bom .icon-down {
  vertical-align: center;
}
</style>