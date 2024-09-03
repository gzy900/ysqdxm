
import request from '@/utils/request'

export function getOnDayOnlineTime(data) {
  return request({
    url: '/statistics/getOnDayOnlineTime',
    method: 'POST',
    data
  })
}

export function getOnceFeedbackTime(data) {
  return request({
    url: '/statistics/getOnceFeedbackTime',
    method: 'POST',
    data
  })
}

export function getFeedbackCount(data) {
  return request({
    url: '/statistics/getFeedbackCount',
    method: 'POST',
    data
  })
}

export function getFeedbackDelayed(data) {
  return request({
    url: '/statistics/getFeedbackDelayed',
    method: 'POST',
    data
  })
}
