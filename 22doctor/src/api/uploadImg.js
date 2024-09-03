import request from '@/utils/request'
import el from 'element-ui/src/locale/lang/el'

export function myUploadImage(blobInfo, success, failure) {
  const formdata = new FormData()
  if (Object.prototype.toString.call(blobInfo) === '[object Array]') {
    blobInfo.forEach((item) => {
      formdata.append('files', item)
    })
  } else {
    formdata.set('files', blobInfo)
  }
  formdata.append('state', '3')

  return request({
    url: '/users/upload',
    method: 'post',
    data: formdata
  }).then(res => {
    success({ 'data': res.data.photos })
  }).catch(res => {
    failure(res)
  })
}
