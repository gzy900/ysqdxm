import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@increment',
    hospital: '@csentence',
    department: '@csentence',
    patient: '@cname',
    opsType: '@csentence',
    opsDate: '@datetime',
    serviceEndDate: '@datetime',
    insureName: '@csentence',
    fee: '@float(0)',
    doctor: '@cname',
    operator: '@cname',
    assistant: '@cname',
    createdAt: '@datetime'
  }]
})

export default [
  {
    url: '/vue-admin-template/finance/list',
    type: 'get',
    response: config => {
      const items = data.items
      return items
    }
  }
]
