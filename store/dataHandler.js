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

    //添加到群聊 (测试) 
    // GROUPADD(state, message) {
    //     state.ws.send(JSON.stringify({ "sender": state.weChatId, "receiver": message.receiver, "type": "groupAdd", "content": message.content }));
    // },
    // GROUPCHAT(state, message) {   //发送群消息
    //     state.ws.send(JSON.stringify(message));   //message:{  }
    // },

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
    /**
     * @description 将好友请求添加到“好友申请列表”中
     * @param {*} state 
     * @param {*} msg 
     */
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
    },
    /**
     * @description 成功删除好友之后的  重新刷新好友列表
     * @param {*} state 
     * @param {*} msg 
     */
    // removeFriendSuccess(state, msg) {

    // }
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
    },
    /**
     * @description 拉黑/恢复好友
     * @param {*} context 
     * @param {*} msg 
     */
    modifyFriendShip({ dispatch, state }, msg) {
        console.log('dataHandle action removeFriend', msg);
        dispatch('wsCenter/sendFunc', { "sender": state.weChatId, "receiver": msg.receiver, "type": msg.type, "content": msg.content }, { root: true })
        //重新请求好友列表
        dispatch('friendList', state.weChatId);
    }
}

export const getters = {
    groupChat: function () {
        return this.state.groupChat;
    }
}