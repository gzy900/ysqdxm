import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/plan/selBigList',
    method: 'POST',
    data
  })
}

export function addData(data) {
  return request({
    url: '/plan/addBig',
    method: 'post',
    data
  })
}
export function deleteData(data) {
  return request({
    url: '/plan/delBig',
    method: 'post',
    data
  })
}
export function editData(data) {
  return request({
    url: '/plan/updBig',
    method: 'post',
    data
  })
}
