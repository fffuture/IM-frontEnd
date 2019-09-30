<template>
  <div class="friend-info">
    <header class="chat-header">
      <div @click="$router.go(-1)">
        <svg style="width:2rem;height:2rem">
          <use xlink:href="#back-friendCircle" />
        </svg>
        <span>昵称</span>
      </div>
      <svg style="width:2.5rem;height:2.5rem" @touchstart.stop="displaySetting=!displaySetting">
        <use xlink:href="#more-chatDetails" />
      </svg>
    </header>

    <div class="user-info" v-if="!!personInfo">
      <img :src="personInfo.imgURL" alt />
      <div>
        <span>
          {{personInfo.weChatId}}
          <i class="sex female"></i>
        </span>
        <!-- <span>微信号:HY1010030877</span>  -->
        <span>微信号:{{personInfo.weChatId}}</span>
        <span>昵称:{{personInfo.weChatName}}</span>
      </div>
    </div>

    <a href target="_blank"></a>
    <div class="other-info" v-if="!!personInfo">
      <div>
        <span style="width: 100%">设置备注和标签</span>
      </div>
    </div>

    <div class="other-info" v-if="!!personInfo">
      <div>
        <span>地区</span>
        <span>福建 莆田</span>
      </div>
      <div class="photo-album" v-if=" $route.query.page !== 'search' ">
        <span>个人相册</span>
      </div>
      <div v-if=" $route.query.page !== 'search' ">
        <span>更多</span>
      </div>
    </div>
    <div v-if="!!personInfo">
      <router-link
        :to="{path:'/main/message-contain/chat-contain/apply-check',query:{friendWeChatId:$route.query.friendWeChatId}}"
        tag="button"
        v-if=" $route.query.page === 'search' "
      >添加到通讯录</router-link>

      <div v-else>
        <router-link
          :to="{path:'/main/message-contain/chat-details',query:{friendWeChatId:$route.query.friendWeChatId}}"
          tag="button"
        >发消息</router-link>
        <router-link
          :to="{path:'/main/webrtc',query:{friendWeChatId:$route.query.friendWeChatId,friendImg:'http://47.103.151.107:8081/images/otherImg.jpg',type:'invite'}}"
          tag="button"
        >视频通话</router-link>
      </div>
    </div>

    <div class="hidden-setting" :class="{'display-setting':displaySetting}">
      <div class="cover-section" @touchstart.stop.prevent="displaySetting=!displaySetting"></div>
      <div>
        <!-- <func-list :systemSelects="systemSelect"></func-list> -->
        <div
          class="choose-item"
          v-for="(item,index) in systemSelect[0]"
          :key="index"
          @click.stop="item.event"
        >
          <svg v-if=" item.svg != '' && !!item.svg ">
            <use :xlink:href="item.svg" />
          </svg>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import funcList from "@/components/funcList";
// import chatHeader from '@/components/chatHeader';
import { post } from "@/utils/fetch-tool.js";

export default {
  data() {
    return {
      displaySetting: false,
      systemSelect: [
        [
          {
            svg: "#pen-friendInfo",
            title: "设置备注及标签",
            event: () => {
              console.log("router", this.$router);
              this.$router.push({
                path: "/main/message-contain/chat-contain/set-remarks",
                query: { friendWeChatId: this.$route.query.friendWeChatId }
              });
            }
          },
          {
            svg: "#star-friendInfo",
            title: "标为星标朋友"
          },
          {
            svg: "#circle-friendInfo",
            title: "设置朋友圈权限"
          },
          {
            svg: "#share-friendInfo",
            title: "发送该名片"
          },
          {
            svg: "#warnning-friendInfo",
            title: "投诉"
          },
          {
            svg: "#forbid-friendInfo",
            title: "加入黑名单",
            event: () => {
              let msg = {
                content: "加入黑名单",
                receiver: this.$route.query.friendWeChatId,
                type: "deFriend"
              };
              // this.$store.commit("dataHandler/DEFRIEND", message);
              this.$store.dispatch("dataHandler/modifyFriendShip", msg);
              this.$router.replace("/");
            }
          },
          {
            svg: "#forbid-friendInfo",
            title: "移出黑名单",
            event: () => {
              let msg = {
                content: "移出黑名单",
                receiver: this.$route.query.friendWeChatId,
                type: "friend"
              };
              // this.$store.commit("dataHandler/FRIEND", message);
              this.$store.dispatch("dataHandler/modifyFriendShip", msg);
              this.$router.replace("/");
            }
          },
          {
            svg: "#delete-friendInfo",
            title: "删除",
            event: () => {
              // console.log('点击删除事件');
              // console.log('地址栏参数', this.$route.query.friendWeChatId );
              let msg = {
                content: "删除好友",
                receiver: this.$route.query.friendWeChatId
              };
              // this.$store.commit("dataHandler/DELETEFRIEND", message);
              this.$store.dispatch("dataHandler/removeFriend", msg);
              this.$router.replace("/");
            }
          },
          {
            svg: "#delete-friendInfo",
            title: "添加到群聊中",
            event: () => {
              // console.log('点击删除事件');
              // console.log('地址栏参数', this.$route.query.friendWeChatId );
              let message = {
                content: "添加到群聊",
                receiver: "1" //群号
              };
              this.$store.commit("dataHandler/GroupAdd", message);
            }
          }
          // {
          //     // img:'',
          //     // img:require("@/static/img/icons/add-friendInfo.png"),
          //     svg:'#add-friendInfo',
          //     title:"删除",
          //     target:"/friend-info",
          //     isNew:false,
          //     redPoint:false
          // }
        ]
      ],
      personInfo: ""
    };
  },
  components: {
    funcList
    // chatHeader
  },
  created: function() {
    console.log(
      "this.$route.query.friendWeChatId",
      this.$route.query.friendWeChatId
    );
    // post('http://localhost:3000/api/queryUserInfo',{'weChatId':this.$route.query.friendWeChatId})
    post("/api/queryUserInfo", { weChatId: this.$route.query.friendWeChatId })
      .then(res => res.json())
      .catch(error => {
        // console.log(" friendInfo error: ", error);
        this.$router.replace({
          path: "/main/search",
          query: { noResult: true }
        });
      })
      .then(res => {
        this.personInfo = res;
        // console.log("this.personInfo :", this.personInfo);
        // console.log("personInfo1  111", res);
        // return res;
      });
  },
  methods: {}
};
</script>
<style scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0.5rem 0 0;
  width: 100%;
  height: 3rem;
  background: rgb(48, 48, 48);
  z-index: 1;
}
header div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  min-width: 0;
  height: 100%;
  color: #fff;
}

