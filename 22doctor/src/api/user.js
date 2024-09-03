import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/doctor_users/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function getUserInfo(data) {
  return request({
    url: '/users/selectByUuid',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function upLoginTime(data) {
  return request({
    url: '/statistics/updOnlineTime',
    method: 'post',
    data
  })
}
