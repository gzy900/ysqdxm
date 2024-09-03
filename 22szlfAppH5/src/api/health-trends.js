import request from '../utils/request'

export function getList(data, url) {
  return request({
    url,
    method: 'POST',
    data
  })
}
