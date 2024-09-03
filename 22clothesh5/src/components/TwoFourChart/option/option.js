const option = {
    dataset: {
        source: {}
    },
    title: [
        {
            text: '心率BPM',
            textStyle: {
                fontSize: 14,
                fontWeight: 500,
                color: '#333',
            },
            top: 10,
            left: 16
        },
        // {
        //     text: '最小心率 48BPM',
        //     textStyle: {
        //         fontSize: 12,
        //         fontWeight: 500, color: '#333',
        //
        //         width: '50%'
        //     },
        //     top: 140,
        //     left: 20
        // },
        // {
        //     text: '最大心率 48BPM',
        //     textStyle: {
        //         fontSize: 12, color: '#333',
        //
        //         fontWeight: 500
        //     },
        //     top: 140,
        //     right: 20
        // },
        {
            text: '心率变异性',
            textStyle: {
                fontSize: 14, color: '#333',

                fontWeight: 500
            },
            top: 120,
            left: 16
        },
        {
            text: '24小时RR间期',
            textStyle: {
                fontSize: 12, color: '#333',

                fontWeight: 500
            },
            top: 255,
            right: 16
        },
        {
            text: '室性',
            textStyle: {
                fontSize: 14, color: '#333',

                fontWeight: 500
            },
            top: 305,
            left: 16
        },
        {
            text: '室上性',
            textStyle: {
                fontSize: 14, color: '#333',
                fontWeight: 500
            },
            top: 415,
            left: 16
        },
    ],
    xAxis: [
        {
            id: 'hr_5min_x',
            type: 'value',
            gridIndex: 0,
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
                show: false
            },
            min: 0,
            max: 255,

            interval: 20,
            splitLine: {
                show: true,
                interval: 10,
                lineStyle: {
                    color: '#dcdcdc',
                    type: 'dashed'
                }
            }
        },
        // {
        //     id: '',
        //     type: 'value',
        //     gridIndex: 1,
        //     axisLine: {
        //         show: false,
        //         lineStyle: {
        //             color: '#bcbcbc',
        //             width: 1
        //         }
        //     },
        //     axisTick: {
        //         show: false
        //     },
        //     axisLabel: {
        //         show: false
        //     },
        //     min: 0,
        //     max: 13,
        //
        //     interval: 1,
        //     splitLine: {
        //         show: false,
        //         interval: 1,
        //         lineStyle: {
        //             color: '#dcdcdc',
        //             type: 'dashed'
        //         }
        //     }
        // },
        // {
        //     type: 'value',
        //     gridIndex: 2,
        //     axisLine: {
        //         show: false,
        //         lineStyle: {
        //             color: '#bcbcbc',
        //             width: 1
        //         }
        //     },
        //     axisTick: {
        //         show: false
        //     },
        //     axisLabel: {
        //         show: false
        //     },
        //     min: 0,
        //     max: 13,
        //
        //     interval: 1,
        //     splitLine: {
        //         show: false,
        //         interval: 1,
        //         lineStyle: {
        //             color: '#dcdcdc',
        //             type: 'dashed'
        //         }
        //     }
        // },
        {
            type: 'value',
            gridIndex: 1,
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
                show: false
            },
            min: 0,
            max: 255,

            interval: 20,
            splitLine: {
                show: true,
                interval: 1,
                lineStyle: {
                    color: '#dcdcdc',
                    type: 'dashed'
                }
            }
        },
        {
            type: 'value',
            gridIndex: 2,
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
                show: false
            },
            min: 0,
            max: 255,

            interval: 1,
            splitLine: {
                show: false,
                interval: 1,
                lineStyle: {
                    color: '#dcdcdc',
                    type: 'dashed'
                }
            }
        },
        {
            type: 'value',
            gridIndex: 3,
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
                show: false
            },
            min: -0.5,
            max: 22.5,

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
        {
            type: 'value',
            gridIndex: 4,
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
                show: false
            },
            min: -0.5,
            max: 22.5,

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
            gridIndex: 0,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            min: 1,
            max: 20,
            // splitNumber:4,
            interval: 10,
            splitLine: {
                show: true,
                interval: 1,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        // {
        //     type: 'value',
        //     gridIndex: 1,
        //     axisLine: {
        //         show: false
        //     },
        //     axisTick: {
        //         show: false
        //     },
        //     axisLabel: {
        //         show: false
        //     },
        //     min: 0,
        //     max: 4,
        //     interval: 1,
        //     splitLine: {
        //         show: false,
        //         interval: 1,
        //         type: 'dashed'
        //     }
        // },
        // {
        //     type: 'value',
        //     gridIndex: 2,
        //     axisLine: {
        //         show: false
        //     },
        //     axisTick: {
        //         show: false
        //     },
        //     axisLabel: {
        //         show: false
        //     },
        //     min: 0,
        //     max: 4,
        //     interval: 1,
        //     splitLine: {
        //         show: false,
        //         interval: 1,
        //         type: 'dashed'
        //     }
        // },
        {
            type: 'value',
            gridIndex: 1,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            min: 'datamin',
            max: 'datamax',
            interval: 30,
            splitLine: {
                show: true,
                interval: 90,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        {
            type: 'value',
            gridIndex: 2,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            min: 'datamin',
            max: 'datamax',

            splitLine: {
                show: false,
                interval: 1,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        {
            type: 'value',
            gridIndex: 3,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            min: 'datamin',
            max: 'datamax',
            // interval: 1,
            splitLine: {
                show: true,
                // interval: 1,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        {
            type: 'value',
            gridIndex: 4,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            min: 'datamin',
            max: 'datamax',
            interval: 1,
            splitLine: {
                show: true,
                interval: 1,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
    ],
    grid: [
        {
            top: 1,
            height: 94,
            left: 1,
            right: 1,
            show: true,
            borderColor: '#DCDCDC'
        },
        // {
        //     top: 94,
        //     height: 70,
        //     left: 1,
        //     right: '50%',
        //     show: true,
        //     borderColor: '#DCDCDC'
        // },
        // {
        //     top: 94,
        //     height: 70,
        //     left: '50%',
        //     right: 1,
        //     show: true,
        //     borderColor: '#DCDCDC'
        // },
        {
            top: 94 + 16,
            height: 94,
            left: 1,
            right: 1,
            show: true,
            borderColor: '#DCDCDC'
        },
        {
            top: 94 + 16 + 94,
            height: 80,
            left: 1,
            right: 1,
            show: true,
            borderColor: '#DCDCDC'
        },
        {
            top: 94 + 16 + 94 + 80 + 16,
            height: 94,
            left: 1,
            right: 1,
            show: true,
            borderColor: '#DCDCDC'
        },
        {
            top: 94 + 16 + 94 + 80 + 16 + 94 + 16,
            height: 94,
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
            type: 'line',
            lineStyle: {
                color: '#0DB77A'
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            encode: {
                x: 'x',
                y: 'hr_5min'
            },
        },
        // {
        //     symbol: 'none',
        //     seriesLayoutBy: 'row',
        //     type: 'line',
        //     lineStyle: {
        //         color: '#0DB77A'
        //     },
        //     xAxisIndex: 1,
        //     yAxisIndex: 1,
        // },
        // {
        //     symbol: 'none',
        //     seriesLayoutBy: 'row',
        //     type: 'line',
        //     lineStyle: {
        //         color: '#0DB77A'
        //     },
        //     xAxisIndex: 2,
        //     yAxisIndex: 2,
        // },
        {
            symbol: 'none',
            seriesLayoutBy: 'row',
            type: 'line',
            step: 'end',
            lineStyle: {
                color: '#0DB77A'
            },
            xAxisIndex: 1,
            yAxisIndex: 1,
            encode: {
                x: 'x',
                y: 'sdnn_5min'
            },
        },
        {
            symbol: 'none',
            seriesLayoutBy: 'row',
            type: 'bar',
            itemStyle: {
                color: '#0DB77A'
            },
            encode: {
                x: 'x',
                y: 'rr_5min'
            },
            barCategoryGap: '10%',
            // barWidth: 4,
            xAxisIndex: 2,
            yAxisIndex: 2,
        },
        {
            symbol: 'none',
            seriesLayoutBy: 'row',
            type: 'bar',
            itemStyle: {
                color: '#0DB77A'
            },
            xAxisIndex: 3,
            yAxisIndex: 3,
            barMinHeight: 5,
            encode: {
                x: 'v_x',
                y: 'picVentricular'
            },
        },
        {
            symbol: 'none',
            seriesLayoutBy: 'row',
            type: 'bar',
            // barGap: '-50%',
            itemStyle: {
                color: '#0DB77A'
            },
            xAxisIndex: 4,
            yAxisIndex: 4,
            barMinHeight: 5,
            encode: {
                x: 'v_x',
                y: 'picSupraVentricular'
            },
        },
    ]
};

export {
    option
}