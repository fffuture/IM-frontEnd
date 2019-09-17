<template>
	<!-- <div class="chatDetails" @click=""> -->
	<div class="chatDetails" @click.prevent="globalEvent">
		<header>
			<div @click="$router.go(-1)">
                <svg style="width:2rem;height:2rem">
                    <use xlink:href="#back-friendCircle"></use>
                </svg>
				<span>
                    {{$route.query.friendWeChatId}}
                    {{$route.query.groupName}}
                </span>
			</div>

            <router-link :to="{ path:'/main/message-contain/chat-contain/person-info',query:{'friendWeChatId':$route.query.friendWeChatId} }" tag="span">
                <svg style="width:2.5rem;height:2.5rem">
                    <use xlink:href="#more-chatDetails"></use>
                </svg>
            </router-link>
		</header>


		<!-- <ul class="container" ref="container" :class="{paddingBottom:emojiShow}" id="container">

            <div v-for="(item,index) in chat" :key="index">
                <div v-if=" item.type === 'sendFail' ">
                    <div v-if="item.content === '你不在对方好友列表中' " class="message-warning">
                        {{$route.query.friendWeChatId}}开启了好友验证，你还不是他（她）的好友。请先发送好友验证请求，对方验证通过后才能聊天。
                        <router-link :to="{path:'/main/message-contain/chat-contain/apply-check',query:{friendWeChatId:$route.query.friendWeChatId}}" tag="span">发送好友请求</router-link>
                    </div>
                    <div v-if="item.content === '消息被拒收' " class="message-defriend">
                        消息已发出，但被对方拒收了
                    </div>
                </div>
                <li style="position:relative;" v-else :class="item.sender === $store.state.dataHandler.weChatId?'self':'other'" >
                    <router-link :to="{path:'/main/message-contain/chat-contain/friend-info',query:{friendWeChatId:item.sender}}">
                        <img class="whosImg" :src="item.senderImg" alt="">
                    </router-link>
                    
                    <div @click="deleteMessage" v-html="item.content" v-if=" item.type === 'chat' "></div>
                    <img :src="item.content" style="max-width:70%;min-height:0;background-size:100% 100%;border-radius:.5rem .5rem;margin: .5rem .7rem;" v-if=" item.type === 'chatImg' "  alt="">
                    
                    <div class="operator">
                        <div v-for="(option,index) in operateList" :key="index" @click="option.event">
                            {{ option.name }}
                        </div>
                    </div>
                </li>
            </div>
        </ul> -->
        
		<ul class="container" ref="container" :class="{paddingBottom:emojiShow}" id="container">

            <div v-for="(item,index) in chatList" :key="index">
                <div v-if=" item.type === 'sendFail' ">
                    <div v-if="item.content === '你不在对方好友列表中' " class="message-warning">
                        {{$route.query.friendWeChatId}}开启了好友验证，你还不是他（她）的好友。请先发送好友验证请求，对方验证通过后才能聊天。<!--<span @click="addFriend">发送好友请求</span>-->
                        <router-link :to="{path:'/main/message-contain/chat-contain/apply-check',query:{friendWeChatId:$route.query.friendWeChatId}}" tag="span">发送好友请求</router-link>
                    </div>
                    <div v-if="item.content === '消息被拒收' " class="message-defriend">
                        消息已发出，但被对方拒收了
                    </div>
                </div>
                <li style="position:relative;" v-else :class="item.sender === user.weChatId?'self':'other'" >
                    <router-link :to="{path:'/main/message-contain/chat-contain/friend-info',query:{friendWeChatId:item.sender}}">
                        <img class="whosImg" :src="item.senderImg" alt="">
                    </router-link>
                    
                    <!-- <div @click="showOpearte(index)" v-html="item.content" v-if=" item.type === 'chat' "></div> -->
                    <div @touchstart="showOpearte('touchstart',index)" @touchmove="showOpearte('touchmove',index)" @touchend="showOpearte('touchend',index)" v-html="item.content" v-if=" item.type === 'chat' "></div>
                    <img :src="item.content" style="max-width:70%;min-height:0;background-size:100% 100%;border-radius:.5rem .5rem;margin: .5rem .7rem;" v-if=" item.type === 'chatImg' "  alt="">
                    
                    <div class="operator" style="display:none">
                        <div v-for="(option,optionsIndex) in operateList" :key="optionsIndex" @click="option.event(item)">
                            {{ option.name }}
                        </div>
                    </div>
                </li>
            </div>
        </ul>

		<footer>
            <div class="tools-controller">
                <img src="@/static/img/icons/micphone1.png" alt="" @click=" speech = !speech ">

                <!-- <input type="text" v-if="!speech" v-model="sendContent" @click="inputClick()" @blur="leaveInput()"> -->
                <!--<div class="input"-->
                     <!--contenteditable="true"-->
                     <!--v-model="sendContent"-->
                     <!--v-html="sendContent"-->
                     <!--@input="sendContent=$event.target.innerHTML"-->
                     <!--v-if="!speech"-->
                     <!--@click="inputClick()"-->
                     <!--@blur="leaveInput()">-->
                <!--</div>-->
                <user-input v-model="sendContent" v-if="!speech" ></user-input>

                <input type="button" value="按住 说话" v-else>

                <img src="@/static/img/icons/smile1.png" @click.stop="clickEmoji" alt="">

                <img src="@/static/img/icons/add2.png" v-if=" send || speech " @click="tools">
                <button @click="sent" v-else>发送</button>

            </div>


            <div class="emoji-pannel" v-show="emojiShow" @click.stop="">
                <swiper class="swiperOption" :options="swiperOption" ref="mySwiper">
                    <swiper-slide >
                        <img v-for="(emoji,index) in emojiData1"
                             v-bind:key="index"
                             :src="emoji.url"
                             @click.stop="clickImg(emoji)"
                             alt="">
                    </swiper-slide>

                </swiper>
                <div class="swiper-pagination"></div>
            </div>

            <div class="emoji-pannel" v-if="toolsShow">

                <div>
                    <input ref="selectImage"  @click="uploadImg($event)" @change="uploadImg($event)" type="file" accept="image/*" multiple="multiple"/> 
                    <!-- <input ref="selectImage" type="file" accept="image/*" multiple="multiple"/>  -->
                </div>

                <!-- <input ref="selectImage" @change = "uploadImg($event)" type="file" accept="image/*" multiple="multiple"/>  -->
            </div>

            <!-- <img :src="imageBase64" alt=""> -->

        </footer>

	</div>
