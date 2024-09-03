<template>
  <div id="pie" :class="isSleep===3?'sleep':''">
    <canvas id="pie-chart">您的浏览器不支持canvas</canvas>
    <p class="pie-num">
      <span class="pie-num1">心律事件</span>
      <span class="pie-num2"><span style="font-size: 1.4rem;font-weight: bold">{{ num_aLL }}</span>次</span>
    </p>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";

import { deepClone, drawDpiBegin, drawDpiEnd } from '../../utils/index'

let numALL = ref(0)
let canParent, pageW, pageH, can, ctx, nums, names,
    num_aLL,
    colors,
    start,
    start_default, end,
    in_r,
    out_r,
    diff_r,
    default_r

const coordTextList = []
let fontColor, pie_in_color

const props = defineProps({
  names: {
    type: Array,
    required: false,
    default: null
  },
  nums: {
    type: Array,
    required: false,
    default: null
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
})


const textOffset = [
  {
    x: 1,
    y: 0,
  },
  {
    x: 0,
    y: 1,
  },
  {
    x: -1,
    y: 0,
  },
  {
    x: 0,
    y: -1,
  },
]

//绘制圆饼
function pieChart() {
  for (let i = 0; i < nums.length; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    end += nums[i] / num_aLL * 2 * Math.PI;//终止角度


    // ctx.strokeStyle = colors[i];
    ctx.fillStyle = colors[i % 5];
    let r = out_r - diff_r * (i - 1)
    if (i === 0) {
      r = default_r
    }
    ctx.arc(0, 0, r, start, end);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, in_r, 0, 2 * Math.PI);
    ctx.fillStyle = pie_in_color;
    ctx.closePath();
    ctx.fill();

    const angle = (end - start) / 2 + start
    initText(angle, r, i)

    // initCoord(angle, r, i)

    drawDpiEnd(ctx)
    start = end// 设置下一个扇区起始角度
  }
  everyList()
  drewTxtLine()
  // drawText()
  // overlapTest()
}


let leftList = []
let rightList = []
const regionList = []

function initText(angle, r, i) {
  const t_x = pageW / 2 + r * Math.cos(angle) - pageW / 2
  const t_y = pageH / 2 + r * Math.sin(angle) - pageH / 2
  const region = (angle - 270 / 360 * 2 * Math.PI) / (2 * Math.PI)

  const num_w = ctx.measureText(nums[i] + '%').width
  const name_w = ctx.measureText(names[i]).width
  const width = num_w > name_w ? num_w : name_w
  console.log(Math.round(nums[i] / num_aLL * 10000))
  const txtObj = {
    o_x: t_x,
    o_y: t_y,
    name: names[i],
    num: Math.round(nums[i] / num_aLL * 10000) / 100 + '%',
    index: i,
    width,
    region
  }
  regionList.push(txtObj)
  if (region > .5) {
    leftList.push(txtObj)
  } else {
    rightList.push(txtObj)
  }
}

function everyList() {
  const right = regionList.filter(item =>
      item.region < .25
  )
  if (right.length <= regionList.length * .25) {
    const left = regionList.filter(item => item.region > .875)
    const left1 = left.filter((item, index) => {
      return index <= Math.ceil(left.length / 2) - 1
    })
    const left2 = left.filter((item, index) => {
      return index > Math.ceil(left.length / 2) - 1
    })
    const right1 = regionList.filter((item, index) => {
      return regionList.length - index > left.length && item.region < .5
    })
    const left3 = regionList.filter((item, index) => {
      return regionList.length - index > left.length && item.region >= .5
    })
    regionList.filter((item, index) => {
      return regionList.length - index > left.length && item.region < .5
    })
    leftList = left3.concat(left1)
    rightList = left2.concat(right1)
  }
}


function drewTxtLine() {
  const l_len = leftList.length

  for (let l_i = l_len - 1; l_i >= 0; l_i--) {
    const item = leftList[l_i]
    const p_x = 0 - pageW / 2
    const p_y = (l_len - l_i) * 32 - pageH / 2

    ctx.font = "12px Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif"
    ctx.fillStyle = fontColor
    // ctx.fillStyle = colors[item.index % 5]
    ctx.fillText(item.name, p_x, p_y - 13)
    ctx.fillText(item.num, p_x, p_y)
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = colors[item.index % 5]
    ctx.moveTo(p_x, p_y - 11)
    ctx.lineTo(p_x + item.width + 10, p_y - 11)
    ctx.lineTo(item.o_x, item.o_y)
    ctx.stroke()
    ctx.closePath()
  }

  rightList.forEach((item, index) => {
    const p_x = pageW - pageW / 2
    const p_y = (index + 1) * 32 - pageH / 2

    ctx.font = "12px Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif"
    ctx.fillStyle = fontColor
    // ctx.fillStyle = colors[item.index % 5]
    ctx.textAlign = 'right'
    ctx.fillText(item.name, p_x, p_y - 13)
    ctx.fillText(item.num, p_x, p_y)
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = colors[item.index % 5]
    ctx.moveTo(p_x, p_y - 11)
    ctx.lineTo(p_x - item.width - 10, p_y - 11)
    ctx.lineTo(item.o_x, item.o_y)
    ctx.stroke()
    ctx.closePath()
  })
}

