<!--<template>
<div class="webrtc">
    <video class="remoteVideo" autoplay playsinline></video>
    <video class="localVideo"  autoplay playsinline></video>
</div>
</template>
<script>
const adapter = require('webrtc-adapter');
import {mapState, mapActions} from 'vuex';

export default {
    data(){
        return{
            localVideo:'',
            remoteVideo:'',
            localStream:'',
            localcilent:'',
            remoteClient:'',
            localOffer:'',
            receiveRemoteOffer:this.$store.state.dataHandler.remoteOffer,
            offerOptions:{ offerToReceiveAudio: 1, offerToReceiveVideo: 1 },
        }
    },
    mounted:function(){
        console.log('路由参数',this.$route.query.friendWeChatId);
        // this.$store.state.dataHandler.ws.send(  JSON.stringify({"sender":"admin","receiver":"admin1","type":"chat","content":"webrtc" }) );
        // console.log('send' )

        // console.log('adapter',adapter.default.browserDetails.browser);
        this.remoteVideo = document.querySelector('.remoteVideo');
        this.localVideo =  document.querySelector('.localVideo');
        var constraints = window.constraints = {
            audio: false,
            video: true
        };
        var that = this;
        function handleSuccess(stream) {
            that.localStream = stream;
            // console.log('stream',stream);
            that.remoteVideo.srcObject = stream;
            that.localVideo.srcObject = stream;
        }
        function handleError(error) {
            console.log('getUserMedia error: ' + error.name, error);
        }
        console.log('navigator.mediaDevices.getUserMedia(constraints)',navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

        this.call();

        // setTimeout(
        //     ()=>{
        //         this.hangup();
        //         // this.$store.state.dataHandler.remoteOffer = "";
        //         this.$store.commit('dataHandler/setRemoteOffer');
        //         console.log('执行hangup函数');
        //     },3000
        // );
        

    },
    methods:{
        hangup:function(){
            var that = this;
            this.localStream.getTracks().forEach( //释放摄像头等资源
                track => {
                    track.stop();
                }
            ),
            //销毁peerConnection
            this.localcilent.close();
            this.localcilent = null;
        },
        call:function(){
            var that = this;
            this.localcilent = new RTCPeerConnection();
            console.log( 'this.localcilent', this.localcilent);
            // this.localOffer = await this.localcilent.createOffer( this.offerOptions );
            this.localcilent.createOffer( this.offerOptions )
            .then(
                offer =>{
                    console.log('res',offer);
                    that.localOffer = offer;
                    console.log('this.localOffer',this.localOffer);

                    that.localcilent.setLocalDescription(offer);
                    // console.log('this.localcilent-offer',this.localcilent);

                    let offerMessage = {
                        sender: that.$store.state.dataHandler.user.weChatId,
                        senderImg: that.$store.state.dataHandler.user.imgURL,
                        receiver: that.$route.query.friendWeChatId,
                        type:'webrtcOffer',
                        content: that.localOffer
                    }
                    that.$store.commit('dataHandler/WEBSOCKETSEND',offerMessage);




                    // that.$store.state.dataHandler.ws.send(  JSON.stringify({"sender":"admin","receiver":"admin1","type":"webrtcOffer","content":offer }) );
                    // console.log('send' )

                }
            )
            // console.log('this.localOffer',this.localOffer);
        },
        // create

    },
    beforeDestroy:function(){    },
    computed:{
        // ...mapState('dataHandler', {
        //     dataHandlerRemoteOffer: state => state.remoteOffer,
        // }),
    },
    watch:{
        // dataHandlerRemoteOffer:function(){
        //      console.log('remoteOffer发生变化',this.dataHandlerRemoteOffer);
        //     //  let remoteOffer = this.dataHandlerRemoteOffer;
        //      if( !!this.dataHandlerRemoteOffer && this.dataHandlerRemoteOffer.type === 'offer' ){
        //          this.localcilent.setRemoteDescription( remoteOffer );
        //          console.log( 'this.localcilent', this.localcilent);
        //      }
        // }
    }
}
</script>
<style>
    .webrtc{
        width: 100%;
        height: 100%;
        background: cyan;
    }
    .remoteVideo{
        width: 100%;
        height:100%;
        background: #333;
    }
    .localVideo{
        display: flex;
        position:fixed;
        right:5%;
        bottom:5%;
        width:30%;
        height:30%;
        background: #333;
        overflow: hidden;
    }
</style> -->
<template>
    <!-- <div class="webrtc" v-if="$store.state.dataHandler.webrtcShow"> -->
        <!-- <div class="webrtc" v-if="webrtcShow"> -->
        <div class="webrtc">
        <div class="user-info">
            <img :src="$route.query.friendImg" alt="">
            <div>
                <!-- <div>晨斌</div>
                <div>邀请你进行视频通话.</div> -->
                <div> {{ $route.query.friendWeChatId }} </div>
                <div v-if = " $route.query.type === 'invite' " >正在等待对方接受邀请...</div>
                <div v-else> 邀请你进行视频通话... </div>
            </div>
        </div>

        <video class="remoteVideo" autoplay playsinline></video>
        <video class="localVideo"  autoplay playsinline></video>

        <!-- <div class="button microphone">
            <img src="" alt="">
            <span>切到语音通话</span>
        </div> -->

        <div class="option-list">
            <div class="option" v-for="(option, index) in optionList" :key="index">
                <img src="" alt="">
                <span>{{option.btnName}}</span>
            </div>


            <!-- 暂时先放着 -->
<!-- 
            <div style="width:100%;
                        height:1rem;
                        background:green;
                        position:absolute;
                        top:-1rem;
                        left:0;
                        text-align:center">
                显示时间
            </div> -->


        </div>

    </div>
</template>
<script>
const adapter = require('webrtc-adapter');
import {mapState, mapActions} from 'vuex';

export default {
    data(){
        return{
            localConnection:'',
            localOffer:'',
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
            offerOptions:{ offerToReceiveAudio: 1, offerToReceiveVideo: 1 },
        }
    },
    mounted:function(){
       /* console.log('路由参数',this.$route.query.friendWeChatId);
        // this.$store.state.dataHandler.ws.send(  JSON.stringify({"sender":"admin","receiver":"admin1","type":"chat","content":"webrtc" }) );
        // console.log('send' )

        // console.log('adapter',adapter.default.browserDetails.browser);
        this.remoteVideo = document.querySelector('.remoteVideo');
        this.localVideo =  document.querySelector('.localVideo');
        var constraints = window.constraints = {
            audio: false,
            video: true
        };
        var that = this;
        function handleSuccess(stream) {
            that.localStream = stream;
            // console.log('stream',stream);
            that.remoteVideo.srcObject = stream;
            that.localVideo.srcObject = stream;
        }
        function handleError(error) {
            console.log('getUserMedia error: ' + error.name, error);
        }
        console.log('navigator.mediaDevices.getUserMedia(constraints)',navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

        this.call();*/

        // setTimeout(
        //     () => {
        //         this.$store.commit('dataHandler/setWebrtcShow',{show:false});
        //         // this.$store.state.dataHandler.webrtcShow = false;
        //         console.log('修改值',this.webrtcShow);

        //     },3000
        // )
        // this.$store.commit('dataHandler/setWebrtcShow',{show:true});
        // console.log("webrtcShow",this.webrtcShow);

        // let offerMessage = {
        //                 sender: that.$store.state.dataHandler.user.weChatId,
        //                 senderImg: that.$store.state.dataHandler.user.imgURL,
        //                 receiver: that.$route.query.friendWeChatId,
        //                 type:'webrtcOffer',
        //                 content: that.localOffer
        //             }
        var that = this;
        // if( this.$route.query.type === 'invite' ){
        //     console.log('邀请视频');
        //     let offerMessage = {
        //                 sender: that.$store.state.dataHandler.user.weChatId,
        //                 senderImg: that.$store.state.dataHandler.user.imgURL,
        //                 receiver: that.$route.query.friendWeChatId,
        //                 type:'webrtcOffer',
        //                 content:"视频请求"
        //             }
        //     that.$store.commit('dataHandler/WEBSOCKETSEND',offerMessage);
        // }
        
        this.init();

    },
    methods:{
        hangup:function(){
           /* var that = this;
            this.localStream.getTracks().forEach( //释放摄像头等资源
                track => {
                    track.stop();
                }
            ),
            //销毁peerConnection
            this.localcilent.close();
            this.localcilent = null;*/
        },
        call:function(){
           /* var that = this;
            this.localcilent = new RTCPeerConnection();
            console.log( 'this.localcilent', this.localcilent);
            this.localcilent.createOffer( this.offerOptions )
            .then(
                offer =>{
                    console.log('res',offer);
                    that.localOffer = offer;
                    console.log('this.localOffer',this.localOffer);

                    that.localcilent.setLocalDescription(offer);

                    // let offerMessage = {
                    //     sender: that.$store.state.dataHandler.user.weChatId,
                    //     senderImg: that.$store.state.dataHandler.user.imgURL,
                    //     receiver: that.$route.query.friendWeChatId,
                    //     type:'webrtcOffer',
                    //     content: that.localOffer
                    // }
                    // that.$store.commit('dataHandler/WEBSOCKETSEND',offerMessage);
                }
            )*/







        },

        init:function(){
            //初始化  获取本地的视频音频资源  将其显示在屏幕上

            let loaclAcess = {};
            var constraints = window.constraints = {
                audio: false,
                video: true
            };
            navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
            function handleSuccess(stream) {
                // that.localStream = stream;
                // console.log('stream',stream);
                // that.remoteVideo.srcObject = stream;
                // that.localVideo.srcObject = stream;
                document.querySelector('.localVideo').srcObject = stream;
            }
            function handleError(){
                console.log('获取本地摄像头失败')
            }

            //创建RTCPeerConnection()
            this.localConnection = new RTCPeerConnection();
            console.log("localClient", this.localConnection );
            
            // if( this.$route.query.type === 'invite' ){
                this.sendOffer();
            // }

        },
        sendOffer:function(){
            var that = this;
            //this.localcilent.createOffer( this.offerOptions ) 创建Offer
            // offerOptions:{ offerToReceiveAudio: 1, offerToReceiveVideo: 1 },
            this.localOffer = this.localConnection.createOffer( { offerToReceiveAudio: 1, offerToReceiveVideo: 1 } )
             .then(
                offer =>{
                    // console.log('res',offer);
                    that.localOffer = offer;
                    // console.log('this.localOffer',this.localOffer);
                    that.localConnection.setLocalDescription(offer);

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
                        this.localConnection.setRemoteDescription(that.$store.state.dataHandler.remoteOffer);

                        // let offerMessage = {
                        //             sender: that.$store.state.dataHandler.user.weChatId,
                        //             senderImg: that.$store.state.dataHandler.user.imgURL,
                        //             receiver: that.$route.query.friendWeChatId,
                        //             type:'webrtcOffer',
                        //             content:that.localOffer
                        //         }
                        // console.log('offerMessage', offerMessage);
                        // that.$store.commit('dataHandler/WEBSOCKETSEND',offerMessage);
                        //再写个  将answerOffer存在本地  就建立起来链接了

                    }




                    // let offerMessage = {
                    //     sender: that.$store.state.dataHandler.user.weChatId,
                    //     senderImg: that.$store.state.dataHandler.user.imgURL,
                    //     receiver: that.$route.query.friendWeChatId,
                    //     type:'webrtcOffer',
                    //     content: that.localOffer
                    // }
                    // that.$store.commit('dataHandler/WEBSOCKETSEND',offerMessage);
                }
            );
            // console.log( 'localOffer', this.localOffer );


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