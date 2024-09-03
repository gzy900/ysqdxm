import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/users/getOrganization',
    method: 'POST',
    data
  })
}

export function addData(data) {
  return request({
    url: '/users/addOrganization',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/users/updOrganizationById',
    method: 'post',
    data
  })
}

export function editDataList(data) {
  return request({
    url: '/users/updOrganizationIdByUuid',
    method: 'post',
    data
  })
}
