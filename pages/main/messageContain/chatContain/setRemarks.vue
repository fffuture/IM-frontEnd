<template>
  <div class="setRemarks">
    <header>
      <div @click="$router.go(-1)">
        <svg style="width:2rem;height:2rem;">
          <use xlink:href="#back-fix-friendCircle" />
        </svg>
        <span>设置备注和标签</span>
      </div>

      <button @click="modifyRemarks">完成</button>
    </header>
    <div class="set-option" v-for="(option,index) in optionList" :key="index">
      <span>{{ option.name }}</span>
      <input type="text" v-model="option.value" :placeholder="option.placeholder" />
    </div>
    <!-- {{friendList}} -->
    <!-- {{friend}} -->
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("dataHandler", {
      friendList: state => state.friendList,
      user: state => state.user
    })
    /* friend:function(){
            let friendEntity = this.friendList.filter(
                            friend => {
                                return friend.friendWeChatId === this.$route.query.friendWeChatId;
                            }
                         )[0];
            //  console.log('friendEntity',friendEntity);
            this.optionList[0].value = friendEntity.remarks;
            //  console.log('this.optionList[0].value',this.optionList);
            return friendEntity;
        }*/
  },
  data() {
    return {
      friend: {},
      optionList: [
        {
          name: "备注名",
          value: "",
          placeholder: "添加标备注名"
        },
        {
          name: "标签",
          value: "",
          placeholder: "添加标签对联系人进行分类"
        },
        {
          name: "电话号码",
          value: "",
          placeholder: "添加电话号码"
        },
        {
          name: "描述",
          value: "",
          placeholder: "添加更多备注信息"
        },
        {
          name: "附加图片",
          value: "",
          placeholder: "添加名片或相关图片"
        }
      ]
    };
  },
  mounted: function() {
    this.initFriend();
  },
  methods: {
    initFriend: function() {
      this.friend = this.friendList.filter(friend => {
        return friend.friendWeChatId === this.$route.query.friendWeChatId;
      })[0];
      this.optionList[0].value = this.friend.remarks;
    },
    modifyRemarks: function() {
      console.log("btn click");
      if (this.optionList[0].value === this.friend.remarks) {
        return;
      }

      let setRemarks = {
        sender: this.user.weChatId,
        senderImg: this.user.imgURL,
        receiver: this.$route.query.friendWeChatId,
        type: "modifyRemarks",
        content: this.optionList[0].value
      };
      console.log("setRemarks: ", setRemarks);
      // this.$store.commit('dataHandler/WEBSOCKETSEND',setRemarks);
      //   this.$store.commit("wsCenter/sendMessage", setRemarks);
    }
  }
};
</script>

<style scoped>
.setRemarks {
  width: 100%;
  height: 100%;
  background: #ededed;
}
header {
  box-sizing: border-box;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  border-bottom: 0.01rem solid #e1e1e1;
  /* background: green; */
}
header > div {
  display: flex;
  min-width: 0;
  height: 3rem;
  align-items: center;
}
header button {
  outline: none;
  display: block;
  /* padding:.2rem .5rem; */
  border-radius: 0.25rem;
  width: 3.6rem;
  height: 2rem;
  line-height: 2rem;
  border: none;
  background: #07c160;
  color: #fff;
}
.set-option {
  box-sizing: border-box;
  padding: 0 0.75rem;
  display: flex;
  justify-content: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
}
.set-option span {
  display: block;
  min-width: 0;
  height: 3rem;
  line-height: 3.5rem;
  /* background: orange; */
  color: #9c9c9c;
}
.set-option input {
  width: 100%;
  height: 2rem;
  outline: none;
  border: none;
  background: transparent;
  border-bottom: 0.01rem solid #d8d8d8;
  line-height: 1rem;
  text-indent: 0.4rem;
}
</style>

