import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/permission/permissionList',
    method: 'get',
    params: data
  })
}

export function addData(data) {
  return request({
    url: '/permission/addPermission',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/permission/updPermission',
    method: 'post',
    data
  })
}

export function delData(data) {
  return request({
    url: '/permission/delPermission',
    method: 'post',
    data
  })
}

