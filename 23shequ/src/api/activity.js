import request from '@/utils/request'
import qs from 'qs'

export function getList(params) {
  return request({
    url: '/activity/page',
    method: 'post',
    data: params,
    dataType: 'json'
  })
}

export function addData(data) {
  return request({
    url: '/activity/add',
    method: 'post',
    data,
    dataType: 'json'
  })
}

export function upData(data) {
  return request({
    url: '/activity/upd',
    method: 'PATCH',
    data,
    dataType: 'json'

  })
}

export function delData(params) {
  return request({
    url: '/activity/del',
    method: 'delete',
    params
  })
}
