import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: '/action/uploadFile',
    method: 'post',
    data
  })
}
