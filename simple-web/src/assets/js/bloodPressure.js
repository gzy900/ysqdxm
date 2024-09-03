/**
 * bloodPressure.js Created by xh on 2017-10-21
 */
export default {
    grid: {
        top: 20
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['收缩压', '舒张压'],
        bottom: 8,
        align: 'right',
        textStyle: {
            fontSize: 14
        },
        itemWidth: 50,
        itemHeight: 0
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
        },
    },
    yAxis: {
        scale: true,
        minInterval: 20,
        min: 60,
        max: 200,
        boundaryGap: ['20%','20%'],
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
            name: '收缩压',
            type: 'line',
            animation: false,
            symbol: 'circle',
            showAllSymbol: true,
            symbolSize: 4,
            data: [],
            itemStyle: {
                normal: {
                    color: '#e77e2a'
                }
            }
        },
        {
            name: '舒张压',
            type: 'line',
            animation: false,
            symbol: 'circle',
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