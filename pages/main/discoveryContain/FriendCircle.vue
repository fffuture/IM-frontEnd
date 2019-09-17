<template>
    <div class="friendCircle">
        <header ref="header" @click.stop="scrollToTop">
            <!--<span>返回</span>-->
            <div @click="$router.go(-1)">
                <svg style="width:2rem;height:2rem;" v-if="headerFix === 'false'">
                    <use xlink:href="#back-friendCircle" />
                </svg>
                <svg style="width:2rem;height:2rem;" v-else>
                    <use xlink:href="#back-fix-friendCircle" />
                </svg>
            </div>
            <div style="margin-right: .5rem">
                <svg style="width:2rem;height:2rem;" v-if="headerFix === 'false'">
                    <use xlink:href="#camera-friendCircle" />
                </svg>
                <svg style="width:2rem;height:2rem;" v-else>
                    <use xlink:href="#camera-fix-friendCircle" />
                </svg>
            </div>
        </header>

        <div class="container" ref="container" @scroll.stop="scrollFunc" @touchstart.stop="pullFunc" @touchmove.stop="pullFunc" @touchend.stop="pullFunc">
            <div class="picture-wall">
                <img class="banner" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                <div class="slot-name-pic">
                    <div> the again</div>
                    <img src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                </div>
            </div>

            <div class="content">

                <div class="activity-1">
                    <img class="activity-pic" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                    <div style="width: 100%">
                        <div class="activity-name">坦诚</div>
                        <div class="active-content">
                            商业街负一层，证件照等你来拍~
                            <div>
                                <img class="img-one" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                            </div>
                        </div>
                        <div class="activity-footer">
                            <span>51分钟前</span>
                            <span class="comment-btn" @click.stop="commentShow = !commentShow">
                                <svg style="width:2rem;height:2rem;">
                                    <use xlink:href="#dialog-friendCircle" />
                                </svg>

                                <div v-show="commentShow">
                                    <span @click.stop="comment('fond')">
                                        <svg style="width:1.5rem;height:1.5rem;">
                                            <use xlink:href="#nice-friendCircle" />
                                        </svg>
                                        赞
                                    </span>
                                    <span @click.stop="comment('comment')">
                                        <svg style="width:1.5rem;height:1.5rem;">
                                            <use xlink:href="#comment-friendCircle" />
                                        </svg>
                                        评论
                                    </span>
                                </div>
                            </span>
                        </div>

                        <ul class="comment">
                            <li class="nice">
                                <svg style="width:1rem;height:1rem;">
                                    <use xlink:href="#nice1-friendCircle" />
                                </svg>
                                点赞的人
                            </li>
                            <li>
                                <span class="comment-name">
                                    评论人的姓名
                                </span>:
                                这是评论这是评论这是评论这是评论这是评论这是评论这是评论~~~
                            </li>
                            <li>
                                <span class="comment-name">
                                    评论人的姓名
                                </span>:
                                这是评论这是评论这是评论这是评论这是评论这是评论这是评论~~~
                            </li>
                            <li>
                                <span class="comment-name">
                                    评论人的姓名
                                </span>:
                                这是评论这是评论这是评论这是评论这是评论这是评论这是评论~~~
                            </li>

                        </ul>

                    </div>
                </div>

                <div class="activity-1">
                    <img class="activity-pic" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                    <div style="width: 100%">
                        <div class="activity-name">坦诚</div>
                        <div class="active-content">
                            商业街负一层，证件照等你来拍~
                            <div class="imgList">
                                <img class="img-list" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                                <img class="img-list" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                                <img class="img-list" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                                <img class="img-list" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                                <img class="img-list" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                            </div>
                        </div>
                        <div class="activity-footer">
                            <span>51分钟前</span>
                            <span class="comment-btn" @click.stop="commentShow = !commentShow">
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 820 540" preserveAspectRatio="xMidYMid meet">
                                    <g id="layer101" fill="#8593b0" stroke="none">
                                        <path d="M210 423 l-1 -68 -49 -34 c-28 -19 -50 -41 -50 -51 0 -11 21 -31 50 -50 l50 -32 0 -69 0 -69 255 0 255 0 0 220 0 220 -255 0 -255 0 0 -67z m188 -147 c9 -42 -42 -60 -72 -27 -14 15 -15 24 -7 39 6 11 16 22 23 25 18 6 52 -17 56 -37z m220 0 c9 -42 -42 -60 -72 -27 -14 15 -15 24 -7 39 6 11 16 22 23 25 18 6 52 -17 56 -37z"/>
                                    </g>
                                </svg>

                                <div v-show="commentShow">
                                    <span @click.stop="comment('fond')">
                                        <svg style="width:1.5rem;height:1.5rem;">
                                            <use xlink:href="#nice-friendCircle" />
                                        </svg>
                                        取消
                                    </span>
                                    <span @click.stop="comment('comment')">
                                        <svg style="width:1.5rem;height:1.5rem;">
                                            <use xlink:href="#comment-friendCircle" />
                                        </svg>
                                        评论
                                    </span>
                                </div>
                            </span>
                        </div>

                        <ul class="comment">
                            <li class="nice">
                                <svg style="width:1rem;height:1rem;">
                                    <use xlink:href="#nice1-friendCircle" />
                                </svg>
                                点赞的人
                            </li>
                            <li>
                                <span class="comment-name">
                                    评论人的姓名
                                </span>:
                                这是评论这是评论这是评论这是评论这是评论这是评论这是评论~~~
                            </li>
                            <li>
                                <span class="comment-name">
                                    评论人的姓名
                                </span>:
                                这是评论这是评论这是评论这是评论这是评论这是评论这是评论~~~
                            </li>
                            <li>
                                <span class="comment-name">
                                    评论人的姓名
                                </span>:
                                这是评论这是评论这是评论这是评论这是评论这是评论这是评论~~~
                            </li>
                        </ul>

                    </div>
                </div>


                <div class="activity-1">
                    <img class="activity-pic" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                    <div>
                        <div class="activity-name">坦诚</div>
                        <div class="active-content">
                            商业街负一层，证件照等你来拍~商业街负一层，证件照等你来拍~商业街负一层，证件照等你来拍~
                            <!--<img src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">-->
                            <div class="imgList">
                                <img class="img-list" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                                <img class="img-list" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                                <img class="img-list" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                                <img class="img-list" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                                <img class="img-list" src="http://123.207.3.64/wechat/assets/touxiang.jpeg" alt="">
                            </div>
                        </div>
                        <div class="activity-footer">
                            51分钟前
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div class="loading-message">
            上拉加载！！
        </div>
    </div>
