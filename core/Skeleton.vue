<template>
    <div class="skeleton-wrapper">

        <header-top></header-top>

        <div class="content">
            <div class="chat-item" v-for="(item,index) in 10" :key="index">

                <div class="img">

                </div>
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

    }
    .skeleton-wrapper{
        box-sizing: border-box;
        padding:3rem 0 0 0;
        width:100%;
        height:100%;
        overflow: hidden;
    }
    .content{
        box-sizing: border-box;
        padding:0;
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
</style>
