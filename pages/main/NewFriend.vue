<template>
  <div class="new-friend">
    <header ref="header">
      <!--<span>返回</span>-->
      <div @click="$router.go(-1)">
        <svg style="width:2rem;height:2rem;">
          <use xlink:href="#back-fix-friendCircle" />
        </svg>
        <span>新的朋友</span>
      </div>
      <div style="margin-right: .5rem">添加好友</div>
    </header>

    <input
      class="search"
      type="text"
      placeholder="微信号/QQ号/手机号"
      @click.stop="$router.push('/main/search')"
    />

    <!-- 
        <ul class="new-friend-list">
            <li class="header">新的朋友</li>
            <li >
                <img src="http://47.103.151.107:8080/images/touxiang.jpeg" alt="">
                <div>
                    <span>漂泊者</span>
                    <span>请求添加你为好友</span>
                    <button @click="accept()">接受</button>
                </div> 
            </li>
            <li>
                <img src="http://47.103.151.107:8080/images/touxiang.jpeg" alt="">
                <div>
                    <span>三千</span>
                    <span>我是尤塔卡HR小王，boss直聘聊的</span>
                    <button class="accept">已添加</button>
                </div> 
            </li>
    </ul>-->
    <ul class="new-friend-list">
      <li class="header">新的朋友</li>
      <li v-for="(item,index) in $store.state.dataHandler.applyAddList" :key="index">
        <img src="http://47.103.151.107:8081/images/touxiang.jpg" alt />
        <div>
          <span>{{item.sender}}</span>
          <span>{{item.content}}</span>
          <button @click="accept(item,index)" v-if=" item.status === 'waite' ">接受</button>
          <button class="accept" v-else>已添加</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    accept: function(item, index) {
      this.$store.dispatch("dataHandler/acceptAddFriend", item);
      console.log("同意添加", item);
      this.$store.state.dataHandler.applyAddList[index].status = "accept";
    }
  }
};
</script>
<style scoped>
.new-friend {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

header {
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  /*padding:0 .75rem;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.9rem;
  background: #ededed;
  z-index: 1;
}
header > div {
  display: flex;
  align-items: center;
}

.search {
  margin-top: 3rem;
  width: 100%;
  height: 3rem;
  border: none;
  outline: none;
  background: #ffffff;
  text-indent: 0.75rem;
  font-size: 0.75rem;
  color: #e2e2e2;
}

.new-friend-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 0;
}
.new-friend-list li {
  box-sizing: border-box;
  padding: 0 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  /* background: green; */
  text-align: left;
}
.new-friend-list li:first-child {
  background: #ededed;
  height: 2rem;
  line-height: 2rem;
}
.new-friend-list li img {
  box-sizing: border-box;
  margin: 0 0.75rem 0 0;
  padding: 0;
  display: flex;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  /* background:cyan; */
  border-radius: 0.3rem 0.3rem;
}
.new-friend-list li div {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 4rem;
  flex-shrink: 1;
  /* background: cyan; */
}
.new-friend-list li div:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0.036rem;
  background-color: rgb(190, 190, 190);
  left: 0;
  top: 3.98rem;
  transform: scaleY(0.5);
  z-index: 1;
}
.new-friend-list li span {
  display: inline-block;
  width: 100%;
  font-size: 0.7rem;
  color: rgb(180, 180, 180);
  line-height: 1rem;
}
.new-friend-list li div span:first-child {
  font-size: 0.9rem;
  /* font-weight: 800; */
  color: rgb(30, 30, 30);
  line-height: 1.3rem;
}

.new-friend-list li button {
  position: absolute;
  right: 0;
  top: 1rem;
  width: 3rem;
  height: 2rem;
  border: none;
  border-radius: 0.2rem 0.2rem;
  color: #fff;
  background: #07c160;
  outline: none;
}
.new-friend-list li .accept {
  font-size: 0.6rem;
  color: rgb(180, 180, 180);
  background: transparent;
}
</style>

