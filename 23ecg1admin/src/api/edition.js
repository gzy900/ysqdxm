
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/app/users/getVersion',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/app/users/addVersion',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/app/users/updVersionById',
    method: 'post',
    data
  })
}
