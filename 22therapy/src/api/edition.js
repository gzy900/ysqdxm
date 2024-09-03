import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/version/page/${data.pageSize}/${data.pageNum}`,
    method: 'get'
  })
}

export function addData(data) {
  return request({
    url: '/version',
    method: 'post',
    data,
    dataType: 'JSON'
  })
}

export function upData(data) {
  return request({
    url: '/version',
    method: 'patch',
    data
  })
}

export function delData(id) {
  return request({
    url: `/version/${id}`,
    method: 'post'
  })
}

