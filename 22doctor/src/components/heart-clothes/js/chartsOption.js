export const option = {
  title: [],

  animation: false,
  // animationDuration: 0,
  // animationDurationUpdate: 0,
  // animationThreshold: 1,
  // stateAnimation: {
  //   duration: 0
  // },
  // aria: {
  //   enabled: false
  // },
  // axisPointer: {
  //   show: false
  // },
  grid: [],
  toolbox: {
    show: true
  },
  brush: {
    toolbox: ['lineX'],
    throttleDelay: 'debounce',
    xAxisIndex: 0
  },
  xAxis: {},
  yAxis: {},
  series: [],
  dataZoom: [
    {
      id: 'dataZoomX',
      type: 'inside',
      xAxisIndex: [0],
      filterMode: 'empty',
      zoomLock: true,
      throttle: 10,
      startValue: 0,
      endValue: 3100,
      preventDefaultMouseMove: true
    },
    {
      id: 'dataZoomY',
      type: 'inside',
      yAxisIndex: [0],
      filterMode: 'empty',
      zoomLock: true,
      throttle: 10,
      startValue: 0,
      endValue: 3100,
      preventDefaultMouseMove: true
    },

    {
      show: true,
      type: 'slider',
      xAxisIndex: [0],
      zoomLock: true,
      throttle: 50,
      startValue: 0,
      endValue: 3100,
      preventDefaultMouseMove: false,
      brushSelect: false,
      showDataShadow: false,
      showDetail: true,
      backgroundColor: '#e7e7e7',
      bottom: 0,
      left: 0,
      right: 0
    }
  ]
  // graphic: [
  //   {
  //     type: 'text',
  //     style: {
  //       text: '123',
  //       x: 1,
  //       y: 1,
  //     },
  //     z: 999,
  //     zlevel: 99,
  //   }
  // ]
}