function initCoord(angle, r, i) {
  const t_x = pageW / 2 + r * Math.cos(angle)
  const t_y = pageH / 2 + r * Math.sin(angle)
  ctx.font = "12px Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif"
  ctx.fillStyle = fontColor

  const t_x_w_name = ctx.measureText(names[i]).width
  const t_x_w_num = ctx.measureText(nums[i] + '%').width
  const t_x_w = t_x_w_num > t_x_w_name ? t_x_w_num : t_x_w_name

  const t_x_p = ((t_x - pageW / 2) / Math.abs(t_x - pageW / 2)) * .5 * t_x_w - t_x_w * .5
  const t_y_p = (t_y - pageH / 2) / Math.abs(t_y - pageH / 2) * -.5 * 32 - 32 * .5

  const coord = {
    o_x: t_x - pageW / 2,
    o_y: t_y - pageH / 2,
    p_x: t_x - pageW / 2 + t_x_p,
    p_y: t_y - pageH / 2 - t_y_p,
    w: t_x_w,
    h: 32,

    // region: Math.floor(((angle - 270 / 360 * 2 * Math.PI) / (2 * Math.PI) * 4 + 0.5) % 4),
    w1: ctx.measureText(names[i]).width,
    w2: t_x_w,
  }
  coordTextList.push(coord)
}

// 文字重叠检测 递归，直至无重叠
function overlapTest() {
  let flag = false
  coordTextList.forEach((refer, r_i) => {
    coordTextList.forEach((observe, o_i) => {
      if (r_i !== o_i) {
        const reFlag = overlap(refer, observe, r_i, o_i)
        reFlag ? flag = reFlag : ''
      }
    })
  })
  if (flag) {
    overlapTest()
  } else {
    drawText()
  }
}

function overlap(refer, observe, r_i, o_i) {
  let flag = false
  if (refer.p_y - observe.h <= observe.p_y && observe.p_y <= refer.p_y + refer.h &&
      refer.p_x - observe.w <= observe.p_x && observe.p_x <= refer.p_x + refer.w) {
    const { x, y } = textOffset[observe.region]
    if (o_i > r_i) {
      observe.p_x += (refer.p_x + refer.w - observe.p_x + 1) * x
      observe.p_y += (refer.p_y + refer.h - observe.p_y + 1) * y
    } else {
      observe.p_x += (observe.p_x + observe.w - refer.p_x) * x
      observe.p_y += (observe.p_y + observe.h - refer.p_y) * x
    }
    // observe.p_x += x*()
    // observe.p_y += y
    console.log('重合')
    flag = true
  }
  return flag
}

function drawText() {
  nums.forEach((item, i) => {
    ctx.font = "12px Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif"
    ctx.fillStyle = fontColor
    const txtObj = coordTextList[i]
    ctx.fillText(nums[i] + "%", txtObj.p_x, txtObj.p_y)
    ctx.fillText(names[i], txtObj.p_x + (txtObj.w2 - txtObj.w1) / 2, txtObj.p_y - 16)

    ctx.closePath()
    ctx.arc(txtObj.p_x, txtObj.p_y, 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  })
}

function init() {
  // nums = [77.72, 9.06, 7.98, 3.26, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98]
  // names = ['正常', '室性', '室上性', '心动过速', '心动过缓', '心动1', '心动2', '心动3', '心动4', '心动5']
  nums = deepClone(props.nums) || []
  names = deepClone(props.names) || []
  console.log(nums)
  console.log('圆球1')

  for (let i = 0; i < names.length; i++) {
    if (names[i] === '正常') {
      names.unshift(names.splice(i, 1)[0])
      nums.unshift(nums.splice(i, 1)[0])
    }
  }

  num_aLL = nums.reduce((a, b) => a + b)
  numALL.value = num_aLL

  colors = ["rgba(170, 173, 233, 1)", "rgba(86, 93, 242, 1)", "rgba(41, 216, 200, 1)", "rgba(238, 110, 92, 1)", "rgba(255, 244, 142, 1)"];

  if (props.ecgv === '1') {
    console.log(1111)
    colors = ["#D2DFFF", "#6A95FF", "#A7DEDC", "#F68B8B", "#FFF48E"];
  }
  start_default = (270 / 360) * 2 * Math.PI
  start = start_default
  end = start_default

  canParent = document.getElementById('pie')
  pageW = canParent.clientWidth
  pageH = canParent.clientHeight
  // out_r = pageW * .5 * .73
  // in_r = pageW * .5 * .46
  out_r = pageW * .5 * .65
  in_r = pageW * .5 * .40
  default_r = pageW * .5 * .50
  diff_r = (out_r - default_r) / nums.length
  can = document.getElementById("pie-chart")

  ctx = can.getContext("2d")
  drawDpiBegin(can, ctx, pageW, pageH)
  ctx.translate(pageW / 2, pageH / 2)
}

function setStyle() {
  if (props.isSleep === '3') {
    pie_in_color = 'rgba(60, 60, 86, 1)'
    fontColor = 'rgba(255, 255, 255, 0.85)'
  } else {
    pie_in_color = 'rgba(255, 255, 255, 1)'
    fontColor = 'rgba(102, 102, 102, 1)'
  }
}


onMounted(() => {

})

watch(
    () => props.nums,
    (newValue, oldValue) => {
      init()
      setStyle()
      pieChart()
    }
)
</script>

<style scoped>

#pie {
  width: 100%;
  height: 300px;
  position: relative;
}

.pie-num {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pie-num1 {
  color: #666666;
  font-size: .8rem;
  font-weight: bold;
}

.pie-num2 {
  color: #000;
  font-size: .8rem
}

.sleep .pie-num1 {
  color: rgba(255, 255, 255, .85);
}

.sleep .pie-num2 {
  color: rgba(255, 255, 255, 1);
}
</style>