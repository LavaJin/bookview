import 'vux/src/styles/reset.less';
import './member.scss'
import {
  Badge,
  Group,
  Cell,
  ToastPlugin,
  ConfirmPlugin
} from 'vux'
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

import utils from 'js/utils.js'

import { cookie } from 'vux'

import { fetch, rap } from 'js/fetch.js'

let url = {
  postLogout: 'api/logout',
  getUserInfo: 'api/user/info'
}

url = rap(url)
import Myhead from 'components/head/head.vue'
// import Slide from 'components/slide/slide.vue'
import Top from 'components/top/top.vue'
// import Search from 'components/search/search.vue'
import Foot from 'components/foot/foot.vue'

import mixin from 'js/mixin.js'

new Vue({
  el: '#body',
  data: {
    demo2: true,
    isLogin: false,
    token: '',
    userInfo: ''
  },
  created() {
    this.isLogin = utils.isLogin()
    //没有登录去登录
    if (!this.isLogin) {
      window.location.href = './login.html'
    } else {
      this.token = cookie.get('token')
      this.getUserInfo()
    }
  },
  methods: {
    logout() {
      let _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        title: '退出',
        content: '您确定要执行退出操作吗？',
        onConfirm() {
          //登出
          fetch('get', url.getUserInfo, { null: null, headers: { 'Authorization': _this.token } }).then(res => {
            if (res.status >= 200 && res.status <= 300) {
              cookie.remove('token')
              window.location.href = './index.html'
            } else {
              _this.$vux.toast.show({
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

        }
      })

    },
    getUserInfo() {
      //获取用户信息
      fetch('get', url.getUserInfo, { null: null, headers: { 'Authorization': this.token } }).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.userInfo = res.data
        } else if(res.status ==401){
          cookie.remove('token')
          window.location.href='./login.html'
        }else {
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
    show(index) {
      if (this.listIndex > index) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.listIndex = index
    }
  },
  components: {
    Badge,
    Group,
    Cell,
  },
  mixins: [mixin]
})
