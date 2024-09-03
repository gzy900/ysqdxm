
import request from '@/utils/request'

export function getList(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}
