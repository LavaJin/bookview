import axios from 'axios'

import qs from 'qs'

import { cookie } from 'vux'

let host = require('./host-config.js').host

// 开发环节，所有接口走rap数据
function rap(urlList) {
  let obj = {}
  Object.keys(urlList).forEach(key => {
    obj[key] = host + urlList[key]
  })
  return obj
}




function fetch(type = 'get', url, data) {
  return new Promise((resolve, reject) => {

    //alert(cookie.get('token'))
    // if (cookie.get('token')) {
    //   axios.defaults.headers.common = {
    //     "Accept": "application/json",
    //     "Authorization": cookie.get('token')
    //   }
    // }

    axios.defaults.validateStatus = function (status) {
      return status >= 200 && status <= 500; //默认
    }

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
          //alert(1)
          resolve(response)
        }).catch((error) => {
          alert(error.message)
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
