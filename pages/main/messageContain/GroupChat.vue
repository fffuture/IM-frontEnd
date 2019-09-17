<template>
  <div class="chatDetails" @click="emojiShow=false">
    <header>
      <div @click="$router.go(-1)">
        <svg style="width:2rem;height:2rem">
          <use xlink:href="#back-friendCircle" />
        </svg>
        <span>{{$route.query.groupName}}</span>
      </div>
      <span>
        <svg style="width:2.5rem;height:2.5rem">
          <use xlink:href="#more-chatDetails" />
        </svg>
      </span>
    </header>

    <ul class="container" ref="container" :class="{paddingBottom:emojiShow}" id="container">
      <div v-for="(item,index) in currentChat" :key="index">
        <li :class="item.sender === $store.state.dataHandler.weChatId?'self':'other'">
          <img class="whosImg" :src="item.senderImg" alt />
          <div v-html="item.content" v-if=" item.type === 'groupChat' "></div>
          <img
            :src="item.content"
            style="max-width:70%;min-height:0;background-size:100% 100%;border-radius:.5rem .5rem;margin: .5rem .7rem;"
            v-if=" item.type === 'groupImg' "
            alt
          />
        </li>
      </div>
    </ul>

    <footer>
      <div class="tools-controller">
        <img src="@/static/img/icons/micphone1.png" alt @click=" speech = !speech " />
        <user-input v-model="sendContent" v-if="!speech"></user-input>
        <input type="button" value="按住 说话" v-else />
        <img src="@/static/img/icons/smile1.png" @click.stop="clickEmoji" alt />
        <img src="@/static/img/icons/add2.png" v-if=" send || speech " @click="tools" />
        <button @click="sent" v-else>发送</button>
      </div>

      <div class="emoji-pannel" v-show="emojiShow" @click.stop>
        <swiper class="swiperOption" :options="swiperOption" ref="mySwiper">
          <swiper-slide>
            <img
              v-for="(emoji,index) in emojiData1"
              v-bind:key="index"
              :src="emoji.url"
              @click.stop="clickImg(emoji)"
              alt
            />
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination"></div>
      </div>

      <div class="emoji-pannel" v-if="toolsShow">
        <div>
          <input
            ref="selectImage"
            @change="uploadImg($event)"
            type="file"
            accept="image/*"
            multiple="multiple"
          />
        </div>

        <!-- <input ref="selectImage" @change = "uploadImg($event)" type="file" accept="image/*" multiple="multiple"/>  -->
      </div>

      <!-- <img :src="imageBase64" alt=""> -->
    </footer>
  </div>
</template>
<script>
import headTop from "@/components/header";
import userInput from "@/components/user-input";

import { mapState } from "vuex";

// import { swiper, swiperSlide } from 'vue-awesome-swiper'

// const adapter = require('webrtc-adapter');

