import request from '@/utils/request'

export function getList(data) {
  return request({
    // url: 'https://health.mvheartcare.net/healthRecord/getFeedbackList',
    url: '/healthRecord/getFeedbackList',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request({
    url: '/healthRecord/updWcRecord',
    // url: 'https://health.mvheartcare.net/healthRecord/updWcRecord',
    method: 'post',
    data
  })
}

export function upStatus(data) {
  return request({
    url: '/healthRecord/updWcFeedbackState',
    // url: 'https://health.mvheartcare.net/healthRecord/updWcFeedbackState',
    method: 'post',
    data
  })
}
export function upLock(data) {
  return request({
    url: '/healthRecord/updWcLockState',
    // url: 'https://health.mvheartcare.net/healthRecord/updWcLockState',
    method: 'post',
    data
  })
}
export function getLockState(data) {
  return request({
    url: '/healthRecord/getLockState',
    // url: 'https://health.mvheartcare.net/healthRecord/getLockState',
    method: 'post',
    data
  })
}
