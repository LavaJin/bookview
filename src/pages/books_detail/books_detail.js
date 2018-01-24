import 'vux/src/styles/reset.less';
import './books_detail.scss'
import 'vux/src/styles/1px.less';
import utils from 'js/utils.js'

import {
  Swiper,
  Scroller,
  Tab,
  TabItem,
  Sticky,
  Flexbox,
  FlexboxItem,
  ViewBox,
  Group,
  Cell,
  XButton
} from 'vux'

import { hostImg } from 'js/host-config'

import { fetch, rap } from 'js/fetch.js'
let url = {
  getBookDetail: 'api/books',
  slideList: '/slide/listSlides.do',
  aa: 'api/ads'
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
    transitionName: 'slide-left',
    categoriesList: [{ name: '详情' }, { name: '留言(100)' }],
    listIndex: 0,
    bookID: 0,
    bookInfo:{},
    isCollect:false//是否收藏

  },
  created() {
    this.bookID = utils.getQuery('id')
    this.getBookDetail()
  },
  methods: {
    show(index) {
      if (this.listIndex > index) {
        this.transitionName = 'slide-right'
      } else if (this.listIndex > index) {
        this.transitionName = 'slide-left'
      }
      this.listIndex = index
    },
    getBookDetail() {
      fetch('get', url.getBookDetail+'/'+this.bookID, {
      }).then(res => {

        if (res.status >= 200 && res.status <= 500) {
          res.data.cover=`${hostImg}${res.data.cover}`
          this.bookInfo=res.data

        }
      })
    }
  },
  components: {
    Cell,
    Group,
    Swiper,
    Scroller,
    Tab,
    TabItem,
    Sticky,
    Flexbox,
    FlexboxItem,
    ViewBox,
    XButton
  },
  mixins: [mixin]
})
