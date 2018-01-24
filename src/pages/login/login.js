import 'vux/src/styles/reset.less';
import './login.scss'
import {
  Swiper,
  Scroller,
  Tab,
  TabItem,
  Sticky,
  Flexbox,
  FlexboxItem,
  XInput,
  Group,
  XButton,
  Cell,
  CheckIcon,
  PopupPicker,
  XAddress,
  ChinaAddressV4Data,
  Datetime,
  ToastPlugin
} from 'vux'

import Myhead from 'components/head/head.vue'
// import Slide from 'components/slide/slide.vue'
import Top from 'components/top/top.vue'
// import Search from 'components/search/search.vue'
import Foot from 'components/foot/foot.vue'

import { cookie } from 'vux'

Vue.use(ToastPlugin)

import { checkphone } from 'js/validate.js'

import { fetch, rap } from 'js/fetch.js'
let url = {
  postLogin: 'api/login',
  //slideList: '/slide/listSlides.do'
}
url = rap(url)

import mixin from 'js/mixin.js'

new Vue({
  el: '#body',
  data: {
    tel: '',
    passWord: '',
    demo2: true,
    value1: [],
    list1: [['站点1', '站点2', '站点3']],
    address: [],
    addressData: ChinaAddressV4Data,
    value2: '',
    isCheckTel: false,
    isCheckPW: false,
  },
  computed: {
    isDisabled() {
      if (this.isCheckTel === true && this.isCheckPW === true&&this.passWord!==''&&this.tel) {
        return false
      } else {
        return true
      }
    }
  },
  created() {

  },
  methods: {
    checkTel(value) {
      this.isCheckTel = checkphone(value)
      return {
        valid: this.isCheckTel,
        msg: '请输入合格的手机号'
      }
    },
    checkPW(value) {
      this.isCheckPW = value.length >= 6 && value.length <= 12 ? true : false
      return {
        valid: this.isCheckPW,
        msg: '密码应该6-12位'
      }
    },
    login() {
      //用户登录
      fetch('post', url.postLogin, {
        phone: this.tel,
        password: this.passWord
      }).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          cookie.set('token', res.data.token)
          this.$vux.toast.show({
            text: '登录成功',
            type: 'success',
            onShow() {
              //console.log('Plugin: I\'m showing')
            },
            onHide() {
              window.location.href='./member.html'
              //console.log('Plugin: I\'m hiding')
            }
          })
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
    show(index) {
      if (this.listIndex > index) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.listIndex = index
    },
    onShow() {

    },
    onHide() {

    },
    onChange() {

    }
  },
  components: {
    Swiper,
    Scroller,
    Tab,
    TabItem,
    Sticky,
    Flexbox,
    FlexboxItem,
    XInput,
    Group,
    XButton,
    Cell,
    CheckIcon,
    PopupPicker,
    XAddress,
    Datetime
  },
  mixins: [mixin]
})
