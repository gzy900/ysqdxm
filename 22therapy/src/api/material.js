
import request from '@/utils/request'
// url: '/prescpt/getAllList',

export function getList(data) {
  return request({
    url: '/prescpt/getAllList',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function addData(data) {
  return request({
    url: '/prescpt/addSport',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/prescpt/getOneSport',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function upData(data) {
  return request({
    url: '/prescpt/updSport',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function delData(params) {
  return request({
    url: '/prescpt/delSport',
    method: 'get',
    params
  })
}

