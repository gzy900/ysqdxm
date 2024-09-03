import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/users/getMedicalHistory',
    method: 'POST',
    data
  })
}

export function addData(data) {
  return request({
    url: '/users/addMedicalHistory',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/users/updMedicalHistoryById',
    method: 'post',
    data
  })
}
