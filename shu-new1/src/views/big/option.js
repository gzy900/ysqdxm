const option = {
    // "backgroundColor": "#0c1246",
    // "backgroundColor": "#0c1246",
    geo3D: {
        map: '中国省',
        componentType: 'geo3D',
        regionHeight: 2,
        selectedMode: 'multiple',
        itemStyle: {
            // color: "#0671ed",
            color: [1, 1.5, 2, 1],
            borderWidth: 1,
            borderColor: '#000',
            opacity: 1
        },
        // groundPlane: {
        //     show: true,
        //     color: '#0671ed'
        // },
        shading: 'realistic',
        light: {
            main: {
                color: '#fff',
                shadow: true
            },
            ambient: {
                color: '#fff',
                intensity: .2
            },
            ambientCubemap: {}
        },
        postEffect: {
            enable: true,
            bloom: {
                enable: true,
                bloomIntensity: .1
            },
            // depthOfField: {
            //     enable: true,
            //     focalDistance: 70,
            //     focalRange: 10,
            //     fstop: 2.8,
            //     blurRadius: 4,
            // },
            // colorCorrection: {
            //     enable: true,
            //     exposure: .1,
            //     brightness: 0,
            //     contrast: 1,
            //     saturation: 1
            // }

        },
        temporalSuperSampling: {
            enable: true
        },
        silent: true,

        regions: [
            {
                name: '河北',
                height: 4,

                itemStyle: {
                    color: [1, 0, 0, 1],
                    borderWidth: 0
                },
                label: {
                    show: true,
                    color: '#fff',
                }
            }
        ],
        // silent: true
    },
}

