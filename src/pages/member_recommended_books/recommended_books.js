import 'vux/src/styles/reset.less';
import './recommended_books.scss'
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
    lists: [
      {
        title: '婴儿画报2017年第三季度合订本',
        img: '/static/book.jpg',
        author: '作者金波',
        status: '已领取',
      }, {
        title: '婴儿画报2017年第三季度合订本',
        img: '/static/book.jpg',
        author: '作者金波',
        status: '已领取',
      },
      {
        title: '婴儿画报2017年第三季度合订本',
        img: '/static/book.jpg',
        author: '作者金波',
        status: '已领取',
      },
      {
        title: '婴儿画报2017年第三季度合订本',
        img: '/static/book.jpg',
        author: '作者金波',
        status: '已领取',
      },
      {
        title: '婴儿画报2017年第三季度合订本',
        img: '/static/book.jpg',
        author: '作者金波',
        status: '已领取',
      },
      {
        title: '婴儿画报2017年第三季度合订本',
        img: '/static/book.jpg',
        author: '作者金波',
        status: '已领取',
      },
    ],
    scrollTop: 0,
    onFetching: false,
    bottomCount: 20,
    n4: 10,
    demo4Value: {
      pullupStatus: 'default'
    }
  },
  created() {
    this.getRank()
  },
  methods: {
    getRank(){
      fetch('get', url.getRank, {type:'new_recommend'}).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          console.log(res.data)
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
