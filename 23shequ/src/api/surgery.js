import request from '@/utils/request'

export function addSurgery(data) {
  return request({
    url: '/surgery/add',
    method: 'post',
    data
  })
}

export function getSurgery(data) {
  return request({
    url: '/surgery/surgeryList',
    method: 'post',
    data
  })
}

export function upSurgery(data) {
  return request({
    url: '/surgery/upd',
    method: 'post',
    data
  })
}

export function delSurgery(data) {
  return request({
    url: '/surgery/del',
    method: 'post',
    data
  })
}

