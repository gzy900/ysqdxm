<template>
  <div class="chart" id="chart">

  </div>
</template>

<script>
import _echarts from 'echarts'
import {deepClone} from '@/utils/index'
import resize from '@/components/Charts/mixins/resize'

let chart = null
export default {
  name: 'Chart',
  props: {
    data: {
      type: Array,
      default: null
    },
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
    console.log(this.data)
  },
  methods: {
    initData() {
      if (Object.prototype.toString.call(this.data) === '[object Array]') {
        let xd = []
        let yd1 = []
        let yd = []
        this.data.forEach((item) => {
          if (!!item.value) {
            yd.push(item.value)
          }
          if (!!item.min) {
            yd.push(item.min)
            yd1.push(item.max)
          }
          xd.push(item.time)
        })

        this.option.xAxis.data = xd
        this.option.series[0].data = yd
        if (yd1.length >= 1) {
          this.option.series.push(
            {
              data: yd1,
              type: 'line'
            }
          )
        }
      }
    },
    initChart() {
      this.initData()
      chart = _echarts.init(document.getElementById('chart'))
      chart.setOption(this.option)
    }
  }
}
</script>

<style scoped lang="scss">

.chart {
  width: 100%;
  height: 300px;
}
</style>