</template>

<script>
    export default {
        name: "friendCircle",
        components:{

        },
        data(){
            return {
                headerFix:"false",
                positionStart:{
                    x:'',
                    y:''
                },
                positionMove:{
                    x:'',
                    y:''
                },
                positionEnd:{
                    x:'',
                    y:''
                },
                fresh:false,
                loading:false,
                loadingTimeout:'',
                commentShow:false,
                clickCount:0,
            }
        },
        methods:{
            pullFunc:function(e){
                if( e.type === 'touchstart' ){
                   this.positionStart.x = e.touches[0].screenX;
                   this.positionStart.y = e.touches[0].screenY;
                   // console.log('起点',this.positionStart);
                }else if( e.type === 'touchmove' && !this.fresh && !this.loading){
                   this.positionEnd.x = e.touches[0].screenX;
                   this.positionEnd.y = e.touches[0].screenY;
                   // console.log( '移动 的点', this.positionEnd);
                    if( this.$refs.container.scrollTop === 0  ){ //下拉刷新
                        // console.log('屏幕在顶部');
                        if( this.positionEnd.y - this.positionStart.y > 0){
                            // console.log(' 手指往下滑动')
                            let distance = Math.sqrt(this.positionEnd.y - this.positionStart.y) * 4;
                            this.$refs.container.style = "transform:translateY("+ distance +"px)";
                            // console.log('distance',distance);
                            if( distance > 65){
                                this.fresh = true;
                                console.log('执行刷新请求');
                            }
                        }
                    }

                    if( this.$refs.container.scrollTop + this.$refs.container.offsetHeight >= this.$refs.container.scrollHeight){
                        // console.log('屏幕在底部');
                        if( this.positionEnd.y - this.positionStart.y < 0){
                            // console.log('手指往上滑动');
                            let distance = Math.sqrt( this.positionStart.y - this.positionEnd.y ) * 4;
                            distance > 65? distance = 65 : '';
                            // console.log('distance',distance);
                            this.$refs.container.style = "transform:translateY(-"+ distance +"px)";
                            if( distance >= 65  ){
                                this.loading = true;
                                console.log('执行加载请求');
                            }
                        }
                    }
               }else if( e.type === 'touchend' ){
                   // console.log('this.loading',this.loading);
                   // console.log("touchEnd");
                   if( this.fresh ){
                       this.$refs.container.style = "transform:translateY(0);transition:.5s";
                       this.fresh = false;
                   }else if( this.loading ){
                       this.loadingTimeout = setTimeout( ()=>{ //函数的节流
                        try {
                            this.$refs.container.style = "transform:translateY(0);transition:.5s";
                            this.loading = false;
                        } catch (error) {
                            console.log("Close friendCircle Page");
                        }
                       },2000)
                   }else{
                       this.$refs.container.style = "transform:translateY(0);transition:.5s";
                   }
               }

            },
            comment:function(type){
                if( type === 'fond'){
                    console.log('点赞');
                }
                if( type === "comment" ){
                    console.log('评论');
                }
                // console.log('点击评论');
                // this.commentShow = !this.commentShow
            },
            scrollFunc:function(){
                // console.log('滚动触发');
                // this.containerHeight = this.$refs.container.scrollTop;
                if( this.$refs.container.scrollTop >　250 ){
                    this.$refs.header.style = "background:#f2f2f2";
                    this.headerFix = "true";
                }else{
                    this.$refs.header.style = "background:transparent";
                    this.headerFix = "false";
                }
            },
            scrollToTop:function(){
                // console.log('双击事件');
                this.clickCount += 1;
                setTimeout( ()=>{
                    if(this.clickCount === 2){
                        this.$refs.container.scrollTop = 0;
                    }
                    this.clickCount = 0;
                },300);
            },

        },
        watch:{
            // $refs.container.scrollTop:function(){
            //     console.log($refs.container.scrollTop);
            // }
        },
        created:function(){

        },
        mounted:function(){
            // console.log('window',window);
        },
        updated:function(){

        },
        destroyed:function(){
            clearTimeout(this.loadingTimeout);
        }
    }
