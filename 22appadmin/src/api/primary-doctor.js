import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/primaryDoctor/list',
    method: 'get',
    params: data
  })
}

export function addData(data) {
  return request({
    url: '/primaryDoctor/add',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/primaryDoctor/update',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request({
    url: '/primaryDoctor/del',
    method: 'post',
    data
  })
}
