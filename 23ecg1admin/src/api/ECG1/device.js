

import request from '@/utils/request'

export function getList({ page, limit }) {
  return request({
    url: `/xdy_f/device/page/${page}/${limit}`,
    method: 'get'
  })
}

export function addData(data) {
  return request({
    url: '/xdy_f/device/add',
    method: 'post',
    data,
    dataType: 'formData'
  })
}

export function upData(data) {
  return request({
    url: '/xdy_f/device/update',
    method: 'post',
    data,
    dataType: 'formData'
  })
}
