//

import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/doctor_patient/getDoctor_patient_BMI',
    method: 'post',
    data
  })
}
