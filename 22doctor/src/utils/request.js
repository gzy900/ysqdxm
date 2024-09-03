import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { addData } from '@/api/record-index'
import { getToken } from '@/utils/auth'

const recordPathList = [
  {
    describe: '提交周报反馈',
    path: '/doctor_feedback/addDoctor_week_newspaper',
    type: '1'
  },
  {
    describe: '修改周报反馈',
    path: '/doctor_feedback/addDoctor_week_newspaper',
    type: '2'
  },
  {
    describe: '心律失常反馈',
    path: '/doctor_feedback/addDoctor_feedback',
    type: '3',
    paramName: 'type',
    param: '1'
  },
  {
    describe: '心律失常反馈修改',
    path: '/doctor_feedback/updDoctor_feedbackByTypeAndPrivateId',
    type: '4',
    paramName: 'type',
    param: '1'
  },
  {
    describe: '心脏负荷反馈',
    path: '/doctor_feedback/addDoctor_feedback',
    type: '5',
    paramName: 'type',
    param: '5'
  },
  {
    describe: '心脏负荷反馈修改',
    path: '/doctor_feedback/updDoctor_feedbackByTypeAndPrivateId',
    type: '6',
    paramName: 'type',
    param: '5'
  },
  {
    describe: '血压反馈',
    path: '/doctor_feedback/addDoctor_feedback',
    type: '7',
    paramName: 'type',
    param: '2'
  },
  {
    describe: '血压反馈修改',
    path: '/doctor_feedback/updDoctor_feedbackByTypeAndPrivateId',
    type: '8',
    paramName: 'type',
    param: '2'
  },
  {
    describe: 'BMI反馈',
    path: '/doctor_feedback/addDoctor_feedback',
    type: '9',
    paramName: 'type',
    param: '3'
  },
  {
    describe: 'BMI反馈修改',
    path: '/doctor_feedback/updDoctor_feedbackByTypeAndPrivateId',
    type: '10',
    paramName: 'type',
    param: '3'
  },
  {
    describe: '周报审核',
    path: '/doctor_feedback/checkDoctor_week_newspaper',
    type: '11'
  },
  {
    describe: '测量反馈审核',
    path: '/doctor_feedback/updDoctor_feedbackById',
    type: '12'
  }
  // {
  //   describe: '登录',
  //   path: '/doctor_users/login',
  //   type: '13'
  // },
  // {
  //   describe: '修改医生权限',
  //   path: '/doctor_feedback/addDoctor_week_newspaper',
  //   type: '16'
  // },
]

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // token
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }
    // console.log(config)

    const path = config.url.split(config.baseURL)
    if (path.length > 0) {
      for (let i = 0; i < recordPathList.length; i++) {
        if (recordPathList[i].path === path[0]) {
          if (!recordPathList[i].paramName || recordPathList[i].param === config.data[recordPathList[i].paramName].toString()) {
            addData({
              type: recordPathList[i].type,
              uuid: store.getters.userInfo.doctorId,
              name: store.getters.userInfo.username
            })
            break
          }
        }
      }
    }

    config.headers['distinction'] = 'web'

    if (config.method === 'post') {
      if (Object.prototype.toString.call(config.data) !== '[object FormData]') {
        const data = qs.parse(config.data)
        config.data = qs.stringify({
          ...data
        })
      }
    } else if (config.method === 'get') {
      config.params = {
        ...config.params
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    Message.error({
      message: '请求错误或服务器异常!请联系管理员！'
    })
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 100, it is judged as an error.
    if (parseInt(res.code) !== 100 && parseInt(res.code) !== 200) {
      // Message({
      //   message: res.msg || '服务器请求出错，请联系管理员！',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      if (res.code === '102') {
        return res
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('您已注销，您可以取消以停留在此页，或重新登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '请求超时，请联系管理员！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
