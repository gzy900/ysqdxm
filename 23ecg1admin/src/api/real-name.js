
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/app/authentication/getApp_auth',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/app/authentication/updCheckStateByUuid',
    method: 'post',
    data
  })
}
