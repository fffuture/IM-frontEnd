/**
 * @file 所需要的所有数据结构
 * @author the again
 */

import { post } from '@/utils/fetch-tool.js'
import Router from 'vue-router';
// import * as ws from './wsCenter.js'
import * as ws from './wsCenter.js'
// console.log("ws:", ws.mutations.wsLink);

export const state = () => {
    return {
        router: "",
        // test: "hello vuex",
        token: '',
        weChatId: '',
        ws: "",
        user: {
            weChatId: "",
            weChatName: '',
            imgUrl: "",
            sex: "",

        },
        chatHistory: [
            // {
            //     sender: "admin",
            //     receiver: "admin1",
            //     content: "测试发送数据"
            // }
        ],
        chatHistorys: [
            /*{
                receiver:"ceshi",
                content:[
                    {
                        sender:"ceshi",
                        serderImgUrl:'',
                        receiver:"ceshi",
                        content:"测试发送数据"
                    }
                ]
            },*/
        ],
        currentChat: {

        },
        groupChat: [
            // {
            //     sender: 'hello',
            //     senderImg: "http://47.103.151.107:8081/images/otherImg.jpg",
            //     receiver: '1', //群id
            //     content: '群测试消息',
            //     type: "groupChat",
            //     time: '',
            // },
        ],
        friendList: [
            {
                weChatId: '',
                friendWeChatId: '测试',
                friendWeChatName: '测试',
                friendImgURL: '测试',
                friendSex: '测试',
                remarks: '',
                source: '',
                tag: '',
                descript: '',
                addTime: '',
            }
        ],
        groupList: [
            {
                wechatId: '',           //用户id
                groupId: '0',           //群id
                groupName: '测试群',     //群名称
                groupImg: '',           //群头像
                remarks: '测试备注',     //备注
                notice: '111',          //群公告
            }
        ],
        applyAddList: [ //申请添加好友列表
            /*  {
                  sender:'admin',
                  receiver:"admin4",
                  type:"addFriend",
                  content:'请求添加您为好友',
                  status:'waite'
              },
              {
                  sender:'admin1',
                  receiver:"admin4",
                  type:"addFriend",
                  content:'请求添加您为好友',
                  status:'accept'
              } */
        ]
    };
};



