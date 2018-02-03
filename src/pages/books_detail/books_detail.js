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
  XButton,
  ConfirmPlugin
} from 'vux'

Vue.use(ConfirmPlugin)


import { hostImg } from 'js/host-config'
import { cookie } from 'vux'

import { debounce } from 'vux'

import { fetch, rap } from 'js/fetch.js'
let url = {
  getBookDetail: 'api/books',//获取图书详情
  getCollectCount: 'api/book/collect/count',//收藏统计
  postCollectBook: 'api/books'
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
    bookInfo: {},
    isCollect: false,//是否收藏
    clock: false

  },
  created() {
    this.isLogin = utils.isLogin()
    this.token = cookie.get('token')
    this.bookID = utils.getQuery('id')
    this.getBookDetail()

  },
  methods: {
    collectButton(e, id) {
      //收藏按钮
      if (this.isLogin) {
        //登录了就可以收藏
        this.collect(e, id)
      } else {
        //没登录就提示登录
        this.promptLogin()
      }
    },
    promptLogin() {
      //提示登录
      this.$vux.confirm.show({
        title: '收藏图书',
        content: '收藏之前请先登录',
        onConfirm() {
          window.location.href = './login.html'
        }
      })
    },
    collect: debounce(function (e, id) {
      //收藏
      if (this.clock == true) {
        return
      }
      
      this.clock = true
      if (e.target.className.indexOf('icon-shoucang1') != -1) {
        //收藏
        fetch('post', `${url.postCollectBook}/${id}/collect`,{},{'headers':this.token}).then(res => {
          if (res.status >= 200 && res.status <= 300) {
            e.target.className = 'iconfont icon-shoucang2'
            this.bookInfo.collect_count >> 0
            this.bookInfo.collect_count += 1
            this.clock = false
            // this.$vux.toast.show({
            //   text: '收藏成功',
            //   type: 'success',
            //   onShow() {
            //     //console.log('Plugin: I\'m showing')
            //   },
            //   onHide() {
            //     window.location.href='./member.html'
            //     //console.log('Plugin: I\'m hiding')
            //   }
            // })
          } else {
            this.clock = false
            // this.$vux.toast.show({
            //   text: res.data.message,
            //   type: 'warn',
            //   onShow() {
            //     //console.log('Plugin: I\'m showing')
            //   },
            //   onHide() {
            //     //console.log('Plugin: I\'m hiding')
            //   }
            // })
          }
        })

      } else if (e.target.className.indexOf('icon-shoucang2') != -1) {
        //取消收藏
        fetch('delete', `${url.postCollectBook}/${id}/uncollect`,{},{'headers':this.token}).then(res => {
          if (res.status >= 200 && res.status <= 300) {
            
            e.target.className = 'iconfont icon-shoucang1'
            this.bookInfo.collect_count >> 0
            this.bookInfo.collect_count -= 1
            this.clock = false
            // this.$vux.toast.show({
            //   text: '收藏成功',
            //   type: 'success',
            //   onShow() {
            //     //console.log('Plugin: I\'m showing')
            //   },
            //   onHide() {
            //     window.location.href='./member.html'
            //     //console.log('Plugin: I\'m hiding')
            //   }
            // })
          } else {
            
            this.clock = false
            // this.$vux.toast.show({
            //   text: res.data.message,
            //   type: 'warn',
            //   onShow() {
            //     //console.log('Plugin: I\'m showing')
            //   },
            //   onHide() {
            //     //console.log('Plugin: I\'m hiding')
            //   }
            // })
          }
        })
      }
    }, 500, {}),
    show(index) {
      if (this.listIndex > index) {
        this.transitionName = 'slide-right'
      } else if (this.listIndex > index) {
        this.transitionName = 'slide-left'
      }
      this.listIndex = index
    },
    getBookDetail() {
      fetch('get', `${url.getBookDetail}/${this.bookID}`,{},{'headers':this.token}, {
      }).then(res => {
        if (res.status >= 200 && res.status <= 500) {
          res.data.cover = `${hostImg}${res.data.cover}`
          this.bookInfo = res.data

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
