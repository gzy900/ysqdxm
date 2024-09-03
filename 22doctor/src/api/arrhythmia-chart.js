import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/healthRecord/getDanDao',
    method: 'POST',
    data
  })
}

export function getHeart(data) {
  return request({
    url: '/doctor_patient/getHeartById',
    method: 'POST',
    data
  })
}
