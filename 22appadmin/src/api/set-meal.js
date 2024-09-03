import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/taocan/lists',
    method: 'get',
    params: data
  })
}

export function addData(data) {
  return request({
    url: '/taocan/add',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/taocan/update',
    method: 'post',
    data
  })
}

export function deleteData() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function addCode(data) {
  return request({
    url: '/dhcode/add',
    method: 'post',
    data
  })
}

export function getCodeList(query) {
  return request({
    url: '/dhcode/list',
    method: 'get',
    params: query
  })
}

export function getBigPlanList(data) {
  return request({
    url: '/plan/selBigList',
    method: 'POST',
    data
  })
}
