import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/action/getActionByType',
    method: 'post',
    dataType: 'JSON',
    data
  })
}
export function getListPage(data) {
  return request({
    url: '/action/getActionByTypePage',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function addData(data) {
  return request({
    url: '/action/addAction',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function upData(data) {
  return request({
    url: '/action/updAction',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function delData(data) {
  return request({
    url: '/action/delAction',
    method: 'post',
    dataType: 'JSON',
    params: data
  })
}
