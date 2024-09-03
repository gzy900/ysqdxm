import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/pc/admin/v1/pcLogin/',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return {
    data: {}
  }
}

export function getInfo(token) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        data: {
          name: '默认用户',
          avatar: 'https://cdn.mp.txtkeji.com/txt/pictures/logo.png',
          roles: ['ADMIN']
        }
      }
      resolve(data)
    }, 1000)
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
