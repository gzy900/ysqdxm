import request from '@/utils/request'

export function getAll2(params) {
  return request({
    url: '/pc/admin/v1/master/shortInfo/',
    method: 'get',
    params
  })
}

export function get2(params) {
  return request({
    url: '/pc/admin/v1/master/',
    method: 'get',
    params
  })
}

export function get2ById(id) {
  return request({
    url: `/pc/admin/v1/master/${id}`,
    method: 'get'
  })
}

export function add2(data) {
  return request({
    url: '/pc/admin/v1/master/',
    method: 'POST',
    data
  })
}

export function edit2({ id }, data) {
  return request({
    url: `/pc/admin/v1/master/${id}/`,
    method: 'PUT',
    data
  })
}

export function remove2(data) {
  return request({
    url: '/pc/admin/v1/master/deleteItems/',
    method: 'delete',
    data
  })
}

export function getAll1(params) {
  return request({
    url: '/pc/admin/v1/apprentice/shortInfo/',
    method: 'get',
    params
  })
}

export function get1(params) {
  return request({
    url: '/pc/admin/v1/apprentice/',
    method: 'get',
    params
  })
}

export function get1ById(id) {
  return request({
    url: `/pc/admin/v1/apprentice/${id}/`,
    method: 'get'
  })
}

export function add1(data) {
  return request({
    url: '/pc/admin/v1/apprentice/',
    method: 'POST',
    data
  })
}

export function edit1({ id }, data) {
  return request({
    url: `/pc/admin/v1/apprentice/${id}/`,
    method: 'PUT',
    data
  })
}

export function remove1(data) {
  return request({
    url: '/pc/admin/v1/apprentice/deleteItems/',
    method: 'delete',
    data
  })
}