export const mutations = {

    WEBSOCKETCONNECTION(state) {
        /**  if ('WebSocket' in window) {
             // console.log('chrome',WebSocket);
             // console.log('state.dataHandler.weChatId ',state.weChatId )
             state.ws = new WebSocket("ws://192.168.42.78:8080/socketServer/" + state.weChatId);
         }
         else if ('MozWebSocket' in window) {
             state.ws = new MozWebSocket("ws://localhost:8080/socketServer/" + state.weChatId);
         }
         else {
             alert("该浏览器不支持websocket");
         }
         **/

        state.ws.onmessage = function (evt) {
            console.log('接收到的信息', evt.data);
            let receiveMessage = JSON.parse(evt.data);
            // console.log('添加聊天记录receiveMessage',receiveMessage);
            if (receiveMessage.type === "addFriend") {
                console.log('接收到的添加好友消息', receiveMessage);
                state.applyAddList.splice(state.applyAddList.length, 0, receiveMessage);
            }
            /**if (receiveMessage.type === "chat" || receiveMessage.type === "chatImg") {
                for (let i = 0; i < state.chatHistorys.length; i++) {
                    if (state.chatHistorys[i].receiver === receiveMessage.sender) {  //将聊天记录导进 相应的联系人下

                        let currentTime = new Date();
                        console.log('接收到的时间', currentTime);
                        // state.chatHistorys[i].content.splice( state.chatHistorys[i].content.length,0,JSON.parse(evt.data) );
                        let message = JSON.parse(evt.data);
                        message.receiverTime = new Date();
                        state.chatHistorys[i].content.splice(state.chatHistorys[i].content.length, 0, message);
                    }
                }
            }**/
            if (receiveMessage.type === "sendFail") {
                console.log('receiveMessage', receiveMessage);
                for (let i = 0; i < state.chatHistorys.length; i++) {
                    if (state.chatHistorys[i].receiver === receiveMessage.sender) {
                        state.chatHistorys[i].content.splice(state.chatHistorys[i].content.length, 0, JSON.parse(evt.data));
                    }
                }
            }

            if (receiveMessage.type === "acceptAdd") {

                //如果有该好友就不要重复添加到数组中
                // for( let i = 0; i < state.friendList.length; i++ ){
                //     if( state.friendList[i].friendWeChatId === receiveMessage.sender ){
                //         return ;
                //     }
                // }

                // state.friendList.splice( state.friendList.length,0,{
                //     friendWeChatId:receiveMessage.sender,
                //     weChatName:receiveMessage.sender,
                //     friendImgURL:'',
                //     friendSex:'',
                //     remarks:'',
                //     source:'',
                //     tag:'',
                //     descript:'', 
                //     addTime:'',
                // });
                // state.chatHistorys.splice(state.chatHistorys.length,0,{receiver:receiveMessage.sender,content:[] });
                //重新请求好友列表
                post('/api/friendList', { 'weChatId': state.weChatId })
                    .then(res => res.json())
                    .catch(error => { console.log(error) })
                    .then(
                        res => {
                            console.log('res friend', res);
                            state.friendList = res;
                        })
                    .catch(error => { console.log(error) });

                state.chatHistorys.splice(state.chatHistorys.length, 0, { receiver: receiveMessage.sender, content: [] });



            };
            if (receiveMessage.type === "webrtcOffer") {

                state.remoteOffer = receiveMessage.content;
                console.log('收到remoteOffer!!!', state.remoteOffer);
                // console.log('dataHandle路由：',state.router );
                //接收到视频请求之后 强制跳转到视频应答页面
                // console.log('friendWeChatId: ',receiveMessage.sender + "friendImg:",receiveMessage.senderImg)
                // console.log('offer');
                state.router.push({ path: '/main/webrtc', query: { friendWeChatId: receiveMessage.sender, friendImg: receiveMessage.senderImg, type: 'answer' } });
                // this.$router.push( { path: '/main/message-contain/chat-contain/friend-info', query: { friendWeChatId: this.searchContent,page:"friend" }} );
                // <router-link :to="{path:'/main/webrtc',query:{friendWeChatId:$route.query.friendWeChatId}}" tag="button">视频通话</router-link>

            };
            if (receiveMessage.type === "deleteFriend") {
                if (receiveMessage.content === '无该好友') {
                    return;
                }
                if (receiveMessage.content === '删除成功') {
                    //删除好友列表
                    for (let i = 0; i < state.friendList.length; i++) {
                        if (state.friendList[i].friendWeChatId === receiveMessage.receiver) {
                            state.friendList.splice(i, 1);
                            // state.router.push( {path: '/'} );
                        }
                    }
                    //删除最近聊天联系人
                    for (let i = state.chatHistorys.length - 1; i >= 0; i--) {
                        if (state.chatHistorys[i].receiver === receiveMessage.receiver || state.chatHistorys[i].receiver === state.weChatId) {
                            // console.log('111state.weChatId',state.weChatId,"message.receiver",message.receiver);
                            state.chatHistorys.splice(i, 1);
                        }
                    }
                    //跳回主页
                    state.router.push({ path: '/' });
                }
            }

            if (receiveMessage.type === "groupChat" || receiveMessage.type === "groupImg") {
                console.log('接收到群消息：', receiveMessage);
                state.groupChat.splice(state.groupChat.length, 0, receiveMessage);

            }

            if (receiveMessage.type === 'modifyRemarks') {
                console.log('modifyRemarks $store', receiveMessage);
                // state.friendList
                for (let i = 0; i < state.friendList.length; i++) {

                    if (state.friendList[i].friendWeChatId === receiveMessage.receiver) {
                        state.friendList[i].remarks = receiveMessage.content;
                    }

                }

                // console.log('modifyRemarks',state.router);
                state.router.replace({ path: '/' });
                // post('/api/friendList',{'weChatId':state.weChatId})
                //     .then( res => res.json() )
                //     .catch(error=>{console.log(error)})
                //     .then(
                //         res => {
                //             console.log('res friend',res);
                //             state.friendList = res;
                //         });

            }


        };

        /**  state.ws.onclose = function (evt) {
                alert("连接中断1", evt);
                // this.$router.replace("/");
            };
    
            state.ws.onopen = function (evt) {
                // console.log('连接成功');
                // alert('连接成功');
                // alert("链接成功")
            };
        **/
    },
    /**
    WEBSOCKETSEND(state, message) {   //websocket sendmessage 通过websocket方式发送消息
        // console.log('json序列化',JSON.stringify({"sender":state.weChatId,"receiver":"admin","content":message.content}) );
        // state.ws.send( JSON.stringify({"sender":state.weChatId,"receiver":message.receiver,"type":"chat","content":message.content}) );   
        state.ws.send(JSON.stringify(message));

        // for(let i = 0; i < state.chatHistorys.length; i++ ){
        //     if( state.chatHistorys[i].receiver === message.receiver ){
        //         state.chatHistorys[i].content.splice( state.chatHistorys[i].content.length,0,{"sender":state.weChatId,"receiver":message.receiver,type:"chat","content":message.content});
        //     }
        // }

        // message{
        //      sender:'',
        //      senderImg:''
        //      receiver:'',
        //      receiverImg:'',
        //      type: chat || chatImg,
        //      content:'',
        // }

        for (let i = 0; i < state.chatHistorys.length; i++) {
            // console.log("state.chatHistorys[i].type",state.chatHistorys[i].type);
            if (state.chatHistorys[i].receiver === message.receiver) {
                // state.chatHistorys[i].content.splice( state.chatHistorys[i].content.length,0,{"sender":state.weChatId,"receiver":message.receiver,type:"chat","content":message.content});
                state.chatHistorys[i].content.splice(state.chatHistorys[i].content.length, 0, message);
            }
        }

    },
    **/
    REQFRIENDLIST(state) { //request friendlist  获取朋友列表

        // post('http://localhost:3000/api/friendList',{'weChatId':state.weChatId})
        post('/api/friendList', { 'weChatId': state.weChatId })
            .then(res => res.json())
            .catch(error => { console.log(error) })
            .then(
                res => {
                    console.log('res friend', res);
                    state.friendList = res;

                    //好友分组聊天记录
                    state.friendList.filter(
                        item => {
                            // state.chatHistorys.push( {receiver:item.friendWeChatId,content:[] } );
                            state.chatHistorys.splice(state.chatHistorys.length, 0, { receiver: item.friendWeChatId, content: [] });
                        }
                    );
                    state.chatHistorys.splice(state.chatHistorys.length, 0, { receiver: state.weChatId, content: [] });
                    console.log("聊天记录分组:", state.chatHistorys);
                }

            )
    },
    QUERYUSERINFO(state, wechatId) { //查询用户消息
        // post('http://localhost:3000/api/queryUserInfo',{'weChatId': wechatId})
        post('/api/queryUserInfo', { 'weChatId': wechatId })
        // .then( res => res.json() 
        // .then(
        //     res  => {
        //         console.log('personInfo1',res);
        //         // return res;
        //     }
        // )
    },
    ADDFRIEND(state, message) {
        console.log('添加好友mutations1', message);
        state.ws.send(JSON.stringify({ "sender": state.weChatId, "receiver": message.receiver, "type": "addFriend", "content": message.content }));
    },
    ACCEPTADD(state, message) {
        console.log('接受好友信息', message);
        //查询是否存在该好友
        // for( let i = 0; i < state.friendList.length; i++ ){
        //     if( state.friendList[i].friendWeChatId === message.sender ){
        //         return ;
        //     }
        // }

        console.log('同意添加好友');
        state.ws.send(JSON.stringify({ "sender": message.receiver, "receiver": message.sender, "type": "acceptAdd", "content": "同意添加" }));

        //如果有该好友就不要重复添加到数组中
        // for( let i = 0; i < state.friendList.length; i++ ){
        //     if( state.friendList[i].friendWeChatId === message.sender ){
        //         return ;
        //     }
        // }
        // state.chatHistorys.splice(state.chatHistorys.length,0,{receiver:message.sender,content:[] });
        // state.friendList.splice( state.friendList.length,0,{
        //     friendWeChatId:message.sender,
        //     weChatName:message.sender,
        //     friendImgURL:'',
        //     friendSex:'',
        //     remarks:'',
        //     source:'',
        //     tag:'',
        //     descript:'',
        //     addTime:'',
        // });

        //重新请求好友列表
        post('/api/friendList', { 'weChatId': state.weChatId })
            .then(res => res.json())
            .catch(error => { console.log(error) })
            .then(
                res => {
                    console.log('res friend', res);
                    state.friendList = res;
                });

        state.chatHistorys.splice(state.chatHistorys.length, 0, { receiver: message.sender, content: [] });


    },
    DELETEFRIEND(state, message) {

        state.ws.send(JSON.stringify({ "sender": state.weChatId, "receiver": message.receiver, "type": "deleteFriend", "content": message.content }));

        /* //成功删除好友之后  跳转到首页  并将好友列表和最近消息列表删除
          for( let i = 0; i < state.friendList.length; i++ ){
              if( state.friendList[i].friendWeChatId === message.receiver){
                  state.friendList.splice( i, 1 );
                  // state.router.push( {path: '/'} );
              }
          }
  
          for(let i = state.chatHistorys.length - 1; i >= 0; i-- ){
              if( state.chatHistorys[i].receiver === message.receiver || state.chatHistorys[i].receiver === state.weChatId ){
                  // console.log('111state.weChatId',state.weChatId,"message.receiver",message.receiver);
                  state.chatHistorys.splice( i, 1 );
              }
          }
          console.log('删除好友history11',state.chatHistorys);
  
          state.router.push( {path: '/'} );*/

    },
    DEFRIEND(state, message) { //拉黑好友
        state.ws.send(JSON.stringify({ "sender": state.weChatId, "receiver": message.receiver, "type": "defriend", "content": message.content }));
        state.router.push({ path: '/' });
    },
    FRIEND(state, message) {  //拉出黑名单
        state.ws.send(JSON.stringify({ "sender": state.weChatId, "receiver": message.receiver, "type": "friend", "content": message.content }));
        state.router.push({ path: '/' });
    },

    //添加到群聊 (测试) 
    GROUPADD(state, message) {
        state.ws.send(JSON.stringify({ "sender": state.weChatId, "receiver": message.receiver, "type": "groupAdd", "content": message.content }));
    },
    GROUPCHAT(state, message) {   //发送群消息
        state.ws.send(JSON.stringify(message));   //message:{  }
    },

    /**
     * @description 更新state下的属性
     * @param state:string 
     * @param payload:{ key:string , value:string}
     * @function state[key] = value
     */
    updateState(state, payload) {
        // console.log("updateState payload", payload);
        state[payload.key] = payload.value;
        console.log("state key:", payload.key, "state value: ", payload.value);
        if (payload.key === 'friendList') {
            state.friendList.filter(
                item => {
                    state.chatHistorys.splice(state.chatHistorys.length, 0, { receiver: item.friendWeChatId, content: [] });
                }
            );
            state.chatHistorys.splice(state.chatHistorys.length, 0, { receiver: state.weChatId, content: [] });
            // console.log("聊天记录分组:", state.chatHistorys);
        }
    },
    /**
     * @description 测试其他模块调用本模块的mutation
     * @param {*} state 
     * @param {*} msg 
     */
    test(state, msg) {
        console.log("dataHandle mutations test:", msg)
    },
    /**
     * @description 将接收到消息添加到对应的数组中（渲染出来）
     * @param {*} state 
     * @param {*} msg 
     */
    setReceiveMsg(state, msg) {
        // console.log("dataHandle mutations chatHandle:", msg)
        if (msg.type === "chat" || msg.type === "chatImg") {
            for (let i = 0; i < state.chatHistorys.length; i++) {
                if (state.chatHistorys[i].receiver === msg.sender) {
                    msg.receiverTime = new Date();
                    state.chatHistorys[i].content.splice(state.chatHistorys[i].content.length, 0, msg);
                }
            }
        }
    },
    /**
     * @description 将发送的消息添加到对应的数组重（渲染出来）
     * @param {*} state 
     * @param {*} msg 
     */
    setSendMsg(state, msg) {
        for (let i = 0; i < state.chatHistorys.length; i++) {
            if (state.chatHistorys[i].receiver === msg.receiver) {
                state.chatHistorys[i].content.splice(state.chatHistorys[i].content.length, 0, msg);
            }
        }
    },
    // setNewFriend(state, msg) {
    //     if (msg.type === "addFriend") {
    //         console.log('接收到的添加好友消息', msg);
    //         state.applyAddList.splice(state.applyAddList.length, 0, msg);
    //     }
    // },
    receiveAddFriend(state, msg) {
        if (msg.type === "addFriend") {
            console.log('接收到的添加好友消息', msg);
            state.applyAddList.splice(state.applyAddList.length, 0, msg);
        }
    },
    /**
     * @description 当被对方删除，消息发送失败
     * @param {*} state 
     * @param {*} msg 
     */
    notFriend(state, msg) {
        if (msg.type === "sendFail") {
            console.log('datahandle mutations notfriends:', msg);
            for (let i = 0; i < state.chatHistorys.length; i++) {
                if (state.chatHistorys[i].receiver === msg.sender) {
                    state.chatHistorys[i].content.splice(state.chatHistorys[i].content.length, 0, msg);
                }
            }
        }
    }
};


