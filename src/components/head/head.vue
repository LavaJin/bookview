<template>
  <div id="head">
    <x-header style="background-color:#1b1b1b;" :left-options="{backText: ''}"  @on-click-more="showSearch">书城 <a slot="right"><i class="weui-icon-search"></i></a></x-header>
    <search  autoFixed position="fixed" ></search>
  </div>
</template>

<script>
  import vm from './head.js'
  export default vm
</script>

