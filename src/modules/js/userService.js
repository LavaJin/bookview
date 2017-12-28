import {fetch,rap} from 'js/fetch.js'

let url = {
  info: '/user/getUser.do',
  logout: '/user/logout.do',
  login : '/user/login.do',
  headImg: '/personal/headImg.do',
  code: '/feedback/code.do'
}
url = rap(url)

class user {
  static login(data) {
    return fetch(url.login,data)
  }

  static getInfo() {
    return fetch(url.info)
  }

  static logout() {
    return fetch(url.logout)
  }

  static headImg(data) {
    return fetch(url.headImg,data)
  }

  static code() {
    return fetch(url.code)
  }

}

export default user
