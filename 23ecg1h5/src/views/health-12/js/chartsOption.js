export let option = {
  title: [],

  animation: false,

  grid: [],
  toolbox: {
    show: true,
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
      show: false,
      id: 'dataZoomX',
      type: 'inside',
      xAxisIndex: [0],
      filterMode: 'filter',
      zoomLock: true,
      throttle: 0,
      startValue: 0,
      endValue: 3100,
      preventDefaultMouseMove: true
    },
    {
      show: false,
      id: 'dataZoomY',
      type: 'inside',
      yAxisIndex: [0],
      filterMode: 'empty',
      zoomLock: true,
      throttle: 0,
      startValue: 0,
      endValue: 3100,
      preventDefaultMouseMove: true
    },

    {
      show: true,
      type: 'slider',
      xAxisIndex: [0],
      zoomLock: true,
      throttle: 0,
      startValue: 0,
      endValue: 3100,
      preventDefaultMouseMove: true,
      brushSelect: false,
      showDataShadow: false,
      showDetail: true,
      backgroundColor: '#e7e7e7',
      bottom: 0,
      left: 20,
      right: 20
    },
  ],
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
