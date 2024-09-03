import request from '../utils/request'

export function getInfo(data) {
  return request({
    url: 'http://192.168.10.97:8088/app/ecg/selLongDataByLid',
    method: 'POST',
    data
  })
}
