import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/sf_record/list',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/sf_record/add',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/sf_record/upd',
    method: 'post',
    data
  })
}

