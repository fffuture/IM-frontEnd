<template>
  <div class="contact" ref="contact">
    <div
      style="width:1rem;height:3rem;position:absolute;z-index:-1,visibility: hidden;"
      ref="reference"
    ></div>
    <!-- 
		<div class="contactsItem" v-for="(item,index) in systemSelect" :key="index">
			<img :src="  item.img  " alt="">
			<span> {{ item.title }} </span>
    </div>-->

    <router-link
      class="contactsItem"
      :to="!!item.href?item.href:''"
      v-for="(item,index) in systemSelect"
      :key="index"
      tag="div"
    >
      <img :src="  item.img  " alt />
      <span>{{ item.title }}</span>
    </router-link>

    <!-- <router-link class="contactsItem" v-for="item in $store.state.dataHandler.friendList" :key="item.friendWeChatId" :to="{path:'/main/message-contain/chat-details',query:{friendWeChatId:item.friendWeChatId}}" tag="div"> -->
    <router-link
      class="contactsItem"
      v-for="item in friendListSort"
      :class="{hadGroupName:item.isFirst}"
      :key="item.friendWeChatId"
      :to="{path:'/main/message-contain/chat-contain/friend-info',query:{friendWeChatId:item.friendWeChatId}}"
      tag="div"
    >
      <div class="groupName" v-if="item.isFirst" :id="item.firstLetter">{{ item.firstLetter }}</div>
      <img :src="item.imgUrl" alt />
      <span>{{ item.remarks }}</span>
    </router-link>

    <div
      class="selectGroup"
      ref="selectGroup"
      onselectstart="return false"
      @touchstart.stop.prevent="selectGroup"
      @touchmove.stop.prevent="selectGroup"
      @touchend.stop.prevent="selectGroupEnd"
    >
      <div v-for="item in group" :key="item">
        <a :href="'#' + item ">{{item}}</a>
      </div>
    </div>
    <div class="showGroup" v-if="showGroup">{{currentGroup}}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CnChar from "cnchar";
require("cnchar");
// console.log("CnChar", CnChar);
// const CnChar = require("cnchar");