export const actions = {
    /**
     * @description 登录成功后初始化
     * @param {context} commit 
     * @param {payload} payload 
     * 不直接获取state，而是通过参数获得
     * 不直接修改state，二是通过commit修改
     */
    initData({ commit, dispatch, state, rootState }, payload) {
        commit('updateState', { key: 'weChatId', value: payload.weChatId });
        commit('updateState', { key: 'token', value: payload.token });
        dispatch('wsCenter/initWs', payload.weChatId, { root: true });
        dispatch('friendList', payload.weChatId);
        dispatch('userInfo', payload.weChatId);
    },
    /**
     * @param commit:function  mutation 
     * @param weChatId:string
     */
    userInfo({ commit }, weChatId) {
        post('/api/queryUserInfo', { 'weChatId': weChatId })
            .then(res => res.json())
            .catch(error => console.log("userinfo action:", error))
            .then(
                res => {
                    // console.log("userInfo res", res);
                    commit("updateState", { key: 'user', value: res })
                }
            )
    },
    /**
     * @description 查询用户的详细信息
     * @param {*} commit 
     * @param {*} weChatId 
     * @returns promise
     */
    friendInfo({ commit }, weChatId) {
        post('/api/queryUserInfo', { 'weChatId': weChatId });
    },
    /**
     * @description 查询某个id的好友列表
     * @param context:object
     * @param weChatId:string
     * @returns []好友列表friendList
     */
    friendList({ commit }, weChatId) { //request friendlist  获取朋友列表  
        // console.log("arguments", arguments);
        post('/api/friendList', { weChatId: weChatId })
            .then(res => res.json())
            .catch(error => console.log("friendList action:", error))
            .then(
                res => {
                    // console.log('actions friend', res);
                    commit("updateState", { key: "friendList", value: res });
                }
            )
    },
    /**
     * @description 同意添加好友
     * @param {*} context 
     * @param {*} replyMsg 
     */
    acceptAddFriend({ commit, dispatch, state, rootState }, replyMsg) {
        console.log('dataHandle action acceptAddFrien', replyMsg);
        // console.log('同意添加好友');
        dispatch('wsCenter/sendFunc', { "sender": replyMsg.receiver, "receiver": replyMsg.sender, "type": "acceptAdd", "content": "同意添加" }, { root: true })
        //重新请求好友列表
        dispatch('friendList', state.weChatId);
    },
    /**
     * @description 删除好友功能
     * @param {*} context 
     * @param {*} msg 
     */
    removeFriend({ commit, dispatch, state, rootState }, msg) {
        console.log('dataHandle action removeFriend', msg);
        dispatch('wsCenter/sendFunc', { "sender": state.weChatId, "receiver": msg.receiver, "type": "deleteFriend", "content": msg.content }, { root: true })
        //重新请求好友列表
        dispatch('friendList', state.weChatId);
    }
}

export const getters = {

    groupChat: function () {
        return this.state.groupChat;
        // return [];
    }

}