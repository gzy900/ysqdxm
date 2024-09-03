import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/healthRecord/getBMI',
    method: 'POST',
    data
  })
}