export default {
  computed: {
    ...mapState("dataHandler", {
      friendList: state => state.friendList,
      user: state => state.user
    }),
    friendListSort: function() {
      // return this.friendList
      // return this.friendList.sort(
      // 	( preUser,nextUser ) =>{
      // 		return preUser.remarks.localeCompare( nextUser.remarks );
      // 	}
      // )
      // let letterBegin = /^[a-zA-Z]/;
      // console.log('测试字母开头',  letterBegin.test("1bc") );

      // console.log("拼写:", "abc".spell());

      let addSpellList = this.friendList.filter(friend => {
        // console.log("friend.remarks.spell()", friend.remarks);
        friend.letterSpell = friend.remarks.spell();
        friend.firstLetter = (
          friend.letterSpell.split("")[0] + ""
        ).toUpperCase();
        // friend.firstLetter = friend.firstLetter.toUpperCase();
        return true;
      });

      let letterBegin = /^[a-zA-Z]/;

      let sortList = addSpellList.sort((pre, next) => {
        // if( letterBegin.test( pre.letterSpell ) && letterBegin.test( next.letterSpell ) ){
        // 	return preUser.remarks.localeCompare( nextUser.remarks );
        // }
        switch (true) {
          case letterBegin.test(pre.letterSpell) &&
            letterBegin.test(next.letterSpell):
            return pre.letterSpell.localeCompare(next.letterSpell);
          case letterBegin.test(pre.letterSpell) &&
            !letterBegin.test(next.letterSpell):
            return 1;
          case !letterBegin.test(pre.letterSpell) &&
            letterBegin.test(next.letterSpell):
            return -1;
          default:
            return 0;
        }
      });

      /***
       * @ arr 传入的对象数组
       * @ param 依据判断的参数
       * @ index
       * 对象的pram字段在对象数组中是不是第一次出现
       */
      function firstJudge(arr, param, index) {
        let paramList = [];
        arr.filter(item => {
          paramList.push(item.firstLetter);
          return true;
        });
        let isFrist = paramList.indexOf(param);

        if (isFrist === index) {
          return true;
        }
        return false;
      }

      return sortList.filter((friend, index, list) => {
        // if( index ){

        // };
        // if( list.indexOf( friend.firstLetter ) === index ){
        // 	console.log('首位：', friend.firstLetter );
        // 	friend.isFirst = true;
        // }else{
        // 	friend.isFirst = false;
        // }
        friend.isFirst = firstJudge(list, friend.firstLetter, index);
        // console.log('首位：', friend.firstLetter );
        return true;
      });
      // console.log( 'spell', );
    }
  },
  data() {
    return {
      systemSelect: [
        {
          img: require("../../static/img/icons/addFriend.png"),
          title: "新的朋友",
          href: "/main/new-friend"
        },
        {
          img: require("../../static/img/icons/contact-1.png"),
          title: "群聊"
        },
        {
          img: require("../../static/img/icons/tag.png"),
          title: "标签"
        },
        {
          img: require("../../static/img/icons/gongzhonghao.png"),
          title: "公众号"
        }
      ],
      // friendList:[{

      // }],
      group: [
        "^",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#"
      ],
      showGroup: false,
      currentGroup: "^"
    };
  },
  created: function() {
    // this.friendList = this.$store.state.dataHandler.friendList;
  },
  mounted: function() {
    console.log("contact friend", this.$store.state.dataHandler.friendList);
    // this.friendList = this.$store.state.dataHandler.friendList;
    // console.log('contact高度',this.$refs.contact.offsetHeight);
    // console.log('spell',"测试".spell() );
  },
  methods: {
    //通过事件委托来提升性能
    selectGroup: function(e) {
      this.$refs.selectGroup.style = "background:gray";
      let height = this.$refs.contact.offsetHeight;
      let rereference = this.$refs.reference.offsetHeight;
      // console.log("header",this.$refs.reference.offsetHeight);
      let lastPosY = e.targetTouches[0].clientY;
      // console.log('this.lastPosY ',lastPosY );
      // console.log('this.containerHeight ',height );
      // console.log('this.mix ',height/28 );
      for (let i = 1; i <= this.group.length; i++) {
        if ((height / 28) * i > lastPosY - rereference) {
          this.currentGroup = this.group[i - 1];
          this.showGroup = true;
          console.log("i", i);
          //拿到对应节点，模拟点击事件
          console.log(
            "dom",
            this.$refs.selectGroup.getElementsByTagName("div")[i]
          );
          this.$refs.selectGroup
            .getElementsByTagName("div")
            [i - 1].getElementsByTagName("a")[0]
            .click();
          // this.$refs.selectGroup.a[i].click();
          return;
        }
      }
    },
    selectGroupEnd: function() {
      this.$refs.selectGroup.style = "background:transprant";
      // console.log('item');
      this.showGroup = false;
    }
  }
};
</script>
<style scoped>
.contact {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgb(235, 235, 235);
  /*padding-top: 3rem;*/
  overflow: scroll;
}
.contactsItem {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0.75rem;
  width: 100%;
  height: 3.5rem;
  line-height: 3.5rem;
  background: white;
  position: relative;
}
.contactsItem:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0.036rem;
  background-color: rgb(190, 190, 190);
  left: 0;
  bottom: 0.02rem;
  transform: scaleY(0.5);
  z-index: 1;
}
.contactsItem img {
  position: relative;
  display: inline-block;
  margin-right: 0.5rem;
  width: 2.2rem;
  height: 2.2rem;
}
.contactsItem .groupName {
  box-sizing: border-box;
  padding: 0 0.75rem;
  position: absolute;
  top: -1rem;
  left: 0;
  width: 100%;
  height: 1.3rem;
  line-height: 1.3rem;
  font-size: 0.7rem;
  background: #ebebeb;
  color: #8a8a8a;
}
.hadGroupName {
  margin-top: 1rem;
}

.selectGroup {
  position: absolute;
  right: 0rem;
  top: 0;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 1.5rem;
  height: 100%;
}
.selectGroup div {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
  min-height: 0;
  text-align: center;
  font-size: 0.7rem;
  color: #303030;
}
.selectGroup a {
  text-decoration: none;
  color: #303030;
}
.showGroup {
  position: absolute;
  left: 40%;
  top: 40%;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  background: rgba(60, 60, 60, 0.6);
  color: white;
  border-radius: 0.5rem 0.5rem;
  z-index: 2;
}
</style>
