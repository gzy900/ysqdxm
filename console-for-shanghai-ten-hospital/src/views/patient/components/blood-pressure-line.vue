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
    list() {
      this.draw()
    }
  },
  created() {
    this.draw()
  },
  methods: {
    draw() {
      this.options = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          name: '日期',
          nameLocation: 'middle',
          nameTextStyle: {
            padding: [20, 0, 0, 0]
          },
          data: this.list.map(item => moment(item.dt).format('MM/DD'))
        },
        yAxis: {
          name: 'mmHg',
          nameLocation: 'end',
          nameTextStyle: {
            padding: [0, 0, 0, 30]
          }
        },
        series: [
          {
            name: '收缩压',
            type: 'line',
            data: this.list.map(item => item.systolic / 1)
          },
          {
            name: '舒张压',
            type: 'line',
            data: this.list.map(item => item.diastolic / 1)
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
