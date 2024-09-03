import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/pc/admin/v1/commonQuestion/',
    method: 'GET',
    params
  })
}

export function getAllList(params) {
  return request({
    url: '/pc/admin/v1/commonQuestion/shortInfo/',
    method: 'GET',
    params
  })
}
export function getAllDangerList(params) {
  return request({
    url: '/pc/admin/v1/commonQuestion/selectInfo/',
    method: 'GET',
    params
  })
}

export function getById(id) {
  return request({
    url: `/pc/admin/v1/commonQuestion/${id}/`,
    method: 'GET'
  })
}

export function add(data) {
  return request({
    url: '/pc/admin/v1/commonQuestion/',
    method: 'POST',
    data
  })
}

export function edit(id, data) {
  return request({
    url: `/pc/admin/v1/commonQuestion/${id}/`,
    method: 'PUT',
    data
  })
}

export function remove(data) {
  return request({
    url: '/pc/admin/v1/commonQuestion/deleteItems/',
    method: 'DELETE',
    data
  })
}

export default {
  getList,
  getAllList,
  getAllDangerList,
  getById,
  add,
  edit,
  remove
}
