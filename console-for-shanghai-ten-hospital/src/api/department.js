import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/pc/admin/v1/department/',
    method: 'get',
    params
  })
}

export function getById(id) {
  return request({
    url: '/pc/admin/v1/department/${id}/',
    method: 'GET'
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

/**
 * 科室预约时间管理
 */
export function getVisitDateList(params) {
  return request({
    url: `/pc/admin/v1/depServiceDate/`,
    method: 'GET',
    params
  })
}

export function getVisitDateById(id, params) {
  return request({
    url: `/pc/admin/v1/depServiceDate/`,
    method: 'GET',
    params
  })
}

export function editVisitDate(data) {
  return request({
    url: `/pc/admin/v1/depServiceDate/updateTimeSlot/`,
    method: 'POST',
    data
  })
}

export function getAllTeam(params) {
  return request({
    url: `/pc/admin/v1/visitTeam/`,
    method: 'GET',
    params
  })
}
