import request from '../utils/request'

export function getInfo(data) {
  return request({
    url: 'https://baoxinyi.mvheartcare.net/app/ecg/selLongDataByLid',
    method: 'POST',
    data
  })
}
