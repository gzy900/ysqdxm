import request from '@/utils/request-clothes'

export function getList(data) {
  return request({
    url: '/mini/web/taocanList',
    method: 'post',
    params: data
  })
}

export function addData(data) {
  return request({
    url: '/mini/web/taocan',
    method: 'post',
    data: data
  })
}

export function upData(data) {
  return request({
    url: '/mini/web/taocan',
    method: 'PATCH',
    data: data
  })
}

export function delData(data) {
  return request({
    url: '/mini/web/taocan/' + data.id,
    method: 'delete',
    // data: data
  })
}
