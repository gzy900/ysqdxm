<template>
  <div class="app-container documentation-container">

    <p class="welcome">
      欢迎您 {{ userInfo.username }}
    </p>
    <p class="mt20">
      您已使用了本系统 <template v-if="getUseTime.getFullYear() - 1970 > 0">{{ getUseTime.getFullYear() - 1970 }} 年</template> <template v-if="getUseTime.getMonth() > 0">{{ getUseTime.getMonth() }} 月</template> <template>{{ getUseTime.getDate() }} 天</template>
    </p>
    <el-divider />

    <el-form ref="form" :model="fromData" label-suffix="：" label-width="120px">
      <el-form-item label="姓名">
        {{ userInfo.username }}
      </el-form-item>
      <el-form-item label="手机">
        {{ userInfo.phone }}
      </el-form-item>
      <el-form-item label="注册时间">
        {{ userInfo.registerTime }}
      </el-form-item>
      <el-form-item label="签名">
        <el-upload
          name="files"
          class="avatar-uploader"
          action="https://app.maillife.cn/users/upload"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="userInfo.doctor_sign" :src="userInfo.doctor_sign" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>

    <!--    // 反馈数量-->
    <div class="chart-container">
      <el-header
        height="40px"
      >
        <el-row>
          <el-col class="title" :span="10">
            反馈数量（个）
          </el-col>
          <el-col class="search" :span="14">
            <div class="from-search">
              <p>
                <el-radio-group v-model="countSearchType" size="mini" @change="handleCountSearchTime">
                  <el-radio-button label="date">日</el-radio-button>
                  <el-radio-button label="week">周</el-radio-button>
                  <el-radio-button label="month">月</el-radio-button>
                  <el-radio-button label="year">年</el-radio-button>
                </el-radio-group>
              </p>

              <p>
                <el-date-picker
                  v-show="countSearchType === 'date'"
                  v-model="countSearchTime"
                  :picker-options="{firstDayOfWeek:1}"
                  size="mini"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                  placeholder="选择时间"
                  @change="handleCountSearchTime"
                />
                <el-date-picker
                  v-show="countSearchType === 'week'"
                  v-model="countSearchTime"
                  :picker-options="{firstDayOfWeek:1}"
                  size="mini"
                  type="week"
                  format="yyyy 第 WW 周"
                  placeholder="选择时间"
                  @change="handleCountSearchTime"
                />
                <el-date-picker
                  v-show="countSearchType === 'month'"
                  v-model="countSearchTime"
                  :picker-options="{firstDayOfWeek:1}"
                  size="mini"
                  type="month"
                  value-format="timestamp"
                  placeholder="选择时间"
                  @change="handleCountSearchTime"
                />
                <el-date-picker
                  v-show="countSearchType === 'year'"
                  v-model="countSearchTime"
                  :picker-options="{firstDayOfWeek:1}"
                  size="mini"
                  type="year"
                  value-format="timestamp"
                  placeholder="选择时间"
                  @change="handleCountSearchTime"
                />
              </p>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <LineMarker
        id="count"
        ref="countFeedback"
        heigth="100px"
        :option="countOption"
      />
    </div>

    <!--    // 在线时长-->
    <div class="chart-container">
      <el-header
        height="40px"
      >
        <el-row>
          <el-col class="title" :span="10">
            在线时长（小时）
          </el-col>
          <el-col class="search" :span="14">
            <div class="from-search">
              <p>
                <el-radio-group v-model="onlineTimeSearchType" size="mini" @change="handleOnlineTimeSearchTime">
                  <el-radio-button label="date">日</el-radio-button>
                  <el-radio-button label="week">周</el-radio-button>
                  <el-radio-button label="month">月</el-radio-button>
                  <el-radio-button label="year">年</el-radio-button>
                </el-radio-group>
              </p>

              <p>
                <el-date-picker
                  v-show="onlineTimeSearchType === 'date'"
                  v-model="onlineTimeSearchTime"
                  :picker-options="{firstDayOfWeek:1}"
                  size="mini"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                  placeholder="选择时间"
                  @change="handleOnlineTimeSearchTime"
                />
                <el-date-picker
                  v-show="onlineTimeSearchType === 'week'"
                  v-model="onlineTimeSearchTime"
                  :picker-options="{firstDayOfWeek:1}"
                  size="mini"
                  type="week"
                  format="yyyy 第 WW 周"
                  placeholder="选择时间"
                  @change="handleOnlineTimeSearchTime"
                />
                <el-date-picker
                  v-show="onlineTimeSearchType === 'month'"
                  v-model="onlineTimeSearchTime"
                  :picker-options="{firstDayOfWeek:1}"
                  size="mini"
                  type="month"
                  value-format="timestamp"
                  placeholder="选择时间"
                  @change="handleOnlineTimeSearchTime"
                />
                <el-date-picker
                  v-show="onlineTimeSearchType === 'year'"
                  v-model="onlineTimeSearchTime"
                  :picker-options="{firstDayOfWeek:1}"
                  size="mini"
                  type="year"
                  value-format="timestamp"
                  placeholder="选择时间"
                  @change="handleOnlineTimeSearchTime"
                />
              </p>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <LineMarker
        id="onlineTime"
        ref="onlineTime"
        heigth="100px"
        :option="onlineTimeOption"
      />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import { editData } from '@/api/autograph'
