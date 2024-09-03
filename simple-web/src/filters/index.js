var moment = require('moment')

// 日期过滤器
export const dateFormat = (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  if (dataStr == null) { return '' }
  return moment(dataStr).format(pattern)
}
