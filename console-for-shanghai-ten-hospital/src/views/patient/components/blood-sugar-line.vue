<template>
  <section>
    <Chart :options="options" />
  </section>
</template>

<script>
import Chart from '@/components/Chart'
import moment from 'moment'

export default {
  name: 'BloodPressureLine',
  components: {
    Chart
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      options: {}
    }
  },
  watch: {
    list(value) {
      if (value.every((item) => item.length > 0)) {
        this.draw()
      }
    }
  },
  methods: {
    draw() {
      const [before, after] = this.list
      this.options = {
        tooltip: {
          trigger: 'axis'
        },
        grid: [
          { x: '10%', y: '8%', height: '38%' },
          { x: '10%', y2: '8%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            data: before.map(item => moment(item.dt).format('MM/DD'))
          },
          {
            gridIndex: 1,
            data: after.map(item => moment(item.dt).format('MM/DD'))
          }
        ],
        yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
        series: [
          {
            name: '餐前血糖',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: before.map(item => item.blood_sugar / 1)
          },
          {
            name: '餐后血糖',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: after.map(item => item.blood_sugar / 1)
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