import LineMarker from '@/components/Charts/LineMarker'
import { timeOption, countOption } from './js/chart-option'
import { deepClone } from '../../utils'
import { getOnDayOnlineTime, getOnceFeedbackTime, getFeedbackCount, getFeedbackDelayed } from '@/api/statistics'

export default {
  name: 'Documentation',
  components: { LineMarker },
  data() {
    return {
      fromData: {},
      url: '',
      imgList: null,
      headers: {
        distinction: 'web'
      },
      srcList: [
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      dialogVisible: false,

      countSearchType: 'date',
      countSearchTime: new Date(),
      countOption: deepClone(countOption),

      onlineTimeSearchType: 'date',
      onlineTimeSearchTime: new Date(),
      onlineTimeOption: deepClone(countOption),

      checkDoctorList: [],
      doctorList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    routesData() {
      return this.routes
    },
    getUseTime() {
      const oldData = new Date(parseTime(this.userInfo.registerTime)).getTime()
      const nowData = new Date().getTime()
      return new Date(nowData - oldData)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.checkDoctorList.push(this.userInfo.doctorId)
      this.doctorList.push(this.userInfo)
      this.handleCountSearchTime()
      this.handleOnlineTimeSearchTime()
    },
    clear() {
      this.$refs.autograph.$emit('clear-rect')
    },
    handleConfirmData() {
      this.$refs.autograph.$emit('get-img')
    },

    handleAvatarSuccess(res, file) {
      this.fromData.doctor_sign = res.data.photos
      this.saveImg()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    saveImg() {
      this.fromData.doctorId = this.userInfo.doctorId
      return new Promise((resolve, reject) => {
        editData(this.fromData)
          .then(response => {
            if (response.data) {
              this.dialogVisible = false
              this.$notify({
                title: '签名上传成功！',
                type: 'success'
              })
            } else {
              this.$notify({
                title: response.msg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 医生反馈数量相关方法 start
    // 搜索方法
    handleCountSearchTime() {
      const listQueryList = this.handleSearchTime(this.countSearchTime, this.countSearchType)
      this.handleGetFeedbackCount(listQueryList, 0, this.handleSetCountData)
    },

    // 获取反馈数量数据
    async handleGetFeedbackCount(list = [], number = 0, cb, reList = []) {
      const res = await getFeedbackCount({
        doctorId: this.checkDoctorList.join(','),
        ...list[number]
      })
      const timeFormat = this.countSearchType === 'week' ? (parseTime(list[number].beginTime, list[number].format) + ' ~ ' + parseTime(list[number].endTime, list[number].format)) : parseTime(list[number].beginTime, list[number].format)

      reList.push({ data: res.data, time: timeFormat })
      number++
      if (number < list.length) {
        this.handleGetFeedbackCount(list, number, cb, reList)
      } else {
        cb(reList)
      }
    },

    // 设置反馈数量数据
    handleSetCountData(list = []) {
      const xAxisList = []
      const legendList = []
      const seriesList = []
      const legendObj = {}

      // 获得的数据 时间日期 的循环
      list.forEach((item, itemIndex) => {
        xAxisList.push(item.time)
        // 选中医生的循环
        this.checkDoctorList.forEach((doctorItem, doctorIndex) => {
          if (!legendObj[doctorItem]) {
            let d_name = ''
            this.doctorList.forEach((item) => {
              if (item.doctorId === doctorItem) {
                d_name = item.username
              }
            })
            legendObj[doctorItem] = d_name
            legendList.push(d_name)
            seriesList.push(
              {
                name: d_name,
                type: 'bar',
                // stack: 'total',
                barGap: '0%',
                barWidth: '20px',
                label: {
                  show: true,
                  position: 'top'
                },
                emphasis: {
                  focus: 'series'
                },
                data: []
                // data: [data.doctor_feedback_count]
              }
            )
          }

          // console.log(item.data.length)
          if (item.data.length <= 0) {
            seriesList[doctorIndex].data.push(0)
          } else {
            // 相关医生 统计数据的循环
            let isNo = true
            item.data.forEach((data) => {
              if (data.doctorId === doctorItem) {
                seriesList[doctorIndex].data.push(data.feedback_count_time)
                isNo = false
              }
            })
            if (isNo) {
              seriesList[doctorIndex].data.push(0)
            }
          }
        })
      })

      this.countOption = deepClone(countOption)

      this.countOption.legend.data = legendList
      this.countOption.xAxis.data = xAxisList
      this.countOption.series = seriesList

      this.$refs.countFeedback.setOption(this.countOption)
    },
    // 医生反馈数量相关方法 end

    // 医生在线时长相关方法 start
    // 搜索方法
    handleOnlineTimeSearchTime() {
      const listQueryList = this.handleSearchTime(this.onlineTimeSearchTime, this.onlineTimeSearchType)
      this.handleGetOnlineTime(listQueryList, 0, this.handleSetOnlineTimeData)
    },

    // 获取反馈数量数据
    async handleGetOnlineTime(list = [], number = 0, cb, reList = []) {
      const res = await getOnDayOnlineTime({
        doctorId: this.checkDoctorList.join(','),
        ...list[number]
      })
      const timeFormat = this.countSearchType === 'week' ? (parseTime(list[number].beginTime, list[number].format) + ' ~ ' + parseTime(list[number].endTime, list[number].format)) : parseTime(list[number].beginTime, list[number].format)

      reList.push({ data: res.data, time: timeFormat })
      number++
      if (number < list.length) {
        this.handleGetOnlineTime(list, number, cb, reList)
      } else {
        cb(reList)
      }
    },

    // 设置在线时长数据
    handleSetOnlineTimeData(list = []) {
      const xAxisList = []
      const legendList = []
      const seriesList = []
      const legendObj = {}

      // 获得的数据 时间日期 的循环
      list.forEach((item, itemIndex) => {
        xAxisList.push(item.time)
        // 选中医生的循环
        this.checkDoctorList.forEach((doctorItem, doctorIndex) => {
          if (!legendObj[doctorItem]) {
            let d_name = ''
            this.doctorList.forEach((item) => {
              if (item.doctorId === doctorItem) {
                d_name = item.username
              }
            })
            legendObj[doctorItem] = d_name
            legendList.push(d_name)
            seriesList.push(
              {
                name: d_name,
                type: 'bar',
                // stack: 'total',
                barGap: '0%',
                barWidth: '20px',
                label: {
                  show: true,
                  position: 'top'
                },
                emphasis: {
                  focus: 'series'
                },
                data: []
                // data: [data.doctor_feedback_count]
              }
            )
          }

          // console.log(item.data.length)
          if (item.data.length <= 0) {
            seriesList[doctorIndex].data.push(0)
          } else {
            // 相关医生 统计数据的循环
            let isNo = true
            item.data.forEach((data) => {
              if (data.doctorId === doctorItem) {
                const minute = Math.ceil(data.online_time / 60)
                const hour = (minute / 60).toFixed(2)
                seriesList[doctorIndex].data.push(hour)
                isNo = false
              }
            })
            if (isNo) {
              seriesList[doctorIndex].data.push(0)
            }
          }
        })
      })

      this.onlineTimeOption = deepClone(countOption)

      this.onlineTimeOption.legend.data = legendList
      this.onlineTimeOption.xAxis.data = xAxisList
      this.onlineTimeOption.series = seriesList

      this.$refs.onlineTime.setOption(this.onlineTimeOption)
    },
    // 医生在线时长相关方法 end

    // 获得时间
    handleSearchTime(time = new Date(), type = 'date') {
      let selectTime = parseTime(new Date(time), '{y}-{m}-{d}')
      let endDay = ''
      let selectEndTime = ''
      const dateOption = {
        date: {
          oneTime: 1000 * 60 * 60 * 24,
          delayTimeMax: 3,
          allTimeMax: 7,
          nextTime: (time, number) => {
            return {
              beginTime: parseTime(time + (number * dateOption.date.oneTime), '{y}-{m}-{d} {h}:{i}:{s}'),
              endTime: parseTime(time + ((number + 1) * dateOption.date.oneTime) - 1000, '{y}-{m}-{d} {h}:{i}:{s}'),
              format: '{y}-{m}-{d}'
            }
          }
        },
        week: {
          oneTime: 1000 * 60 * 60 * 24 * 7,
          delayTimeMax: 1,
          allTimeMax: 4,
          nextTime: (time, number) => {
            return {
              beginTime: parseTime(time + (number * dateOption.week.oneTime), '{y}-{m}-{d} {h}:{i}:{s}'),
              endTime: parseTime(time + ((number + 1) * dateOption.week.oneTime) - 1000, '{y}-{m}-{d} {h}:{i}:{s}'),
              format: '{y}-{m}-{d}'
            }
          }
        },
        month: {
          oneTime: 1000 * 60 * 60 * 24 * 7 * 30,
          delayTimeMax: 1,
          allTimeMax: 3,
          nextTime: (time, number) => {
            let month = new Date(time).getMonth() + 1
            let year = new Date(time).getFullYear()
            let endMonth = new Date(time).getMonth() + 1
            let endYear = new Date(time).getFullYear()
            month += number
            if (month > 12) {
              month = month - 12
              year++
            }
            if (month <= 0) {
              month = month + 12
              year--
            }
            //
            endMonth += number + 1
            if (endMonth > 12) {
              endMonth = endMonth - 12
              endYear++
            }
            if (endMonth <= 0) {
              endMonth = endMonth + 12
              endYear--
            }
            return {
              beginTime: parseTime(new Date(year + '-' + month).getTime(), '{y}-{m}-{d} {h}:{i}:{s}'),
              endTime: parseTime(new Date(endYear + '-' + endMonth).getTime() - 1000, '{y}-{m}-{d} {h}:{i}:{s}'),
              format: '{y}-{m}'
            }
          }
        },
        year: {
          oneTime: 1000 * 60 * 60 * 24 * 7 * 30 * 12,
          delayTimeMax: 1,
          allTimeMax: 3,
          nextTime: (time, number) => {
            let year = new Date(time).getFullYear()
            year += number
            const endYear = year + 1
            return {
              beginTime: parseTime(new Date(year.toString()).getFullTime(), '{y}-{m}-{d} {h}:{i}:{s}'),
              endTime: parseTime(new Date(endYear.toString()).getFullTime() - 1000, '{y}-{m}-{d} {h}:{i}:{s}'),
              format: '{y}'
            }
          }
        }
      }
      const listQueryList = [] // 循环请求参数集合
      let today = new Date(parseTime(new Date(), '{y}-{m}-{d}')).getFullTime()
      switch (type) {
      case 'date':
        selectTime = new Date(parseTime(time, '{y}-{m}-{d}')).getFullTime()
        selectEndTime = selectTime + (dateOption['date'].oneTime * dateOption['date'].delayTimeMax)
        break
      case 'week':
        const weekDay = new Date(time).getDay() || 7
        selectTime = new Date(parseTime(time, '{y}-{m}-{d}')).getFullTime() - dateOption['date'].oneTime * (weekDay - 1)
        // console.log(parseTime(new Date(selectTime), '{y}-{m}-{d} {h}:{i}:{s}'))
        selectEndTime = selectTime + (dateOption['week'].oneTime * dateOption['week'].delayTimeMax)

        const weekToday = new Date(time).getDay() || 7
        today = new Date(parseTime(today, '{y}-{m}-{d}')).getFullTime() - dateOption['date'].oneTime * (weekToday - 1)
        break
      case 'month':
        selectTime = new Date(parseTime(time, '{y}-{m}')).getFullTime()
        let month = new Date(selectTime).getMonth() + 1 + dateOption['month'].delayTimeMax
        let mYear = new Date(selectTime).getFullYear()
        if (month > 12) {
          month = 1
          mYear++
        }
        selectEndTime = new Date(mYear + '-' + month).getTime()
        today = new Date(parseTime(today, '{y}-{m}')).getFullTime()

        break
      case 'year':
        selectTime = new Date(parseTime(time, '{y}')).getFullTime()
        let year = new Date(selectTime).getFullYear()
        year += dateOption['year'].delayTimeMax
        selectEndTime = new Date((year++) + '').getFullTime()

        today = new Date(parseTime(today, '{y}')).getFullTime()
        break
      }
      if (today > selectEndTime) {
        endDay = selectEndTime
      } else if (today - selectTime >= 0 && today <= selectEndTime) {
        endDay = today
      }
      // console.log(today)
      // console.log(selectTime)
      // console.log(parseTime(today,'{y}-{m}-{d} {h}:{i}:{s}'))
      // console.log(parseTime(selectEndTime,'{y}-{m}-{d} {h}:{i}:{s}'))
      // console.log(parseTime(selectTime,'{y}-{m}-{d} {h}:{i}:{s}'))
      // console.log(today - selectTime >= 0 && today <= selectEndTime)
      for (let i = 0; i < dateOption[type].allTimeMax; i++) {
        listQueryList.push(dateOption[type].nextTime(endDay, 0 - i))
      }
      // console.log(listQueryList)
      return listQueryList.reverse()
    }
  }
}
</script>

<style lang="scss" scoped>
  .mt20{
    margin-top: 20px;
  }
  p{
    margin: 0;
    padding: 0;
  }
  .welcome{
  }
  .from{

  }
  .el-image{
    border: 1px solid #ccc;
  }
  .chart-container{
    margin-top: 30px;
    overflow: hidden;

    .el-header{
    }

    .from-search{
      float: right;
      p{
        float: left;
        margin: 0;
        padding: 0;
      }
    }

    .search{

    }
    .title{
      line-height: 40px;
      font-size: 20px;
      font-weight: bold;
      color: #444;
    }
  }

</style>
