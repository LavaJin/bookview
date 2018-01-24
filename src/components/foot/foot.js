import './foot.scss'

import { Tabbar, TabbarItem } from 'vux'

import { fetch, rap } from 'js/fetch.js'
import bus from 'js/bus.js'

import { cookie } from 'vux'
import utils from 'js/utils.js'

let url = {
  info: '/user/getUser.do',
  logout: '/user/logout.do'
}
url = rap(url)

export default {
  props: {
    index: {
      default: 1
    }
  },
  data() {
    return {
      mobile: '',
      isLogin: false
    }
  },
  created() {
    this.isLogin = utils.isLogin()
  },
  methods: {
    golink(where) {
      if (this.isLogin) {
        //已经登录就直接到我的主页
        window.location.href = './member.html'
      } else {
        //还没登录就去登录下
        window.location.href = './login.html'
      }
    }
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
