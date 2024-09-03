
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/doctor_feedback/getDoctor_week_newspaper',
    method: 'post',
    data
  })
}

export function editState(data) {
  return request({
    url: '/doctor_feedback/checkDoctor_week_newspaper',
    method: 'post',
    data
  })
}
