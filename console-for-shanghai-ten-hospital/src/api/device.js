import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/pc/admin/v1/device/',
    method: 'GET',
    params
  })
}
export function getById(id) {
  return request({
    url: `/pc/admin/v1/device/${id}/`,
    method: 'GET'
  })
}

export function add(data) {
  return request({
    url: '/pc/admin/v1/device/',
    method: 'POST',
    data
  })
}

export function edit(id, data) {
  return request({
    url: `/pc/admin/v1/device/${id}/`,
    method: 'PUT',
    data
  })
}

export function remove(data) {
  return request({
    url: '/pc/admin/v1/device/deleteItems/',
    method: 'DELETE',
    data
  })
}
