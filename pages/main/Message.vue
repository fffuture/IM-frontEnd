<template>
  <div class="message">
    <router-link
      class="messageItem"
      :to="{path:'/main/message-contain/chat-details',query:{friendWeChatId:item.receiver}}"
      v-for="item in recentContact"
      :key="item.receiver"
      tag="div"
    >
      <img src="http://47.103.151.107:8081/images/otherImg.jpg" alt />
      <div class="message-body">
        <div>{{item.receiver}}</div>
        <div
          v-html="item.content[item.content.length-1].type==='chatImg'?'[图片]':item.content[item.content.length-1].content"
        ></div>
      </div>
      <div class="color-gray">
        <span>早上8:58</span>
        <img class="icon-muse" src="@/static/img/icons/muse-message.png" alt />
      </div>
    </router-link>

    <router-link
      class="messageItem"
      :to="{path:'/main/message-contain/group-chat',
				query:{
					'groupId':groupList[0].groupId,
					'groupName':groupList[0].groupName,
					'type':'group'
				}
			}"
      tag="div"
    >
      <img src="http://47.103.151.107:8081/images/otherImg.jpg" alt />
      <div class="message-body">
        <span class="contactName">{{ groupList[0].groupName }}</span>
        <span class="color-gray"></span>
      </div>
      <div class="color-gray">
        <span>早上8:58</span>
        <img class="icon-muse" src="@/static/img/icons/muse-message.png" alt />
      </div>
    </router-link>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    recentContact: function() {
      return this.$store.state.dataHandler.chatHistorys.filter(item => {
        // console.log( "item,",item );
        return item.content.length > 0;
      });
    },
    groupList: function() {
      return this.$store.state.dataHandler.groupList;
    }
  },
  mounted: function() {
    console.log("this.groupList", this.groupList);
  }
};
</script>
<style scoped>
.message {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgb(235, 235, 235);
}

.messageItem {
  box-sizing: border-box;
  padding: 0 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  background: white;
  font-size: 0.8rem;
  position: relative;
  overflow: hidden;
}
.messageItem img {
  box-sizing: border-box;
  display: inline-block;
  flex-shrink: 0;
  margin-right: 0.5rem;
  width: 3rem;
  height: 3rem;
}

.messageItem .icon-muse {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  background-size: 100% 100%;
  overflow: hidden;
}
.messageItem:after {
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
.red-point {
  position: relative;
}
.red-point:before {
  position: absolute;
  display: block;
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50% 50%;
  background: red;
  left: 3.5rem;
  top: 0.3rem;
}

.messageItem .message-body {
  display: flex;
  flex-shrink: 2;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 3rem;
}
.messageItem .message-body div {
  flex-shrink: 1;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  overflow: hidden;
}
.messageItem .message-body div:first-child {
  font-size: 1rem;
}
.messageItem > div:last-child {
  position: relative;
  flex-shrink: 0;
  align-self: flex-end;
  align-items: flex-end;
  justify-content: flex-start;
  width: 4rem;
  height: 3rem;
  line-height: 1.2rem;
  /* background: cyan; */
  z-index: 1;
}
</style>
