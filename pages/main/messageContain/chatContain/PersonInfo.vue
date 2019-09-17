<template>
  <div class="personInfo">
    <header>
      <div @click="$router.go(-1)">
        <svg style="width:2rem;height:2rem">
          <use xlink:href="#back-friendCircle" />
        </svg>
        <span>聊天信息</span>
      </div>
    </header>

    <div class="img-container">
      <!-- <div > -->
      <router-link
        tag="div"
        :to="{path:'/main/message-contain/chat-contain/friend-info',query:{friendWeChatId:$route.query.friendWeChatId}}"
      >
        <img src="http://47.103.151.107:8081/images/otherImg.jpg" alt />
        <!-- <span>小明</span> -->
        <span>{{ personInfo.weChatId }}</span>
        <!-- <span>{{ personInfo.weChatName }}</span> -->
      </router-link>
      <!-- </div> -->

      <div>
        <img src="@/static/img/icons/add-personInfo.png" alt />
      </div>
    </div>

    <!--<div class="func-item" v-for="item in funcItem">
        <span>{{ item }}</span>
    </div>-->
    <func-list :systemSelects="systemSelect"></func-list>
  </div>
</template>
<script>
import funcList from "@/components/funcList";
import { post } from "@/utils/fetch-tool.js";

export default {
  data() {
    return {
      funcItem: [
        "聊天小程序",
        "查找聊天记录",
        "置顶聊天",
        "消息免打扰",
        "设置当前聊天背景",
        "清空聊天记录",
        "投诉"
      ],
      systemSelect: [
        [
          {
            img: "",
            title: "聊天小程序",
            target: "/person-info",
            isNew: false,
            redPoint: false
          }
        ],
        [
          {
            img: "",
            title: "查找聊天记录",
            target: "/person-info",
            isNew: false,
            redPoint: false
          }
        ],
        [
          {
            img: "",
            title: "置顶聊天",
            target: "/person-info",
            isNew: false,
            redPoint: false
          },
          {
            img: "",
            title: "消息免打扰",
            target: "/person-info",
            isNew: false,
            redPoint: false
          }
        ],
        [
          {
            img: "",
            title: "设置当前聊天背景",
            target: "/person-info",
            isNew: false,
            redPoint: false
          }
        ],
        [
          {
            img: "",
            title: "清空聊天记录",
            target: "/person-info",
            isNew: false,
            redPoint: false
          }
        ],
        [
          {
            img: "",
            title: "投诉",
            target: "/person-info",
            isNew: false,
            redPoint: false
          }
        ]
      ],
      personInfo: {
        weChatId: "",
        weChatName: "",
        imgURL: "",
        sex: ""
      }
    };
  },
  components: {
    funcList
  },
  created: function() {
    // post('http://localhost:3000/api/queryUserInfo',{'weChatId':"admin1"})
    // .then( res => res.json() )
    // .then(
    //     res  => {
    //         this.personInfo = res;
    //         // console.log('personInfo1',res);
    //         // return res;
    //     }
    // )

    console.log(
      "this.$route.query.friendWeChatId",
      this.$route.query.friendWeChatId
    );
    // post('http://localhost:3000/api/queryUserInfo',{'weChatId':this.$route.query.friendWeChatId})
    post("/api/queryUserInfo", { weChatId: this.$route.query.friendWeChatId })
      .then(res => res.json())
      .then(res => {
        this.personInfo = res;
        console.log("personInfo1", res);
        // return res;
      });
  },
  mounted: function() {}
};
</script>
<style scoped>
.personInfo {
  box-sizing: border-box;
  padding-top: 3rem;
  background: rgb(235, 235, 235);
  width: 100%;
  height: 100%;
}
header {
  position: absolute;
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
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 0;
  height: 100%;
  color: #fff;
}

.img-container {
  box-sizing: border-box;
  padding: 0 0.5rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 6rem;
  background-color: white;
}
.img-container div {
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 3rem;
  height: 4rem;
}
.img-container img {
  width: 3rem;
  height: 3rem;
}
.img-container span {
  font-size: 0.6rem;
  color: gray;
}
.func-item {
  box-sizing: border-box;
  padding-left: 0.5rem;
  margin-top: 1em;
  width: 100%;
  height: 2.6rem;
  background-color: white;
  line-height: 2.6rem;
}
</style>