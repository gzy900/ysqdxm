import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/doctor/doctorList',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/doctor/addDoctor',
    dataType: 'JSON',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/doctor/updDoc',
    dataType: 'JSON',
    method: 'post',
    data
  })
}

export function doctorLogin(data) {
  return request({
    url: '/doctor/loginByPwd',
    dataType: 'JSON',
    method: 'post',
    params: { 'web': 1 },
    data
  })
}

export function getDoctorInfo(data) {
  return request({
    url: '/doctor/doctorInfo',
    dataType: 'JSON',
    method: 'post',
    data
  })
}
