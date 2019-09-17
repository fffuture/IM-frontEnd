<template>

<div class="swiper" @click="hiddenTool()" @touchstart="hiddenTool()" >
	<header class="header" ref="header">
		<span>微信</span>
		<div>
			<router-link to="/main/search" tag="span">
				<svg style="width:2rem;height:2rem;">
                	<use xlink:href="#searcher" />
            	</svg>
			</router-link>
			<span @click.stop=" display = !display "  @touchstart.stop.prevent=" display = !display ">
				<svg style="width:2rem;height:2rem;">
                	<use xlink:href="#add" />
            	</svg>
			</span>
			<div class="spreadList" v-show="display">
				<div v-for="(item,index) in spreadLists" :key="index" @touchstart.stop.prevent="testSpread(item)">
                    <img :src=" item.img" alt="" v-if="item.img != '' && !! item.img">
					<svg v-else-if="item.svg != '' && !! item.svg">
						<use :xlink:href="item.svg"></use>
					</svg>
					{{ item.title }}
				</div>
			</div>
		</div>
	</header>

	<swiper class="swiperOption" :options="swiperOption" ref="mySwiper">
	    <!-- slides -->
	    <swiper-slide>
			<msg-page></msg-page>
	    </swiper-slide>
	    <swiper-slide>
			<contact-page></contact-page>
	    </swiper-slide>
	    <swiper-slide>
			<discovery-page></discovery-page>
	    </swiper-slide>
	    <swiper-slide>
			<mine-page></mine-page>
	    </swiper-slide>
  	</swiper>

	<footer class="color-gray">
			<div @click=" toSlide(0) "  @touchstart.stop.prevent=" toSlide(0) ">
				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
					<g id="msg101" ref="msg101" fill="#46c01b" stroke="none">
					 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z"/>
					</g>
					<g id="msg102" fill="#b1b1b1" stroke="none">
					 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z m177 236 c51 -17 55 -17 113 3 161 56 334 3 417 -126 31 -48 35 -63 36 -121 1 -99 -45 -180 -134 -234 -118 -73 -303 -65 -402 16 -108 89 -141 217 -82 324 25 47 27 53 13 74 -24 38 -40 91 -25 85 6 -2 36 -12 64 -21z"/>
					 <path d="M365 629 c-27 -4 -66 -15 -87 -25 -33 -15 -40 -15 -82 -1 -25 9 -46 14 -46 12 0 -2 7 -20 16 -38 16 -33 16 -36 -12 -82 -55 -95 -29 -222 59 -289 65 -49 126 -69 210 -69 69 0 87 4 145 34 143 73 189 211 111 334 -59 92 -188 143 -314 124z"/>
					</g>
					<g id="msg103" fill="#fcfcfc" stroke="none">
					 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z m555 244 c66 -23 166 -121 183 -180 45 -154 -48 -300 -222 -350 -220 -62 -450 104 -422 304 3 25 15 63 26 84 25 48 25 50 -5 109 -29 58 -23 61 68 30 51 -18 59 -18 86 -5 73 36 193 40 286 8z"/>
					 <path id="msg104" ref="msg104" fill="#46c01b" d="M325 616 c-23 -7 -49 -17 -60 -23 -14 -8 -29 -7 -58 3 -22 8 -42 12 -44 10 -3 -2 3 -18 11 -35 16 -30 15 -32 -9 -70 -17 -25 -28 -59 -32 -95 -8 -77 15 -133 76 -188 115 -104 307 -104 422 0 60 53 83 110 77 186 -13 157 -210 266 -383 212z"/>
					</g>
				</svg>
				<span>微信</span>
			</div>
			<div @click="toSlide(1)" @touchstart.stop.prevent=" toSlide(1) ">
				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
				<g id="contact101" ref="contact101" fill="#999999" stroke="none">
				 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z"/>
				 </g>
				<g id="layer102" fill="#b1b1b1" stroke="none">
				 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z m650 246 c0 -33 -32 -86 -51 -86 -13 0 -145 -85 -153 -99 -4 -5 7 -29 24 -52 42 -58 55 -111 40 -166 -20 -82 -67 -125 -135 -125 -83 0 -140 69 -140 169 0 53 4 67 33 107 17 26 32 53 32 62 0 8 -34 36 -76 62 -108 66 -124 82 -131 125 l-6 37 282 0 281 0 0 -34z m100 -141 c0 -12 -14 -15 -70 -15 -56 0 -70 3 -70 15 0 12 14 15 70 15 56 0 70 -3 70 -15z m0 -110 c0 -12 -17 -15 -90 -15 -73 0 -90 3 -90 15 0 12 17 15 90 15 73 0 90 -3 90 -15z m0 -110 c0 -12 -14 -15 -70 -15 -56 0 -70 3 -70 15 0 12 14 15 70 15 56 0 70 -3 70 -15z"/>
				 <path d="M130 637 c0 -14 25 -41 45 -48 6 -2 43 -26 83 -52 69 -46 72 -50 72 -86 0 -25 -5 -41 -15 -44 -20 -8 -55 -85 -55 -122 0 -17 9 -50 21 -74 23 -48 72 -76 114 -65 35 9 81 65 89 108 9 45 -8 107 -35 132 -27 24 -41 61 -33 86 3 10 50 48 105 83 54 35 99 71 99 80 0 13 -32 15 -245 15 -199 0 -245 -3 -245 -13z"/>
				 </g>
				<g id="layer103" fill="#fbfbfb" stroke="none">
				 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z m660 251 c0 -42 -30 -73 -125 -132 -47 -28 -85 -58 -85 -66 0 -8 14 -32 32 -54 86 -106 16 -289 -110 -289 -33 0 -86 33 -115 71 -41 56 -34 169 13 223 17 19 30 40 30 48 0 7 -43 40 -96 73 -102 63 -114 76 -114 124 l0 31 285 0 285 0 0 -29z m90 -146 c0 -12 -15 -15 -75 -15 -60 0 -75 3 -75 15 0 12 15 15 75 15 60 0 75 -3 75 -15z m0 -110 c0 -12 -17 -15 -90 -15 -73 0 -90 3 -90 15 0 12 17 15 90 15 73 0 90 -3 90 -15z m0 -110 c0 -12 -15 -15 -75 -15 -60 0 -75 3 -75 15 0 12 15 15 75 15 60 0 75 -3 75 -15z"/>
				 <path id="contact104" ref="contact104" fill="#fcfcfc" d="M130 631 c0 -5 42 -35 93 -67 50 -31 98 -64 105 -73 20 -25 14 -63 -17 -96 -82 -85 -41 -245 63 -245 108 0 147 173 57 254 -13 12 -21 31 -21 53 0 31 6 37 77 81 42 26 90 59 107 74 l31 27 -247 1 c-143 0 -248 -4 -248 -9z"/>
				 </g>
				</svg>
				<span>通讯录</span>
			</div>
			<div @click="toSlide(2)" @touchstart.stop.prevent=" toSlide(2) ">
				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
				<g  id="discovery101" ref="discovery101" fill="#999999" stroke="none">
				 <path  d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z"/>
				</g>
				<g id="layer102" fill="#afafaf" stroke="none">
				 <path  d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z m514 294 c64 -22 147 -100 177 -166 33 -76 32 -174 -3 -249 -49 -106 -175 -188 -282 -183 -174 9 -300 139 -300 309 0 133 78 244 201 290 52 19 149 18 207 -1z"/>
				 <path  d="M295 656 c-93 -43 -165 -153 -165 -251 0 -98 72 -208 165 -251 69 -33 161 -33 230 0 95 44 165 151 165 251 0 194 -219 333 -395 251z m216 -298 c28 -55 48 -102 46 -105 -6 -6 -155 71 -184 94 -18 15 -113 190 -113 208 0 3 45 -17 101 -46 l100 -51 50 -100z"/>
				 <path d="M392 428 c-16 -16 -15 -33 4 -48 22 -19 54 12 38 37 -14 22 -27 26 -42 11z"/>
				 </g>
				<g id="layer103" fill="#fcfcfc" stroke="none">
				 <path  d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z m547 284 c57 -27 110 -81 145 -146 33 -62 33 -204 0 -266 -35 -66 -88 -119 -150 -149 -48 -23 -69 -28 -132 -27 -124 2 -222 62 -278 168 -39 74 -39 208 0 282 79 151 260 211 415 138z"/>
				 <path  id="discovery104" ref="discovery104"  d="M329 667 c-120 -45 -189 -137 -190 -252 -1 -82 25 -148 82 -205 171 -171 465 -43 461 200 -3 143 -113 257 -256 266 -36 3 -75 -1 -97 -9z m129 -210 c12 -10 112 -199 112 -212 0 -10 -195 93 -211 111 -14 16 -109 196 -109 207 0 5 193 -93 208 -106z"/>
				 <path id="discovery106" ref="discovery106" fill="#999999" d="M302 468 l53 -103 100 -52 c55 -29 103 -52 108 -53 9 0 -80 179 -102 204 -16 19 -182 106 -201 106 -6 0 13 -46 42 -102z m133 -53 c0 -22 -31 -33 -47 -17 -17 17 -1 44 24 40 15 -2 23 -10 23 -23z"/>
				 <path  id="discovery105" ref="discovery105" d="M384 415 c-4 -9 -2 -21 4 -27 16 -16 47 -5 47 17 0 26 -42 34 -51 10z"/>
				</g>
				</svg>
				<span>发现</span>
			</div>
			
			<div @click="toSlide(3)" @touchstart.stop.prevent=" toSlide(3) ">
				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
				<g id="mine101" ref="mine101" fill="#999999" stroke="none">
				 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z"/>
				 </g>
				<g id="layer102" fill="#b2b2b2" stroke="none">
				 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z m690 236 c0 -25 -8 -42 -32 -65 -17 -17 -36 -31 -41 -31 -5 0 -23 -10 -40 -22 -18 -13 -45 -30 -62 -39 -41 -22 -42 -43 -6 -84 90 -103 27 -288 -99 -288 -70 0 -129 59 -137 136 -8 67 4 113 38 152 36 41 35 62 -6 84 -17 9 -44 26 -62 39 -17 12 -35 22 -40 22 -5 0 -24 14 -41 31 -24 23 -32 40 -32 65 l0 34 280 0 280 0 0 -34z"/>
				 <path d="M167 634 c-8 -9 11 -44 24 -44 6 0 25 -11 43 -25 18 -14 36 -25 39 -25 4 0 27 -14 52 -32 37 -26 45 -37 45 -63 0 -19 -8 -39 -20 -50 -77 -70 -63 -214 26 -251 32 -14 39 -13 72 3 46 23 70 65 71 124 1 50 -17 95 -49 124 -12 11 -20 31 -20 50 0 26 8 37 45 63 25 18 48 32 51 32 8 0 98 63 106 75 4 5 4 13 2 17 -6 9 -478 11 -487 2z"/>
				 </g>
				<g id="layer103" fill="#fcfcfc" stroke="none">
				 <path d="M0 400 l0 -400 400 0 400 0 0 400 0 400 -400 0 -400 0 0 -400z m688 228 c-3 -42 -5 -44 -103 -109 -55 -37 -99 -71 -98 -77 1 -6 17 -31 34 -57 27 -40 31 -55 32 -110 0 -53 -5 -70 -30 -107 -58 -87 -166 -89 -225 -3 -23 34 -27 50 -28 109 0 60 4 74 30 113 17 25 32 49 33 55 1 6 -43 40 -98 77 -98 65 -100 67 -103 109 l-3 42 281 0 281 0 -3 -42z"/>
				 <path id="mine104" ref="mine104"  d="M170 620 c0 -6 35 -32 78 -59 122 -78 122 -77 122 -120 0 -27 -7 -44 -25 -61 -81 -77 -37 -240 66 -240 30 0 43 7 67 35 54 61 52 153 -3 205 -18 17 -25 34 -25 61 0 43 0 42 123 120 42 27 77 53 77 59 0 6 -85 10 -240 10 -155 0 -240 -4 -240 -10z"/>
				 </g>
				</svg>
				<span>我</span>
			</div>		
	</footer>


