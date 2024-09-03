import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/question/queryQuestionByType',
    method: 'post',
    data
  })
}

export function getListAll(data) {
  return request({
    url: '/question/queryQuestion',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function addData(data) {
  return request({
    url: '/question/addQuestion',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function upData(data) {
  return request({
    url: '/question/updateQuestion',
    dataType: 'JSON',
    data,
    method: 'post'
  })
}

export function delQuest(data) {
  return request({
    url: '/question/deleteQuestion',
    // dataType: 'JSON',
    params: data,
    method: 'get'
  })
}

export function delAnswer(data) {
  return request({
    url: '/question/delAnswer',
    // dataType: 'JSON',
    params: data,
    method: 'get'
  })
}
