import './foot.scss'

import { Tabbar, TabbarItem, Badge } from 'vux'

import { fetch, rap } from 'js/fetch.js'
import bus from 'js/bus.js'

import { cookie } from 'vux'
import utils from 'js/utils.js'

let url = {
  info: '/user/getUser.do',
  logout: '/user/logout.do',
  stationLetter: 'api/messages/unread-count'
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
      isLogin: false,
      lerrerNumber: '0',
      token: '',
      timer: 10000
    }
  },
  created() {
    let _this = this;

    this.isLogin = utils.isLogin()
    //判断是否登录状态
    if (this.isLogin) {
      this.token = cookie.get('token')
      this.stationLetter()
      //如果登录就请求站内信
      setInterval(() => {
        this.stationLetter()
      }, this.timer)

    }
  },
  methods: {
    stationLetter() {
      fetch('get', `${url.stationLetter}`, {}, { 'headers': this.token }).then(res => {
        if (res.status >= 200 && res.status <= 300) {

          this.lerrerNumber = '' + res.data.unread_count
          window.localStorage.setItem('lerrerNumber',this.lerrerNumber)

        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'warn',
            onShow() {
              //console.log('Plugin: I\'m showing')
            },
            onHide() {
              //console.log('Plugin: I\'m hiding')
            }
          })
        }
      })
    },
    golink(e) {
      //点击站内信
      if (e.target.className.indexOf('vux-badge') != -1) {
        window.location.href = './message_list.html'
        return
      }

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
    TabbarItem,
    Badge
  }
}
