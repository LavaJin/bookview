import { fetch, rap } from 'js/fetch.js'

let url = {
  list: '/address/lists.do',
  add: '/address/add.do',
  update: '/address/update.do',
  delete: '/address/delete.do',
  setDefault: '/address/setDefault.do',
  province: '/province/list.do',
  city: '/city/list.do',
  district: '/district/list.do'
}
url = rap(url)

class address {

  static list(data) {
    return fetch(url.list, data)
  }

  static add(data) {
    return fetch(url.add, data)
  }

  static update(data) {
    return fetch(url.update, data)
  }

  static delete(data) {
    return fetch(url.delete, data)
  }

  static setDefault(data) {
    return fetch(url.setDefault, data)
  }

  static province() {
    return fetch(url.province)
  }

  static city(data) {
    return fetch(url.city, data)
  }

  static district(data) {
    return fetch(url.district, data)
  }
}

export default address
