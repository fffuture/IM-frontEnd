<template>
	<div class="mine">
		<div class="self-info">
			<img :src="$store.state.dataHandler.user.imgURL" alt="">
			<div>
				<span>{{$store.state.dataHandler.user.weChatName}}</span>
				<span class="color-gray">微信号：{{$store.state.dataHandler.user.weChatId}}</span>
			</div>
			<img src="../../static/img/icons/QRcode.jpg" alt="">		
		</div>
		<funcList :systemSelects="systemSelect"></funcList>
	</div>
</template>
<script>
import funcList from '@/components/funcList';

export default{
	data() {
		return {
            systemSelect:[
                [
                    {
                        img:require("../../static/img/icons/1.png"),
                        title:"钱包",
                        target:"/",
                        isNew:false,
                        redPoint:false
                    }
                ],
                [
                    {
                        img:require("../../static/img/icons/2.png"),
                        title:"收藏",
                        target:"/",
                        isNew:false,
                        redPoint:false
                    },
                    {
                        img:require("../../static/img/icons/3.png"),
                        title:"相册",
                        target:"/",
                        isNew:false,
                        redPoint:false
                    },
                    {
                        img:require("../../static/img/icons/4.png"),
                        title:"卡包",
                        target:"/",
                        isNew:false,
                        redPoint:false
                    },
                    {
                        img:require("../../static/img/icons/5.png"),
                        title:"表情",
                        target:"/",
                        isNew:false,
                        redPoint:false
                    }
                ],
                [
                    {
                        img:require("../../static/img/icons/6.png"),
                        title:"设置",
                        target:"/",
                        isNew:false,
                        redPoint:false
                    },
                ]
            ]
		}
	},
	components: {
		funcList
	}
}

</script>
<style scoped>
	.color-gray{
		color:rgb(150,150,150);
	}

	.mine{
		box-sizing: border-box;
		display: flex;flex-direction: column;justify-content: flex-start;
		width: 100%;height: 100%;
		background: rgb(235,235,235);
		/*padding-top: 4rem;*/
		padding-top:1rem;
	}
	.self-info{
		box-sizing: border-box;
		display: flex;flex-direction: row;align-items: center;
		justify-content: flex-start;
		width: 100%;height: 5rem;
		padding:0 .75rem;
		background: white;
		flex-shrink: 0;
	}
	.self-info img{
		display: block;flex-shrink: 0;
		width: 3.7rem;height: 3.7rem;
		background: cyan;
	}
	.self-info img:first-child{ margin-right: .5rem; }
	.self-info img:last-child{
		width: 2rem;height: 2rem;
	}
	.self-info div{
		box-sizing: border-box;
		display: flex;flex-direction: column;justify-content: space-evenly;
		box-sizing: border-box;padding:1rem 0;
		width: 100%;height: 100%;
	}


</style>
