import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/push/getBroadcastRecord',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/push/addBroadcastRecord',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/push/updBroadcastRecordById',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request({
    url: '/push/delBroadcastRecordById',
    method: 'post',
    data
  })
}


export function examineData(data) {
  return request({
    url: '/push/sendBroadcast',
    method: 'post',
    data
  })
}
