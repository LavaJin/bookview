import 'vux/src/styles/reset.less';
import './collection_books.scss'
import {
  Badge,
  Group,
  Cell,
  Panel,
  XButton,
  Scroller,
  Spinner,
} from 'vux'

import utils from 'js/utils.js'

import { cookie } from 'vux'

import { fetch, rap } from 'js/fetch.js'

let url = {
  getCollectionBook: 'api/book/collects',//收藏列表
  getCollectionNumber: 'api/book/collect/count',//收藏统计
  postCollectBook:'api/books'
}

url = rap(url)
import Myhead from 'components/head/head.vue'
// import Slide from 'components/slide/slide.vue'
import Top from 'components/top/top.vue'
// import Search from 'components/search/search.vue'
import Foot from 'components/foot/foot.vue'
import Booklist from 'components/booklist/booklist.vue'

import mixin from 'js/mixin.js'

new Vue({
  el: '#body',
  data: {
    token:'',
    count:0,
    showList1: true,
    bookList: [],
    scrollTop: 0,
    onFetching: false,
    bottomCount: 20,
    n4: 10,
    demo4Value: {
      pullupStatus: 'default'
    }
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
    load4 () {
      this.demo4Value.pullupStatus = 'up'
      setTimeout(() => {
        this.lists.push({
          title: '婴儿画报2017年第三季度合订本',
          img: '/static/book.jpg',
          author: '作者金波',
          status: '已领取',
        })
        setTimeout(() => {
          this.demo4Value.pullupStatus = 'default'
          this.$nextTick(() => {
            this.$refs.scroller.reset()
          })
        }, 10)
      }, 2000)
    },
    show(index){
      if (this.listIndex > index) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.listIndex = index
    },
    getCollectionNumber(){
      //收藏统计
      fetch('get', url.getCollectionNumber, { null: null, headers: { 'Authorization': this.token } }).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.count=res.data.count
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
    getCollectionBook(){
      //收藏图书列表
      fetch('get', url.getCollectionBook, { null: null, headers: { 'Authorization': this.token } }).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.bookList=res.data
          // res.data=[{
          //     "id":1,//收藏id
          //     "name":"拍黄片",//图书名称
          //     "cover":"book/gRWexYxbrJBe7C1iOjmx8L7cshWVvaM88qLtdrmr.jpeg",//图书封面
          //     "author":"huhao",//作者
          //     "borrow_count":0,//借阅统计
          //     "detail":"<p>二月也<br/></p>"//图书详情
          //   }
          // ]
          //mock
          this.$set(this, 'bookList', res.data);
          //console.log(this.bookList)

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
