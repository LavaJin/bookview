<template>
  <div id="foot" class="ft wrapper-width">
    <tabbar>
      <tabbar-item :selected="index==1"  link="./index.html">
        <i slot="icon" class="iconfont icon-shouye" ></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="index==2"   link="./class.html">
        <i slot="icon" class="iconfont icon-leimupinleifenleileibie" ></i>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item :selected="index==3" link="./class.html">
        <i slot="icon" style="font-size: 28px;position: relative;top: -4px;" class="iconfont icon-lanzi50" ></i>
        <span slot="label">借书篮</span>
      </tabbar-item>
      <tabbar-item v-if='isLogin&&lerrerNumber' :selected="index==4"  @click.native="golink($event)" :badge="lerrerNumber">
        <i slot="icon" class="iconfont icon-wode"  ></i>
        <span slot="label">我的</span>
      </tabbar-item>

      <tabbar-item v-if='!isLogin' :selected="index==4"  @click.native="golink">
        <i slot="icon" class="iconfont icon-wode"  ></i>
        <span slot="label">我的</span>
      </tabbar-item>

    </tabbar>
  </div>

</template>

<script>
  import vm from './foot.js'
  export default vm
</script>

