/**
 * dotBloodPressureTrend.js Created by zzm on 2020-09-11
 */

export default {
  grid: {
    left: 40
  },
  tooltip: {
    trigger: 'item',
    formatter: '{c}'
  },
  xAxis: {
    name: '收缩压(mmHg)',
    min: 50,
    max: 200,
    nameLocation: 'middle',
    nameTextStyle: {
      padding: [20, 0, 0, 0]
    },
  },
  yAxis: {
    name: '舒张压(mmHg)',
    min: 0,
    max: 120,
    nameLocation: 'end',
    interval: 20,
    nameTextStyle: {
      padding: [0, 0, 0, 40]
    },
  },
  series: [
      {
        symbolSize: 10,
        data: [],
        type: 'scatter'
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
            { itemStyle: { color: '#7DC56F' }, coord: [0, 30] }
          ]
        ]
      }
    }
  ]
}

