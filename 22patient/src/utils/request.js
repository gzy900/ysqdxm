import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import qs from 'qs'
import { getToken } from '@/utils/auth'
import { addData } from '@/api/operation'

const recordPathList = [
  {
    describe: '新增患者',
    path: '/patient/addPatient',
    type: '1',
    paramName: ''

  },
  {
    describe: '修改患者基线数据',
    path: '/patient/updPatient',
    type: '2',
    paramName: ''
  },
  {
    describe: '新增手术',
    path: '/surgery/add',
    type: '3',
    paramName: 'type',
    param: '1'
  },
  {
    describe: '修改手术信息',
    path: '/surgery/upd',
    type: '4',
    paramName: 'type',
    param: '1'
  },
  {
    describe: '新增主动随访',
    path: '/sf_record/add',
    type: '5',
    paramName: 'type',
    param: '5'
  },
  {
    describe: '更新随访内容',
    path: '/sf_record/upd',
    type: '6',
    paramName: 'type',
    param: '5'
  }
]

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }

    const path = config.url.split(config.baseURL)
    if (path.length > 0) {
      for (let i = 0; i < recordPathList.length; i++) {
        if (recordPathList[i].path === path[0]) {
          addData({
            doctorId: store.getters.doctorId,
            doctorName: store.getters.name,
            recordContext: recordPathList[i].describe,
            recordId: '1',
            remark: '无'
          })
          break
        }
      }
    }

    config.headers['Authorization'] = getToken()

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
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '200') {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
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
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
