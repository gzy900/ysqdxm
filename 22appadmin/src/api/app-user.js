import request from '@/utils/request'
import request1 from '@/utils/request-clothes'

export function getList(data) {
  return request({
    url: '/users/selUsersList',
    method: 'POST',
    data
  })
}

export function getContentUsers(data) {
  return request({
    url: '/users/getContentUsers',
    method: 'POST',
    data
  })
}

export function getAuthList(data) {
  return request({
    url: '/authentication/selApp_authenticationByState',
    method: 'POST',
    data
  })
}

export function addData(data) {
  return request({
    url: '/private_doctors/addPrivate_doctors',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/users/updUsersByUuid',
    method: 'post',
    data
  })
}

export function editState(data) {
  return request({
    url: '/users/updApp_usersStateByUuid',
    method: 'post',
    data
  })
}

export function editNameState(data) {
  return request({
    url: '/authentication/updCheckStateByUuid',
    method: 'post',
    data
  })
}

export function getPackageList(data) {
  return request({
    url: '/taocan/lists',
    method: 'get'
  })
}

export function addphone(data) {
  return request({
    url: '/users/addVisitRecord',
    method: 'post',
    data
  })
}

export function getPhoneListUser(data) {
  return request({
    url: '/users/getVisitRecordByUuid',
    method: 'post',
    data
  })
}

export function getPhoneList(data) {
  return request({
    url: '/users/getVisitRecordByUuid',
    method: 'post',
    data
  })
}

export function delMember(data) {
  return request({
    url: '/taocan/delMember',
    method: 'post',
    data
  })
}

