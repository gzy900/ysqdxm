<template>
  <div id="chart" ref="chart" :style="{height, width}" />
</template>

<script>
import echarts from 'echarts'
import resize from '@/utils/resize'
require('echarts/extension/bmap/bmap')
export default {
  mixins: [resize],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    height: {
      type: String,
      default() {
        return '300px'
      }
    },
    width: {
      type: String,
      default() {
        return '100%'
      }
    }
  },
  data() {
    return {}
  },
  watch: {
    options(value) {
      this.draw()
    },
    height() {
      this.draw()
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      if (this.chart) {
        return this.chart.setOption(this.$props.options)
      }

      this.chart = echarts.init(this.$refs.chart)
      this.$nextTick(() => {
        return this.chart.setOption(this.$props.options)
      })
    }
  }
}
</script>
