import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/pc/admin/v1/hospital/nested/',
    method: 'get',
    params
  })
}

export function getHospital(params) {
  return request({
    url: '/pc/admin/v1/hospital/',
    method: 'get',
    params
  })
}
