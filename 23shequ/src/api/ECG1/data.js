import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/heartData/page`,
    method: 'post',
    data,
    dataType: 'json'
  })
}
