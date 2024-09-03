export const option = {
  title: [],
  animation: false,
  grid: {
    left: '1px',
    right: '1px',
    bottom: '1px',
    top: '1px'
  },
  toolbox: {
    show: true
  },
  xAxis: {
    type: 'value',
    interval: 200,
    min: 0,
    max: 5000,
    gridIndex: 0,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#c3c8c6'
      }
    },
    axisLabel: {
      show: false
    },
    axisLine: {
      onZero: false,
      show: false
    },
    axisTick: {
      show: false
    },
    minorSplitLine: {
      show: true,
      lineStyle: {
        color: '#e7e7e7'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      onZero: false,
      show: false
    },
    min: 1600,
    max: 2000,
    minInterval: 50,
    axisLabel: {
      show: false
    },
    inverse: true,
    interval: 50,
    // splitNumber: 10,
    axisTick: {
      show: false
    },
    gridIndex: 0,
    scale: true,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#c3c8c6'
      }
    },
    minorSplitLine: {
      show: true,
      lineStyle: {
        color: '#e7e7e7'
      }
    }
  },
  series: [
    {
      type: 'line',
      name: '1',
      showSymbol: false,
      itemStyle: {
        normal: {
          lineStyle: {
            color: '#7fc4b3'
          }
        }
      },
      label: {
        show: true,
        formatter: '123'
      },
      animation: false,
      // sampling: 'lttb',
      connectNulls: false
    },

    {
      type: 'line',
      name: '2',
      showSymbol: false,
      itemStyle: {
        normal: {
          lineStyle: {
            color: '#7fc4b3'
          }
        }
      },
      label: {
        show: true,
        formatter: '123'
      },
      animation: false,
      // sampling: 'lttb',
      connectNulls: false
    }
  ]
}
