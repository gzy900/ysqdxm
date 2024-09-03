import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/quickreply/find',
    method: 'post',
    data
  })
}
export function getCategoryList(data) {
  return request({
    url: '/category/select',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/quickreply/add',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request({
    url: '/quickreply/del',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/quickreply/update',
    method: 'post',
    data
  })
}
