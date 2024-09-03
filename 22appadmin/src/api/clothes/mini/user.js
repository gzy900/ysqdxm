import request from '@/utils/request-clothes'

export function getList(data) {
  return request({
    url: '/mini/web/userList',
    method: 'get',
    dataType: 'formData',
    params: data
  })
}

export function editData(data) {
  return request({
    url: '/mini/web/user',
    method: 'PATCH',
    data
  })
}
