<template>
  <div id="booklist">
    <div v-if="sort=='had_to_borrow_book'">
      <scroller style="top:0px" lock-x scrollbar-y height="-60" ref="scroller" use-pullup v-model="demo4Value"
                @on-pullup-loading="load4">
        <div class="box2">
          <div class="content">
            <ul>
              <li v-for="(item,index) in lists">
                <group>
                  <div class="left-book"><img :src="item.img" alt=""></div>
                  <div class="right-book">
                    <p class="title">{{item.title}}</p>
                    <p><span class="author">{{item.author}}</span> <span class="status">{{item.status}}</span></p>
                    <p class="content"></p>
                    <p class="buttons">
                      <x-button mini type="primary">还书</x-button>
                      <x-button mini type="primary">评论</x-button>
                    </p>
                  </div>
                </group>
              </li>
            </ul>
          </div>
        </div>
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position: absolute; width: 100%; height: 50px; bottom: -50px; text-align: center;">
          <span v-show="demo4Value.pullupStatus === 'default'"></span>
          <span class="pullup-arrow"
                v-show="demo4Value.pullupStatus === 'default' || demo4Value.pullupStatus === 'up' || demo4Value.pullupStatus === 'down'"
                :class="{'rotate': demo4Value.pullupStatus === 'down'}">↑</span>
          <span v-show="demo4Value.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
      </scroller>
    </div>

    <div v-if="sort=='resevation_books'">
      <scroller style="top:0px" lock-x scrollbar-y height="-60" ref="scroller" use-pullup v-model="demo4Value"
                @on-pullup-loading="load4">
        <div class="box2">
          <div class="content">
            <ul>
              <li v-for="(item,index) in lists">
                <group>
                  <div class="left-book"><img :src="item.img" alt=""></div>
                  <div class="right-book">
                    <p class="title">{{item.title}}</p>
                    <p><span class="author">{{item.author}}</span> <span class="status">{{item.status}}</span></p>
                    <p class="content"></p>
                    <p class="buttons">
                      <x-button mini type="primary">取消预定</x-button>
                      <x-button mini type="primary">修改时间</x-button>
                    </p>
                  </div>
                </group>
              </li>
            </ul>
          </div>
        </div>
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position: absolute; width: 100%; height: 50px; bottom: -50px; text-align: center;">
          <span v-show="demo4Value.pullupStatus === 'default'"></span>
          <span class="pullup-arrow"
                v-show="demo4Value.pullupStatus === 'default' || demo4Value.pullupStatus === 'up' || demo4Value.pullupStatus === 'down'"
                :class="{'rotate': demo4Value.pullupStatus === 'down'}">↑</span>
          <span v-show="demo4Value.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
      </scroller>
    </div>

    <div v-if="sort=='collection_books'">
      <scroller style="top:0px" lock-x scrollbar-y height="-104" ref="scroller" use-pullup v-model="demo4Value"
                @on-pullup-loading="load4">
        <div class="box2">
          <div class="content">
            <ul>
              <li v-for="(item,index) in lists">
                <group>
                  <div class="left-book"><img :src="item.cover" alt=""></div>
                  <div class="right-book">
                    <p class="title">{{item.name}}</p>
                    <p><span class="author">{{item.author}}</span> <!--<span class="status">{{item.status}}</span>-->
                    </p>
                    <p class="content"></p>
                    <p class="buttons">
                      <x-button mini @click.native='deleteUncollect(item.id)' type="primary">取消收藏</x-button>
                    </p>
                  </div>
                </group>
              </li>
            </ul>
          </div>
        </div>
        <div v-if='!stop' slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position: absolute; width: 100%; height: 50px; bottom: -50px; text-align: center;">
          <span v-show="demo4Value.pullupStatus === 'default'"></span>
          <span class="pullup-arrow"
                v-show="demo4Value.pullupStatus === 'default' || demo4Value.pullupStatus === 'up' || demo4Value.pullupStatus === 'down'"
                :class="{'rotate': demo4Value.pullupStatus === 'down'}">↑</span>
          <span v-show="demo4Value.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
        <div v-if='stop' class="nomore">没有更多</div>
      </scroller>
    </div>

    <div v-if="sort=='seeking_books'" id='seeking_books'>
      <group>
        <cell title="我的荐书"></cell>
      </group>
   <!-- <scroller style="top:0px" lock-x scrollbar-y height="-104" ref="scroller" use-pullup v-model="demo4Value"
                @on-pullup-loading="load4"> -->
                <scroller style="top:0px" lock-x scrollbar-y height="-104" ref="scroller"  v-model="demo4Value"
                @on-pullup-loading="load4">
        <div class="box2">
          <div class="content">
            <ul>
              <li v-for="(item,index) in lists">
                <group>
                  <!-- <div class="left-book"><img :src="item.img" alt=""></div> -->
                  <div class="right-book">
                    <p class="title">书名：{{item.name}}</p>
                     <p><span class="author">{{item.author}}</span> 
                     <span v-if='item.status==0' class="status">待审核</span> 
                     <span v-if='item.status==1' class="status">批准采购</span> 
                     <span v-if='item.status==2' class="status">不与采购</span> 
                     <span v-if='item.status==3' class="status">在途中</span> 
                     <span v-if='item.status==4' class="status">已入库</span> 
                     
                     </p>
                    <p class="content">出版社：{{item.press}}</p>
                    <p class="buttons">
                      <!-- <x-button mini type="primary">取消收藏</x-button> -->
                    </p>
                  </div>
                </group>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position: absolute; width: 100%; height: 50px; bottom: -50px; text-align: center;">
          <span v-show="demo4Value.pullupStatus === 'default'"></span>
          <span class="pullup-arrow"
                v-show="demo4Value.pullupStatus === 'default' || demo4Value.pullupStatus === 'up' || demo4Value.pullupStatus === 'down'"
                :class="{'rotate': demo4Value.pullupStatus === 'down'}">↑</span>
          <span v-show="demo4Value.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div> -->
      </scroller>
    </div>

  <!--借阅排名开始-->
   <div v-if="sort=='borrow_bank'">
      <scroller style="top:0px" lock-x scrollbar-y height="-58" ref="scroller" use-pullup v-model="demo4Value"
                @on-pullup-loading="load4">
        <div class="box2">
          <div class="content">
            <ul>
              <li v-for="(item,index) in lists">
                <group>
                  <div class="left-book"><img :src="item.cover" alt=""></div>
                  <div class="right-book">
                    <p class="title">{{item.name}}</p>
                    <p><span class="author">{{item.author}}</span> <!--<span class="status">{{item.status}}</span>-->
                    </p>
                    <p class="content">当前借阅<span>{{item.borrow_count}}</span>次</p>
                    <p class="buttons">
                      <x-button @click.native="goDetail(item.id)" mini type="primary">我要借阅</x-button>
                    </p>
                  </div>
                </group>
              </li>
            </ul>
          </div>
        </div>
        <div v-if='!stop' slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position: absolute; width: 100%; height: 50px; bottom: -50px; text-align: center;">
          <span v-show="demo4Value.pullupStatus === 'default'"></span>
          <span class="pullup-arrow"
                v-show="demo4Value.pullupStatus === 'default' || demo4Value.pullupStatus === 'up' || demo4Value.pullupStatus === 'down'"
                :class="{'rotate': demo4Value.pullupStatus === 'down'}">↑</span>
          <span v-show="demo4Value.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
        <div v-if='stop' class="nomore">没有更多</div>
      </scroller>
    </div>
    <!--借阅排名结束-->


    <div v-if='sort=="classlist"'>
       <!-- <scroller style="top:0px" lock-x scrollbar-y height="-104" ref="scroller" use-pullup v-model="demo4Value"
                @on-pullup-loading="load4"> -->
                <scroller style="top:0px" lock-x scrollbar-y height="-104" ref="scroller"  v-model="demo4Value"
                @on-pullup-loading="load4">
        <div class="box2">
          <div class="content">
            <ul>
              <li v-for="(item,index) in lists" >
                <group>
                  <div class="left-book"><img :src="item.cover" alt=""></div>
                  <div class="right-book">
                    <p class="title">{{item.name}}</p>
                    <p><span class="author">{{item.author}}</span> <!--<span class="status">{{item.status}}</span>--> </p>
                    <p class="content">当前借阅<span>100</span>次</p>
                    <p class="buttons">
                      <x-button @click.native="goDetail(item.id)" mini type="primary">我要借阅</x-button>
                    </p>
                  </div>
                </group>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position: absolute; width: 100%; height: 50px; bottom: -50px; text-align: center;">
          <span v-show="demo4Value.pullupStatus === 'default'"></span>
          <span class="pullup-arrow"
                v-show="demo4Value.pullupStatus === 'default' || demo4Value.pullupStatus === 'up' || demo4Value.pullupStatus === 'down'"
                :class="{'rotate': demo4Value.pullupStatus === 'down'}">↑</span>
          <span v-show="demo4Value.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div> -->
      </scroller>
    </div>


  </div>



</template>

<script>
  import vm from './booklist.js'
  export default vm
</script>

