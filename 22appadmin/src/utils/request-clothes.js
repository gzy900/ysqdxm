import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { deepClone } from "@/utils/index";

// create an axios instance
const service_clothes = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_Clothes, // url = base url + request url
  // baseURL: '/api', // url = base url + request url
  // withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000, // request timeout

})

// request interceptor
service_clothes.interceptors.request.use(
  config => {
    // do something before request is sent

    // token
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }
    config.headers['Authorization'] = 'test'
    if (config.dataType === 'formData') {
      if (Object.prototype.toString.call(config.params) !== '[object FormData]') {
        const data = qs.parse(config.data)
        config.data = qs.stringify({
          ...data
        })
      }
    }
    console.log(config)
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
service_clothes.interceptors.response.use(
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

    // code为0 为正常返回。 临时使用。
    if (res.code === 0) {
      return res
    }
    if (parseInt(res.code) !== 200) {
      Message({
        message: res.msg || '服务器请求出错，请联系管理员！',
        type: 'error',
        duration: 5 * 1000
      })

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

export default service_clothes
