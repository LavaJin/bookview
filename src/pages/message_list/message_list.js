import 'vux/src/styles/reset.less';
import './message_list.scss'
import {
    Badge,
    Group,
    Cell,
    Panel,
    XButton,
    Scroller,
    Spinner,
    XInput,
    cookie
} from 'vux'

import { fetch, rap } from 'js/fetch.js'


let url = {
    getMessageList: 'api/messages',//用户站内信列表
    //recommends: 'api/book/recommends'//收藏图书
}


url = rap(url)

import Myhead from 'components/head/head.vue'
// import Slide from 'components/slide/slide.vue'
import Top from 'components/top/top.vue'
// import Search from 'components/search/search.vue'
import Foot from 'components/foot/foot.vue'
import Booklist from 'components/booklist/booklist.vue'

import utils from 'js/utils.js'

import mixin from 'js/mixin.js'


new Vue({
    el: '#body',
    data: {
        title: '',//书名
        author: '',//作者
        press: '',//出版社
        showList1: true,
        list: [],
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20,
        n4: 10,
        demo4Value: {
            pullupStatus: 'default'
        }
    },
    computed: {
    },
    created() {
        this.isLogin = utils.isLogin()
        //没有登录去登录

        if (!this.isLogin) {
            window.location.href = './login.html'
        } else {
            this.token = cookie.get('token')
            this.getMessageList()
        }
    },
    methods: {
        readeMseeage(id){
            //读站内信
            window.location.href=`/message_detail.html?id=${id}`
        },
        getMessageList() {
            let _this = this
            //推荐图书
            fetch('get', `${url.getMessageList}`, {}, { 'headers': _this.token }).then(res => {
                if (res.status >= 200 && res.status <= 300) {
                    this.list = res.data

                } else {
                    _this.$vux.toast.show({
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
        getRecommendBooks() {
            //获取用户推荐图书
            fetch('get', `${url.getRecommendBooks}`, {}, { 'headers': this.token }).then(res => {
                if (res.status >= 200 && res.status <= 300) {
                    this.$set(this, 'bookList', res.data);
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
        Cell,
        XInput,
        Booklist
    },
    mixins: [mixin]
})
