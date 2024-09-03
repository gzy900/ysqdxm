import request from '@/utils/request-clothes'

export function addData(data) {
  return request({
    url: 'https://dp.mvheartcare.net/api/content',
    method: 'POST',
    dataType: 'formData',
    data
  })
}
