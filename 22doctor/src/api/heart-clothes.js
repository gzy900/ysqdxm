//

import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'https://baoxinyi.mvheartcare.net/app/ecg/getLongDataWeb',
    method: 'post',
    data
  })
}
// url: 'http://192.168.10.97:8088/app/ecg/selLongDataByLid',

export function getInfo(data, callback) {
  return request({
    url: 'https://baoxinyi.mvheartcare.net/app/ecg/selLongDataByLid',
    method: 'post',
    data,
    onDownloadProgress: callback
  })
}

export function upload(data) {
  return request({
    url: 'https://baoxinyi.mvheartcare.net/app/ecg/updLongDataByLid',
    method: 'post',
    data
  })
}
