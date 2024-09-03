import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/doctor_users/getDoctor_jurisdiction',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/doctor_users/addDoctor_jurisdiction',
    method: 'post',
    data
  })
}

export function delData(data) {
  return request({
    url: '/doctor_users/delDoctor_jurisdictionById',
    method: 'post',
    data
  })
}
