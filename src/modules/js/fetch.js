import axios from 'axios'

import qs from 'qs'

import { cookie } from 'vux'
//require('es6-promise').polyfill();

let host = require('./host-config.js').host

// 开发环节，所有接口走rap数据
function rap(urlList) {
  let obj = {}
  Object.keys(urlList).forEach(key => {
    obj[key] = host + urlList[key]
  })
  return obj
}

axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; //默认
}

function fetch(type = 'get', url, data, config) {
  return new Promise((resolve, reject) => {
    //console.log(config)
    //console.log(typeof (config))
    
    if (typeof (config) == 'undefined') {

    } else {
      axios.defaults.headers.common['Accept'] = 'application/json';
      axios.defaults.headers.common['Authorization'] = config.headers;
    }

    // 超时时间
    //axios.defaults.timeout = 5000
    // http请求拦截器
    var loadinginstace

    // http请求拦截器
    // axios.interceptors.request.use((config) => {
    //   return config
    // }, error => {
    //   return Promise.reject(error)
    // }) 

    axios.interceptors.response.use(data => {// 响应成功关闭loading
      
      if(data.status=='401'){
        //401未登录
        cookie.remove('token')
        window.location.href='./login.html'
      }
      return data
      }, error => {
        //console.log(error.status)
        //console.log(error.data)
        //console.log(error.response)
      return Promise.reject(error)
      })
    switch (type) {
      case 'get':
        axios.get(url, { params: data }).then((response) => {
          resolve(response)
        }).catch((error) => {
          console.log(error)
          reject({
            status: -1,
            message: '系统错误，请稍后重试'
          })
        })
        break;
      case 'post':
        axios.post(url, qs.stringify(data)).then((response) => {
          resolve(response)
        }).catch((error) => {
          alert(error.message)
          //console.log(error)
          reject({
            status: -1,
            message: '系统错误，请稍后重试'
          })
        })
        break;
      case 'delete':

        axios.delete(url, { params: data }).then((response) => {
          resolve(response)
        }).catch((error) => {
          console.log(error)
          reject({
            status: -1,
            message: '系统错误，请稍后重试'
          })
        })
        break;
      default:
    }
    //let newConfig=Object.assign(defaultConfig,config)
    //console.log(newConfig)
    //console.log('--')
    // axios[type](url, data, {}).then((response) => {
    //   resolve(response)
    // }).catch((error) => {
    //   alert('erroe')
    //   console.log(error)
    //   reject({
    //     status: -1,
    //     message: '系统错误，请稍后重试'
    //   })
    // })
  })
}
export {
  rap,
  fetch
}
