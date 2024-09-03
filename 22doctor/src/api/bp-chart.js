import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/healthRecord/getBloodPressure',
    method: 'POST',
    data
  })
}