</div>
</template>
<script>

// import { swiper, swiperSlide } from 'vue-awesome-swiper'
// require('swiper/dist/css/swiper.css')
import {post} from '@/utils/fetch-tool.js'
import {mapState, mapActions, mapMutations} from 'vuex';

import msgPage from '@/pages/main/Message';
import contactPage from '@/pages/main/Contact';
import discoveryPage from '@/pages/main/Discovery';
import minePage from '@/pages/main/Mine';

export default{
	components: {
	    // swiper,
	    // swiperSlide,
	    msgPage,
	    contactPage,
	    discoveryPage,
		minePage,
  	},
    data() {
      return {
		ws:'',
		delayLoading:false,
        spreadLists:[
            {
				svg:'#message-index',
                title:"发起群聊"
            },
            {
				svg:'#add-index',
                title:"添加朋友"
            },
            {
				svg:'#photograph-index',
                title:"扫一扫"
            },
            {
				svg:'#success-index',
                title:"收付款"
            },
            {
				svg:'#envelope-index',
                title:"帮助与反馈"
            }
          ],
		swiperOption : {
          notNextTick: true,
          direction : 'horizontal',
          mousewheelControl : true,
          observeParents:true,
          resistanceRatio:0.35,
		  speed:300,
		  observer:true,
  		//   watchSlidesProgress : true,
  		  on:{
		      		      
		     progress:(progress)=>{
				// console.log('swiperProgress');

		     	let colorProgress = Math.round( progress*1000 );
                 var msg101        =  this.$refs.msg101;
                 var msg104        =  this.$refs.msg104;
                 var contact101    =  this.$refs.contact101;
                 var contact104    =  this.$refs.contact104;
                 var discovery101  =  this.$refs.discovery101;
                 var discovery104  =  this.$refs.discovery104;
                 var discovery105  =  this.$refs.discovery105;
                 var discovery106  =  this.$refs.discovery106;
                 var mine101       =  this.$refs.mine101;
                 var mine104       =  this.$refs.mine104;

				// console.log('progress',colorProgress);
		     	var computedColor = function( colorProgress,type,ltr ){

		     		switch(ltr){

		     			case 0 :
		     				if( type == "color" ){  // 灰 -> 绿
			      				return "rgb("+ (153 - Math.round( (153-70) / 333 * colorProgress ) )+"," + (153 + Math.round( (192 - 153) / 333 * colorProgress ) )+ "," + (153 - Math.round( (153-27) / 333 * colorProgress ) )+ ")";
				      		}
				      		if( type == "bgColor"){ // 白 -> 绿
				      			return "rgb("+ (252 - Math.round( (252-70) / 333 * colorProgress ) )+"," + (252 - Math.round( (252 - 192) / 333 * colorProgress ) )+ "," +  (252 - Math.round( (252-27) / 333 * colorProgress ) )+ ")";
				      		}
				      		break;

		     			case 1 :
			     			if( type == "color" ){
			      				return "rgb("+ (70 + Math.round( (153-70) / 333 * colorProgress ) )+"," + (192 - Math.round( (192 - 153) / 333 * colorProgress ) )+ "," + (27 + Math.round( (153-27) / 333 * colorProgress ) )+ ")";
				      		}
				      		if( type == "bgColor"){
				      			return "rgb("+ (70 + Math.round( (252-70) / 333 * colorProgress ) )+"," + (192 + Math.round( (252 - 192) / 333 * colorProgress ) )+ "," +  (27 + Math.round( (252-27) / 333 * colorProgress ) )+ ")";
				      		}

		     		}

		      	}



		     	if( colorProgress >= 0 && colorProgress <= 333) {
			      	// #46c01b (rgb(70,192,27)) ~ #999999 (rgb(153,153,153))  #46c01b rgb( rgb(70,192,27) ) ~ #fcfcfc( rgb(252,252,252) )
		  			
		  			msg101.setAttribute("fill",computedColor(colorProgress,"color",1));

		  			contact101.setAttribute("fill",computedColor(colorProgress,"color",0));

		  			if( colorProgress <=166 ){
		  				msg104.setAttribute("fill",computedColor(colorProgress*2,"bgColor",1));
		  			}
		  			if( colorProgress >=166 && colorProgress <=333 ){
		  				contact104.setAttribute("fill",computedColor( (colorProgress-166)*2,"bgColor",0));
		  			}

		      	}
		      	else if( colorProgress > 333 &&  colorProgress <= 667 ) {

		      		contact101.setAttribute("fill",computedColor(colorProgress-333,"color",1));
		  			discovery101.setAttribute("fill",computedColor(colorProgress-333,"color",0));
		  			// #999( rgb(153,153,153) ) ~ #fcfcfc( rgb(252,252,252) )
		  			discovery106.setAttribute("fill","rgb("+ (153 + Math.round( (252-153) / 333 * (colorProgress-333) ) )+"," + (153 + Math.round( (252 - 153) / 333 * (colorProgress-333) ) )+ "," + (153 + Math.round( (252-153) / 333 * (colorProgress-333) ) )+ ")" );
		      		discovery105.setAttribute("fill",computedColor(colorProgress-333,"bgColor",0));

		  			if( colorProgress <=500 ){
		  				contact104.setAttribute("fill",computedColor( (colorProgress-333)*2,"bgColor",1));
		  			}
		  			if( colorProgress >=500 && colorProgress <=667 ){
		  				discovery104.setAttribute("fill",computedColor( (colorProgress-500)*2,"bgColor",0));
		  			}
		      		
		      	}
		      	else if( colorProgress > 667 &&  colorProgress <= 1000 ){
		      		discovery101.setAttribute("fill",computedColor(colorProgress-667,"color",1));
		      		discovery106.setAttribute("fill","rgb("+ (252 - Math.round( (252-153) / 333 * (colorProgress-667) ) )+"," + (252 - Math.round( (252 - 153) / 333 * (colorProgress-667) ) )+ "," + (252 - Math.round( (252-153) / 333 * (colorProgress-667) ) )+ ")" );
		      		discovery105.setAttribute("fill",computedColor(colorProgress-667,"bgColor",1));
		  			mine101.setAttribute("fill",computedColor(colorProgress-667,"color",0));
		  			if( colorProgress <=833 ){
		  				discovery104.setAttribute("fill",computedColor( (colorProgress-667)*2,"bgColor",1));
		  			}
		  			if( colorProgress >=833 && colorProgress <= 1000 ){
		  				mine104.setAttribute("fill",computedColor( (colorProgress-833)*2,"bgColor",0));
		  			}
		      	}

		      	switch( colorProgress ){
		      		case 0   :  
		      			msg101.setAttribute("fill","#46c01b");
		  				msg104.setAttribute("fill","#46c01b");
		  				contact101.setAttribute("fill","#999999");
		  				contact104.setAttribute("fill","#fcfcfc");
		  				discovery101.setAttribute("fill","#999999");
		  				discovery104.setAttribute("fill","#fcfcfc");
		  				discovery105.setAttribute("fill","#fcfcfc");
		  				discovery106.setAttribute("fill","#999999");
		  				mine101.setAttribute("fill","#999999");
		  				mine104.setAttribute("fill","#fcfcfc");
		      		    break;
		      		case 333 :  
		      			msg101.setAttribute("fill","#999999");
		  				msg104.setAttribute("fill","#fcfcfc");
		  				contact101.setAttribute("fill","#46c01b");
		  				contact104.setAttribute("fill","#46c01b");
		  				discovery101.setAttribute("fill","#999999");
		  				discovery104.setAttribute("fill","#fcfcfc");
		  				discovery105.setAttribute("fill","#fcfcfc");
		  				discovery106.setAttribute("fill","#999999");
		  				mine101.setAttribute("fill","#999999");
		  				mine104.setAttribute("fill","#fcfcfc");
		      		    break;
		      		case 667 :  
		      			msg101.setAttribute("fill","#999999");
		  				msg104.setAttribute("fill","#fcfcfc");
		  				contact101.setAttribute("fill","#999999");
		  				contact104.setAttribute("fill","#fcfcfc");
		  				discovery101.setAttribute("fill","#46c01b");
		  				discovery104.setAttribute("fill","#46c01b");
		  				discovery105.setAttribute("fill","#46c01b");
		  				discovery106.setAttribute("fill","#fcfcfc");
		  				mine101.setAttribute("fill","#999999");
		  				mine104.setAttribute("fill","#fcfcfc");
		      			break;
		      		case 1000:
		      			msg101.setAttribute("fill","#999999");
		  				msg104.setAttribute("fill","#fcfcfc");
		  				contact101.setAttribute("fill","#999999");
		  				contact104.setAttribute("fill","#fcfcfc");
		  				discovery101.setAttribute("fill","#999999");
		  				discovery104.setAttribute("fill","#fcfcfc");
		  				discovery105.setAttribute("fill","#fcfcfc");
		  				discovery106.setAttribute("fill","#999999");
		  				mine101.setAttribute("fill","#46c01b");
		  				mine104.setAttribute("fill","#46c01b");
		      		    break;
		      	}
		  
			 },
  		  }
 		},
 		display:false,
 		window:window
      }
	},
	created:function(){
		// console.log('store',this.$store.state.dataHandler);
	},
  	computed:{
  		swiper:function() {
        	return this.$refs.mySwiper.swiper
      	},
      	swiperProgress:function(){
      		return this.$refs.mySwiper.swiper.progress;
      	}
  	},
  	watch:{
  	
  	},
  	mounted:function(){
		//   this.$store.commit('dataHandler/REQFRIENDLIST');
		//   this.$store.mutations.test.websocketConnection();
		//  
			
	  },
  	methods:{
  		toSlide:function(index){
  			this.$refs.mySwiper.swiper.slideTo(index,0,false);
  		},
  		hiddenTool:function(){
  			this.display ? this.display = false : {};
  			//console.log("swiper");
  		},
        testSpread:function(item){
  		    // console.log( "click spreadList" + item.title);
		},
		/*websocketConnection:function(){
			console.log('websocket连接');
			if(true){
				if ('WebSocket' in window){
					console.log('chrome',WebSocket);
					console.log('this.$store.state.test.weChatId ',this.$store.state.test.weChatId )
					
					// this.ws = new WebSocket("ws://localhost:8080/socketServer/"+window.localStorage.getItem('wechatId') );    
					this.$store.state.test.ws = new WebSocket("ws://localhost:8080/socketServer/"+ this.$store.state.test.weChatId );    
					// var WebSocket = require('ws');
					// var ws = new WebSocket("ws://localhost:8080/socketServer/admin",'ws');
				}    
				else if ('MozWebSocket' in window){
					var ws = new MozWebSocket("ws://localhost:8080/socketServer/"+window.localStorage.getItem('wechatId'));    
				}
				else{
					alert("该浏览器不支持websocket");    
				}    
					
				this.ws.onmessage = function(evt) {    
					// alert(evt.data);    
					console.log('接收到的信息',evt.data);
				};    
					
				this.ws.onclose = function(evt) {    
					alert("连接中断");    
				};    
					
				this.ws.onopen = function(evt) {
					console.log('连接成功');
				};  
			}else{
				alert("请输入您的昵称");
			}
		},*/
		/*websocketSend:function(){
			console.log('发送ws消息');
    		this.ws.send( JSON.stringify({"sender":window.localStorage.getItem('wechatId'),"receiver":"admin","content":"123"}) );    
			
	  }*/
  	}
}   


