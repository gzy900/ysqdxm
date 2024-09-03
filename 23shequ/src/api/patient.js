import request from '@/utils/request'

export function addData(data) {
  return request({
    url: '/patient/addPatient',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/patient/add',
    method: 'post',
    dataType: 'json',
    data
  })
}

export function upUser(data) {
  return request({
    url: '/patient/upd',
    method: 'PATCH',
    dataType: 'json',
    data
  })
}

export function getList(data) {
  return request({
    url: '/patient/patientList',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/patient/updPatient',
    method: 'post',
    data
  })
}

export function upStatus(data) {
  return request({
    url: '/patient/updFrozenStatus',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/patient/infoDetail',
    method: 'post',
    data
  })
}

export function delData(params) {
  return request({
    url: '/patient/delPatient',
    method: 'delete',
    params
  })
}

