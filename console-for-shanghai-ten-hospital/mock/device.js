import Mock from 'mockjs'

const total = 120
function generate(count) {
  return Mock.mock({
    [`items|${count}`]: [{
      id: '@increment',
      sn: '@guid',
      type: 1,
      'is_enable|1': '@boolean',
      created: '@datetime',
      updated: '@datetime',
      image: 'https://cdn.pongj.com/pongj/pictures/xueyaji.jpg'
    }]
  })
}
const data = generate(total).items

export default [
  {
    url: '/pc/admin/v1/device/',
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
    url: '/pc/admin/v1/device/',
    type: 'post',
    response(config) {
      return {
        data: {}
      }
    }
  },
  {
    url: '/pc/admin/v1/device/',
    type: 'put',
    response(config) {
      return {
        data: {}
      }
    }
  },
  {
    url: '/pc/admin/v1/device/',
    type: 'delete',
    response(config) {
      return {
        data: {}
      }
    }
  }
]
