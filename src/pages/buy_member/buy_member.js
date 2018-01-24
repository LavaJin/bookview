import 'vux/src/styles/reset.less';
import './buy_member.scss'
import { Swiper, Scroller, Tab, TabItem, Sticky, Flexbox, FlexboxItem, ViewBox, Group, Cell, XButton, ToastPlugin } from 'vux'

Vue.use(ToastPlugin)

import { hostImg } from 'js/host-config'

import { fetch, rap } from 'js/fetch.js'
let url = {
  getVip: 'api/vips',
  //slideList: '/slide/listSlides.do'
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
    vipList: [],
    listIndex: 0,
    transitionName: 'slide-left'
  },
  created() {
    this.getVip()
  },
  methods: {
    getVip() {
      //获取会员套餐
      fetch('get', url.getVip).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          console.log(res.data)
          //mock
          //http://www.5chelib.com/storage/vip/SBmF7SsFvtSUHWVsuIjwxLcLDtnejYGajqwtH9I1.jpeg
          // res.data = [
          //   {
          //     "id": 1,// id套餐
          //     "name": "超级会员",//套餐名称
          //     "icon": "vip/SBmF7SsFvtSUHWVsuIjwxLcLDtnejYGajqwtH9I1.jpeg",//套餐图标
          //     "price": "2000.00",//价格
          //     "day": 0,//天数
          //     "type": 2// 1 有期限需要显示天数，2 无期限 比如超级会员
          //   }, {
          //     "id": 1,// id套餐
          //     "name": "超级会员",//套餐名称
          //     "icon": "vip/SBmF7SsFvtSUHWVsuIjwxLcLDtnejYGajqwtH9I1.jpeg",//套餐图标
          //     "price": "2000.00",//价格
          //     "day": 0,//天数
          //     "type": 2// 1 有期限需要显示天数，2 无期限 比如超级会员
          //   }
          // ]

          res.data.forEach(element => {
            let obj = {
              id: element.id,
              name: element.name,
              icon: `${hostImg}${element.icon}`,
              price: element.price,
              type: element.type,
            }
            this.vipList.push(obj)
          });

        } else {
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
    show(index) {
      if (this.listIndex > index) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.listIndex = index
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
