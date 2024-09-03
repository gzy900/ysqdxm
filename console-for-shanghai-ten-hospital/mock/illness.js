import Mock from 'mockjs'

const mock = [{
  'id|1': '@increment',
  code: '@integer(6)',
  name: '@cname',
  ops_date: '@date',
  ops_type: {
    id: '@increment',
    name: '@cname'
  },
  department: {
    id: '@increment',
    name: '@cname',
    hospital: '@cname'
  },
  master: {
    id: '@increment',
    users: {
      realname: '@cname'
    }
  },
  apprentice: {
    id: 1,
    users: {
      realname: '@cname'
    }
  },
  device: {
    sn: '@guid'
  },
  prove: null,
  service_date: 100,
  service_status: 1, // 服务状态 '1' - 未开始 '2' - 进行中 '3'- 已结束
  insure: true, // 是否医保
  age: 22, // 年龄
  gender: 1, // 性别  '1' - 未知 '2' - 男 '3' - 女
  patient_name: '张三', // 保单人姓名
  created: '2020-04-19T22:02:35.897693', // 创建时间
  ID: Mock.Random.id(),
  member_count: 1, // 群成员数量,
  ill_template: 1
}]

const total = 120
function generate(count) {
  return Mock.mock({
    [`items|${count}`]: mock
  })
}
const data = generate(total).items

export default [
  {
    url: '/pc/admin/v1/illness/',
    type: 'get',
    response: config => {
      const { page, limit, sn, search } = config.query // 分页 page=当前页 limit=每页显示条数
      if (sn) {
        const items = data.filter((item) => item.sn === sn)
        return {
          count: items.length,
          data: items
        }
      }
      if (search) {
        const items = data.filter((item) => (item.sn === search || item.id === search / 1))
        return {
          count: items.length,
          data: items
        }
      }
      const items = data.slice((page - 1) * limit, page * limit) // 通过page, limit来控制返回的数据
      return {
        count: total,
        data: items
      }
    }
  },
  {
    url: '/pc/admin/v1/illness/',
    type: 'post',
    response(config) {
      return {
        data: {}
      }
    }
  },
  {
    url: '/pc/admin/v1/illness/',
    type: 'put',
    response(config) {
      return {
        data: {}
      }
    }
  },
  {
    url: '/pc/admin/v1/illness/',
    type: 'delete',
    response(config) {
      return {
        data: {}
      }
    }
  }
]
