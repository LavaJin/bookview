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
  slideList: '/slide/listSlides.do'
}
url = rap(url)


import Booklist from 'components/booklist/booklist.vue'

import mixin from 'js/mixin.js'

new Vue({
  el: '#body',
  data: {
    showList1: true,
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