.friend-info {
  box-sizing: border-box;
  padding-top: 4rem;
  width: 100%;
  height: 100%;
  background: rgb(245, 245, 245);
}
.user-info {
  box-sizing: border-box;
  padding: 0 0.75rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 7rem;
  background: white;
}
.user-info img {
  margin: 0;
  padding: 0;
  display: inline-block;
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  background-size: 100% 100%;
}
.user-info > div {
  box-sizing: border-box;
  padding: 1rem 0 1rem 1.5rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /*background: orange;*/
}
.user-info span {
  line-height: 1rem;
  color: gray;
}
.user-info span:first-child {
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: 800;
  color: rgb(40, 40, 40);
}
.sex {
  display: inline-block;
  width: 1.3rem;
  height: 1.3rem;
  background-size: 100% 100%;
  transform: translateY(0.25rem);
}
/* .female{
        background-image: url("@/static/img/icons/female.png");
    }*/
/* .male{
        background-image: url("@/static/img/icons/female.png");
    } */

.other-info {
  box-sizing: border-box;
  padding: 0 0.75rem;
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: white;
}
.other-info div {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  /*background: cyan;*/
}
.other-info span {
  font-size: 1rem;
  color: gray;
}
.other-info span:first-child {
  display: inline-block;
  width: 5rem;
  /*background: orange;*/
  color: rgb(40, 40, 40);
  font-weight: 800;
}
.other-info div:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.036rem;
  background-color: rgb(190, 190, 190);
  transform: scaleY(0.5);
  z-index: 1;
}
.other-info div:last-child:after {
  display: none;
}
.other-info .photo-album {
  height: 5rem;
}
button {
  box-sizing: border-box;
  margin: 1rem auto 0 auto;
  display: block;
  width: 94%;
  height: 3rem;
  background: rgb(26, 173, 25);
  color: white;
  border: 0.05rem solid rgb(230, 230, 230);
  border-radius: 0.3rem;
  font-size: 1rem;
}
button:focus {
  outline: none;
}
.btn-video {
  background: white;
  color: rgb(40, 40, 40);
}
.hidden-setting {
  position: fixed;
  left: 0;
  bottom: 0rem;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /*background: white;*/
  /*background: rgba(40,40,40,.5);*/
  z-index: 2;
  transform: translateY(100%);
  transition: all 0.5s ease-out;
}

.hidden-setting .cover-section {
  flex-shrink: 1;
  width: 100%;
  height: 100%;
  background: rgba(40, 40, 40, 0.5);
}
.hidden-setting div {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-shrink: 0;
  width: 100%;
  height: 16rem;
  background: white;
  overflow: scroll;
}
.display-setting {
  transform: translateY(0);
}
.display-setting div {
  /* margin-top: -1rem; */
}

.display-setting div .choose-item {
  box-sizing: border-box;
  padding: 0 0.5rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 3rem;
  /* background: orange; */
  z-index: 1;
}
.display-setting div .choose-item:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.036rem;
  background-color: rgb(190, 190, 190);
  transform: scaleY(0.5);
  z-index: 1;
}
.display-setting div .choose-item:last-child:after {
  display: none;
}
.display-setting div svg {
  display: inline-block;
  flex-shrink: 0;
  padding: 0;
  margin: auto 0.75rem auto 0.25rem;
  width: 2.2rem;
  height: 1.75rem;
  border: 0;
}
</style>
