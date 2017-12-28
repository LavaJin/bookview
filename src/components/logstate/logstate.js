import './logstate.scss'
import { Message } from 'element-ui'
import { checkphone } from 'js/validate.js'
import user from 'js/userService.js'
import bus from 'js/bus.js'

export default {
  data() {
    return {
      name: '',
      username: '',
      headImage: '',
      isLogin: false,
      pwd: ''
    }
  },
  created() {
    bus.$on('logout',() => {
      this.isLogin = false
      this.name = ''
      this.username = ''
      // this.headImage = userInfo.headImage
      this.headImage = ''
      this.pwd = ''
    })

    bus.$on('login', (userInfo) => {
      this.isLogin = true
      this.name = userInfo.name
      this.username = userInfo.mobile
      // this.headImage = userInfo.headImage
      this.headImage = 'http://dummyimage.com/167x167/0bdf80' || require('./imgs/face-img2.jpg')
    })
  },
  methods: {
    getUserInfo() {
      user.getInfo().then( res => {
        this.isLogin = true
        let userInfo = res.data.user
        this.name = userInfo.name
        this.username = userInfo.mobile
        // this.headImage = userInfo.headImage
        this.headImage = 'http://dummyimage.com/167x167/0bdf80' || require('./imgs/face-img2.jpg')
        bus.$emit('login',userInfo)
      })
    },
    login() {
      if (!this.username) {
        Message('请输入手机号')
        return
      }
      if (!checkphone(this.username)) {
        Message('请输入正确的手机号')
        return
      }
      if (!this.pwd) {
        Message('请输入密码')
        return
      }
      user.login({
        username: this.username,
        pwd: this.pwd
      }).then( res => {
        this.getUserInfo()
      })
    }
  }
}