</template>
<script>

import headTop from '@/components/header';
import userInput from '@/components/user-input';
import {mapState} from 'vuex'

// import { swiper, swiperSlide } from 'vue-awesome-swiper'

// const adapter = require('webrtc-adapter');

export default{
    components: {
		headTop,
        // swiper,
        // swiperSlide,
        userInput
	},
	data() {
		return {
            emojiShow:false,
            toolsShow:false,
            imageBase64:'',
            scrollToBottom:false,
			speech:false,
			sendContent:"",
			contentHeight:"",
            swiperOption: {
                notNextTick: true,
                direction : 'horizontal',
                mousewheelControl : true,
                observeParents:true,
                resistanceRatio:0.35,
                speed:300,
                pagination: {
                    el: '.swiper-pagination',
                },
            },
            chat:[
              /*  {
                    sender:"other",
                    senderImg:"http://47.103.151.107:8080/images/otherImg.jpg",
                    receiver:"self",
                    // receiverImg:'../static/img/icons/touxiang.jpeg',http://47.103.151.107:8080/images/touxiang.jpeg
                    receiverImg:'http://47.103.151.107:8080/images/touxiang.jpeg',
                    content:`这是要发送的文本！！这是要发送的表情<img class="emoji" src=\"http://123.207.3.64/wechat/images/a.png\"/>`,
                    time:'',
                },*/
            ],
            operateList:[
                {
                    name:'复制',
                    event:()=>{

                    }
                },
                {
                    name:'发送给朋友',
                    event:()=>{

                    }
                },
                {
                    name:'收藏',
                    event:()=>{

                    }
                },
                {
                    name:'提醒',
                    event:()=>{

                    }
                },
                {
                    name:'翻译',
                    event:()=>{

                    }
                },
                {
                    name:'删除',
                    event: message =>{
                        console.log('删除会话消息',message);

                        // console.log('值',this.chatList);
                        for( let i = 0; i < this.chatList.length; i++ ){
                            console.log('值',this.chatList[i]);
                            if( this.chatList[i] === message  ){
                                 console.log('找到相等值',message);
                                 this.chatList.splice(i,1);
                            }
                        }

                        // this.chatList.splice
                        // this.chatHistorys.filter(
                        //     item => {
                        //         return item.receiver === this.$route.query.friendWeChatId
                        //     }
                        // )[0].content
                        // for(){

                        // }


                    }
                },
                {
                    name:'更多',
                    event:()=>{

                    }
                },
            ],
            longPressTime:false,//是否执行长按事件依据的字段
            timeoutRecord:-1,//修改longPressTime的定时器
           //operatShow:[ //是否显示对话窗口是依据这个对象来进行判断，根据单一职责原则，不应该通过浅拷贝特性直接修改原数组

           // ],
            groupChat:[
                {
                    sender:'hello',
                    senderimg:"http://47.103.151.107:8081/images/otherImg.jpg",
                    receiver:'0', //群id
                    content:'群测试消息',
                    type:"groupChat",
                    time:'',
                }
            ],
            emojiData1:[
                {
                    name:'angry',
                    url:'http://47.103.151.107:8081/images/angry.png'
                },
                {
                    name:'anguished',
                    url:'http://47.103.151.107:8081/images/anguished.png'
                },
                {
                    name:'astonished',
                    url:'http://47.103.151.107:8081/images/cry.png'
                },
                {
                    name:'blush',
                    url:'http://47.103.151.107:8081/images/blush.png'
                }
            ]


		}
    },
    created:function(){
        console.log('当前用户聊天记录this.chatList:',this.chatList);
        console.log('当前用户',this.user);

         //当前的聊天
        this.chat = this.$store.state.dataHandler.chatHistorys.filter(
            item => {
                return item.receiver === this.$route.query.friendWeChatId
            }
        )[0].content;
        console.log( 'this.chat' ,this.chat);


    },
	mounted:function(){

        // console.log('adapter',adapter.default.browserDetails.browser);
        // let operateState = {
        //     'show':false
        // }
        // for( let i = 0; i < 50; i++){
            // this.operatShow.splice( this.operatShow.length,0,operateState );
            // console.log('this.operatShow:',this.operatShow);
        // }

        this.scrollBottom();
		this.$refs.container.scrollTo(0,Number.MAX_SAFE_INTEGER);
	},
	methods:{
        globalEvent:function(){
            this.emojiShow=false;
            this.setOperate("unshow");
        },

        setOperate:function(type,index){
            let eleList = this.$refs.container.getElementsByClassName('operator');

            for(let i = 0; i < eleList.length; i++){
                eleList[i].style = "display:none";
                // console.log("执行函数");
            }

            if(type === "show"){
                eleList[index].style="display:block";
            }
        },

        showOpearte:function(eventType,index){ 

            let that = this;
            switch(true){
                case eventType === 'touchstart':
                    clearTimeout( this.timeoutRecord );
                    this.timeoutRecord = -1;
                    this.timeoutRecord = setTimeout(
                        function(){
                            clearTimeout( that.timeoutRecord );
                            that.timeoutRecord = -1;//记录的是id值
                            // console.log("start 执行长按事件");
                            that.setOperate("show",index);
                        },500
                    );
                break;
                case eventType === 'touchmove':
                    if( that.timeoutRecord !== -1){ //在0.5s内移动手指
                        // console.log("直接取消长按事件");
                        clearTimeout( that.timeoutRecord );
                        that.timeoutRecord = -1;
                    }
                break;
                case eventType === 'touchend':
                    if( that.timeoutRecord !== -1){ 
                        // console.log("执行单击事件");
                        that.setOperate("unshow",index);
                        clearTimeout( that.timeoutRecord );
                        that.timeoutRecord = -1;
                    }
                break;
                default: return;
            }            

        },

		scrollBottom:function(){
			let count = 0;
            clearInterval( this.scrollToBottom ); //函数的防抖
			this.scrollToBottom = setInterval(
				()=>{
                    this.$refs.container.scrollTo(0,Number.MAX_SAFE_INTEGER);
                    // this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
					this.contentHeight += this.$refs.container.offsetHeight;
					count += 1;
					if( count > 5 ) {
						clearInterval( this.scrollToBottom );
					}
				},300 );
			// console.log('this.scrollToBottom',this.scrollToBottom);
        },
        // addFriend:function(){
        //     console.log('发送验证信息');
        // },
        inputClick:function(){
            this.scrollBottom();
            this.emojiShow = false;
        },
		leaveInput:function(){
			let that = this;
			// console.log("离开input"+that.scrollBottom);
		},
        clickEmoji:function(){
            // this.scrollBottom();
            this.emojiShow = !this.emojiShow;
            // console.log(this.emojiShow);
        },
        clickImg:function(emoji){
		    // console.log('当前的图片',event.currentTarget);
            // this.sendContent += event.currentTarget;
		    console.log(emoji);
            this.sendContent += "<img class='emoji' src='"+ emoji.url + "'>";
        },
        sent:function(){
            console.log('发送的内容',this.sendContent);
           /* this.chat.push(
                {
                    sender:"self",
                    senderImg:"http://47.103.151.107:8080/images/touxiang.jpeg",
                    receiver:"other",
                    receiverImg:'http://47.103.151.107:8080/images/otherImg.jpg',
                    content:this.sendContent,
                    time:'',
                }
            );*/
            let message = {
                sender: this.$store.state.dataHandler.user.weChatId,
                senderImg: this.$store.state.dataHandler.user.imgURL,
                receiver: this.$route.query.friendWeChatId,
                type:'chat',
                content:this.sendContent
            }
            // this.$store.commit('dataHandler/WEBSOCKETSEND',{receiver:this.$route.query.friendWeChatId,content:this.sendContent});
            // this.$store.commit('dataHandler/WEBSOCKETSEND',message);
            this.$store.dispatch('wsCenter/sendMsg',message)
            this.sendContent = "";
            // console.log('聊天记录：', this.$store.state.dataHandler.chatHistorys  );
        },
        tools:function(){
            // console.log("展示工具");
            this.toolsShow = ! this.toolsShow;
            //  console.log("选择图片", this.$refs.selectImage.files.length );
        },
        uploadImg: function(e){
            console.log("chatDetails uploadImgEvent");
            let file = e.target.files[0];
            console.log("获取图片", e.target.files[0]);

            if(file) {
                this.file = file
                // console.log(this.file);
                let reader = new FileReader()
                let that = this
                reader.readAsDataURL(file)
                reader.onload= function(e){
                    that.imageBase64 = this.result;
                    console.log("二进制",that.imageBase64);
                    // that.$store.commit('dataHandler/WEBSOCKETSEND',{receiver:that.$route.query.friendWeChatId,content:this.result});

                    let message = {
                        sender: that.$store.state.dataHandler.user.weChatId,
                        senderImg: that.$store.state.dataHandler.user.imgURL,
                        receiver: that.$route.query.friendWeChatId,
                        type:'chatImg',
                        content:that.imageBase64
                    }
                    that.$store.commit('dataHandler/WEBSOCKETSEND',message);
                    that.imageBase64 = "";

                    // that.$store.state.dataHandler.ws.send(  JSON.stringify({"sender":that.$store.state.dataHandler.weChatId,"receiver":that.$route.query.friendWeChatId,"type":"chatImg","content":this.result }) );
                
                    // for(let i = 0; i < that.$store.state.dataHandler.chatHistorys.length; i++ ){
                    //     if( that.$store.state.dataHandler.chatHistorys[i].receiver === that.$route.query.friendWeChatId ){
                    //         that.$store.state.dataHandler.chatHistorys[i].content.splice( that.$store.state.dataHandler.chatHistorys[i].content.length,0,{"sender":that.$store.state.dataHandler.weChatId,"receiver":that.$route.query.friendWeChatId,type:"chatImg","content":this.result });
                    //     }
                    // }
                            
                }
            }
            // state.ws.send( JSON.stringify({"sender":state.weChatId,"receiver":message.receiver,"type":"chat","content":message.content}) );   

        }
	},
	computed:{
        ...mapState('dataHandler',{
            user: state => state.user,
            chatHistorys: state => state.chatHistorys
        }),
        chatList:function(){
            return this.chatHistorys.filter(
                item => {
                    return item.receiver === this.$route.query.friendWeChatId
                }
            )[0].content

        //      this.chat = this.$store.state.dataHandler.chatHistorys.filter(
            //     item => {
            //         return item.receiver === this.$route.query.friendWeChatId
            //     }
        //      )[0].content;

        },
        // messageCount:function(){
        //     return this.chatList.length;
        // },
        // ...mapState('dataHandler',{
		// 	friendList:　state => state.friendList,
        //     user: state => state.user
		// }),
		send:function(){
			return this.sendContent.trim().length === 0;
        },
        
	},
    destroyed:function(){
        clearInterval( this.scrollToBottom );
    }
}

