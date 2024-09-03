import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/pc/admin/v1/operation/',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/pc/admin/v1/department/',
    method: 'post',
    params
  })
}

export function edit(params) {
  return request({
    url: '/pc/admin/v1/department/',
    method: 'put',
    params
  })
}

export function remove(params) {
  return request({
    url: '/pc/admin/v1/department/',
    method: 'delete',
    params
  })
}
