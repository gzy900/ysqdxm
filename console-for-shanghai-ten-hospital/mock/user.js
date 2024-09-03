
const tokens = {
  doctor: {
    token: 'doctor-token'
  },
  assistant: {
    token: 'assistant-token'
  }
}

const users = {
  'doctor-token': {
    roles: ['doctor'],
    introduction: 'I am a super doctoristrator',
    avatar: 'https://cdn.mp.txtkeji.com/txt/pictures/logo.png',
    name: 'Super Admin'
  },
  'assistant-token': {
    roles: ['assistant'],
    introduction: 'I am an editor',
    avatar: 'https://cdn.mp.txtkeji.com/txt/pictures/logo.png',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/pc/users/v1/pcLogin/',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          error: 'Account and password are incorrect.'
        }
      }

      return {
        data: {
          access: token,
          user_id: 5,
          roles: 'doctor'
        }
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        data: 'success'
      }
    }
  }
]
