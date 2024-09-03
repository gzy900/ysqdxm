import request from '@/utils/request'

export function addFeedback(data) {
  return request({
    url: '/doctor_feedback/addDoctor_feedback',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/doctor_feedback/selFeedbackByTypeAndPrivateId',
    method: 'post',
    data
  })
}

export function editFeedback(data) {
  return request({
    url: '/doctor_feedback/updDoctor_feedbackByTypeAndPrivateId',
    method: 'post',
    data
  })
}
