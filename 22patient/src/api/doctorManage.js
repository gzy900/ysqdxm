import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/doctor/doctorList',
    method: 'get',
    params: data
  })
}

export function addData(data) {
  return request({
    url: '/doctor/addDoctor',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/doctor/updDoctor',
    method: 'post',
    data
  })
}

