import 'vux/src/styles/reset.less';
import './register.scss';
import {
  Swiper,
  Scroller,
  Tab,
  TabItem,
  Sticky,
  Flexbox,
  FlexboxItem,
  XInput,
  Group,
  XButton,
  Cell,
  CheckIcon,
  PopupPicker,
  XAddress,
  ChinaAddressV4Data,
  Datetime,
  ToastPlugin,
  Value2nameFilter as value2name
} from 'vux'

Vue.use(ToastPlugin)

import { cookie } from 'vux'

import { checkphone } from 'js/validate.js'

import { fetch, rap } from 'js/fetch.js'

let url = {
  getSites: 'api/cities',
  postRegister: 'api/register',
  getAreas:'api/areas'
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
    name: '',//用户名
    phone: '',//手机号
    birthDay: '',//出生日期
    childGender: [],//孩子性别
    genderList: [{ name: '男', value: '1' }, { name: '女', value: '2' }],
    childLike: '',//孩子阅读爱好
    password: '',//密码
    address: [],//省市区
    detailAddress: '',//详细地址
    sites: [],//站点
    isAgree: false,//是否同意协议
    siteslist: [],//站点数据
    isCheckTel: false,
    isCheckPW: false,
    addressData: [],
    addressName:''
  },
  computed: {
    isDisabled() {
      //用户名不为空      日期必选          孩子性别必选                 
      if (this.isAgree && this.name != '' && this.birthDay != '' && this.childGender.length != 0 && this.childLike != '' && this.address.length != 0 && this.detailAddress != '' && this.isCheckTel === true && this.isCheckPW === true && this.password != '' && this.phone != '') {
        return false
      } else {
        return true
      }
    }
  },
  created() {
    //console.log(ChinaAddressV4Data)
    this.getAreas()
  },
  methods: {
    getName(ids, names){
      this.addressName=`${names[0]} ${names[1]} ${names[2]}`
    },
    getAreas(){
      //获取有站点的省市区
      fetch('get', url.getAreas).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          res.data.forEach((item,index)=>{
            let obj={}
            obj.value=item.id+''
            obj.name=item.name
            if(!!item.parent_id){
              obj.parent=item.parent_id+''
            }
            //补全台湾省
            if(item.id=='710000'){
              this.addressData.push({
                name:'--',
                value:'710001',
                parent:'710000',
              })  
              this.addressData.push({
                name:'--',
                value:'710002',
                parent:'710001',
              })  
            }
            //补全香港
            if(item.id=='810000'){
              this.addressData.push({
                name:'--',
                value:'810001',
                parent:'810000',
              })  
              this.addressData.push({
                name:'--',
                value:'810002',
                parent:'810001',
              })  
            }
            //补全澳门
              if(item.id=='820000'){
                this.addressData.push({
                  name:'--',
                  value:'820001',
                  parent:'820000',
                })  
                this.addressData.push({
                  name:'--',
                  value:'820002',
                  parent:'820001',
                })  
              }

            this.addressData.push(obj)
          })
          //console.log(this.addressData)
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'warn'
          })
        }
      })
    },
    register() {
      //注册      
      fetch('post', url.postRegister, {
        name: this.name,
        password: this.password,
        phone: this.phone,
        child_gender: this.childGender[0],
        child_like: this.childLike,
        address:this.addressName,
        detail_address:this.detailAddress,
        site_id:this.sites[0]
      }).then(res => {
        
        if (res.status >= 200 && res.status <= 300) {
          
          cookie.set('token', res.data.token)
          this.$vux.toast.show({
            text: '注册成功',
            onHide() {
              window.location.href = "./buy_member.html"
            }
          })
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
    checkTel(value) {
      this.isCheckTel = checkphone(value)
      return {
        valid: this.isCheckTel,
        msg: '请输入合格的手机号'
      }
    },
    checkPW(value) {
      this.isCheckPW = value.length >= 6 && value.length <= 12 ? true : false
      return {
        valid: this.isCheckPW,
        msg: '密码应该6-12位'
      }
    },
    getSites(boolean) {
      if (boolean) {
        console.log(this.address)
        //获取站点
        fetch('get', url.getSites+'/'+this.address[1]+'/sites').then(res => {
          if (res.status >= 200 && res.status <= 300) {
            let array = []
            res.data.forEach(element => {
              array.push({ name: element.name, value: element.id + '' })
            });
            
            
            this.$set(this, 'siteslist', array);
            // this.$vux.toast.show({
            //   text: '登录成功',
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
            this.$vux.toast.show({
              text: res.data.message,
              type: 'warn'
            })
          }
        })
      }
    },
    onShow() {

    },
    onHide() {

    },
    onChange() {

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
    XInput,
    Group,
    XButton,
    Cell,
    CheckIcon,
    PopupPicker,
    XAddress,
    Datetime
  },
  mixins: [mixin]
})
