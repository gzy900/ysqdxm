import request from '@/utils/request'

export function getList({ page, limit }) {
  return request({
    url: `/uploadUser/page/${page}/${limit}`,
    method: 'get'
  })
}

export function addData(data) {
  return request({
    url: '/uploadUser/add',
    method: 'post',
    data,
    dataType: 'formData'
  })
}

export function upData(data) {
  return request({
    url: '/uploadUser/update',
    method: 'post',
    data
  })
}
