import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    nickname: '@name',
    phone: /1[3578]\d{9}/,
    name: '@cname',
    'role|1': ['患者', '群主', '家属'],
    hospital: '@csentence',
    department: '@csentence',
    isLock: '@boolean',
    lockReason: '@csentence'
  }]
})

export default [
  {
    url: '/vue-admin-template/role/list',
    type: 'get',
    response: config => {
      const items = data.items
      return items
    }
  }
]
