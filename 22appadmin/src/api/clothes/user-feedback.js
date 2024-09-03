import request1 from '@/utils/request-clothes'

export function getList(data) {
  return request1({
    url: '/common/tips',
    // url: 'http://47.103.86.8:8083/person/feedback',
    method: 'get',
    params: {
      pageNum: 10,
      pageSize: 1
    }
  })
}
export function getVersion(data) {
  return request1({
    url: '/version/last',
    method: 'get',
    params: {
      pageNum: 10,
      pageSize: 1
    }
  })
}

export function getList1(data) {
  return request1({
    url: 'https://shuziliaofa.maillife.cn/dictionary/getBgm',
    method: 'get',
  })
}

export function getList2(data) {
  return request1({
    url: 'https://app.maillife.cn/private_doctors/selPrivate_doctorsByType',
    method: 'post',
    data: {
      pageNo: 1,
      number: 10,
      pd_type: null
    }
  })
}

