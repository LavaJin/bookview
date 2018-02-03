import 'vux/src/styles/reset.less';
import './booklist.scss'
import {
  Badge,
  Group,
  Cell,
  Panel,
  XButton,
  Scroller,
  Spinner,
  Flexbox,
  FlexboxItem,
} from 'vux'

import { fetch, rap } from 'js/fetch.js'
import { hostImg } from 'js/host-config'

let url = {
  deelteUncollectBook: 'api/books',//取消收藏图书
  slideList: '/slide/listSlides.do'
}

url = rap(url)

export default {
  props: {
    sort: {
      type: String
    },
    token: {
      type: String
    },
    bookdata: {
      type: Array
    },
    stop:{
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      //bookList:[],
      data: [],
      showList1: true,
      scrollTop: 0,
      onFetching: false,
      bottomCount: 20,
      n4: 10,
      demo4Value: {
        pullupStatus: 'default'
      },
    }
  },
  computed: {
    lists() {
      let myArray = []
      this.data.forEach((item, index) => {
        let obj = {
          cover: `${hostImg}${item.cover}`,
          author: `${item.author}`,
          borrow_count: `${item.borrow_count}`,
          detail: `${item.detail}`,
          id: `${item.id}`,
          name: `${item.name}`,
          press: `${item.press}`,
          status: `${item.status}`
        }
        myArray.push(obj)
      });
      return myArray
    }
  },
  watch:{
    bookdata(val,oldVal){
      this.$set(this, 'data', this.bookdata);
    }
  },
  created() {
    this.$set(this, 'data', this.bookdata);
  },
  methods: {
    goDetail(id) {
      window.location.href = `./books_detail.html?id=${id}`
    },
    load() {
      this.demo4Value.pullupStatus = 'default'
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    load4() {
      this.demo4Value.pullupStatus = 'up'
      this.$emit('lazyload')
      // setTimeout(() => {

      //   // this.lists.push({
      //   //   title: '婴儿画报2017年第三季度合订本',
      //   //   img: '/static/book.jpg',
      //   //   author: '作者金波',
      //   //   status: '已领取',
      //   // })
      //   setTimeout(() => {
      //     this.demo4Value.pullupStatus = 'default'
      //     this.$nextTick(() => {
      //       this.$refs.scroller.reset()
      //     })
      //   }, 10)
      // }, 2000)
    },
    show(index) {
      if (this.listIndex > index) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.listIndex = index
    },
    deleteUncollect(id) {
      //取消收藏
      let _this = this
      fetch('delete', `${url.deelteUncollectBook}/${id}/uncollect?token=${this.token}`).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          window.location.href = window.location.href
          // this.lists.forEach(function(item,index){
          //     if(item.id==id){

          //       window.location.href=window.location.href
          //     }
          //})
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
  },
  components: {
    Spinner,
    Badge,
    Group,
    Cell,
    Panel,
    XButton,
    Scroller,
    Flexbox,
    FlexboxItem,
  }
}


