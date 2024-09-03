import { parseTime } from "../../../utils/index.ts";
import { data } from "../../../components/XgChart/option/option.js";

const heartRateChartOption = {
    // legend: {
    //     top: 'bottom'
    // },
    // toolbox: {
    //     show: true,
    //     feature: {
    //         mark: { show: true },
    //         dataView: { show: true, readOnly: false },
    //         restore: { show: true },
    //         saveAsImage: { show: true }
    //     }
    // },
    series: [
        {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: ['36%', '60%'],
            center: ['50%', '50%'],
            roseType: 'area',
            selectedOffset: 100,
            itemStyle: {
                borderRadius: 0
            },
            startAngle: 165,
            data: [
                {
                    value: 9.06, name: '室性'
                },
                { value: 7.98, name: '室上性' },
                { value: 3.26, name: '心动过速' },
                { value: 1.98, name: '心动过缓' },
                { value: 77.72, name: '正常' },
            ]
        }
    ]
}

const heartbeatChartOption = {
    dataset: {
        source: [
            [70, 60, 81, 90, 72],
            [1, 2, 3, 4, 5]
        ]
    },
    grid: {
        top: 10,
        left: 36,
        bottom: 26,
        right: 10,
    },
    xAxis: {
        type: 'value',
        boundaryGap: false,
        min: 1,
        max: 5,
        axisLine: {
            show: false,
            onZero: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: 'rgba(102, 102, 102, 1)',
        },
        minorTick: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    tooltip: {
        axisPointer: {}
    },
    yAxis: {
        min: 40,
        max: 220,
        interval: 30,
        axisTick: {
            show: false
        },
        axisLabel: {
            color: 'rgba(102, 102, 102, 1)',
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(238, 238, 238, 1)'
            }
        },
        type: 'value',
        minorTick: {
            show: false
        },
        axisLine: {
            show: false,
            onZero: false
        },
    },
    series: [
        {
            seriesLayoutBy: 'row',
            encode: {
                y: 0,
                x: 1
            },
            type: 'line',
            smooth: .5,
            lineStyle: {
                color: 'rgba(14, 156, 255, 1)'
            },
            areaStyle: {
                color: 'rgba(14, 156, 255, .2)'
            },

            markLine: {
                lineStyle: {
                    color: 'rgba(65, 105, 220, 0.7)'
                },
                silent: true,
                label: {
                    show: true
                },
                symbol: ['none', 'none'],
                data: [{
                    type: 'average',
                    name: '平均心率',
                    valueIndex: 0,
                    label: {
                        position: 'insideEndTop', color: '#999999', formatter: (params) => {
                            return params.data.name + Math.floor(params.data.value)
                        }
                    }
                }]
            },

            symbolSize: (value, params) => {
                if (value[0] === 60 || value[0] === 90) {
                    return 8
                } else {
                    return 0
                }
            },
            markPoint: {
                silent: false,
                symbol: 'circle',
                symbolSize: 10,

                symbolOffset: [0, '-14px'],
                itemStyle: {
                    color: 'rgba(0,0,0,0)'
                },
                data: [
                    {
                        type: 'max', name: 'Max', valueIndex: 0, label: {
                            color: 'rgba(229, 52, 73, 1)'
                        },
                    },
                    {
                        type: 'min', name: 'Min', valueIndex: 0, label: {
                            color: 'rgba(20, 166, 147, 1)'
                        },
                        symbolSize: 20,
                    }
                ]
            },
        }
    ]
}

const weekMotionChartOption = {
    dataset: {
        source: [
            [.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5],
            [1, 2, 3, 4, 2, 1, 3],
            ['11-01', '11-02', '11-03', '11-04', '11-05', '11-06', '11-07'],
        ]
    },
    xAxis: [
        {
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#bcbcbc',
                    width: 1
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
            },
            min: 0,
            max: 7,

            interval: 1,
            splitLine: {
                show: true,
                interval: 1,
                lineStyle: {
                    color: '#dcdcdc',
                    type: 'dashed'
                }
            }
        },
    ],
    yAxis: [
        {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            min: 0,
            max: 8,
            interval: 1,
            splitLine: {
                show: true,
                interval: 2,
                lineStyle: {
                    color: '#dcdcdc',
                    type: 'dashed'
                }
            }
        },
    ],
    grid: [
        {
            top: 0,
            height: 174,
            bottom: 20,
            left: 1,
            right: 1,
            show: true,
            borderColor: '#DCDCDC'
        },
    ],
    series: [
        {
            symbol: 'none',
            seriesLayoutBy: 'row',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
                color: '#4169DD',
                borderRadius: [5, 5, 5, 5],
            },
            label: {
                show: true,
                position: 'bottom',
                formatter: '{@[2]}'
            },
            enCode: {
                x: 1,
                y: 0
            }
        },
    ]
}

