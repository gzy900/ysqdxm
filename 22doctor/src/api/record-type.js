
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/optype/get',
    method: 'POST',
    data
  })
}

export function addData(data) {
  return request({
    url: '/optype/add',
    method: 'POST',
    data
  })
}

export function delData(data) {
  return request({
    url: '/optype/del',
    method: 'POST',
    data
  })
}