</script>
<style scoped>
	header{
		position: fixed;left: 0;top: 0;
		display: flex;justify-content: space-between;flex-shrink: 0;align-items: center;
		box-sizing: border-box;
		padding:0 .75rem;
		width: 100%;
		height: 3rem;
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
	.spreadList{
		position: absolute;
        left:-5rem;
        top:2.6rem;
		display: flex;
        flex-direction: column;
        justify-content: flex-start;
		width: 12rem;
        min-height: 0rem;
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
	.spreadList img,.spreadList svg{
        box-sizing: border-box;
		display: inline-block;
		width: 2rem;
        height: 2rem;
		/* background: cyan; */
		margin-right:.75rem;
	}
	
	.swiper {
		display: flex;flex-direction:column;
		box-sizing: border-box;padding:3rem 0 3.5rem 0;
		justify-content: flex-start;
		width: 100%;height: 100%;	
		background: rgb(235,235,235);
	}
	.swiper header , .swiper footer{
		flex-shrink: 0;z-index: 2;
	}


	.swiperOption {
		box-sizing: border-box;
        flex-shrink:1;
		width: 100%;
        height: 100%;
	}
	/* .swiperOption div {    } */

	footer{
		position: fixed;
        left: 0;
        bottom: 0;
		box-sizing: border;
		display: flex;
        justify-content: space-around;
		align-items: center;flex-shrink: 0;
		width: 100%;height: 3.5rem;
		background: #fcfcfc;
		font-size: .65rem;
	}
	footer:after{
		position: absolute;
		content:"";
		width: 100%;height: .04rem;
		background-color: rgb(190,190,190);
		left:0;top:-.04rem;
		transform:scaleY(.4);
	}
	footer div{
		display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
		width: 23%;
	}
	footer i{
		display: inline-block;
		margin-bottom: .2rem;
		font-size: 1.5rem;
	}
	/* footer span{	} */
	footer .activity{ position: relative; }
	footer .activity:after{
		position: absolute;
		display: block;
		content:"";
		width: .5rem;height: .5rem;
		border-radius: 50% 50%;
		background: red;
		right: -.25rem;top:-.25rem;
	}
</style>
