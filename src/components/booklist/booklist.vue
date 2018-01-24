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
                  <div class="left-book"><img :src="item.img" alt=""></div>
                  <div class="right-book">
                    <p class="title">{{item.title}}</p>
                    <p><span class="author">{{item.author}}</span> <span class="status">{{item.status}}</span></p>
                    <p class="content"></p>
                    <p class="buttons">
                      <x-button mini type="primary">取消收藏</x-button>
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

    <div v-if="sort=='recommended_books'">
      <group>
        <cell title="我的荐书"></cell>
      </group>
      <scroller style="top:0px" lock-x scrollbar-y height="-239" ref="scroller" use-pullup v-model="demo4Value"
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
                      <x-button mini type="primary">取消收藏</x-button>
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

     <div v-if="sort=='borrow_bank'">
      <scroller style="top:0px" lock-x scrollbar-y height="-104" ref="scroller" use-pullup v-model="demo4Value"
                @on-pullup-loading="load4">
        <div class="box2">
          <div class="content">
            <ul>
              <li v-for="(item,index) in lists">
                <group>
                  <div class="left-book"><img :src="item.img" alt=""></div>
                  <div class="right-book">
                    <p class="title">{{item.title}}</p>
                    <p><span class="author">{{item.author}}</span> <!--<span class="status">{{item.status}}</span>--> </p>
                    <p class="content">当前借阅<span>100</span>次</p>
                    <p class="buttons">
                      <x-button mini type="primary">我要借阅</x-button>
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






  </div>
</template>

<script>
  import vm from './booklist.js'
  export default vm
</script>

