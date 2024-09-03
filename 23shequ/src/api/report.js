import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/report/page',
    method: 'get',
    params
  })
}

export function addData(data) {
  return request({
    url: '/report/add',
    method: 'post',
    data
  })
}
export function delData(params) {
  return request({
    url: '/report/del',
    method: 'delete',
    params
  })
}
