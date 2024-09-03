import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/plan/selSmallList',
    method: 'POST',
    data
  })
}


export function addData(data) {
  return request({
    url: '/plan/addSmallPlan',
    method: 'POST',
    data
  })
}


export function deleteData(data) {
  return request({
    url: '/plan/delSmallPlan',
    method: 'POST',
    data
  })
}