</script>

<style scoped>
    .friendCircle{
        width: 100%;
        height: 100%;
    }
    header{
        position: fixed;
        left: 0;
        top: 0;
        box-sizing: border-box;
        /*padding:0 .75rem;*/
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 2.9rem;
        background: transparent;
        z-index:1;
    }

    .container{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background: white;
        overflow: scroll;
    }

    .picture-wall{
        position: relative;
        width: 100%;
        height: 40%;
        /*background: orange;*/
    }
    .banner{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .slot-name-pic{
        position: absolute;
        left: 0;
        bottom:-3rem;
        box-sizing: border-box;
        padding: 0 .75rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 6rem;
    }
    .slot-name-pic img{
        flex-shrink: 0;
        width: 5rem;
        height: 5rem;
    }
    .slot-name-pic div{
        box-sizing: border-box;
        padding:0 1rem;
        min-width: 0;
        height: 4rem;
        line-height: 2rem;
        font-weight: 800;
        color: white;
    }

    .content{
        box-sizing: border-box;
        padding-top:3.5rem;
    }

    .activity-1{
        box-sizing: border-box;
        padding:.5rem .75rem;
        display: flex;
        justify-content: flex-start;
        width: 100%;
        min-height: 0;
        /*background: cyan;*/
    }
    .activity-1 .activity-pic{
        box-sizing: border-box;
        padding:0;
        flex-shrink: 0;
        margin-right: .75rem;
        display: inline-block;
        width: 3rem;
        height: 3rem;
    }
    .activity-1 .activity-name{
        font-size: 1rem;
        line-height: 1.5rem;
        color: #576b95;
    }
    .activity-1 .active-content{
        width: 100%;
        line-height: 1.5rem;
    }
    .activity-1 .active-content .imgList{
        margin-top: .75rem;
    }
    .activity-1 .active-content .img-list{
        flex-shrink: 0;
        width: 5rem;
        height: 5rem;
        background-size: cover;
    }
    .activity-1 .active-content .img-one{
        flex-shrink: 0;
        width: 80%;
        max-width: 15rem;
        /*min-width: 10rem;*/
        min-height: 0;
        background-size: cover;
    }
    .activity-footer{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        color: gray;
        font-size: .7rem;
    }
    .activity-footer .comment-btn{
        position: relative;
        width: 2rem;
        min-height: 0;
    }
    .activity-footer .comment-btn div{
        position: absolute;
        right: 2rem;
        top: 0;
        box-sizing: border-box;
        padding:.4rem 0;
        display: flex;
        justify-content: space-between;
        /*align-items: center;*/
        width: 10rem;
        height: 2.6rem;
        background-color: #303030;
        color:white;
        border-radius: .2rem .2rem;
    }
    .activity-footer .comment-btn div span{
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 1.8rem;
        line-height: 1.8rem;
        text-align: center;
        font-size: .8rem;
    }
    .activity-footer .comment-btn div span{
        border-right: .01rem solid rgb(30,30,30);
    }
    .activity-1 .comment{
        position: relative;
        box-sizing: border-box;
        margin: .7rem 0 0 0 ;
        padding:.5rem;
        width: 100%;
        min-height: 0;
        line-height: 1.5rem;
        background: #eeeeee;
        color:#454545;
        /*overflow: auto;*/
        word-break: break-all;
        list-style: none;
    }
    .activity-1 .comment:after{
        content:'';
        position: absolute;
        left:1rem;
        top: -.8rem;
        width: 0;
        height: 0;
        border:.4rem solid transparent;
        border-bottom-color: #eee;
    }
    .activity-1 .comment .nice{
        position: relative;
        display: flex;
        align-items: center;
        line-height: 1.6rem;
        color:#576b95;
    }
    .activity-1 .comment .nice:after{
        content:'';
        position: absolute;
        left:0;
        bottom:0;
        width: 100%;
        height: .036rem;
        background-color: rgb(190,190,190);
        transform:scaleY(.5);
        z-index:1;
    }
    .activity-1 .comment .comment-name{
        color:#576b95;
    }

    .loading-message{
        position: fixed;
        left: 0;
        bottom:0;
        width: 100%;
        height: 65px;
        line-height: 65px;
        /*background: rgb(210,210,210);*/
        background: linear-gradient(rgb(255,255,255),rgb(210,210,210));
        color: rgb(180,180,180);
        text-align: center;
        z-index: -1;
    }


</style>
