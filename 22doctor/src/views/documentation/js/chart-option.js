
const timeOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  title: {
    text: ''
  },
  legend: {
    data: ['最短', '平均', '最长']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['王医生']
  },
  series: [
    {
      name: '最长',
      type: 'bar',
      // stack: 'total',
      barGap: '-100%',
      barWidth: '20px',
      barMinHeight: 10,
      label: {
        show: true,
        position: 'insideRight'
      },
      emphasis: {
        focus: 'series'
      },
      data: [320]
    },
    {
      name: '平均',
      type: 'bar',
      // stack: 'total',
      barGap: '-100%',
      barWidth: '20px',
      barMinHeight: 10,

      label: {
        show: true,
        position: 'insideRight'
      },
      emphasis: {
        focus: 'series'
      },
      data: [220]
    },
    {
      name: '最短',
      type: 'bar',
      barGap: '-100%',
      // stack: 'total',
      barWidth: '20px',
      barMinHeight: 10,

      label: {
        show: true,
        position: 'insideRight'
      },
      emphasis: {
        focus: 'series'
      },
      data: [120]
    }
  ]
}

const countOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  title: {
    text: ''
  },
  legend: {
    data: []
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['王医生']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    // {
    //   name: '最长',
    //   type: 'bar',
    //   // stack: 'total',
    //   barGap: '-100%',
    //   barWidth: '20px',
    //   barMinHeight: 10,
    //   label: {
    //     show: true,
    //     position: 'insideRight'
    //   },
    //   emphasis: {
    //     focus: 'series'
    //   },
    //   data: [320]
    // },
  ]
}

export { timeOption, countOption }
