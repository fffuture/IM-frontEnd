<template>
	<div class="search">

		<header>
			<svg style="width:2rem;height:2rem" @click="goback()">
				<use xlink:href="#back-fix-friendCircle"></use>
			</svg>

			<input type="text" v-model="searchContent" placeholder="搜索" autofocus="autofocus">
			<span>
                <img class="icon-mic" src="@/static/img/icons/mic-search.png" alt="">
			</span>
		</header>

		<div class="addFriend" v-if=" searchContent!=='' " @click="addFriend">
			<img src="@/static/img/icons/addFriend.png/" alt="">
			搜索:
			<!-- <span style="color:green;">{{searchContent}}</span> -->
			<span style="color:green;">{{searchContent}}</span>
			<!-- <router-link :to="{path:'/main/message-contain/chat-contain/friend-info',query:{friendWeChatId:item.sender}}">
                <img class="whosImg" :src="item.senderImg" alt="">
            </router-link> -->
		</div>

		<div class="title color-gray" v-else>搜索指定内容</div>

		<div class="container color-gray">
			<div>朋友圈</div>|
			<div>文章</div>|
			<div>公众号</div>

			<div>小说</div>|
			<div>音乐</div>|
			<div>表情</div>
		</div>	
	

	</div>
</template>
<script>

export default{
	data(){
		return{
			searchContent:'',
		}
	},
	methods:{
		goback:function(){
			this.$router.go(-1);
		},
		addFriend:function(){
			for( let i = 0; i < this.$store.state.dataHandler.friendList.length; i++){
				if( this.$store.state.dataHandler.friendList[i].friendWeChatId === this.searchContent ){
					this.$router.push( { path: '/main/message-contain/chat-contain/friend-info', query: { friendWeChatId: this.searchContent,page:"friend" }} );
					return ;
				}
			}
			this.$router.push( { path: '/main/message-contain/chat-contain/friend-info', query: { friendWeChatId: this.searchContent,page:"search" }} );
			// let message = {
			// 	content:'想添加你为好友',
			// 	receiver:this.searchContent,
			// }
			// for( let i = 0; i < this.$store.state.dataHandler.friendList.length; i++){
			// 	if( this.$store.state.dataHandler.friendList[i].friendWeChatId === this.searchContent ){
			// 		console.log("已存在!!");
			// 		return ;
			// 	}
			// }
			// this.$store.commit('dataHandler/ADDFRIEND',message);
			// console.log('添加朋友');
		}
	}
}

</script>
<style scoped>
	.color-gray{
		color:rgb(150,150,150);
	}
	.search{
		width: 100%;
        height: 100%;
	}
	header{
		position: relative;
        box-sizing: border-box;
        padding:0 .75rem 0 0;
		display: flex;
        justify-content: space-between;
		width: 100%;
        height: 3rem;
        align-items: center;
        background: #fff;
	}
	header span{
        box-sizing: border-box;
		display: flex;
        justify-content: flex-start;
        align-items: center;
		flex-shrink: 0;
		width: 2.3rem;
        height: 2.3rem;
		font-weight: 200;
        color:rgb(24,24,24);
	}
    .icon-mic{
        margin-right: .5rem;
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        background-size: 100% 100%;
        flex-shrink: 0;
    }
	header span:last-child{
		position: absolute;
		right:0;top: 0;
		font-size: 1.4rem;
		align-items: flex-end;
		color:rgb(170,170,170);
	}
	header input{
		display: inline-block;
		box-sizing: border-box;
		width: 100%;
        height: 2rem;
		border:0;
        border-bottom: .01rem solid rgb(102,202,67);
		text-indent: .5rem;
		outline: none;
	}

	.addFriend{
		box-sizing: border-box;
		padding: 0 .75rem;
		margin: 0 0 3rem 0;
		display:flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 3.5rem;
		/* background: cyan; */
	}
	.addFriend img{
		margin-right: .75rem;
		display: inline-block;
		width: 3rem;
		height:3rem;
		background: green;
		border:none;
	}


	.title{
        margin:4rem 0 3rem 0;
		text-align: center;
	}
	.container{
        box-sizing: border-box;
        padding:0 10%;
		display: flex;
        justify-content: space-evenly;
		flex-wrap:wrap;
		width: 100%;
        height: 8rem;
	}
	.container div{
		width:25%;
        height: 3rem;
		text-align: center;
		color:rgb(26,173,25);
	}
</style>
