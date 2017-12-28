import './foot.scss'

import { Tabbar, TabbarItem } from 'vux'

import {fetch, rap} from 'js/fetch.js'
import bus from 'js/bus.js'

let url = {
  info: '/user/getUser.do',
  logout: '/user/logout.do'
}
url = rap(url)

export default {
  data() {
    return {
      mobile: '',
      isLogin: false
    }
  },
  created() {

  },
  methods: {

  },
  components: {
    Tabbar,
    TabbarItem
  }
}
