import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/org/orgList',
    method: 'get',
    params: data
  })
}

export function addData(data) {
  return request({
    url: '/org/addOrg',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/org/updOrgInfo',
    method: 'post',
    data
  })
}

