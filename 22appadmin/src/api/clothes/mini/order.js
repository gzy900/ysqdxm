import request from '@/utils/request-clothes'

export function getList(data) {
  return request({
    url: '/mini/web/orderList',
    method: 'get',
    dataType: 'formData',
    params: data
  })
}

