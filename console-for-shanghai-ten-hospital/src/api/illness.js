import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/pc/admin/v1/illness/',
    method: 'GET',
    params
  })
}

export function getById(id) {
  return request({
    url: `/pc/admin/v1/illness/${id}/`,
    method: 'GET'
  })
}

export function setOPSDate(id, data) {
  return request({
    url: `/pc/admin/v1/illness/${id}/setOpsDate/`,
    method: 'POST',
    data
  })
}

export function setToPlan(id, data) {
  return request({
    url: `/pc/admin/v1/illness/${id}/dispatchTemplate/`,
    method: 'POST',
    data
  })
}

export function getPlanById(id) {
  return request({
    url: `/pc/admin/v1/illnessPlanTemplate/${id}/`,
    method: 'GET'
  })
}

export function editPlanById(id, data) {
  return request({
    url: `/pc/admin/v1/illnessPlanTemplate/${id}/`,
    method: 'PUT',
    data
  })
}

export function editWhichDayById(id, data) {
  return request({
    url: `/pc/admin/v1/illnessPlanDetail/${id}/`,
    method: 'PUT',
    data
  })
}

export function editTaskById(id, data) {
  return request({
    url: `/pc/admin/v1/illnessPlanTask/${id}/`,
    method: 'PUT',
    data
  })
}

export function editQuestionnaireById(id, data) {
  return request({
    url: `/pc/admin/v1/illnessPlanQuestion/${id}/`,
    method: 'PUT',
    data
  })
}

export function deletePlanById(id) {
  return request({
    url: `/pc/admin/v1/illness/${id}/deleteTemplate/`,
    method: 'POST'
  })
}

export function add(data) {
  return request({
    url: '/pc/admin/v1/illness/',
    method: 'POST',
    data
  })
}

export function edit(id, data) {
  return request({
    url: `/pc/admin/v1/illness/${id}/`,
    method: 'PUT',
    data
  })
}

export function remove(data) {
  return request({
    url: '/pc/admin/v1/illness/deleteItems/',
    method: 'DELETE',
    data
  })
}

export function bindDeviceBySN(id, data) {
  return request({
    url: `/pc/admin/v1/illness/${id}/bind/`,
    method: 'POST',
    data
  })
}

export function deleteDeviceByID(id) {
  return request({
    url: `/pc/admin/v1/illness/${id}/relax/`,
    method: 'POST'
  })
}

export function getIllnessReportDataById(id, params) {
  return request({
    url: `/pc/admin/v1/illness/${id}/checkData/`,
    method: 'GET',
    params
  })
}

export function getIllnessPatientReportByIdAndDate({ patient_id, date }) {
  return request({
    url: `/app/patient/v1/report/`,
    method: 'GET',
    params: {
      patient_id,
      date
    }
  })
}

export function getBloodPressData(params) {
  return request({
    url: '/pc/admin/v1/bloodPressData/',
    method: 'GET',
    params
  })
}

export function getBloodSugarData(params) {
  return request({
    url: '/pc/admin/v1/bloodSugarData/',
    method: 'GET',
    params
  })
}

export function getAllReport(params) {
  return request({
    url: `/app/patient/v1/report/`,
    method: 'GET',
    params
  })
}

export function getIllnessPlanVisitById(id) {
  return request({
    url: `/pc/admin/v1/illnessPlanVisit/${id}/visitInfo/`,
    method: 'GET'
  })
}

export function putAppointmenttimeById(id, data) {
  return request({
    url: `/app/doctor/v1/doctorVisit/${id}/`,
    method: 'PUT',
    data
  })
}

export function postNoticeAppointmentById(id) {
  return request({
    url: `/app/doctor/v1/doctorVisit/${id}/notice/`,
    method: 'POST'
  })
}

export function getIllnessPlanQuestion(params) {
  return request({
    url: '/pc/admin/v1/illnessPlanQuestion/',
    method: 'GET',
    params
  })
}

export function getIllnessContactById(id) {
  return request({
    url: `/pc/admin/v1/illness/${id}/contact_info/`,
    method: 'GET'
  })
}

export function onSetToComonContact(id, data) {
  return request({
    url: `/pc/admin/v1/illness/${id}/contact_info/`,
    method: 'POST',
    data
  })
}

export function setRemarkById(id, data) {
  return request({
    url: `/pc/admin/v1/illness/${id}/`,
    method: 'PUT',
    data
  })
}

