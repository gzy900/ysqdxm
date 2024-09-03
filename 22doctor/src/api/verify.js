
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/doctor_feedback/getDoctor_feedbackCheck',
    method: 'post',
    data
  })
}

export function editState(data) {
  return request({
    url: '/doctor_feedback/updDoctor_feedbackById',
    method: 'post',
    data
  })
}
