<template>
  <section>
    <Chart :options="options" height="500px" />
  </section>
</template>

<script>
import Chart from '@/components/Chart'

export default {
  name: 'BloodPressurePoint',
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
          trigger: 'item',
          formatter: '血压{c}'
        },
        xAxis: {
          name: '收缩压(高压)mmHg',
          min: 50,
          max: 200,
          nameLocation: 'middle',
          nameTextStyle: {
            padding: [20, 0, 0, 0]
          }
        },
        yAxis: {
          name: '舒张压(低压)mmHg',
          min: 0,
          max: 120,
          nameLocation: 'end',
          nameTextStyle: {
            padding: [0, 0, 0, 40]
          }
        },
        series: [
          {
            name: '血压',
            type: 'scatter',
            data: this.list.map(item => [item.systolic / 1, item.diastolic / 1])
          },
          {
            type: 'scatter',
            markArea: {
              silent: true,
              data: [
                [
                  { itemStyle: { color: '#F8765F' }, coord: [0, 0] },
                  { itemStyle: { color: '#F8765F' }, coord: [200, 120] } // 红色
                ]
              ]
            }
          },
          {
            type: 'scatter',
            markArea: {
              silent: true,
              data: [
                [
                  { itemStyle: { color: '#F7CA34' }, coord: [0, 0] },
                  { itemStyle: { color: '#F7CA34' }, coord: [180, 100] } // 黄色
                ]
              ]
            }
          },
          {
            type: 'scatter',
            markArea: {
              silent: true,
              data: [
                [
                  { itemStyle: { color: '#36B22B' }, coord: [0, 0] },
                  { itemStyle: { color: '#36B22B' }, coord: [135, 85] } // 绿色
                ]
              ]
            }
          },
          {
            type: 'scatter',
            markArea: {
              silent: true,
              data: [
                [
                  { itemStyle: { color: '#1770C4' }, coord: [0, 0] },
                  { itemStyle: { color: '#1770C4' }, coord: [100, 50] } // 蓝色
                ]
              ]
            }
          },
          {
            type: 'scatter',
            markArea: {
              silent: true,
              data: [
                [
                  { itemStyle: { color: '#7DC56F' }, coord: [0, 0] },
                  { itemStyle: { color: '#7DC56F' }, coord: [0, 0] }
                ]
              ]
            }
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
