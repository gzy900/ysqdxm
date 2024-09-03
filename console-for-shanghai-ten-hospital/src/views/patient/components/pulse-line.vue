<template>
  <section>
    <Chart :options="options" />
  </section>
</template>

<script>
import Chart from '@/components/Chart'
import moment from 'moment'

export default {
  name: 'PulseLine',
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
      if (value.length > 0) {
        this.draw()
      }
    }
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
          name: 'Bpm',
          nameLocation: 'end',
          nameTextStyle: {
            padding: [0, 0, 0, 30]
          }
        },
        series: [
          {
            name: '心率',
            type: 'line',
            stack: '总量',
            data: this.list.map(item => item.pulse)
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
