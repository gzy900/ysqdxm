import request from '@/utils/request-clothes'

export function getList(data) {
  return request({
    url: '/users/selUsersList',
    method: 'POST',
    data
  })
}
