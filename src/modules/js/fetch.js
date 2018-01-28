import axios from 'axios'

let host = require('./host-config.js').host

// 开发环节，所有接口走rap数据
function rap(urlList) {
  let obj = {}
  Object.keys(urlList).forEach(key => {
    obj[key] = host + urlList[key]
  })
  return obj
}


function fetch(type = 'get', url, data = null, config = null) {
  return new Promise((resolve, reject) => {
   // let defaultConfig = {
   //   headers: { 'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd3d3LjVjaGVsaWIuY29tL2FwaS9sb2dpbiIsImlhdCI6MTUxNjQ1NzYwNSwiZXhwIjoxNTE3MDYyNDA1LCJuYmYiOjE1MTY0NTc2MDUsImp0aSI6Inp6dVFYTkpweG9EOUR4UnYiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.3hoGEMUH4qbSMiGSMa9CBgbAgM1KoAM_AbtE2RYKQXw' }
   // }

    if(type=='post'&&data.headers){
      axios.defaults.headers.common['Authorization'] = data.headers.Authorization;
    }
   
    //axios.defaults.headers={ 'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd3d3LjVjaGVsaWIuY29tL2FwaS9sb2dpbiIsImlhdCI6MTUxNjQ1NzYwNSwiZXhwIjoxNTE3MDYyNDA1LCJuYmYiOjE1MTY0NTc2MDUsImp0aSI6Inp6dVFYTkpweG9EOUR4UnYiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.3hoGEMUH4qbSMiGSMa9CBgbAgM1KoAM_AbtE2RYKQXw' }
    axios.defaults.validateStatus = function (status) {
      return status >= 200 && status <= 500; //默认
    }
   //let newConfig=Object.assign(defaultConfig,config)
    //console.log(newConfig)
    axios[type](url, data,{}).then((response) => {
      resolve(response)
    }).catch((error) => {
      console.log(error)
      reject({
        status: -1,
        message: '系统错误，请稍后重试'
      })
    })
  })
}


export {
  rap,
  fetch
}