</script>
<style scoped>
	header{
		position: absolute;
		left:0;top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding:0 .5rem 0 0;
		width:100%;height: 3rem;
		background: rgb(48,48,48);
		z-index:1;
	}
	header div{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		min-width:0;height: 100%;
		color:#FFF;
	}
	.chatDetails {
		display:flex;flex-direction: column;
		justify-content: flex-start;
		width: 100%;height: 100%;
		background: rgb(245,245,245);
	}
	.container {
        box-sizing: border-box;
		list-style: none;margin:0;
		width:100%;height: 100%;
		flex-shrink: 1;
		overflow-y:scroll;
		padding:3rem .5rem 3.5rem .5rem;
	}
    .paddingBottom{
        padding-bottom:18.5rem;
    }
	.container li {
		display: flex;
		align-items: flex-start;
		width:100%;
        min-height: 2.2rem;
		margin-top: .75rem;
	}
	.container .other {  flex-direction: row;  }
	.container .other div {  
		background: white;
		position: relative;  
	}
	.container .other div:before {
		content:'';
		width: 0;height: 0;
		position: absolute;
		left: -.575rem;top: .85rem;
		border:.3rem solid transparent;
		border-right: .3rem solid white;
	}
	.container .self      {  flex-direction: row-reverse;  }
	.container .self div  {  
		background: rgb(160,231,90);
		position: relative; 
	}
	.container .self div:before{
		content:'';
		width: 0;height: 0;
		position: absolute;
		right: -.575rem;top: .85rem;
		border:.3rem solid transparent;
		border-left: .3rem solid rgb(160,231,90);
	}
	.container li .whosImg {
		width: 2.5rem;
		height: 2.5rem;
		flex-shrink: 0;
	}
	.container li div {
		min-width: 0;min-height: 0;
		line-height: 1.7rem;background: white;
		padding:.5rem .7rem .3rem .7rem;
		margin: 0 .6rem;
		word-break: break-all;
		border-radius: .5rem .5rem;
	}
	.container .time {
		font-size: .75rem;
		display:flex;justify-content: center;
		align-items: center;
	}
	.container .time span{
		display:inline-block;padding:.2rem .5rem;
		background-color:rgb(212,212,212);color:white;
		font-weight: 200;
		border-radius: .2rem;
	}
	footer {
        box-sizing: border-box;
        /*padding:0 .5rem;*/
		position: fixed;
        left: 0;
        bottom:0;
        display:flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
		width:100%;
        min-height: 3rem;
		background: white;
		border-top: .01rem solid rgb(220,220,220);
	}
    footer .tools-controller{
        box-sizing: border-box;
        padding: 0 .5rem;
        display:flex;
        justify-content: flex-start;
        align-items: center;
        width:100%;
        min-height: 2.9rem;
        max-height: 10rem;
        background: white;
    }
	footer img {
        margin:0 .2rem;
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
		margin:0 .8rem 0 1.2rem;
		color:rgb(100,100,100);
        width: 100%;
        height: 2rem;
        outline: none;
		background: white;
		border: 1px solid rgb(215,215,215);
		border-radius:.3rem;
	}
	/* footer input[type="text"]:focus{   } */
	footer button{
        padding:0;
		display:inline-block;
        margin:0 .2rem;
        flex-shrink: 0;
		width: 2.4rem;
        height: 2rem;
        line-height: 2.1rem;
		background: rgb(26,173,25);
		border:none;
		color:white;
		border-radius: .3rem;
        outline: none;
	}
    footer .emoji-pannel{
        position: relative;
        width: 100%;
        height: 15rem;
    }
    footer .swiperOption {
        box-sizing: border-box;
        padding:0 .5rem;
        flex-shrink:1;
        width: 100%;
        height: 15rem;
        overflow: scroll;
    }
    footer .emoji-pannel .swiperOption img{
        box-sizing: content-box;
        /*padding:0;*/
        margin:0;
        padding: 10% 1rem 0 1rem;
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;

    }
    footer .emoji-pannel .swiper-pagination{
        position: absolute;
        left:0;
        bottom:1rem;
        display: flex;
        justify-content: center;
        width: 100%;
        min-height: 0;
    }
    footer .emoji-pannel .swiper-pagination span{
        margin: 0 .5rem;
    }
    .swiper-pagination-bullet{
        margin:0 10px;
    }
    .message-warning{
        margin:.5rem auto;
        padding:.5rem .5rem;
        display: block;
        max-width:80%;
        min-height: 0;
        background: #e6e6e6;
        color:#fffdff;
        border-radius: .5rem .5rem;
        line-height: 1.1rem;
    }
    .message-warning span{
        color:#252f60;
    }
    .message-defriend{
        flex-shrink: 0;
        margin:.5rem auto;
        padding:.5rem .5rem;
        display: block;
        min-width: 0;
        width: 13rem;
        min-height: 0;
        background: #e6e6e6;
        color:#fffdff;
        border-radius: .5rem .5rem;
        line-height: 1.1rem;
        text-align: center;
    }
    .container .self .operator{
        position: absolute;
        left:1rem;
        top:2.5rem;
        box-sizing: border-box;
        padding:.5rem .75rem;
        margin:0;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        min-width: 0;
        min-height: 0;
        /* background: cyan; */
        background: #fff;
        border-radius: 0;
    }
    .container .self .operator div{
        box-sizing: border-box;
        padding:0;
        margin:0;
        width: 4.5rem;
        min-height: 1rem;
        /* background: orange; */
        background: #fff;
        border-radius: 0;
    }
    .container .self .operator:before,.container .self .operator div:before{
        display: none;
    }
</style>
