import request from '@/utils/request-clothes'

export function getList(params) {
  return request({
    url: '/web/videos',
    method: 'GET',
    params
  })
}
export function addData(data) {
  return request({
    url: '/web/video',
    method: 'POST',
    data
  })
}

export function upData(data) {
  return request({
    url: '/web/video',
    method: 'PATCH',
    data
  })
}
