import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/ylzx/selWz',
    method: 'POST',
    data
  })
}

export function addData(data) {
  return request({
    url: '/ylzx/addWz',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/ylzx/updWz',
    method: 'post',
    data
  })
}
export function deleteData(data) {
  return request({
    url: '/ylzx/delWz',
    method: 'post',
    data
  })
}
export function getImgList(data) {
  return request({
    url: '/ylzx/selLbImage',
    method: 'POST',
    data
  })
}

export function addImg(data) {
  return request({
    url: '/ylzx/addImage',
    method: 'post',
    data
  })
}

export function deleteImg(data) {
  return request({
    url: '/ylzx/delImage',
    method: 'post',
    data
  })
}

export function getActiveList() {
  return request({
    url: 'ylzx/selWz2',
    method: 'post'
  })
}
