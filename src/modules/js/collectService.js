import { fetch, rap } from 'js/fetch.js'

let url = {
  add: '/collect/add.do',
  cancel: '/collect/cancel.do',
  lists: '/collect/lists.do'
}
url = rap(url)

class collect {

  static add(data) {
    return fetch(url.add, data)
  }

  static cancel(data) {
    return fetch(url.cancel, data)
  }

  static lists(data) {
    return fetch(url.lists, data)
  }
}

export default collect
