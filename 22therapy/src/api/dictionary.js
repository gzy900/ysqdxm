import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/dictionary/getAllChildrens',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/dictionary/addDictionary',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function upData(data) {
  return request({
    url: '/dictionary/updateDictionary',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function delData(data) {
  return request({
    url: '/dictionary/deleteDictionary',
    method: 'get',
    params: data
  })
}
