<template>
    <div class="skeleton-wrapper">
        <!--<img :src="require('../static/img/startImg.png')" alt="">-->
        <!-- <header-top></header-top> -->

        <header class="header">
		<span>微信</span>
		<div>
			<span>
				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
				<g id="layer101" fill="#303030" stroke="none">
				 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z"/>
				 </g>
				<g id="layer102" fill="#d2d2d2" stroke="none">
				 <path d="M578 573 l-46 -46 -51 21 c-140 61 -290 -15 -316 -160 -19 -102 58 -221 159 -247 185 -46 331 132 254 310 l-21 50 48 49 c26 26 44 53 41 59 -11 18 -19 14 -68 -36z m-119 -61 c91 -46 126 -154 79 -242 -35 -65 -85 -92 -165 -87 -101 5 -154 57 -161 156 -4 51 -1 67 22 104 45 78 148 109 225 69z"/>
				 </g>
				<g id="layer103" fill="#fefefe" stroke="none">
				 <path d="M573 568 l-51 -50 -28 21 c-18 13 -52 23 -90 27 -53 6 -67 3 -118 -22 -62 -30 -86 -57 -106 -119 -33 -99 7 -205 97 -259 44 -26 54 -28 120 -24 94 6 139 35 178 115 24 50 27 64 21 117 -4 38 -14 72 -27 90 l-21 28 51 52 c42 43 49 55 38 64 -10 9 -24 0 -64 -40z m-103 -60 c78 -40 114 -152 75 -233 -26 -56 -86 -96 -147 -99 -152 -9 -241 133 -166 264 16 28 43 60 61 70 44 28 120 26 177 -2z"/>
				 </g>

				</svg>
			</span>
			<span>
				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
				<g id="layer101" fill="#303030" stroke="none">
				 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z"/>
				 </g>
				<g id="layer102" fill="#4d4d4d" stroke="none">
				 <path d="M368 543 l-3 -108 -107 -3 c-60 -1 -108 -7 -108 -12 0 -4 -2 -14 -5 -22 -4 -10 18 -13 107 -13 l113 0 0 -111 c0 -109 1 -112 23 -112 22 0 22 3 22 115 l0 115 110 -4 c108 -3 110 -3 110 20 0 21 -3 22 -110 22 l-110 0 0 110 c0 103 -1 110 -20 110 -18 0 -20 -8 -22 -107z"/>
				 </g>
				<g id="layer103" fill="#cccccc" stroke="none">
				 <path d="M368 543 l-3 -108 -107 -3 c-99 -2 -108 -4 -108 -22 0 -18 9 -20 108 -22 l107 -3 3 -107 c2 -100 4 -108 22 -108 19 0 20 7 20 110 l0 110 110 0 c103 0 110 1 110 20 0 19 -7 20 -110 20 l-110 0 0 110 c0 103 -1 110 -20 110 -18 0 -20 -8 -22 -107z"/>
				 </g>
				<g id="layer104" fill="#ffffff" stroke="none">
				 <path d="M370 530 l0 -110 -110 0 c-90 0 -110 -3 -110 -15 0 -11 21 -15 108 -17 l107 -3 3 -107 c2 -87 6 -108 17 -108 12 0 15 20 15 110 l0 110 110 0 c90 0 110 3 110 15 0 11 -21 15 -107 17 l-108 3 -3 108 c-2 86 -6 107 -17 107 -12 0 -15 -20 -15 -110z"/>
				 </g>
				</svg>
			</span>
		</div>
	</header>


        <div class="content">
            <div class="chat-item" v-for="(item,index) in 15" :key="index">
                <div class="img"></div>
                <div class="message">
                    <span></span>
                    <span></span>
                </div>
                <div class="time">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import headerTop from '@/components/header';



export default {
    name: 'skeleton',
    data(){
        return {

        }
    },
    components:{
        headerTop
    }

};
</script>

<style scoped>

body{
    padding:0;
    overflow: hidden;
}

.skeleton-wrapper{
    width:100%;
    height:100%;
    overflow: hidden;
}
.content{
    padding:3rem 0 0 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.content .chat-item{
    box-sizing: border-box;
    padding:0 .75rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 4rem;
    background: white;
    font-size: .8rem;
    position: relative;
}
.content .chat-item .img{
    box-sizing: border-box;
    display: inline-block;
    flex-shrink: 0;
    margin-right: .5rem;
    width: 3rem;
    height: 3rem;
    background: #e6e6e6;
}
.content .chat-item div{
    display: flex;justify-content: space-around;
    flex-direction: column;
    width: 100%;
    height: 3rem;
}
.content .chat-item span{
    display: inline-block;
    width: 100%;
    height: 1rem;
}
.content .chat-item span{
     background: #e6e6e6;
 }
.content .chat-item div:last-child{
    box-sizing: border-box;
    padding:0 0 0 1rem;
    flex-shrink: 0;
    align-items: flex-end;
    width: 4rem;
    height: 3rem;
}
/*.content .chat-item div:last-child span{*/
    /*display: inline-block;*/
    /*width: 3rem;*/
    /*height: 1rem;*/
/*}*/
.content .chat-item:after{
    position: absolute;
    content:"";
    width: 100%;
    height: .036rem;
    background-color: rgb(190,190,190);
    left:0;
    top:3.98rem;
    transform:scaleY(.5);
    z-index:1;
}


header{
		position: fixed;left: 0;top: 0;
		display: flex;justify-content: space-between;flex-shrink: 0;align-items: center;
		box-sizing: border-box;
		padding:0 .75rem;
		width: 100%;height: 3rem;
		color:white;
		background: rgb(48,48,48);
		font-size: 1rem;
		z-index: 2;
	}
	header>div{
		position: relative;
	}
	header>div span{
		display: inline-block;
		margin:auto .75rem auto .75rem;
	}
	header .fa-search{
		font-size: 1.5rem;
		-webkit-text-stroke: .13rem rgb(48,48,48); color: white;
		margin-right: .1rem;
	}
	header .fa-plus{
		font-size: 1.8rem;
		-webkit-text-stroke: .3rem rgb(48,48,48); color: white;
		transform: translateY(.2rem);
	}
	.spreadList{
		position: absolute;
		display: flex;flex-direction: column;justify-content: flex-start;
		width: 12rem;min-height: 0rem;
		left:-5.75rem;top:2.3rem;
		background: rgb(57,58,63);
		box-shadow: 0 0 .2rem rgb(20,20,20);
	}
	.spreadList div{
		box-sizing: border-box;
		display: flex;justify-content: flex-start;align-items: center;
		padding:0 .75rem;
		width:100%;height: 2.8rem;line-height: 2.8rem;
		border-bottom:.01rem solid rgb(50,50,50);
	}
	.spreadList i{
		display: inline-block;
		width: 1.5rem;height: 1.5rem;
		background: cyan;
		margin-right:.75rem;
	}


</style>
