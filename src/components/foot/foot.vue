<template>
  <div id="foot" class="ft wrapper-width">
    <tabbar>
      <tabbar-item selected>
        <i slot="icon" class="iconfont icon-shouye" ></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item >
        <i slot="icon" class="iconfont icon-leimupinleifenleileibie" ></i>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item>
        <i slot="icon" class="iconfont icon-lanzi50" ></i>
        <span slot="label">借书蓝</span>
      </tabbar-item>
      <tabbar-item>
        <i slot="icon" class="iconfont icon-wode" ></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>

</template>

<script>
  import vm from './foot.js'
  export default vm
</script>

