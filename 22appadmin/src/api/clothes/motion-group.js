
import request from '@/utils/request-clothes'
import request1 from "@/utils/request-clothes";

export function getList(params) {
  return request({
    url: '/web/groups',
    method: 'GET',
    params
  })
}
export function addData(data) {
  return request({
    url: '/web/group',
    method: 'POST',
    data
  })
}

export function upData(data) {
  return request({
    url: '/web/group',
    method: 'PATCH',
    data
  })
}

export function delData(params) {
  return request1({
    url: `/web/group/${params.id}`,
    method: 'delete',
    params
  })
}
