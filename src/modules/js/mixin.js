import Myhead from 'components/head/head.vue'
import Top from 'components/top/top.vue'
import Search from 'components/search/search.vue'
import Foot from 'components/foot/foot.vue'

import {
  ToastPlugin,
  ConfirmPlugin
} from 'vux'




Vue.use(ToastPlugin)

let mixin = {
  components:{
    Myhead,
    Top,
    Search,
    Foot
  }
}

export default mixin
