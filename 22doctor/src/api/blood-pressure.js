//

import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/doctor_patient/getDoctor_patient_BP',
    method: 'post',
    data
  })
}
