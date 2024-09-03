import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-element-admin/user/login',
//     method: 'post',
//     data
//   })
// }
//
// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function login(data) {
  return request({
    url: '/doctor/login',
    method: 'post',
    data
  })
}

export function getInfo(doctorId) {
  return request({
    url: '/doctor/doctorInfo',
    method: 'get',
    params: { doctorId }
  })
}

export function getData() {
  return request({
    url: '/patient/getPatientCate',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

