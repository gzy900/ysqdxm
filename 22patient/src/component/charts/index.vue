<template>
  <el-card class="charts">
    <el-row :gutter="20">
      <el-col :span="12" id="chart1">
      </el-col>
      <el-col :span="12" id="chart2">
      </el-col>
      <el-col :span="12" id="chart3">
      </el-col>
      <el-col :span="12" id="chart4">
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import echarts from 'echarts'

let chart1, chart2, chart3, chart4;

export default {
  name: 'Chart',
  data() {
    return {
      option1: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        title: {
          text: '患者性别占比',
          left: 'center'
        },
        series: [
          {
            name: '患者性别占比',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 712, name: '男'},
              {value: 288, name: '女'},
            ]
          }
        ]
      },
      option2: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        title: {
          text: '患者年龄段占比',
          left: 'center'
        },
        series: [
          {
            name: '患者年龄段占比',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 2, name: '18岁以下'},
              {value: 60, name: '18-35岁'},
              {value: 381, name: '35-55岁'},
              {value: 557, name: '55岁以上'},
            ]
          }
        ]
      },
      option3: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        title: {
          text: '机构患者人数',
          left: 'center'
        },

        xAxis: {
          type: 'category',
          data: ['上海第十人民医院', '上海第六人民医院', '上海迩心科技', '上海移视医疗', '上海康德莱', '上海闵行人民医院', '湖南其申医疗'],
          axisLabel: {
            rotate: -30
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              {
                value: 120,
                itemStyle: {
                  color: '#176f58'
                }
              },
              {
                value: 200,
                itemStyle: {
                  color: '#f4abac'
                }
              },
              {
                value: 150,
                itemStyle: {
                  color: '#e94829'
                }
              },
              {
                value: 80,
                itemStyle: {
                  color: '#bee0d0'
                }
              },
              {
                value: 70,
                itemStyle: {
                  color: '#758e61'
                }
              },
              {
                value: 110,
                itemStyle: {
                  color: '#db9846'
                }
              },
              {
                value: 130,
                itemStyle: {
                  color: '#5d6fb2'
                }
              }],
            type: 'bar',
            itemStyle: {
              color: 'auto'
            }
          }
        ]
      },
      option4: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        title: {
          text: '患者手术情况',
          left: 'center'
        },

        xAxis: {
          type: 'category',
          data: ['冷冻消融', '射频消融', '房室结消融', '左心耳封堵', '永久起搏器植入', '无手术'],
          axisLabel: {
            rotate: -30
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [

              {
                value: 220,
                itemStyle: {
                  color: '#176f58'
                }
              },
              {
                value: 160,
                itemStyle: {
                  color: '#f4abac'
                }
              },
              {
                value: 150,
                itemStyle: {
                  color: '#e94829'
                }
              },
              {
                value: 80,
                itemStyle: {
                  color: '#bee0d0'
                }
              },
              {
                value: 70,
                itemStyle: {
                  color: '#758e61'
                }
              },
              {
                value: 300,
                itemStyle: {
                  color: '#db9846'
                }
              }],
            type: 'bar'
          }
        ]
      },
    }
  },
  mounted() {
    chart1 = echarts.init(document.getElementById('chart1'))
    chart1.setOption(this.option1)
    chart2 = echarts.init(document.getElementById('chart2'))
    chart2.setOption(this.option2)
    chart3 = echarts.init(document.getElementById('chart3'))
    chart3.setOption(this.option3)
    chart4 = echarts.init(document.getElementById('chart4'))
    chart4.setOption(this.option4)
  }
}
</script>

<style scoped lang="scss">

.charts {
  margin: 0 20px;
}

.charts .el-col {
  aspect-ratio: 1/1;
}

</style>
