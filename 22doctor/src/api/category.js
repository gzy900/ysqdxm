import request from '@/utils/request'

export function getCategoryList(data) {
  return request({
    url: '/category/select',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/category/add',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request({
    url: '/category/del',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/category/update',
    method: 'post',
    data
  })
}
