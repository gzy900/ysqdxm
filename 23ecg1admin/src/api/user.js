import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/app/web_users/webLogin',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/app/web_users/selWeb_usersById',
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
