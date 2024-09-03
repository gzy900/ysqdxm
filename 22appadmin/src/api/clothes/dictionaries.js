import request1 from '@/utils/request-clothes'

export function getList(params) {
  return request1({
    url: `/dic/children/${params.id}`,
    method: 'get',
    params
  })
}
export function getOption(params) {
  return request1({
    url: `/dic/child/${params.did}`,
    method: 'get',
    params
  })
}

export function addData(data) {
  return request1({
    url: '/dic/add',
    method: 'post',
    data
  })
}

export function upData(data) {
  return request1({
    url: '/dic/upd',
    method: 'PATCH',
    data
  })
}

export function delData(params) {
  return request1({
    url: `/dic/${params.id}`,
    method: 'delete',
    params
  })
}

