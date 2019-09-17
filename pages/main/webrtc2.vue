<template>
        <div class="webrtc">
        <div class="user-info">
            <img :src="$route.query.friendImg" alt="">
            <div>
                <div> {{ $route.query.friendWeChatId }} </div>
                <div v-if = " $route.query.type === 'invite' " >正在等待对方接受邀请...</div>
                <div v-else> 邀请你进行视频通话... </div>
            </div>
        </div>

        <video class="remoteVideo" autoplay playsinline></video>
        <video class="localVideo"  autoplay playsinline></video>
        <div class="option-list">
            <div class="option" v-for="(option, index) in optionList" :key="index">
                <img src="" alt="">
                <span>{{option.btnName}}</span>
            </div>
        </div>

    </div>
</template>
<script>
const adapter = require('webrtc-adapter');
import {mapState, mapActions} from 'vuex';

export default {
    data(){
        return{
            pc1:'',
            pc1Stream:'',
            pc2:'',
            pc2Stream:'',
            pc1Offer:'',
            pc2Offer:'',
            offerOptions:{
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1
            },

            optionList:[
                {
                    btnName:'切到语音通话',
                    svgPath:'',
                    type:'microphone'
                },
                {
                    btnName:'挂断',
                    svgPath:'',
                    type:'microphone'
                },
                {
                    btnName:'转换摄像头',
                    svgPath:'',
                    type:'microphone'
                },
            ],

        }
    },
    mounted:function(){
        var that = this;
        this.init();
    }, 
    methods:{
        init:function(){
            //初始化  获取本地的视频音频资源  将其显示在屏幕上
            var constraints = window.constraints = {
                audio: false,
                video: true
            };
            navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
            function handleSuccess(stream) {
                document.querySelector('.localVideo').srcObject = stream;
                this.pc1Stream = stream;
            }
            function handleError(){
                console.log('获取本地摄像头失败')
            }

            this.pc1 = new RTCPeerConnection( {} );

            console.log("localClient", this.pc1 );

            this.pc1.icecandidate = (e) => {

                this.pc2.addIceCandidate(e,candiate)
                .then(
                    res => {
                        console.log('candiate',res);
                    }
                );

            }

            
            // if( this.$route.query.type === 'invite' ){
                // this.sendOffer();
            // }*/

           /* //创建RTCPeerConnection()
            this.pc1 = new RTCPeerConnection();
            console.log("localClient", this.pc1 );
            
            // if( this.$route.query.type === 'invite' ){
                this.sendOffer();
            // }*/



        },
        hangup:function(){
        },
        call:function(){




        },





        sendOffer:function(){
            var that = this;
            this.localOffer = this.pc1.createOffer( { offerToReceiveAudio: 1, offerToReceiveVideo: 1 } )
             .then(
                offer =>{
                    // console.log('res',offer);
                    that.localOffer = offer;
                    // console.log('this.localOffer',this.localOffer);
                    that.pc1.setLocalDescription(offer);

                    //本地的就将offer发送出去
                     if( this.$route.query.type === 'invite' ){
                        console.log('邀请视频1');
                        let offerMessage = {
                                    sender: that.$store.state.dataHandler.user.weChatId,
                                    senderImg: that.$store.state.dataHandler.user.imgURL,
                                    receiver: that.$route.query.friendWeChatId,
                                    type:'webrtcOffer',
                                    content:that.localOffer
                                }
                        console.log('offerMessage', offerMessage);
                        that.$store.commit('dataHandler/WEBSOCKETSEND',offerMessage);
                    }

                    //远程的话 就将收到的offer存在本地 并且将本地offer发出去
                    if( this.$route.query.type === 'answer' ){
                        console.log('远程1remoteOffer',that.$store.state.dataHandler.remoteOffer);
                        this.pc1.setRemoteDescription(that.$store.state.dataHandler.remoteOffer);

                    }

                }
            );

        },
        answerOffer:function(){
            


        }

    },
    beforeDestroy:function(){    },
    computed:{
        ...mapState('dataHandler', {
            webrtcShow: state => state.webrtcShow,
        }),
    },
    watch:{
    }
}
</script>
<style scoped>
    .webrtc{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: cyan;
        z-index:999;
    }
    .remoteVideo{
        width: 100%;
        height:100%;
        /* background: #333; */
        background: cyan;
    }
    .localVideo{
        display: flex;
        position:fixed;
        right:.5rem;
        top:5%;
        width:30%;
        height:30%;
        background: #333;
        overflow: hidden;
    }
    .user-info{
        position: fixed;
        top:0;
        left:0;
        box-sizing: border-box;
        padding:.5rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        height: 6rem;
        background: green;
    }
    .user-info img{
        margin-right: .5rem;
        flex-shrink: 0;
        width: 5rem;
        height: 5rem;
        background: yellow;
        border-radius: .5rem;
    }
    .user-info > div{
        display: flex;
        flex-shrink: 1;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        background: orange;
    }
    .user-info > div > div{
        font-size: 1rem;
        overflow: hidden;
    }
    .user-info > div > div:first-child{
        font-size: 1.4rem;
        font-weight: 500;
    }

    /* .button{
        position: fixed;
        bottom:1rem;
        left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 5rem;
        height: 6rem;
        background: orange;
        font-size: .75rem;
        color:#fff;
    }
    .button img{
        width: 4.5rem;
        height: 4.5rem;
        background: yellow;
        border-radius: 50% 50%;
    } */

    .option-list{
        position: fixed;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        padding: 1rem 0;
        display: flex;
        justify-content: space-around;
        /* background: orange; */
        background: cyan;
        width: 100%;
        height: 7.5rem;

    }
    .option{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        width: 5rem;
        height: 100%;
        background: cyan;
        font-size: .75rem;
        color:#fff;
        text-align: center;
    }
    .option img{
        flex-shrink: 0;
        width: 4rem;
        height: 4rem;
        background: yellow;
        border-radius: 50% 50%;
    }
</style>