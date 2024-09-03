
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/app/users/getApp_users',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/app/users/udpUsersByUuid',
    method: 'post',
    data
  })
}
