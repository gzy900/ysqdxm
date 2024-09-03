
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/app/web_users/getWeb_users',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/app/web_users/addWeb_users',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/app/web_users/updWeb_usersById',
    method: 'post',
    data
  })
}
