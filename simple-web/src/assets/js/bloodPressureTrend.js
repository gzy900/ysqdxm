/**
 * bloodPressureTrend.js Created by xh on 2017-10-21
 */
export default {
    grid: {
        top: 48,
        bottom: 36,
        left: 36,
        right: 36
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        //position: 'top',
        data: ['收缩压', '舒张压'],
        top: 10,
        align: 'right',
        textStyle: {
            fontSize: 14
        },
        itemWidth: 50,
        itemHeight: 10
    },
    xAxis: {
        type: 'category',
        data: [],
        boundaryGap: false,
        // min: function(value) {
        //     return value.min - 1;
        // },
        // max: function(value){
        //     return value.max + 1;
        // },
        axisTick: {
            interval: 0
        },
        axisLabel: {
            interval: 'auto',
            color: '#000'
        },
        axisLine: {
            lineStyle: {
                color: '#dee9f8'
            }
        }
    },
    yAxis: {
        scale: true,
        minInterval: 20,
        boundaryGap: ['20%', '20%'],
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
            showAllSymbol: true,
            symbolSize: 8,
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
            showAllSymbol: true,
            symbolSize: 8,
            data: [],
            itemStyle: {
                normal: {
                    color: '#5b9bd5'
                }
            }
        }
    ]
}