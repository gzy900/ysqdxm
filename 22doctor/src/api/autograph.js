import request from '@/utils/request'

export function editData(data) {
  return request({
    url: '/doctor_users/updSignByDoctorId',
    method: 'post',
    data
  })
}
