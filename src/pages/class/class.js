import 'vux/src/styles/reset.less';
import './class.scss'
import {Swiper, Scroller, Tab, TabItem, Sticky, Flexbox, FlexboxItem, ViewBox} from 'vux'

import { hostImg } from 'js/host-config'
import { fetch, rap } from 'js/fetch.js'

let url = {
  getCategories: 'api/book/categories',
  getBooks: 'api/books'
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
    categoriesList: [],
    bookList:[],
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
    transitionName: 'slide-left',
    mylist:[] //临时存放
  },
  created() {
    this.getCategories()
  },
  methods: {
    goDetail(id){
      window.location.href=`./books_detail.html?id=${id}`
    },
    getCategories() {
      //获取首页一级栏目
      let _this = this
      fetch('get', url.getCategories, {
        params: {
          pid: 0,
        }
      }).then(res => {
        if (res.status >= 200 && res.status <= 500) {
          this.categoriesList = res.data
          //console.log(res)
          res.data.forEach(function (item, index) {
            //console.log(item)
            //axios.all([this({ id: item.id }), getUserPermissions()])
            //  .then(axios.spread(function (acct, perms) {
                // Both requests are now complete
            //  }));
            _this.getbook({ category_id: item.id })
          })
        }
      })
    },
    getbook(config = null) {
      //获取图书
      let _this = this
      fetch('get', url.getBooks, {
        params: config
      }).then(res => {
        //this.bookList.psuh(res.data)
        if (res.status >= 200 && res.status <= 500) {
          //this.categoriesList = res.data
          res.data.forEach((item,index)=>{
            item.cover=`${hostImg}${item.cover}`
          })
          _this.mylist[config.category_id-1]=res.data
          _this.$set(_this, 'bookList', _this.mylist);
        }

      })
    },
    show(index){
      let lis = document.querySelectorAll('.bookClass li');
      [].forEach.call(lis, function (item, i) {
        item.className = ''
      })
      lis[index].className = 'selected'

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
