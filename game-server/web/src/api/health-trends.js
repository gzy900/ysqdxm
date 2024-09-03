import request from '../utils/request'

export function getList(data) {
  return request({
    url: '/app/ecg/selShortDataById',
    method: 'POST',
    data
  })
}
