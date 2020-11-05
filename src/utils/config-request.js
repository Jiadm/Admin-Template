/**
 * 调用config系统的request
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import {getServerConfig} from '@/utils/get-server-config'

// export async function getApiRoots() {
//   const apis =  getServerConfig('./Setting/config.json').then(res => { return res }).catch(err => { return {} })
//   return apis.configAPI
// }

// const baseService= {
//   baseURL: getApiRoots(),//'http://192.168.7.11:9000', // config api根目录
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 90000 // request timeout
// }
// const service = axios.create(baseService)

// create an axios instance
const service = axios.create({
  baseURL: 'http://192.168.7.11:9000', // config api根目录
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 90000 // request timeout
})




// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      config.headers['token'] = getToken()
    }
    //config.headers['Access-Control-Allow-Origin']='*'
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
    if (res.code !== 20000) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      // return Promise.reject(new Error(res.message || 'Error'))
      return res;
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
