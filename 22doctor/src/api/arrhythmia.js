import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/doctor_patient/getDoctorDanDao',
    method: 'POST',
    data
  })
}

export function getAdminList(data) {
  return request({
    url: '/doctor_patient/getMemberMessage',
    method: 'POST',
    data
  })
}

export function getDanDaoById(data) {
  return request({
    url: '/healthRecord/selDanDaoById',
    method: 'POST',
    data
  })
}

export function getLockInfo(data) {
  return request({
    url: '/doctor_patient/selMessageLockState',
    method: 'POST',
    data
  })
}

export function unLock(data) {
  return request({
    url: '/doctor_patient/updMessageLockState',
    method: 'POST',
    data
  })
}
export function getDandaoAIReport(data) {
  return request({
    url: '/healthRecord/selUserReportById',
    method: 'POST',
    data
  })
}
