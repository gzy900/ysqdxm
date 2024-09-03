import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from "@/router";
import qs from 'qs'
import { getToken, removeToken } from '@/utils/auth'

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

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }

    console.log(config)
    if (config.url !== '/doctor/loginByPwd' && config.url !== '/web/user/login') {
      const loginAgeing = localStorage.getItem('loginAgeing')
      if (!!loginAgeing && loginAgeing.length > 0) {
        if (new Date().getTime() - parseInt(loginAgeing) > 1000 * 60 * 10) {
          // removeToken()
          // router.push({ path: '/login' })
          // return
          MessageBox.confirm('登录状态过期，请重新登录！', '会话过期', {
            confirmButtonText: '去登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }
      }
    }

    config.headers['Authorization'] = getToken()
    config.headers['web'] = 'web'
    // config.headers['Content-Type'] = 'application/json'

    if (config.method === 'post') {
      if (Object.prototype.toString.call(config.data) !== '[object FormData]' && config.dataType !== 'JSON') {
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
