import { fetch, rap } from 'js/fetch.js'

let url = {
  list: '/cart/list.do',
  add: '/cart/add.do',
  reduce: '/cart/reduce.do',
  remove: '/cart/remove.do',
  update: '/cart/update.do'
}
url = rap(url)

class cart {

  static list(data) {
    return fetch(url.list, data)
  }

  static add(data) {
    return fetch(url.add, data)
  }

  static reduce(data) {
    return fetch(url.reduce, data)
  }

  static update(data) {
    return fetch(url.update,data)
  }

  static remove(data) {
    return fetch(url.remove, data)
  }

}

export default cart