export default {
  components: {
    headTop,
    // swiper,
    // swiperSlide,
    userInput
  },
  data() {
    return {
      emojiShow: false,
      toolsShow: false,
      imageBase64: "",
      scrollToBottom: false,
      speech: false,
      sendContent: "",
      contentHeight: "",
      swiperOption: {
        notNextTick: true,
        direction: "horizontal",
        mousewheelControl: true,
        observeParents: true,
        resistanceRatio: 0.35,
        speed: 300,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      /* groupChat:[  //接收人固定是群号，发送人可以不一样，服务器再对群里所有人进行转发
                {
                    sender:'hello',
                    senderImg:"http://47.103.151.107:8080/images/otherImg.jpg",
                    receiver:'0', //群id
                    content:'群测试消息',
                    type:"groupChat",
                    time:'',
                },
            ],*/
      emojiData1: [
        {
          name: "angry",
          url: "http://47.103.151.107:8081/images/angry.png"
        },
        {
          name: "anguished",
          url: "http://47.103.151.107:8081/images/anguished.png"
        },
        {
          name: "astonished",
          url: "http://47.103.151.107:8081/images/cry.png"
        },
        {
          name: "blush",
          url: "http://47.103.151.107:8081/images/blush.png"
        }
      ]
    };
  },
  created: function() {
    // console.log('store:',this.$store);
    // console.log('groupChat:',this.$store.state.dataHandler.groupChat);
    // console.log('user',this.user);
  },
  mounted: function() {
    this.scrollBottom();
    this.$refs.container.scrollTo(0, Number.MAX_SAFE_INTEGER);
  },
  methods: {
    scrollBottom: function() {
      let count = 0;
      clearInterval(this.scrollToBottom); //函数的防抖
      this.scrollToBottom = setInterval(() => {
        this.$refs.container.scrollTo(0, Number.MAX_SAFE_INTEGER);
        this.contentHeight += this.$refs.container.offsetHeight;
        count += 1;
        if (count > 5) {
          clearInterval(this.scrollToBottom);
        }
      }, 300);
    },

    inputClick: function() {
      this.scrollBottom();
      this.emojiShow = false;
    },
    leaveInput: function() {
      // let that = this;
    },
    clickEmoji: function() {
      this.emojiShow = !this.emojiShow;
    },
    clickImg: function(emoji) {
      console.log(emoji);
      this.sendContent += "<img class='emoji' src='" + emoji.url + "'>";
    },
    sent: function() {
      let message = {
        sender: this.user.weChatId,
        senderImg: this.user.imgURL,
        receiver: "1",
        type: "groupChat",
        content: this.sendContent
      };
      this.$store.commit("dataHandler/GROUPCHAT", message);
      this.sendContent = "";
    },
    tools: function() {
      // console.log("展示工具");
      this.toolsShow = !this.toolsShow;
      //  console.log("选择图片", this.$refs.selectImage.files.length );
    },
    uploadImg: function(e) {
      let file = e.target.files[0];
      console.log("获取图片", e.target.files[0]);

      if (file) {
        this.file = file;
        let reader = new FileReader();
        let that = this;
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          that.imageBase64 = this.result;
          console.log("二进制", that.imageBase64);

          let message = {
            sender: that.user.weChatId,
            senderImg: that.user.imgURL,
            receiver: "1",
            type: "groupImg",
            content: that.imageBase64
          };
          that.$store.commit("dataHandler/GROUPCHAT", message);
          that.imageBase64 = "";
        };
      }
    }
  },
  computed: {
    ...mapState("dataHandler", {
      groupChat: state => state.groupChat,
      user: state => state.user
    }),
    send: function() {
      return this.sendContent.trim().length === 0;
    },
    currentChat: function() {
      let arr = this.groupChat.filter(item => {
        console.log("item:", item);
        return item.receiver === "1";
      });
      // console.log('arr',arr);
      return arr;
    }
  },
  destroyed: function() {
    clearInterval(this.scrollToBottom);
  }
};
</script>
<style scoped>
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  min-width: 0;
  height: 100%;
  color: #fff;
}
.chatDetails {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background: rgb(245, 245, 245);
}
.container {
  box-sizing: border-box;
  list-style: none;
  margin: 0;
  width: 100%;
  height: 100%;
  flex-shrink: 1;
  overflow-y: scroll;
  padding: 3rem 0.5rem 3.5rem 0.5rem;
}
.paddingBottom {
  padding-bottom: 18.5rem;
}
.container li {
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-height: 2.2rem;
  margin-top: 0.75rem;
}
.container .other {
  flex-direction: row;
}
.container .other div {
  background: white;
  position: relative;
}
.container .other div:before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  left: -0.575rem;
  top: 0.85rem;
  border: 0.3rem solid transparent;
  border-right: 0.3rem solid white;
}
.container .self {
  flex-direction: row-reverse;
}
.container .self div {
  background: rgb(160, 231, 90);
  position: relative;
}
.container .self div:before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  right: -0.575rem;
  top: 0.85rem;
  border: 0.3rem solid transparent;
  border-left: 0.3rem solid rgb(160, 231, 90);
}
.container li .whosImg {
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
}
.container li div {
  min-width: 0;
  min-height: 0;
  line-height: 1.7rem;
  background: white;
  padding: 0.5rem 0.7rem 0.3rem 0.7rem;
  margin: 0 0.6rem;
  word-break: break-all;
  border-radius: 0.5rem 0.5rem;
}
.container .time {
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container .time span {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background-color: rgb(212, 212, 212);
  color: white;
  font-weight: 200;
  border-radius: 0.2rem;
}
footer {
  box-sizing: border-box;
  /*padding:0 .5rem;*/
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 3rem;
  background: white;
  border-top: 0.01rem solid rgb(220, 220, 220);
}
footer .tools-controller {
  box-sizing: border-box;
  padding: 0 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 2.9rem;
  max-height: 10rem;
  background: white;
}
footer img {
  margin: 0 0.2rem;
  flex-shrink: 0;
  width: 2.4rem;
  height: 2.4rem;
}
/*footer footer input{*/
/*border:none;*/
/*border-bottom: .01rem solid rgb(220,220,220);*/
/*flex-shrink: 1;*/
/*text-indent: .5rem;*/
/*outline: none;*/
/*width: 100%;*/
/*height: 2rem;*/
/*min-height: 2rem;*/
/*line-height: 2rem;*/
/*}*/
footer input[type="button"] {
  box-sizing: border-box;
  /*padding:;*/
  margin: 0 0.8rem 0 1.2rem;
  color: rgb(100, 100, 100);
  width: 100%;
  height: 2rem;
  outline: none;
  background: white;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 0.3rem;
}
/* footer input[type="text"]:focus{   } */
footer button {
  padding: 0;
  display: inline-block;
  margin: 0 0.2rem;
  flex-shrink: 0;
  width: 2.4rem;
  height: 2rem;
  line-height: 2.1rem;
  background: rgb(26, 173, 25);
  border: none;
  color: white;
  border-radius: 0.3rem;
  outline: none;
}
footer .emoji-pannel {
  position: relative;
  width: 100%;
  height: 15rem;
}
footer .swiperOption {
  box-sizing: border-box;
  padding: 0 0.5rem;
  flex-shrink: 1;
  width: 100%;
  height: 15rem;
  overflow: scroll;
}
footer .emoji-pannel .swiperOption img {
  box-sizing: content-box;
  /*padding:0;*/
  margin: 0;
  padding: 10% 1rem 0 1rem;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
}
footer .emoji-pannel .swiper-pagination {
  position: absolute;
  left: 0;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 0;
}
footer .emoji-pannel .swiper-pagination span {
  margin: 0 0.5rem;
}
.swiper-pagination-bullet {
  margin: 0 10px;
}
.message-warning {
  margin: 0.5rem auto;
  padding: 0.5rem 0.5rem;
  display: block;
  max-width: 80%;
  min-height: 0;
  background: #e6e6e6;
  color: #fffdff;
  border-radius: 0.5rem 0.5rem;
  line-height: 1.1rem;
}
.message-warning span {
  color: #252f60;
}
.message-defriend {
  flex-shrink: 0;
  margin: 0.5rem auto;
  padding: 0.5rem 0.5rem;
  display: block;
  min-width: 0;
  width: 13rem;
  min-height: 0;
  background: #e6e6e6;
  color: #fffdff;
  border-radius: 0.5rem 0.5rem;
  line-height: 1.1rem;
  text-align: center;
}
</style>
