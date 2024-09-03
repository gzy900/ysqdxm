
import request from '@/utils/request'
export function getRecordList(data) {
  return request({
    url: '/oprecord/find',
    method: 'POST',
    data
  })
}

export function addData(data) {
  return request({
    url: '/oprecord/add',
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
