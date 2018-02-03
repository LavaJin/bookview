import './head.scss'

import {XHeader, Search} from 'vux'

import {fetch, rap} from 'js/fetch.js'

import bus from 'js/bus.js'

let url = {
  info: '/user/getUser.do',
  logout: '/user/logout.do'
}
url = rap(url)

export default {
  props: {
    title: {
      type: String,
      default: '书城',
    },
    showsearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      results: [],
      value: ''
    }
  },
  created() {

  },
  methods: {
    goSearch(){
      if(this.value==''){

      }else{
        window.location.href=`./searchlist.html?search=${this.value}`
      }
    },
    setFocus () {
      //this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    }
  },
  components: {
    XHeader,
    Search
  }
}
