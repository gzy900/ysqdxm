import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/doctor_users/getDoctor_usersList',
    method: 'POST',
    data
  })
}
export function getUserList(data) {
  return request({
    url: '/doctor_patient/getMemberAll',
    method: 'POST',
    data
  })
}
export function addUserDoctor(data) {
  return request({
    url: '/doctor_patient/addDoctor_patient',
    method: 'POST',
    data
  })
}

export function getPowerList(data) {
  return request({
    url: '/doctor_users/getDoctor_jurisdiction',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/doctor_users/addDoctor_Users',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/doctor_users/updDoctor_UsersByDoctorId',
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
