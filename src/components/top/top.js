import './top.scss'
import {fetch,rap} from 'js/fetch.js'
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
    this.getInfo()

    bus.$on('login', (user) => {
      this.isLogin = true
      this.mobile = user.mobile
    })
  },
  methods:{
    getInfo(){
      fetch(url.info).then( res => {
        let user = res.data.user
        this.mobile = user.mobile
        this.isLogin = true
        bus.$emit('login',user)
      })
    },
    logout() {
      fetch(url.logout).then( res => {
        this.isLogin = false
        this.mobile = ''
        bus.$emit('logout')
      })
    }
  }

}
