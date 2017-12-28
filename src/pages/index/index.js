import 'vux/src/styles/reset.less';
import './index.scss'
import {Swiper, Scroller, Tab, TabItem, Sticky, Flexbox, FlexboxItem, ViewBox} from 'vux'

import {fetch, rap} from 'js/fetch.js'
let url = {
  list: '/merchandiseHot/list.do',
  slideList: '/slide/listSlides.do'
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
    bannerList: [{
      url: 'javascript:',
      img: '/static/banner.jpg',
    }, {
      url: 'javascript:',
      img: '/static/banner.jpg',
    }, {
      url: 'javascript:',
      img: '/static/banner.jpg',
      fallbackImg: 'https://static.vux.li/demo/3.jpg'
    }],
    listIndex: 0,
    transitionName:'slide-left'
  },
  created() {

  },
  methods: {
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
    Swiper,
    Scroller,
    Tab,
    TabItem,
    Sticky,
    Flexbox,
    FlexboxItem,
    ViewBox
  },
  mixins: [mixin]
})
