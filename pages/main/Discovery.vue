<template>
	<div class="discovery">
		<section class="container">

				<!--<ul class="funcList">
					<li>
						<div>
							<img src="" alt="">
							<span>朋友圈</span>
							<span class="mark">New</span>
						</div>
						<div>
							<span class="color-gray">首发抢2888红包</span>
							<img src="" alt="">
						</div>
					</li>
				</ul>-->
				<funcList :systemSelects="systemSelect"></funcList>
		</section>
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
                        img:require("@/static/img/icons/pinwheel-discovery.png"),
                        title:"朋友圈",
                        target:"/main/discovery-contain/friend-circle",
                        isNew:false,
                        redPoint:false
                    }
                ],
                [
                    {
                        img:require("@/static/img/icons/photograph-discovery.png"),
                        title:"扫一扫",
                        target:"/",
                        isNew:false,
                        redPoint:false
                    }
                ],
                [
                    {
                        img:require("@/static/img/icons/look-discovery.png"),
                        title:"看一看",
                        target:"/",
                        isNew:true,
                        redPoint:false
                    },
                    {
                        img:require("@/static/img/icons/search-discovery.png"),
                        title:"搜一搜",
                        target:"/",
                        isNew:false,
                        redPoint:false
                    }
                ],
                [
                    {
                        img:require("@/static/img/icons/shopping-discovery.png"),
                        title:"购物",
                        target:"/",
                        isNew:false,
                        redPoint:false
                    },
                    {
                        img:require("@/static/img/icons/game-discovery.png"),
                        title:"游戏",
                        target:"/",
                        isNew:false,
                        redPoint:true
                    }
                ],
                [
                    {
                        img:require("@/static/img/icons/program-discovery.png"),
                        title:"小程序",
                        target:"/",
                        isNew:false,
                        redPoint:false
                    }
                ]
            ]
		}
	},
	components: {
        funcList
    },
}



</script>
<style scoped>
	.color-gray{
		color:rgb(150,150,150);
	}

	.discovery{
		display: flex;flex-direction: column;justify-content: flex-start;
		width: 100%;height: 100%;background: rgb(235,235,235);
	}

	.container{
		flex-shrink: 1;
		box-sizing: border-box;
		/*margin-top: 3rem;*/
		width: 100%;height: 100%;
		background: transparent;
	}
	/*ul{
		box-sizing: border-box;
		display: block;
		list-style: none;
		padding:0 .75rem;margin:0;
		background: white;
		margin-top:1rem;
	}
	ul li{
		display: flex;justify-content: space-between;flex-wrap: nowrap;
		width: 100%;height: 3rem;
	}
	ul li div{
		display: flex;justify-content: flex-start;flex-shrink: 0;
		width: 50%;height: 100%;
		align-items: center;
	}
	ul li div:last-child{
		justify-content: flex-end;flex-shrink: 1;
		font-size: .75rem;
	}
	ul img{
		display: inline-block;
		padding:0;margin:auto .75rem auto .5rem;
		width: 1.6rem;height: 1.6rem;
		background: cyan;
		border:0;
	}
	ul img:last-child{
		width:2rem;height: 2rem;
		margin:auto .5rem auto .5rem;
		position: relative;
	}
	ul img:last-child:before{
		position: absolute;
		display: block;
		content:"";
		width: .5rem;height: .5rem;
		border-radius: 50% 50%;
		background: red;
		right: -.25rem;top:-.25rem;
	}
	ul div .mark{
		display: block;
		padding:0 .5rem;margin-left: .3rem;
		height: 1.1rem;line-height: 1.15rem;
		background: rgb(255,62,62);color:white;
		border:0;border-radius:1.5rem;
		font-weight: 800;font-size: .6rem;
	}
*/

</style>
