import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/pc/admin/v1/planTemplate/',
    method: 'GET',
    params
  })
}

export function getById(id) {
  return request({
    url: `/pc/admin/v1/planTemplate/${id}/`,
    method: 'GET'
  })
}

export function add(data) {
  return request({
    url: '/pc/admin/v1/planTemplate/',
    method: 'POST',
    data
  })
}

export function edit(id, data) {
  return request({
    url: `/pc/admin/v1/planTemplate/${id}/`,
    method: 'PUT',
    data
  })
}

export function remove(data) {
  return request({
    url: '/pc/admin/v1/planTemplate/deleteItems/',
    method: 'DELETE',
    data
  })
}

export function getTaskList(params) {
  return request({
    url: '/pc/admin/v1/commonTask/',
    method: 'GET',
    params
  })
}

export function getAllTaskList(params) {
  return request({
    url: '/pc/admin/v1/commonTask/shortInfo/',
    method: 'GET',
    params
  })
}

export function getTaskListByType(type) {
  return request({
    url: `/pc/admin/v1/commonTask/?task_type=${type}`,
    method: 'GET'
  })
}

export function getTaskById(id) {
  return request({
    url: `/pc/admin/v1/commonTask/${id}/`,
    method: 'GET'
  })
}

export function addTask(data) {
  return request({
    url: '/pc/admin/v1/commonTask/',
    method: 'POST',
    data
  })
}

export function editTask(id, data) {
  return request({
    url: `/pc/admin/v1/commonTask/${id}/`,
    method: 'PUT',
    data
  })
}

export function removeTask(data) {
  return request({
    url: '/pc/admin/v1/commonTask/deleteItems/',
    method: 'DELETE',
    data
  })
}

export function getTaskTypeList(params) {
  return request({
    url: '/pc/admin/v1/planTemplateTaskType/',
    method: 'GET',
    params
  })
}

export function getTaskTypeById(id) {
  return request({
    url: `/pc/admin/v1/planTemplateTaskType/${id}/`,
    method: 'GET'
  })
}

export function addTaskType(data) {
  return request({
    url: '/pc/admin/v1/planTemplateTaskType/',
    method: 'POST',
    data
  })
}

export function editTaskType(id, data) {
  return request({
    url: `/pc/admin/v1/planTemplateTaskType/${id}/`,
    method: 'PUT',
    data
  })
}

export function removeTaskType(data) {
  return request({
    url: '/pc/admin/v1/planTemplateTaskType/',
    method: 'DELETE',
    data
  })
}

// 获取复诊预约
export function getPlanVisitList(params) {
  return request({
    url: '/pc/admin/v1/commonVisit/',
    method: 'GET',
    params
  })
}

// 获取复诊预约一个数据
export function getPlanVisitById(id) {
  return request({
    url: `/pc/admin/v1/commonVisit/${id}/`,
    method: 'GET'
  })
}

// 添加复诊预约
export function addPlanVisit(data) {
  return request({
    url: '/pc/admin/v1/commonVisit/',
    method: 'POST',
    data
  })
}

// 编辑复诊预约
export function editPlanVisit(id, data) {
  return request({
    url: `/pc/admin/v1/commonVisit/${id}/`,
    method: 'PUT',
    data
  })
}

// 删除复诊预约
export function removePlanVisit(data) {
  return request({
    url: '/pc/admin/v1/commonVisit/deleteItems/',
    method: 'DELETE',
    data
  })
}

// 通用的复诊任务
export function getCommonCheckItem() {
  return request({
    url: '/pc/admin/v1/commonCheckItem/shortInfo/',
    method: 'GET'
  })
}
