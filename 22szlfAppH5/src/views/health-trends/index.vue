<!--
info: 心率失常（QTC,HR,QRS），心脏负荷(SDN,HR,PSI)，血压(高压，低压，心率)，BMI(BMI)
author:wanq
time:2020-08-03 17:15:48
-->
<template>
  <div class="health-trends"
       v-loading="isLoad"
       element-loading-text="正在加载数据..."
       element-loading-background="rgba(0, 0, 0, 0.6)">
    
    <div class="health-trends-content">
      <div class="time-select" @click="openStartDate">
        {{ getTimeSlot }}
        <i class="el-icon-date"/>
      </div>
      
      <mt-datetime-picker
        ref="startDate"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="this.startBy"
        :endDate="this.endBy"
        @confirm="pickerConfirm"
        v-model="pickerDate">
      </mt-datetime-picker>
      
      <div id="echarts" ref="echarts" style="width: 100%;height: 800px;margin-top: 15px"></div>
    </div>
  
    <div class="height100"></div>
  
  </div>
</template>

<script>
  const chart = require('echarts');
  import Vue from 'vue'
  import {getList} from '../../api/health-trends'
  import {parseTime, goPDF} from "../../utils";

  export default {
    metaInfo() {
      return {
        title: this.title,
      }
    },
    name: "arrhythmia",
    data() {
      return {
        title: '健康趋势',
        pickerDate: new Date(),
        startDate: null,
        endDate: null,

        startBy: new Date('1970'),
        endBy: new Date(),
        selectType: 0,

        fromData: null,
        batch: 0,
        batchStart: 100,
        batchEnd: -100,
        isLoad: false,
        charts: null,
        dataRudder: 0, // 0 向左，1向右，控制数据进出方向
        url: [
          'healthRecord/getDanDao',
          'healthRecord/getDanDao',
          'healthRecord/getBloodPressure',
          'healthRecord/getBMI',
        ],
        chartHeight: [
          740,
          740,
          740,
          250
        ],
        listQuery: [
          {
            // uuid: '9cc2dfab869843d985b6dc34e0ae437d',
            uuid: this.$route.params.id,
            flag: 1,
          },
          {
            uuid: this.$route.params.id,
            flag: 5,
          },
          {
            uuid: this.$route.params.id,
          },
          {
            uuid: this.$route.params.id,
          }
        ],
        pageQuery: {
          pageNo: 1,
          number: 10,
          beginTime: '',
          endTime: ''
        },

        // 当前存在的页码
        pageNumber: [],
        // 总页数
        pageSize: -1,


        sourceIndex: parseInt(this.$route.params.type),

        //心率失常（QTC,HR,QRS），心脏负荷(SDN,HR,PSI)，血压(高压，低压，心率)，BMI(BMI)
        heartRate: {
          qtc: [],
          hr: [],
          qrs: [],
        },

        heartLoad: {
          sdn: [],
          hr: [],
          psi: [],
        },

        bloodPressure: {
          high: [],
          low: [],
          rate: [],
        },

        bmi: [],
        sourceTimeData: [],
        
        // 图表数据查询
        dataSource: [],
        
        report_id:'',
        report_type:'',
        pdfUrl:'',
        
        // 图表配置 源
        source: null,
      }
    },
    computed: {
      getTimeSlot() {
        let slot = '';
        if (this.startDate instanceof Date) {
          slot += parseTime(this.startDate, '{y}-{m}-{d}')
          slot += ' ~ ';
        }
        if (this.endDate instanceof Date) {
          slot += parseTime(this.endDate, '{y}-{m}-{d}')
        }
        return slot || '时间搜索';
      }
    },
    created(){
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroy() {
    },
    mounted() {
      
      window.goReport = this.goReport
      window.goPDF = this.goPDF
      
      this.source = [
        // 0 心率失常（QTC,HR,QRS） 配置
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
            triggerOn: 'click',
            enterable: true,
            formatter: (params) => {
              const dataSource = this.arrayMerge(this.dataSource)
              this.pdfUrl = null
              let feedback_state = 0

              let dataTime = ''
              let dataValue = ''
              

              let html = '';
              if (params.length > 0) {
                html += params[0].axisValue + '<br>';
                for (let int = 0; int < params.length; int++) {

                  if (params[int].seriesName === 'QTC') {
                    dataTime = params[int].axisValue
                    dataValue = params[int].data
                    
                    for (let i = 0; i < dataSource.length; i++) {
                      if (dataTime === parseTime(dataSource[i].endTime, '{y}-{m}-{d} {h}:{i}:{s}') && dataValue === dataSource[i].QTC) {
                        this.report_type = '1'
                        this.report_id = dataSource[i].report_id
                        this.pdfUrl = dataSource[i].report_url
                        feedback_state = dataSource[i].feedback_state
                        break
                      }
                    }
                  }
                  
                  html += params[int].marker + params[int].seriesName + ': ' + params[int].data + '<br>';
      
                  if (int === params.length - 1) {
                    if (feedback_state === '1'){
                      html += '<br><button style="pointer-events: all" class="fr btn closeHandle" id="specialLook"  onclick="goReport()">查看医生反馈</button><br>';
                    }
                    if (this.pdfUrl && this.pdfUrl.length > 0){
                      html += '<br><button style="pointer-events: all" class="fr btn closeHandle" id="specialLook"  onclick="goPDF()">查看智能报告</button><br>';
                    }
                  }
                }
              }
              return html;
            },
          },
          toolbox: {
            feature: {
              restore: {},
            }
          },
          axisPointer: {
            link: {xAxisIndex: 'all'}
          },


          title: {
            text: '心律失常',
            subtext: 'M.A.I.L',
            left: 'center'
          },

          grid: [
            {
              left: 40,
              right: 20,
              height: '160px',
            },

            {
              left: 40,
              right: 20,
              top: '300px',
              height: '160px'
            },

            {
              left: 30,
              right: 20,
              top: '540px',
              height: '160px'
            }
          ],

          dataZoom: [
            {
              show: false,
              type: 'inside',
              realtime: true,
              startValue: 10,
              endValue: 20,
              rangeMode: 'value',
              xAxisIndex: [0, 1, 2]
            },

            {
              show: false,
              type: 'inside',
              realtime: true,
              startValue: 10,
              endValue: 20,
              rangeMode: 'value',
              xAxisIndex: [0, 1, 2]
            },

            {
              show: false,
              type: 'inside',
              realtime: true,
              startValue: 10,
              endValue: 20,
              rangeMode: 'value',
              xAxisIndex: [0, 1, 2]
            }
          ],

          xAxis: [
            {
              gridIndex: 0,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              // data: this.timeData  //数据，稍后配置

            },

            {
              gridIndex: 1,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              // data: this.timeData,  //数据，稍后配置
            },

            {
              gridIndex: 2,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              // data: this.timeData,  //数据，稍后配置
            }
          ],
          yAxis: [
            {
              name: 'QTC(ms)',
              type: 'value',
              nameTextStyle: {
                align: 'left'
              }
              // max: 10
            },

            {
              gridIndex: 1,
              name: 'QRS(ms)',
              type: 'value',
              nameTextStyle: {
                align: 'left'
              }
            },

            {
              gridIndex: 2,
              name: 'HR(次/分)',
              type: 'value',
              nameTextStyle: {
                align: 'left'
              }
            }
          ],
          series: [
            {
              markArea: {
                silent: true,
                data: [
                  [
                    {
                      label: {
                        show: true,
                        position: 'inside'
                      },
                      name: '偏低',
                      itemStyle: {
                        color: {

                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                            offset: 0, color: 'rgba(252, 115, 54, .7)' // 0% 处的颜色
                          }],
                          global: false
                        },
                      },
                    }, {
                    yAxis: 320
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '正常',
                    yAxis: 320,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(142, 187, 48, .7)' // 0% 处的颜色
                        },],
                        global: false
                      }
                    },
                  }, {
                    yAxis: 440,
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '偏高',
                    yAxis: 440,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(252, 115, 54, .7)' // 0% 处的颜色
                        },],
                        global: false
                      },
                    }
                  }, {}]
                ],
              },
              name: 'QTC',
              type: 'line',
              symbolSize: 8,
              hoverAnimation: false,

              itemStyle: {
                color: function (param) {
                  let color = '';
                  if (param.value < 320) {
                    color = 'rgba(252, 115, 54, .7)'
                  }
                  if (param.value <= 440 && param.value >= 320) {
                    color = 'rgba(142, 187, 48, .7)'
                  }
                  if (param.value > 440) {
                    color = 'rgba(252, 115, 54, .7)'
                  }
                  return color;
                }
              },

              // data: this.qtcData   //数据，稍后配置
            },

            {
              markArea: {
                silent: true,
                data: [
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '偏低',
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 1, color: 'rgba(252, 115, 54, .7)' // 100% 处的颜色
                        }],
                        global: false
                      },
                    },
                  }, {
                    yAxis: 60
                  }],
                  [{

                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '正常',
                    yAxis: 60,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 1, color: 'rgba(142, 187, 48, .7)' // 100% 处的颜色
                        }],
                        global: false
                      }
                    },
                  }, {
                    yAxis: 100,
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '偏高',
                    yAxis: 100,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(252, 115, 54, .7)' // 0% 处的颜色
                        },],
                        global: false
                      },
                    }
                  }, {}]
                ],
              },

              name: 'QRS',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              symbolSize: 8,

              itemStyle: {
                color: function (param) {
                  let color = '';
                  if (param.value < 60) {
                    color = 'rgba(252, 115, 54, .7)'
                  }
                  if (param.value <= 100 && param.value >= 60) {
                    color = 'rgba(142, 187, 48, 1)'
                  }
                  if (param.value > 100) {
                    color = 'rgba(252, 115, 54, .7)'
                  }
                  return color;
                }
              },

              // showSymbol: false,
              hoverAnimation: false,
              // data: this.qrcData   //数据，稍后配置
            },

            {
              markArea: {
                silent: true,
                data: [
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '心动过缓',
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 1, color: 'rgba(252, 115, 54, .7)' // 100% 处的颜色
                        }],
                        global: false
                      },
                    },
                  }, {
                    yAxis: 60
                  }],
                  [{

                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '正常',
                    yAxis: 60,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(142, 187, 48, .7)' // 0% 处的颜色
                        },],
                        global: false
                      }
                    },
                  }, {
                    yAxis: 100,
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '心动过速',
                    yAxis: 100,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(252, 115, 54, .7)' // 0% 处的颜色
                        },],
                        global: false
                      },
                    }
                  }, {}]
                ],
              },

              name: 'HR(心率)',
              type: 'line',
              xAxisIndex: 2,
              yAxisIndex: 2,
              symbolSize: 8,

              itemStyle: {
                color: function (param) {
                  let color = '';
                  if (param.value < 60) {
                    color = 'rgba(252, 115, 54, .7)'
                  }
                  if (param.value <= 100 && param.value >= 60) {
                    color = 'rgba(142, 187, 48, .7)'
                  }
                  if (param.value > 100) {
                    color = 'rgba(252, 115, 54, .7)'
                  }
                  return color;
                }
              },

              // showSymbol: false,
              hoverAnimation: false,
              // data: this.qrcData   //数据，稍后配置
            }
          ]
        },

        // 1 心脏负荷(SDN,HR,PSI) 配置
        {

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
            triggerOn: 'click',
            enterable: true,
            formatter: (params) => {
              console.log(params)
              const dataSource = this.arrayMerge(this.dataSource)
              console.log(dataSource)

              this.pdfUrl = null
              let feedback_state = 0

              let dataTime = ''
              let dataValue = ''


              let html = '';
              if (params.length > 0) {
                html += params[0].axisValue + '<br>';
                for (let int = 0; int < params.length; int++) {

                  if (params[int].seriesName === 'SDN') {
                    dataTime = params[int].axisValue
                    dataValue = params[int].data
                    
                    for (let i = 0; i < dataSource.length; i++) {
                      if (dataTime === parseTime(dataSource[i].endTime, '{y}-{m}-{d} {h}:{i}:{s}') && dataValue === dataSource[i].heart_change) {
                        this.report_type = '5'
                        this.report_id = dataSource[i].report_id
                        this.pdfUrl = dataSource[i].report_url
                        feedback_state = dataSource[i].feedback_state
                        break
                      }
                    }
                  }

                  html += params[int].marker + params[int].seriesName + ': ' + params[int].data + '<br>';

                  if (int === params.length - 1) {
                    if (feedback_state === '1'){
                      html += '<br><button style="pointer-events: all" class="fr btn closeHandle" id="specialLook"  onclick="goReport()">查看医生反馈</button><br>';
                    }
                    if (this.pdfUrl && this.pdfUrl.length > 0){
                      html += '<br><button style="pointer-events: all" class="fr btn closeHandle" id="specialLook"  onclick="goPDF()">查看智能报告</button><br>';
                    }
                  }
                }
              }
              return html;
            },
          },
          toolbox: {
            feature: {
              restore: {},
            }
          },
          axisPointer: {
            link: {xAxisIndex: 'all'}
          },


          title: {
            text: '心脏负荷',
            subtext: 'M.A.I.L',
            left: 'center'
          },

          grid: [
            {
              left: 30,
              right: 20,
              height: '160px',
            },

            {
              left: 30,
              right: 20,
              top: '300px',
              height: '160px'
            },

            {
              left: 30,
              right: 20,
              top: '540px',
              height: '160px'
            }
          ],

          dataZoom: [
            {
              show: false,
              type: 'inside',
              realtime: true,
              startValue: 10,
              endValue: 20,
              rangeMode: 'value',
              xAxisIndex: [0, 1, 2]
            },

            {
              show: false,
              type: 'inside',
              realtime: true,
              startValue: 10,
              endValue: 20,
              rangeMode: 'value',
              xAxisIndex: [0, 1, 2]
            },

            {
              show: false,
              type: 'inside',
              realtime: true,
              startValue: 10,
              endValue: 20,
              rangeMode: 'value',
              xAxisIndex: [0, 1, 2]
            }
          ],

          xAxis: [
            {
              gridIndex: 0,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              // data: this.timeData  //数据，稍后配置

            },

            {
              gridIndex: 1,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              // data: this.timeData,  //数据，稍后配置
            },

            {
              gridIndex: 2,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              // data: this.timeData,  //数据，稍后配置
            }
          ],

          // SDN,HR,PSI
          yAxis: [
            {
              name: 'SDN(ms)',
              type: 'value',
              nameTextStyle: {
                align: 'left'
              }
              // max: 10
            },

            {
              gridIndex: 1,
              name: 'HR(次/分)',
              type: 'value',
              nameTextStyle: {
                align: 'left'
              }
            },

            {
              gridIndex: 2,
              name: 'PSI',
              type: 'value',
              nameTextStyle: {
                align: 'left'
              }
            }
          ],
          series: [
            {
              markArea: {
                silent: true,
                data: [
                  [
                    {
                      label: {
                        show: true,
                        position: 'inside'
                      },
                      name: '偏低',
                      itemStyle: {
                        color: {

                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                            offset: 1, color: 'rgba(252, 115, 54, .7)' // 100% 处的颜色
                          }],
                          global: false
                        },
                      },
                    }, {
                    yAxis: 102
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '正常',
                    yAxis: 102,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(142, 187, 48, .7)' // 0% 处的颜色
                        },],
                        global: false
                      }
                    },
                  }, {
                    yAxis: 180,
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '偏高',
                    yAxis: 180,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(252, 115, 54, .7)' // 0% 处的颜色
                        },],
                        global: false
                      },
                    }
                  }, {}]
                ],

                itemStyle: { //全局的
                  normal: {color: '#000'}
                },
              },
              name: 'SDN',
              type: 'line',
              symbolSize: 8,
              hoverAnimation: false,

              itemStyle: {
                color: function (param) {
                  let color = '';
                  if (param.value < 102) {
                    color = 'rgba(252, 115, 54, 1)'
                  }
                  if (param.value <= 180 && param.value >= 102) {
                    color = 'rgba(142, 187, 48, 1)'
                  }
                  if (param.value > 180) {
                    color = 'rgba(252, 115, 54, 1)'
                  }
                  return color;
                }
              },

              // data: this.qtcData   //数据，稍后配置
            },

            {
              markArea: {
                silent: true,
                data: [
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '心动过缓',
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 1, color: 'rgba(252, 115, 54, .7)' // 100% 处的颜色
                        }],
                        global: false
                      },
                    },
                  }, {
                    yAxis: 60
                  }],
                  [{

                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '正常',
                    yAxis: 60,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 1, color: 'rgba(142, 187, 48, .7)' // 100% 处的颜色
                        }],
                        global: false
                      }
                    },
                  }, {
                    yAxis: 100,
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '心动过速',
                    yAxis: 100,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(252, 115, 54, .7)' // 0% 处的颜色
                        }],
                        global: false
                      },
                    }
                  }, {}]
                ],
              },


              itemStyle: {
                color: function (param) {
                  let color = '';
                  if (param.value < 60) {
                    color = 'rgba(252, 115, 54, 1)'
                  }
                  if (param.value <= 100 && param.value >= 60) {
                    color = 'rgba(142, 187, 48, 1)'
                  }
                  if (param.value > 100) {
                    color = 'rgba(252, 115, 54, 1)'
                  }
                  return color;
                }
              },
              name: 'HR(心率)',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              symbolSize: 8,

              // showSymbol: false,
              hoverAnimation: false,
              // data: this.qrcData   //数据，稍后配置
            },

            {
              markArea: {
                silent: true,
                data: [
                  [{

                    label: {
                      show: true,
                      position: 'inside'
                    },
                    // name: '正常',
                    yAxis: -100000,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(84, 190, 208, 1)' // 0% 处的颜色
                        },],
                        global: false
                      }
                    },
                  }, {
                    yAxis: 1000000,
                  }]
                ],
              },

              name: 'PSI',
              type: 'line',
              xAxisIndex: 2,
              yAxisIndex: 2,
              symbolSize: 8,

              itemStyle: {
                color: function (param) {
                  let color = '';
                  if (param.value < 18.4) {
                    color = 'rgba(84, 190, 208, 1)'
                  }
                  if (param.value >= 18.4 && param.value <= 23.9) {
                    color = 'rgba(142, 187, 48, 1)'
                  }
                  if (param.value > 23.9) {
                    color = 'rgba(252, 115, 54, 1)'
                  }
                  color = 'rgba(84, 190, 208, 1)'
                  return color;
                }
              },

              // showSymbol: false,
              hoverAnimation: false,
              // data: this.qrcData   //数据，稍后配置
            }


            // PSI 尚未配置正常数据
            // {
            //   markArea: {
            //     silent: true,
            //     data: [
            //       [{
            //         label: {
            //           show: true,
            //           position: 'inside'
            //         },
            //         name: '偏低',
            //         itemStyle: {
            //           color: {
            //             type: 'linear',
            //             x: 0,
            //             y: 0,
            //             x2: 0,
            //             y2: 1,
            //             colorStops: [{
            //               offset: 1, color: 'rgba(252, 115, 54, .7)' // 100% 处的颜色
            //             }],
            //             global: false
            //           },
            //         },
            //       }, {
            //         yAxis: 360
            //       }],
            //       [{
            //
            //         label: {
            //           show: true,
            //           position: 'inside'
            //         },
            //         name: '正常',
            //         yAxis: 360,
            //         itemStyle: {
            //           color: {
            //             type: 'linear',
            //             x: 0,
            //             y: 0,
            //             x2: 0,
            //             y2: 1,
            //             colorStops: [{
            //               offset: 0, color: 'rgba(142, 187, 48, .7)' // 0% 处的颜色
            //             },],
            //             global: false
            //           }
            //         },
            //       }, {
            //         yAxis: 440,
            //       }],
            //       [{
            //         label: {
            //           show: true,
            //           position: 'inside'
            //         },
            //         name: '偏高',
            //         yAxis: 440,
            //         itemStyle: {
            //           color: {
            //             type: 'linear',
            //             x: 0,
            //             y: 0,
            //             x2: 0,
            //             y2: 1,
            //             colorStops: [{
            //               offset: 0, color: 'rgba(252, 115, 54, .7)' // 0% 处的颜色
            //             },],
            //             global: false
            //           },
            //         }
            //       }, {}]
            //     ],
            //   },
            //
            //   name: 'PSI',
            //   type: 'line',
            //   xAxisIndex: 2,
            //   yAxisIndex: 2,
            //   symbolSize: 8,
            //
            //   itemStyle: {
            //     color: function (param) {
            //       let color = '';
            //       if (param.value < 18.4) {
            //         color = 'rgba(84, 190, 208, 1)'
            //       }
            //       if (param.value >= 18.4 && param.value <= 23.9) {
            //         color = 'rgba(142, 187, 48, 1)'
            //       }
            //       if (param.value > 23.9) {
            //         color = 'rgba(252, 115, 54, 1)'
            //       }
            //       return color;
            //     }
            //   },
            //
            //   // showSymbol: false,
            //   hoverAnimation: false,
            //   // data: this.qrcData   //数据，稍后配置
            // },
          ]
        },

        // 2 血压(高压，低压，心率) 配置
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
            triggerOn: 'click',
            enterable: true,
            formatter: (params) => {
              console.log(params)
              const dataSource = this.arrayMerge(this.dataSource)
              console.log(dataSource)

              let feedback_state = 0

              let dataTime = ''
              let dataValue = ''


              let html = '';
              if (params.length > 0) {
                html += params[0].axisValue + '<br>';
                for (let int = 0; int < params.length; int++) {

                  if (params[int].seriesName === '高压') {
                    dataTime = params[int].axisValue
                    dataValue = params[int].data

                    for (let i = 0; i < dataSource.length; i++) {
                      if (dataTime === parseTime(dataSource[i].releasetime, '{y}-{m}-{d} {h}:{i}:{s}') && dataValue === dataSource[i].high_pressure) {
                        this.report_type = '2'
                        this.report_id = dataSource[i].bid
                        feedback_state = dataSource[i].feedback_state
                        break
                      }
                    }
                  }

                  html += params[int].marker + params[int].seriesName + ': ' + params[int].data + '<br>';

                  if (int === params.length - 1) {
                    if (feedback_state === '1'){
                      html += '<br><button style="pointer-events: all" class="fr btn closeHandle" id="specialLook"  onclick="goReport()">查看医生反馈</button><br>';
                    }
                  }
                }
              }
              return html;
            },
          },
          toolbox: {
            feature: {
              restore: {},
            }
          },
          axisPointer: {
            link: {xAxisIndex: 'all'}
          },


          title: {
            text: '血压监测',
            subtext: 'M.A.I.L',
            left: 'center'
          },

          grid: [
            {
              left: 30,
              right: 20,
              height: '160px',
            },

            {
              left: 30,
              right: 20,
              top: '300px',
              height: '160px'
            },

            {
              left: 30,
              right: 20,
              top: '540px',
              height: '160px'
            }
          ],

          dataZoom: [
            {
              show: false,
              type: 'inside',
              realtime: true,
              startValue: 10,
              endValue: 20,
              rangeMode: 'value',
              xAxisIndex: [0, 1, 2]
            },

            {
              show: false,
              type: 'inside',
              realtime: true,
              startValue: 10,
              endValue: 20,
              rangeMode: 'value',
              xAxisIndex: [0, 1, 2]
            },

            {
              show: false,
              type: 'inside',
              realtime: true,
              startValue: 10,
              endValue: 20,
              rangeMode: 'value',
              xAxisIndex: [0, 1, 2]
            }
          ],

          xAxis: [
            {
              gridIndex: 0,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              // data: this.timeData  //数据，稍后配置

            },

            {
              gridIndex: 1,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              // data: this.timeData,  //数据，稍后配置
            },

            {
              gridIndex: 2,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              // data: this.timeData,  //数据，稍后配置
            }
          ],
          yAxis: [
            {
              name: '高压(mmHg)',
              type: 'value',
              nameTextStyle: {
                align: 'left'
              },
              min: 60,
              max: 160
              // max: 10
            },

            {
              gridIndex: 1,
              name: '低压(mmHg)',
              type: 'value',
              nameTextStyle: {
                align: 'left'
              },
              min: 40,
              max: 120
            },

            {
              gridIndex: 2,
              name: '心率(次/分)',
              type: 'value',
              nameTextStyle: {
                align: 'left'
              },
              min: 40,
              max: 140
            }
          ],
          series: [
            {
              markArea: {
                silent: true,

                data: [
                  [
                    {
                      label: {
                        show: true,
                        position: 'inside'
                      },
                      name: '正常',
                      itemStyle: {
                        color: {

                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                            offset: 1, color: 'rgba(142, 187, 48, .7)' // 100% 处的颜色
                          }],
                          global: false
                        },
                      },
                    }, {
                    yAxis: 124
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '偏高',
                    yAxis: 124,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(255, 176, 52, .7)' // 0% 处的颜色
                        },],
                        global: false
                      },
                    }
                  }, {
                    yAxis: 134,
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '高血压',
                    yAxis: 134,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(252, 115, 54, .7)' // 0% 处的颜色
                        },],
                        global: false
                      },
                    }
                  }, {}]
                ],
              },
              name: '高压',
              type: 'line',
              symbolSize: 8,
              hoverAnimation: false,

              itemStyle: {
                color: function (param) {
                  let color = '';
                  if (param.value < 124) {
                    color = 'rgba(142, 187, 48, 1)'
                  }
                  if (param.value <= 134 && param.value >= 124) {
                    color = 'rgba(255, 176, 52, 1)'
                  }
                  if (param.value > 134) {
                    color = 'rgba(252, 115, 54, 1)'
                  }
                  return color;
                }
              },

              // data: this.qtcData   //数据，稍后配置
            },

            {
              markArea: {
                silent: true,
                data: [
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '正常',
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 1, color: 'rgba(142, 187, 48, .7)' // 100% 处的颜色
                        }],
                        global: false
                      },
                    },
                  }, {
                    yAxis: 75
                  }],
                  [{

                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '偏高',
                    yAxis: 75,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(255, 176, 52, .7)' // 0% 处的颜色
                        },],
                        global: false
                      }
                    },
                  }, {
                    yAxis: 84,
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '高血压',
                    yAxis: 84,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(252, 115, 54, .7)' // 0% 处的颜色
                        },],
                        global: false
                      },
                    }
                  }, {}]
                ],
              },


              name: '低压',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              symbolSize: 8,

              // showSymbol: false,
              hoverAnimation: false,
              // data: this.qrcData   //数据，稍后配置

              itemStyle: {
                color: function (param) {
                  let color = '';
                  if (param.value < 75) {
                    color = 'rgba(142, 187, 48, .7)'
                  }
                  if (param.value <= 84 && param.value >= 75) {
                    color = 'rgba(255, 176, 52, 1)'
                  }
                  if (param.value >= 84) {
                    color = 'rgba(252, 115, 54, 1)'
                  }
                  return color;
                }
              },
            },

            {
              markArea: {
                silent: true,
                data: [
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '心动过缓',
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 1, color: 'rgba(252, 115, 54, .7)' // 100% 处的颜色
                        }],
                        global: false
                      },
                    },
                  }, {
                    yAxis: 60
                  }],
                  [{

                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '正常',
                    yAxis: 60,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(142, 187, 48, .7)' // 0% 处的颜色
                        },],
                        global: false
                      }
                    },
                  }, {
                    yAxis: 100,
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '心动过速',
                    yAxis: 100,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(252, 115, 54, .7)' // 0% 处的颜色
                        },],
                        global: false
                      },
                    }
                  }, {}]
                ],
              },

              name: 'HR(心率)',
              type: 'line',
              xAxisIndex: 2,
              yAxisIndex: 2,
              symbolSize: 8,

              itemStyle: {
                color: function (param) {
                  let color = '';
                  if (param.value < 60) {
                    color = 'rgba(252, 115, 54, 1)'
                  }
                  if (param.value >= 60 && param.value >= 100) {
                    color = 'rgba(142, 187, 48, 1)'
                  }
                  if (param.value >= 100) {
                    color = 'rgba(252, 115, 54, 1)'
                  }
                  return color;
                }
              },

              // showSymbol: false,
              hoverAnimation: false,
              // data: this.qrcData   //数据，稍后配置
            }
          ]
        },

        // 3 BMI(BMI) 配置
        {


          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
            triggerOn: 'click',
            enterable: true,
            formatter: (params) => {
              console.log(params)
              const dataSource = this.arrayMerge(this.dataSource)
              console.log(dataSource)

              let feedback_state = 0

              let dataTime = ''
              let dataValue = ''


              let html = '';
              if (params.length > 0) {
                html += params[0].axisValue + '<br>';
                for (let int = 0; int < params.length; int++) {

                  if (params[int].seriesName === 'BMI') {
                    dataTime = params[int].axisValue
                    dataValue = params[int].data

                    for (let i = 0; i < dataSource.length; i++) {
                      if (dataTime === parseTime(dataSource[i].releasetime, '{y}-{m}-{d} {h}:{i}:{s}') && dataValue === dataSource[i].BMI) {
                        this.report_type = '3'
                        this.report_id = dataSource[i].id
                        feedback_state = dataSource[i].feedback_state
                        break
                      }
                    }
                  }

                  html += params[int].marker + params[int].seriesName + ': ' + params[int].data + '<br>';

                  if (int === params.length - 1) {
                    if (feedback_state === '1'){
                      html += '<br><button style="pointer-events: all" class="fr btn closeHandle" id="specialLook"  onclick="goReport()">查看医生反馈</button><br>';
                    }
                  }
                }
              }
              return html;
            },
          },
          toolbox: {
            feature: {
              restore: {},
            }
          },
          axisPointer: {
            link: {xAxisIndex: 'all'}
          },


          title: {
            text: 'BMI',
            subtext: 'M.A.I.L',
            left: 'center'
          },

          grid: [
            {
              left: 30,
              right: 20,
              height: '160px',
            },
          ],

          dataZoom: [
            {
              show: false,
              type: 'inside',
              realtime: true,
              startValue: 10,
              endValue: 20,
              rangeMode: 'value',
              xAxisIndex: 0
            },
          ],

          xAxis: [
            {
              gridIndex: 0,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              // data: this.timeData  //数据，稍后配置
            }
          ],
          yAxis: [
            {
              name: 'BMI(身高体重比²)',
              type: 'value',
              min: 10,
              max: 40,
              nameTextStyle: {
                align: 'left'
              }
              // max: 10
            },
          ],
          series: [
            {
              markArea: {
                silent: true,
                data: [
                  [
                    {
                      label: {
                        show: true,
                        position: 'inside'
                      },
                      name: '偏低',
                      itemStyle: {
                        color: {

                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                            offset: 0, color: 'rgba(84, 190, 208, 1)' // 0% 处的颜色
                          },],
                          global: false
                        },
                      },
                    },
                    {
                      yAxis: 18.4
                    }
                  ],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '正常',
                    yAxis: 18.4,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(142, 187, 48, 1)' // 0% 处的颜色
                        },],
                        global: false
                      }
                    },
                  }, {
                    yAxis: 23.9,
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '偏胖',
                    yAxis: 23.9,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(255, 176, 52, 1)' // 0% 处的颜色
                        },],
                        global: false
                      }
                    },
                  }, {
                    yAxis: 27.9,
                  }],
                  [{
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    name: '肥胖',
                    yAxis: 27.9,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(252, 115, 54, 1)' // 0% 处的颜色
                        },],
                        global: false
                      },
                    }
                  }, {}]
                ],
              },
              itemStyle: {
                color: function (param) {
                  let color = '';
                  if (param.value <= 18.4) {
                    color = 'rgba(84, 190, 208, 1)'
                  }
                  if (param.value > 18.4 && param.value <= 23.9) {
                    color = 'rgba(142, 187, 48, 1)'
                  }
                  if (param.value > 23.9 && param.value <= 27.9) {
                    color = 'rgba(255, 176, 52, 1)'
                  }
                  if (param.value > 27.9) {
                    color = 'rgba(252, 115, 54, 1)'
                  }
                  return color;
                }
              },

              name: 'BMI',
              type: 'line',
              symbolSize: 6,
              hoverAnimation: false,
              // itemStyle: {
              //   normal: {
              //     color: 'rgba(84, 190, 208, 1)',
              //   }
              // },
              // lineStyle: {
              //   color: '#ddd' //改变折线颜色
              // }

              // data: this.qtcData   //数据，稍后配置
            },
          ]
        },
      ]
      let echarts = document.getElementById('echarts');
      echarts.style.height = this.chartHeight[this.sourceIndex] + 'px';
      
      this.initCharts();
      this.getStartData();
    },
   
    methods: {

      goReport() {
        console.log(this.report_type)
        this.$router.push({name: 'report', params: {type: this.report_type, id: this.report_id}})
      },

      goPDF() {
        goPDF(this.pdfUrl)
      },
      
      pickerConfirm(value) {
        if (this.selectType === 1) {
          this.startDate = value;
          this.openEndDate();
        } else if (this.selectType === 2) {
          this.endDate = value;
          this.selectType = 0;

          this.pageNumber = [];
          this.pageQuery.pageNo = 1;
          this.pageQuery.beginTime = parseTime(this.startDate, '{y}-{m}-{d}');
          this.pageQuery.endTime = parseTime(this.endDate, '{y}-{m}-{d}');

          this.heartRate = {
            qtc: [],
            hr: [],
            qrs: [],
          };

          this.heartLoad = {
            sdn: [],
            hr: [],
            psi: [],
          };

          this.bloodPressure = {
            high: [],
            low: [],
            rate: [],
          };

          this.bmi = [];
          this.sourceTimeData = [];


          this.getStartData();
          // 此处提交
        }
      },

      openStartDate() {
        this.$message({
          message: '请选择要查询的起始时间',
          // type: 'warning',
          customClass: 'message',
          offset: 45

        });
        this.startBy = new Date('1970');
        this.endBy = new Date();

        // if (this.endDate instanceof Date) {
        //   this.endBy = this.endDate;
        // } else {
        //   this.endBy = new Date();
        // }

        this.selectType = 1;
        this.$refs.startDate.open()
      },

      openEndDate() {
        this.$message({
          message: '请选择要查询的结束时间',
          // type: 'warning',
          customClass: 'message',
          offset: 45
        });
        if (this.startDate instanceof Date) {
          this.startBy = this.startDate;
        } else {
          this.startBy = new Date('1970');
        }
        this.selectType = 2;
        this.$refs.startDate.open()
      },

      startPickerConfirm(value) {
        this.startDate = parseTime(value, '{y}-{m}-{d}');
      },
      endPickerConfirm(value) {
        this.endDate = parseTime(value, '{y}-{m}-{d}');
      },
      arrayMerge(list) {
        let reList = [];
        for (let i = 0; i < list.length; i++) {
          reList = [...reList, ...list[i]]
        }
        return reList
      },

      setPageNumber(list = []) {

        // 如果是向左边添加数据的话
        if (this.dataRudder === 0) {

          // 循环传过来的list数据 从头部（左）添加
          for (let i = 0; i < list.length; i++) {
            list[i].metaData.unshift(list[i].newData);
          }

          // 将 当前页码从头部（左） 添加进数组
          this.pageNumber.unshift(this.pageQuery.pageNo);

          // 如果页码超过3页
          if (this.pageNumber.length > 3) {

            // 循环删除最右边的数据
            for (let i = 0; i < list.length; i++) {
              list[i].metaData.pop();
            }

            // 删除最右边的页码
            this.pageNumber.pop();
          }
        } else {

          //如果是向右边添加数据的话

          // 循环数据从尾部 （右）添加
          for (let i = 0; i < list.length; i++) {
            list[i].metaData.push(list[i].newData);
          }

          // 将 当前页码从尾部（右） 添加进数组
          this.pageNumber.push(this.pageQuery.pageNo);

          // 如果页码超过3页
          if (this.pageNumber.length > 3) {

            // 循环删除最左边（头）的数据
            for (let i = 0; i < list.length; i++) {
              list[i].metaData.shift();
            }

            // 删除最左边（头）的页码
            this.pageNumber.shift();
          }
        }

      },

      // 初始化图表
      initCharts() {
        let option = this.source[this.sourceIndex];
        this.charts = chart.init(this.$refs.echarts);
        this.charts.setOption(option);


        const self = this;
        this.charts.on('datazoom', function (param) {
          if (!param) {
            return;
          }

          let zoom;
          if (!!param.batch) {
            zoom = param.batch[0];
          }

          if (param.start !== undefined) {
            zoom = param;
          }


          if (parseInt(zoom.start - zoom.end) !== self.batch) {
            self.batch = parseInt(zoom.start - zoom.end)
            return
          }

          // 如果 此时可以加载数据 && 左侧坐标 小于 0 && 左侧坐标 小于 上次的左侧坐标
          if (!self.isLoad && zoom.start <= 0 && zoom.start < self.batchStart) {
            self.dataRudder = 0;
            if (self.pageNumber[0] === self.pageSize) {  //100为总页数

              self.alert('已经是最早的数据了！');
              return;
            }
            self.pageQuery.pageNo = self.pageNumber[0] + 1;


            self.getStartData();
            // console.log('1-向左加载数据');
          }
          // 如果 此时可以加载数据 && 右侧坐标 大于 100 && 右侧坐标 大于 上次的右侧坐标
          if (!self.isLoad && zoom.end >= 100 && zoom.end > self.batchEnd) {
            self.dataRudder = 1;
            if (self.pageNumber[self.pageNumber.length - 1] === 1) {
              self.alert('已经是最新的数据了！');
              return;
            }
            self.pageQuery.pageNo = self.pageNumber[self.pageNumber.length - 1] - 1;

            self.getStartData();
            // console.log('2-向右加载数据');
          }

          // self.isLoad = true;  // 不能同时发起多次请求，请求时将此变量置为 true ，请求完成后置为 false;
          self.batchStart = zoom.start;
          self.batchEnd = zoom.end;
        })
      },

      alert(msg) {
        this.$message({
          message: msg,
          // type: 'warning',
          customClass: 'message',
          offset: 45
        });
      },


      // 获取数据
      getStartData() {
        // const self = this;
        this.isLoad = true;

        return new Promise((resolve, reject) => {

          getList({...this.listQuery[this.sourceIndex], ...this.pageQuery}, this.url[this.sourceIndex])
            .then(response => {

              this.handleData(response);
            })
            .catch(error => {
              reject(error)
            })
        })
      },

      handleData(response) {
        let option = {};
        const dataList = response.data.dataList;
        this.pageSize = response.data.pageSize;

        if (dataList.length === 0) {
          this.alert('该时间段内暂无数据！');
        }

        let [qtcList, hrList, qrsList,] = [[], [], []];

        let [sdnList, psiList, bloodHrList] = [[], [], []];

        let [highList, lowList, rateList] = [[], [], []];

        let bmiList = [];

        let timeList = [];

        switch (this.sourceIndex) {
          case 0:

            for (let i = dataList.length - 1; i >= 0; i--) {
              qtcList.push(dataList[i].QTC);
              qrsList.push(dataList[i].QRS);

              hrList.push(dataList[i].heart_rate_avg);

              timeList.push(parseTime(dataList[i].endTime, '{y}-{m}-{d} {h}:{i}:{s}'));
            }

            this.setPageNumber([
              {
                metaData: this.heartRate.qtc,
                newData: qtcList,
              },
              {
                metaData: this.heartRate.hr,
                newData: hrList,
              },
              {
                metaData: this.heartRate.qrs,
                newData: qrsList,
              },
              {
                metaData: this.sourceTimeData,
                newData: timeList,
              },
              {
                metaData: this.dataSource,
                newData: dataList
              }
            ]);
            

            option = {
              dataZoom: [
                {
                  startValue: dataList.length,
                  endValue: dataList.length + 10,
                  rangeMode: 'value',
                },
                {
                  startValue: dataList.length,
                  endValue: dataList.length + 10,
                  rangeMode: 'value',
                },
                {
                  startValue: dataList.length,
                  endValue: dataList.length + 10,
                  rangeMode: 'value',
                }
              ],
              xAxis: [
                {
                  data: this.arrayMerge(this.sourceTimeData)
                },
                {
                  data: this.arrayMerge(this.sourceTimeData)
                },
                {
                  data: this.arrayMerge(this.sourceTimeData)
                }
              ],
              series: [
                {
                  data: this.arrayMerge(this.heartRate.qtc)
                }, {
                  data: this.arrayMerge(this.heartRate.qrs)
                }, {
                  data: this.arrayMerge(this.heartRate.hr)
                }
              ]
            };
            break;
          case 1:

            // heartLoad: {
            //   sdn: [],
            //     hr: [],
            //     psi: [],
            // },
            //

            // let [sdnList, psiList, bloodHrList] = [[], [], []];


            for (let i = dataList.length - 1; i >= 0; i--) {
              sdnList.push(dataList[i].heart_change);
              psiList.push(dataList[i].PSI);
              bloodHrList.push(dataList[i].heart_rate_avg);

              timeList.push(parseTime(dataList[i].endTime, '{y}-{m}-{d} {h}:{i}:{s}'));
            }

            this.setPageNumber([
              {
                metaData: this.heartLoad.sdn,
                newData: sdnList,
              },
              {
                metaData: this.heartLoad.hr,
                newData: bloodHrList,
              },
              {
                metaData: this.heartLoad.psi,
                newData: psiList,
              },
              {
                metaData: this.sourceTimeData,
                newData: timeList,
              },
              {
                metaData: this.dataSource,
                newData: dataList
              }
            ]);

            option = {
              dataZoom: [
                {
                  startValue: dataList.length,
                  endValue: dataList.length + 10,
                  rangeMode: 'value',
                },
                {
                  startValue: dataList.length,
                  endValue: dataList.length + 10,
                  rangeMode: 'value',
                },
                {
                  startValue: dataList.length,
                  endValue: dataList.length + 10,
                  rangeMode: 'value',
                }
              ],
              xAxis: [
                {
                  data: this.arrayMerge(this.sourceTimeData)
                },
                {
                  data: this.arrayMerge(this.sourceTimeData)
                },
                {
                  data: this.arrayMerge(this.sourceTimeData)
                }
              ],
              series: [
                {
                  data: this.arrayMerge(this.heartLoad.sdn)
                }, {
                  data: this.arrayMerge(this.heartLoad.hr)
                }, {
                  data: this.arrayMerge(this.heartLoad.psi)
                }
              ]
            };
            break;
          case 2:
            // let [highList, lowList, rateList] = [[], [], []];

            // bloodPressure: {
            //   high: [],
            //     low: [],
            //     rate: [],
            // },
            for (let i = dataList.length - 1; i >= 0; i--) {
              highList.push(dataList[i].high_pressure);
              lowList.push(dataList[i].low_pressure);
              rateList.push(dataList[i].heart_rate_avg);

              timeList.push(parseTime(dataList[i].releasetime, '{y}-{m}-{d} {h}:{i}:{s}'));
            }

            this.setPageNumber([
              {
                metaData: this.bloodPressure.high,
                newData: highList,
              },
              {
                metaData: this.bloodPressure.low,
                newData: lowList,
              },
              {
                metaData: this.bloodPressure.rate,
                newData: rateList,
              },
              {
                metaData: this.sourceTimeData,
                newData: timeList,
              },
              {
                metaData: this.dataSource,
                newData: dataList
              }
            ]);

            option = {
              dataZoom: [
                {
                  startValue: dataList.length,
                  endValue: dataList.length + 10,
                  rangeMode: 'value',
                },
                {
                  startValue: dataList.length,
                  endValue: dataList.length + 10,
                  rangeMode: 'value',
                },
                {
                  startValue: dataList.length,
                  endValue: dataList.length + 10,
                  rangeMode: 'value',
                }
              ],
              xAxis: [
                {
                  data: this.arrayMerge(this.sourceTimeData)
                },
                {
                  data: this.arrayMerge(this.sourceTimeData)
                },
                {
                  data: this.arrayMerge(this.sourceTimeData)
                }
              ],
              series: [
                {
                  data: this.arrayMerge(this.bloodPressure.high)
                }, {
                  data: this.arrayMerge(this.bloodPressure.low)
                }, {
                  data: this.arrayMerge(this.bloodPressure.rate)
                }
              ]
            };
            break;
          case 3:
            for (let j = dataList.length - 1; j >= 0; j--) {

              timeList.push(parseTime(dataList[j].releasetime, '{y}-{m}-{d} {h}:{i}:{s}'));
              bmiList.push(dataList[j].BMI)

            }

            this.setPageNumber([
              {
                metaData: this.bmi,
                newData: bmiList,
              },
              {
                metaData: this.sourceTimeData,
                newData: timeList,
              },
              {
                metaData: this.dataSource,
                newData: dataList
              }
            ]);

            option = {
              dataZoom: [
                {
                  startValue: dataList.length,
                  endValue: dataList.length + 10,
                  rangeMode: 'value',
                },
              ],
              xAxis: [
                {
                  data: this.arrayMerge(this.sourceTimeData)
                },
              ],
              series: [
                {
                  data: this.arrayMerge(this.bmi)
                }
              ]
            };

            break;
        }

        this.setData(option)
      },


      // 往图表里设置数据
      setData(option) {
        this.charts.setOption(option);
        this.isLoad = false;
      },
    }
  }

</script>

<style scoped lang="css">
  
  .health-trends {
    min-height: 100%;
    /*background-color: rgba(0,0,0,.5);*/
    overflow: auto;
    
    background-image: url("../../assets/img/bg-bom.png");
    background-size: 30% auto;
    background-repeat: no-repeat;
    background-position: bottom right;
  }
  
  .time {
    width: 100%;
    height: 30px;
    background-color: #000;
  }
  
  .time-select {
    width: 96%;
    height: 24px;
    margin-left: 2%;
    border-radius: 15px;
    font-size: 16px;
    text-align: center;
    line-height: 24px;
    color: #666;
    box-shadow: 0 0 5px #666;
  }
  
  .time-select .el-icon-date {
    display: inline-block;
    float: right;
    line-height: 22px;
    margin-right: 10px;
  }
  
  .health-trends-content {
    width: 100%;
    /*background-image: url("../../assets/img/bg-top.png");*/
    background-size: 100% auto;
    background-repeat: no-repeat;
    padding: .7rem;
  }


</style>
