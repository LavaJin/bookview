import 'vux/src/styles/reset.less';
import './searchlist.scss'
import {Swiper, Scroller, Tab, TabItem, Sticky, Flexbox, FlexboxItem, ViewBox} from 'vux'

import { hostImg } from 'js/host-config'
import { fetch, rap } from 'js/fetch.js'

import utils from 'js/utils.js'

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

import Booklist from 'components/booklist/booklist.vue'

import mixin from 'js/mixin.js'

new Vue({
  el: '#body',
  data: {
    type:'classlist',
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
    mylist:[], //临时存放
    category_id:0,
    token:'',
    search:''
  },
  created() {
    this.search = utils.getQuery('search')
    //console.log(this.bookID)
    //this.getCategories()
    this.getList(this.search)
  },
  methods: {
    goDetail(id){
      window.location.href=`./books_detail.html?id=${id}`
    },
    getList(id) {
      //获取图书
      let _this = this
      fetch('get', url.getBooks+'?keyword='+this.search).then(res => {
        //this.bookList.psuh(res.data)
        if (res.status >= 200 && res.status <= 500) {
        
          //  res.data.forEach((item,index)=>{
          //    item.cover=`${hostImg}${item.cover}`
          //  })
          //this.bookList=res.data
          
          //_this.mylist[config.category_id]=res.data
          _this.$set(_this, 'bookList', res.data);
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
    ViewBox,
    Booklist
  },
  mixins: [mixin]
})
