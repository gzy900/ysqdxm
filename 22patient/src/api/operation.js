import request from '@/utils/request'

export function addData(data) {
  return request({
    url: '/op_record/addOpRecord',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/op_record/opRecordList',
    method: 'get',
    params: data
  })
}
