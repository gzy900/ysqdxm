import axios from 'axios'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: 'https://baoxinyi.mvheartcare.net/',
  // baseURL: 'http://192.168.10.69/',
  // baseURL: 'https://app.maillife.cn/',
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['distinction'] = '0'
    if (config.method === 'post') {
      if (Object.prototype.toString.call(config.data) !== '[object FormData]') {
        const data = qs.parse(config.data)
        if (data.token && data.token.length > 0){
          config.headers['token'] = data.token
        }
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
    // if the custom code is not 100, it is judged as an error.
    let code = parseInt(res.code)
    if (code !== 100) {

      if (code === 102) {
        console.log(res);
      }
      return res
    } else {
      return res
    }
  },
  error => {
    // alert('请求错误')
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
