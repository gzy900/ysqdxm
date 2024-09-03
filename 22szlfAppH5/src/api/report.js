import request from '../utils/request'

export function getUserInfo(data) {
  return request({
    url:'users/selectByUuid',
    method: 'POST',
    data
  })
}

export function getFeedback(data) {
  return request({
    url:'doctor_feedback/selFeedbackByTypeAndPrivateId',
    method: 'POST',
    data
  })
}

export function getMeasure157(data) {
  return request({
    url:'healthRecord/selDanDaoById',
    method: 'POST',
    data
  })
}

export function getMeasure2(data) {
  return request({
    url:'healthRecord/selBloodPressureById',
    method: 'POST',
    data
  })
}

export function getMeasure3(data) {
  return request({
    url:'healthRecord/selBMIById',
    method: 'POST',
    data
  })
}

export function getDoctor(data) {
  return request({
    url:'doctor_users/selDoctor_usersById',
    method: 'POST',
    data
  })
}

export function getWeekly(data) {
  return request({
    url:'doctor_feedback/selWeekByWid',
    method: 'POST',
    data
  })
}
