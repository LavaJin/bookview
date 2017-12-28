import './head.scss'

import {XHeader, Search} from 'vux'

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
    //显示搜索框
    showSearch(){

    }
  },
  components: {
    XHeader,
    Search
  }
}
