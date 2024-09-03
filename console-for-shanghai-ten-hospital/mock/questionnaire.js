import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@increment',
    'type|1': ['测量', '检查', '回访'],
    name: '@csentence',
    createdAt: '@datetime'
  }]
})

export default [
  {
    url: '/vue-admin-template/questionnaire/list',
    type: 'get',
    response: config => {
      const items = data.items
      return items
    }
  }
]
