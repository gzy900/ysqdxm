import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/private_doctors/selPrivate_doctorsByType',
    method: 'POST',
    data
  })
}

export function addData(data) {
  return request({
    url: '/private_doctors/addPrivate_doctors',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/private_doctors/updPrivate_doctorsById',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request({
    url: '/private_doctors/delPrivate_doctorsById',
    method: 'post',
    data
  })
}
