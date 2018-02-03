import 'vux/src/styles/reset.less';
import './borrow_bank.scss'
import {
  Badge,
  Group,
  Cell,
  Panel,
  XButton,
  Scroller,
  Spinner
} from 'vux'

import {fetch, rap} from 'js/fetch.js'
let url = {
  list: '/merchandiseHot/list.do',
  slideList: '/slide/listSlides.do',
  getRank:'api/books'
}
url = rap(url)


import Booklist from 'components/booklist/booklist.vue'

import mixin from 'js/mixin.js'

new Vue({
  el: '#body',
  data: {
    token:'',
    showList1: true,
    bookList:[],
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
    this.getRank()
  },
  methods: {
    load() {
      //子级触发父级加载数据事件

      //增加翻页标志
      this.offset += this.limit
      //请求数据
      this.getRank()
    },
    getRank(){ 
      //获取图书排名
      if (!!this.stop) {
        return
      }
      fetch('get', `${url.getRank}?limit=${this.limit}&offset=${this.offset}`, {type:'borrow'}).then(res => {
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
    Booklist
  },
  mixins: [mixin]
})
