<template>
  <div id="head">
    <!--<x-header v-if="showsearch">{{title}}</x-header>-->
    <div class="main" v-if="!showsearch">
      <div class="address">无锡  <span><i class="down-arrow"></i></span> </div>
      <search
        cancel-text=" "
        @result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="value"
        position="static"
        :autoFixed=false
        @on-focus="onFocus"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        ref="search">
      </search>
      <div class="button">搜索</div>
    </div>
  </div>
</template>

<script>
  import vm from './head.js'
  export default vm
</script>

