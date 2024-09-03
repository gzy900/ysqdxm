/**
 * pulse.js Created by xh on 2017-10-21
 */
export default {
    grid: {
        top: 20, bottom: 36
    },
    tooltip: {
        trigger: 'axis'
      },
    xAxis: {
        data: [],
        boundaryGap: false,
        min: function(value) {
            return value.min - 1;
        },
        max: function(value){
            return value.max + 1;
        },
        axisLabel: {
            color: '#000'
        },
        axisLine: {
            lineStyle: {
                color: '#dee9f8'
            }
        }
    },
    yAxis: {
        minInterval: 20,
        min: 40,
        max: 180,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: '#dee9f8'
            }
        }
    },
    series: [
        {
            name: '心率',
            type: 'line',
            animation: false,
            showAllSymbol: true,
            symbolSize: 4,
            data: [],
            itemStyle: {
                normal: {
                    color: '#5b9bd5'
                }
            }
        }
    ]
}