import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/doctor_patient/getDoctor_patientByDoctorId',
    method: 'post',
    data
  })
}

export function getAdminList(data) {
  return request({
    url: '/doctor_patient/getMemberDoctor_week',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/doctor_feedback/addDoctor_week_newspaper',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/doctor_feedback/selWeekByPatientId',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/doctor_feedback/updWeekByWid',
    method: 'post',
    data
  })
}
