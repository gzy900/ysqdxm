import request from '../utils/request'
export function getList(data,url) {
  return request({
    url,
    method: 'POST',
    data
  })
}

export function getDoctor(data) {
  return request({
    url:'private_doctors/selPrivate_doctorsById',
    method: 'POST',
    data
  })
}
