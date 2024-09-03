import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/famous/selConditionLike',
    method: 'POST',
    data
  })
}

export function addData(data) {
  return request({
    url: '/famous/addApp_faousDoctors',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/famous/updApp_faousDoctorsById',
    method: 'post',
    data
  })
}
export function deleteData(data) {
  return request({
    url: '/famous/delApp_faousDoctorsById',
    method: 'post',
    data
  })
}
export function getImgList(data) {
  return request({
    url: '/famous/getApp_famous_photo',
    method: 'POST',
    data
  })
}
export function getActiveList() {
  return request({
    url: '/famous/getTitleAndId',
    method: 'POST'
  })
}

export function addImg(data) {
  return request({
    url: '/famous/addApp_famous_photo',
    method: 'post',
    data
  })
}

export function deleteImg(data) {
  return request({
    url: '/famous/delApp_famous_photoById',
    method: 'post',
    data
  })
}
