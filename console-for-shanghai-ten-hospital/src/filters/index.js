import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) return ''
  return moment(value).format(format)
})

const GENDER = ['未知', '男', '女']
Vue.filter('gender', (value) => GENDER[value])

const MERIDIEM = ['', '上午', '下午']
Vue.filter('meridiem', (value) => MERIDIEM[value])

Vue.filter('weekday', (value) => {
  const which = moment(value).format('E')
  switch (which) {
    case '1':
      return '周一'
    case '2':
      return '周二'
    case '3':
      return '周三'
    case '4':
      return '周四'
    case '5':
      return '周五'
    case '6':
      return '周六'
    case '7':
      return '周日'
    default:
      return '非法日期'
  }
})
