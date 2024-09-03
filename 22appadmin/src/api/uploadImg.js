import request from '@/utils/request'
import el from 'element-ui/src/locale/lang/el'

export function myUploadImage(blobInfo, success, failure) {
  let formdata = new FormData()
  console.log(blobInfo)
  formdata.set('files', blobInfo)
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
