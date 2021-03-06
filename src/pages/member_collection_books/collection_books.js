import 'vux/src/styles/reset.less';
import './collection_books.scss'
import {
  Badge,
  Group,
  Cell,
  Panel,
  XButton,
  Scroller,
  Spinner
} from 'vux'

import utils from 'js/utils.js'

import { cookie } from 'vux'

import { fetch, rap } from 'js/fetch.js'

let url = {
  getCollectionBook: 'api/book/collects',//收藏列表
  getCollectionNumber: 'api/book/collect/count',//收藏统计
  postCollectBook: 'api/books'
}

url = rap(url)
import Myhead from 'components/head/head.vue'
// import Slide from 'components/slide/slide.vue'
import Top from 'components/top/top.vue'
// import Search from 'components/search/search.vue'
import Foot from 'components/foot/foot.vue'
import Booklist from 'components/booklist/booklist.vue'

import mixin from 'js/mixin.js'
import { setTimeout } from 'timers';

new Vue({
  el: '#body',
  data: {
    token: '',
    count: 0,
    showList1: true,
    bookList: [],
    scrollTop: 0,
    onFetching: false,
    bottomCount: 20,
    n4: 10,
    demo4Value: {
      pullupStatus: 'default'
    },
    limit: 5,//取几个
    offset: 0,//从第几个开始取,
    stop: false//停止加载
  },
  created() {
    this.isLogin = utils.isLogin()
    //没有登录去登录
    if (!this.isLogin) {
      window.location.href = './login.html'
    } else {
      this.token = cookie.get('token')
      this.getCollectionNumber()
      this.getCollectionBook()
    }
  },
  methods: {
    load() {
      //子级触发父级加载数据事件

      //增加翻页标志
      this.offset += this.limit
      //请求数据
      this.getCollectionBook()
    },
    show(index) {
      if (this.listIndex > index) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.listIndex = index
    },
    getCollectionNumber() {
      //收藏统计
      fetch('get', `${url.getCollectionNumber}`, {}, { 'headers': this.token }).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.count = res.data.count

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
    getCollectionBook() {
      //收藏图书列表
      if (!!this.stop) {
        return
      }
      
      fetch('get', `${url.getCollectionBook}?limit=${this.limit}&offset=${this.offset}`, {}, { 'headers': this.token }).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.bookList = this.bookList.concat(res.data)
          if (res.data.length == 0) {
            //没有数据就停止懒加载
            this.stop = true
          }
          if (!!this.$refs.booklist) {
            //兼容报错
            this.$refs.booklist.load()
          }
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
    }
  },
  components: {
    Spinner,
    Badge,
    Group,
    Cell,
    Panel,
    XButton,
    Scroller,
    Cell,
    Booklist
  },
  mixins: [mixin]
})
