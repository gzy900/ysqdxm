import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/patient/patientList',
    method: 'post',
    data
  })
}

export function getMypatients(data) {
  return request({
    url: '/doctor/getMypatients',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function addData(data) {
  return request({
    url: '/video/addVideo',
    method: 'post',
    data
  })
}

export function upUserInfo(data) {
  return request({
    url: '/patient/updPatient',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function addRbp(data) {
  return request({
    url: '/patient/addRbp',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function addRhr(data) {
  return request({
    url: '/patient/addRhr',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function addBmi(data) {
  return request({
    url: '/patient/addBmi',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function addSbp(data) {
  return request({
    url: '/patient/addSbp',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function addWeight(data) {
  return request({
    url: '/patient/addWeight',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/patient/patientDetail',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 用药
export function addMed(data) {
  return request({
    url: '/patient/addMed',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function delMed(data) {
  return request({
    url: '/patient/delMed',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function updMed(data) {
  return request({
    url: '/patient/updMed',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 手术
export function addOperation(data) {
  return request({
    url: '/patient/addOperation',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 诊断
export function addDiagnose(data) {
  return request({
    url: '/patient/addDiagnose',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function deleteDiagnose(data) {
  return request({
    url: '/patient/deleteDiagnose',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

export function updateDiagnose(data) {
  return request({
    url: '/patient/updateDiagnose',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 标签
export function findCommonTag(data) {
  return request({
    url: '/suifang/findCommonTag',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 上传
export function uploadReport(data) {
  return request({
    url: '/patient/uploadReport',
    method: 'post',
    // dataType: 'JSON',
    data
  })
}

// 随访
export function addSuifang(data) {
  return request({
    url: '/suifang/addSuifang',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 随访
export function updateSuifang(data) {
  return request({
    url: '/suifang/updateSuifang',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 通用删除
export function delData(data, url) {
  return request({
    url,
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 发 问卷
export function addQuest(data) {
  return request({
    url: '/doctor/sendQuestionnaire',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 发 运动测试
export function addStTask(data) {
  return request({
    url: '/task/addStTask',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 获取 动态
export function getHealthMsg(data) {
  return request({
    url: '/doctor/getHealthMsg',
    method: 'get',
    params: data
  })
}

// 获取 运动记录
export function getSportRecord(data) {
  return request({
    url: '/sportRecord/page',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 获取 运动测试 列表
export function getListSportTest(data) {
  return request({
    url: '/sportTest/getListSportTest',
    method: 'get',
    params: data
  })
}

// 获取 运动测试 详情
export function getOneSportTest(data) {
  return request({
    url: '/sportTest/getOneSportTest',
    method: 'get',
    params: data
  })
}

// 获取 患者 问卷记录 列表
export function getQuestionRecord(data) {
  return request({
    url: '/patient/getQuestionRecord',
    method: 'post',
    data
  })
}

// 获取 患者 问卷记录 详情
export function getOneQuestion(data) {
  return request({
    url: '/question/getOneQuestion',
    method: 'post',
    data
  })
}

// 获取 患者 随访记录 列表
export function findSuifangList(data) {
  return request({
    url: '/suifang/findSuifangList',
    method: 'post',
    data
  })
}

// 获取 患者 随访记录 列表
export function getUsingSport(data) {
  return request({
    url: '/prescpt/getUsingSport',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 获取 患者 处方 详情
export function getOneSport(data) {
  return request({
    url: '/prescpt/getOneSport',
    method: 'post',
    dataType: 'JSON',
    data
  })
}

// 获取 患者 处方 详情
export function findRhr(data) {
  return request({
    url: '/patient/getRestHeart',
    method: 'get',
    params: data
  })
}

