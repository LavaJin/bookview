import 'vux/src/styles/reset.less';
import './index.scss'
import { Swiper, Spinner, Scroller, Tab, TabItem, Sticky, Flexbox, FlexboxItem, ViewBox } from 'vux'
import utils from 'js/utils.js'

import { hostImg } from 'js/host-config'
import { fetch, rap } from 'js/fetch.js'


let url = {
  getAD: 'api/ads',
  getCategories: 'api/book/categories',
  getBooks: 'api/books',
  getHomeRecommend:'api/books?type=home_recommend'
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
    ADList: [],
    categoriesList: [],
    listIndex: 0,
    transitionName: 'slide-left',
    isLogin: '',
    bookList: [],
    mylist: [], //临时存放
    demo4Value: {
      pullupStatus: 'default'
    },
    lists: [{
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
    }]
  },
  created() {
    this.isLogin = utils.isLogin()
    this.getADList()
    this.getHomeRecommend()
  },
  mounted() {
  },
  methods: {
    load4() {
      alert(1)
      this.demo4Value.pullupStatus = 'up'
      setTimeout(() => {
        this.bookList.push({
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
    show(index) {
      //console.log(this.listIndex + 'listIndex')
      //console.log(index + 'index')
      if (this.listIndex > index) {
        this.transitionName = 'slide-right'
      } else if (this.listIndex > index) {
        this.transitionName = 'slide-left'
      }
      this.listIndex = index
    },
    getADList() {
      //获取首页广告列表 轮播图
      fetch('get', url.getAD).then(res => {
        if (res.status === 200) {
          res.data.forEach((item, index) => {
            let obj = {
              img: `${hostImg}${item.ad_image}`,
              //url: `${item.link}`,
              /*title: `${item.name}`*/
            }
            this.ADList.push(obj)
          })
        } else {

        }
      })
    },
    getHomeRecommend() {
      //获取首页推荐图书
      fetch('get', `${url.getHomeRecommend}`, {
      }).then(res => {
        if (res.status >= 200 && res.status <= 500) {
         console.log(res)
         res.data.forEach((item,index)=>{
          item.cover = `${hostImg}${item.cover}` 
         })
         this.bookList=res.data
        }
      })
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
    _getbook(config) {
      return fetch('get', url.getBooks, { params: config })
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
          res.data.forEach((item, index) => {
            item.cover = `${hostImg}${item.cover}`
          })
          _this.mylist[config.category_id - 1] = res.data
          _this.$set(_this, 'bookList', _this.mylist);
        }

      })
    },
    goDetail(id) {
      window.location.href = `./books_detail.html?id=${id}`
    },
    goRegister() {
      //如果登录了就跳购买会员页面 没有就去注册
      if (this.isLogin) {
        window.location.href = './buy_member.html'
      } else {
        window.location.href = './register.html'
      }
    }
  },
  components: {
    Swiper,
    Scroller,
    Spinner,
    Tab,
    TabItem,
    Sticky,
    Flexbox,
    FlexboxItem,
    ViewBox
  }
  ,
  mixins: [mixin]
})