const weekSleepSeriesDefault = {
    symbol: 'none',
    seriesLayoutBy: 'row',
    type: 'bar',
    stack: 'Total',
    barWidth: 20,
    itemStyle: {
        borderColor: 'transparent',
        color: 'transparent',

    },
    emphasis: {
        itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
        }
    },

    // label: {
    //     show: true,
    //     position: 'bottom',
    //     formatter: '{@[5]}'
    // },
    encode: {
        x: 0,
        y: 1
    }
}
const weekSleepSeries = {
    symbol: 'none',
    seriesLayoutBy: 'row',
    colorBy: 'data',
    stack: 'Total',
    type: 'bar',
    barWidth: 20,
    itemStyle: {
        color: '#4169DD',
        // borderRadius: [0],
        borderRadius: [5, 5, 5, 5],

    },
    encode: {
        x: 0,
        y: 2
    }
}

const weekSleepChartOption = {
    // color: [],
    dataset: {
        source: [
            [.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5],
            [1, 0, 1, 2, 2, 1, 0],
            [2, 3, 4, 2, 1, 2, 1],
            [1, 0, 1, 2, 2, 1, 1],
            [2, 3, 4, 2, 1, 2, 1],
            ['11-01', '11-02', '11-03', '11-04', '11-05', '11-06', '11-07'],
        ]
    },
    xAxis: {
        type: 'category',
        axisLine: {
            show: false,
            onZero: false,
            lineStyle: {
                color: '#bcbcbc',
                width: 1
            }
        },

        position: 'bottom',
        axisTick: {
            show: false
        },
        axisLabel: {
            show: true,
            interval: 0,
        },

        interval: 1,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#dcdcdc',
                type: 'dashed'
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        inverse: true,
        axisLabel: {
            show: true,
            formatter: function (value) {
                let h = Math.floor((value + 60 * 10) / 60) % 24
                if (h < 10) {
                    h = '0' + h.toString()
                }
                let i = '00'
                return h + ':' + i
            }
        },
        min: 0,
        max: 16,
        interval: 60 * 6,
        splitLine: {
            show: true,
            interval: 1,
            lineStyle: {
                color: '#dcdcdc',
                type: 'dashed'
            }
        }
    },

    grid: {
        top: 20,
        height: 174,
        bottom: 20,
        left: 40,
        right: 1,
        show: true,
        borderColor: '#DCDCDC'
    },
    series: [
        {
            symbol: 'none',
            seriesLayoutBy: 'row',
            type: 'bar',
            stack: 'Total',
            barWidth: 20,
            itemStyle: {
                borderColor: 'transparent',
                color: 'transparent'
            },
            emphasis: {
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent'
                }
            },

            label: {
                show: true,
                position: 'bottom',
                formatter: '{@[5]}'
            },
            encode: {
                x: 0,
                y: 1
            }
        },
        {
            symbol: 'none',
            seriesLayoutBy: 'row',
            colorBy: 'data',
            stack: 'Total',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
                // color: null,
                borderRadius: [0],
            },
            encode: {
                x: 0,
                y: 2
            }
        },

        {
            symbol: 'none',
            seriesLayoutBy: 'row',
            type: 'bar',
            stack: 'Total',
            barWidth: 20,
            itemStyle: {
                borderColor: 'transparent',
                color: 'transparent'
            },
            emphasis: {
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent'
                }
            },

            // label: {
            //     show: true,
            //     position: 'bottom',
            //     formatter: '{@[5]}'
            // },
            enCode: {
                x: 0,
                y: 3
            }
        },
        {
            symbol: 'none',
            seriesLayoutBy: 'row',
            colorBy: 'data',
            stack: 'Total',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
                // color: null,
                borderRadius: [0],
            },
            enCode: {
                x: 0,
                y: 4
            }
        },
    ]
}

const breathChartOption = {
    dataset: {
        source: []
    },
    grid: {
        top: 8,
        left: 30,
        bottom: 20,
        right: 8,
    },
    xAxis: {
        splitLine: {
            lineStyle: {
                color: 'rgba(204, 204, 204, 0.4)',
                type: 'dashed'
            }
        },
        axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            formatter: function (value, index) {
                return (20 + Math.floor(value / 60)) % 24
            }
        },
        interval: 60,
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        }
    },
    yAxis: {
        min: .2,
        max: 1.2,
        splitLine: {
            lineStyle: {
                color: 'rgba(204, 204, 204, 0.4)',
                type: 'dashed'
            }
        },
        axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        }
    },
    series: [
        {
            name: 'scatter',
            type: 'scatter',
            symbolSize: 4,
            seriesLayoutBy: 'row',
            encode: {
                x: 1,
                y: 0,
                tooltip: 2
            },
            animationDelay: function (idx) {
                return idx * 2;
            },
            itemStyle: {
                color: (data) => {
                    if (data.data[2] === 0) {
                        return 'rgba(14, 156, 255, 1)'
                    } else {
                        return 'rgba(250, 62, 62, 1)'
                    }
                }
            }
        }
    ]
}


export {
    heartRateChartOption,
    heartbeatChartOption,
    weekMotionChartOption,
    weekSleepChartOption,
    breathChartOption,
    weekSleepSeriesDefault,
    weekSleepSeries
}