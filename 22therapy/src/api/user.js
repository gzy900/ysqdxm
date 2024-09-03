import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/web/user/login',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/web/user/userList',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/web/user/addUser',
    method: 'post',
    data
  })
}

export function getInfo(userId) {
  return request({
    url: '/web/user/userInfo',
    method: 'post',
    data: { userId }
  })
}

export function logout() {
  return request({
    url: '/dev-api/vue-element-admin/user/logout',
    method: 'post'
  })
}