const linesOption = {
    // "backgroundColor": "#0c1246",
    // "backgroundColor": "#0c1246",
    geo3D: {
        show: true,
        map: '中国省',
        componentType: 'geo3D',
        boxHeight: 20,
        regionHeight: 2,
        selectedMode: 'multiple',
        colorMaterial: {
            detailTexture: '#000'
        },

        itemStyle: {
            // color: "#0e1855",
            // color: [1, 1.5, 2, 1],
            borderWidth: 1,
            borderColor: '#2be7f8',
            opacity: 1
        },
        shading: 'color',
        silent: false,
        emphasis: {
            height: 4,
        },
        regions: [
            // {
            //     name: '河北',
            //     height: 4,
            //
            //     itemStyle: {
            //         color: '#05a3f2',
            //         borderWidth: 0
            //     },
            //     label: {
            //         show: true,
            //         color: '#fff',
            //     }
            // }
        ],
        // silent: true
    },
    series: [
        {
            type: "lines3D",
            coordinateSystem: 'geo3D',
            effect: {
                show: true,
                period: 2,
                opacity: 1,
                roundTrip: true
            },
            lineStyle: {
                color: '#6758fa',
                opacity: 1,
                width: 0,
                height: 5,
                regionHeight: 20,
                curveness: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10
            },
            blendMode: 'lighter',
            height: 5,
            regionHeight: 5,
            data: [],
            zlevel: 5,
            silent: true,
        },

        // {
        //     type: 'custom',
        //     coordinateSystem: 'geo',
        //     geoIndex: 0,
        //     zlevel: 1,
        //     data: [
        //         [488.2358421078053, 459.70913833075736, 100],
        //         [770.3415644319939, 757.9672194986475, 30],
        //         [1180.0329284196291, 743.6141808346214, 80],
        //         [894.03790632245, 1188.1985153835008, 61],
        //         [1372.98925630313, 477.3839988649537, 70],
        //         [1378.62251255796, 935.6708486282843, 81]
        //     ],
        //     renderItem(params, api) {
        //         console.log(api)
        //         console.log(api.value(0, params.dataIndex))
        //         const coord = api.coord([
        //             api.value(0, params.dataIndex),
        //             api.value(1, params.dataIndex)
        //         ]);
        //         const circles = [];
        //         for (let i = 0; i < 5; i++) {
        //             circles.push({
        //                 type: 'circle',
        //                 shape: {
        //                     cx: 0,
        //                     cy: 0,
        //                     r: 30
        //                 },
        //                 style: {
        //                     stroke: 'red',
        //                     fill: 'none',
        //                     lineWidth: 2
        //                 },
        //                 // Ripple animation
        //                 keyframeAnimation: {
        //                     duration: 4000,
        //                     loop: true,
        //                     delay: (-i / 4) * 4000,
        //                     keyframes: [
        //                         {
        //                             percent: 0,
        //                             scaleX: 0,
        //                             scaleY: 0,
        //                             style: {
        //                                 opacity: 1
        //                             }
        //                         },
        //                         {
        //                             percent: 1,
        //                             scaleX: 1,
        //                             scaleY: 0.4,
        //                             style: {
        //                                 opacity: 0
        //                             }
        //                         }
        //                     ]
        //                 }
        //             });
        //         }
        //         return {
        //             type: 'group',
        //             x: coord[0],
        //             y: coord[1],
        //             children: [
        //                 ...circles,
        //                 {
        //                     type: 'path',
        //                     shape: {
        //                         d: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
        //                         x: -10,
        //                         y: -35,
        //                         width: 20,
        //                         height: 40
        //                     },
        //                     style: {
        //                         fill: 'red'
        //                     },
        //                     // Jump animation.
        //                     keyframeAnimation: {
        //                         duration: 1000,
        //                         loop: true,
        //                         delay: Math.random() * 1000,
        //                         keyframes: [
        //                             {
        //                                 y: -10,
        //                                 percent: 0.5,
        //                                 easing: 'cubicOut'
        //                             },
        //                             {
        //                                 y: 0,
        //                                 percent: 1,
        //                                 easing: 'bounceOut'
        //                             }
        //                         ]
        //                     }
        //                 }
        //             ]
        //         };
        //     }
        // },
        {
            type: 'scatter3D',
            silent: true,
            coordinateSystem: 'geo3D',
            symbol: 'diamond', //diamond circle
            symbolSize: [15, 40],
            effectType: 'ripple',
            showEffectOn: 'render',
            rippleEffect: {
                //坐标点动画
                period: 3,
                scale: 5,
                brushType: 'fill'
            },
            data: [
                {
                    name: "张掖",
                    value: [100.456984, 38.930493],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17,
                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'
                    },
                },
                {
                    name: "上海",
                    value: [121.477091, 31.233212],
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b} 总部',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17
                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'
                    },
                },
                {
                    name: "崇明岛",
                    value: [121.345126, 31.788556],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17,
                        distance: 0,
                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'
                    },
                },
                {
                    name: "南通",
                    value: [120.899291, 31.988754],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17,
                        distance: -20,


                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "泰州",
                    value: [119.926696, 32.463356],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17,
                        distance: 16,

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "如皋",
                    value: [120.581193, 32.378095],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17,
                        distance: 38,


                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "镇江",
                    value: [119.435089, 32.193495],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17,
                        distance: 0,

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "蚌埠",
                    value: [117.39149, 32.92516],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "北京",
                    value: [116.377167, 39.918229],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "广州",
                    value: [113.261655, 23.137197],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "西安",
                    value: [108.94819, 34.289309],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "咸阳",
                    value: [108.715996, 34.340484],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17,
                        distance: 20,


                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "兰州",
                    value: [103.849148, 36.062333],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "昆明",
                    value: [102.837143, 24.890205],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "昭通",
                    value: [103.72121, 27.337665],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "赤水",
                    value: [105.700044, 28.595358],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "重庆",
                    value: [106.552113, 29.567739],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "成都",
                    value: [104.070445, 30.659797],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
                {
                    name: "乌鲁木齐",
                    value: [87.60949, 43.818484],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}',
                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 17

                    },
                    itemStyle: {
                        color: 'rgba(14,31,109,.7)'

                    },
                },
            ],

        },
        // {
        //     type: 'bar3D',
        //     coordinateSystem: 'geo3D',
        //     barSize: .5,
        //     barHeight: 1,
        //     minHeight: 5,
        //     maxHeight: 10,
        //     bevelSmoothness: 20,
        //     bevelSize: 1,
        //     itemStyle: {
        //         color: 'red'
        //     },
        //     label: {
        //         show: true,
        //         formatter: '{b}'
        //     },
        //     data: [
        //         {
        //             name: '张掖',
        //             value: [100.456984, 38.930493, 1]
        //         },
        //         {
        //             name: '上海',
        //             value: [121.475896, 31.299892, 1]
        //         },
        //     ]
        // }
    ]
}

export {
    option,
    linesOption
}