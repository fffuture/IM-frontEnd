<template>
  <div class="applyCheck">
    <header class="chat-header">
      <div @click="$router.go(-1)">
        <svg style="width:2rem;height:2rem">
          <use xlink:href="#back-friendCircle" />
        </svg>
        <span>验证申请</span>
      </div>

      <button @click="submit">发送</button>
    </header>

    <div class="requetMessage" style="margin-top:3rem">
      <div>你需要发送验证申请，等待对方通过</div>
      <input type="text" v-model="reqMessage" placeholder />
    </div>
    <div class="requetMessage" style="margin-top:.5rem">
      <div>为朋友设置备注</div>
      <input type="text" v-model="setRemark" placeholder />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reqMessage: "",
      setRemark: ""
    };
  },
  created: function() {
    this.reqMessage = "我是" + this.$store.state.dataHandler.weChatId;
    this.setRemark = this.$route.query.friendWeChatId;
  },
  methods: {
    submit: function() {
      console.log("提交添加好友信息");
      //   let addFriend = {
      //     content: this.reqMessage,
      //     receiver: this.$route.query.friendWeChatId
      //   };
      // state.ws.send(JSON.stringify({ "sender": state.weChatId, "receiver": message.receiver, "type": "addFriend", "content": message.content }));
      let addFriendApply = {
        sender: this.$store.state.dataHandler.user.weChatId,
        receiver: this.$route.query.friendWeChatId,
        type: "addFriend",
        content: this.reqMessage
      };

      // for( let i = 0; i < this.$store.state.dataHandler.friendList.length; i++){
      // 	if( this.$store.state.dataHandler.friendList[i].friendWeChatId === this.searchContent ){
      // 		console.log("已存在!!");
      // 		return ;
      // 	}
      // }
      // this.$store.commit('dataHandler/ADDFRIEND',message);
      this.$store.dispatch("wsCenter/sendFunc", addFriendApply);
      this.$router.replace("/");
    }
  }
};
</script>
<style>
.applyCheck {
  width: 100%;
  height: 100%;
  background: rgb(245, 245, 245);
}

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
header button {
  width: 4rem;
  height: 2rem;
  background: green;
  border: none;
  border-radius: 0.3rem;
  color: #fff;
  outline: none;
}

.requetMessage {
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  widows: 100%;
  height: 5rem;
  background: #fff;
  color: rgb(190, 190, 190);
}
.requetMessage div {
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
}
.requetMessage input {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 1rem;
  color: rgb(30, 30, 30);
  border: none;
  border-bottom: 0.01rem solid #e8e8e8;
  outline: none;
  text-indent: 0.5rem;
}
.requetMessage input:focus {
  border-bottom: 0.01rem solid #97dfc2;
}
</style>

