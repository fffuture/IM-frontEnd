import { post } from '@/utils/fetch-tool.js'
import Router from 'vue-router';

export const state = () => {
  return {
    ws: '', //websocket连接对象
    msgMap: {
      'chat': ({ commit, dispatch, state, rootState }, msg) => {
        // console.log("wsCenter state chat");
        commit('dataHandler/setReceiveMsg', msg, { root: true })
      },
      'chatImg': ({ commit, dispatch, state, rootState }, msg) => {
        // console.log("wsCenter state chatImg");
        commit('dataHandler/setReceiveMsg', msg, { root: true })
      },
      'setSendMsg': ({ commit, dispatch, state, rootState }, msg) => {
        // console.log("wsCenter state setSendMsg");
        commit('dataHandler/setSendMsg', msg, { root: true })
      },
      'addFriend': ({ commit, dispatch, state, rootState }, msg) => {
        // console.log("wsCenter state setNewFriend");
        commit('dataHandler/receiveAddFriend', msg, { root: true })
      },
      'acceptAdd': ({ commit, dispatch, state, rootState }, msg) => {
        console.log("wsCenter state acceptAdd", rootState.dataHandler.weChatId);
        dispatch('dataHandler/friendList', rootState.dataHandler.weChatId, { root: true })
      },
      'sendFail': ({ commit, dispatch, state, rootState }, msg) => {
        console.log("wsCenter state sendFail", msg);
        commit('dataHandler/notFriend', msg, { root: true })
      },
    }
  }
};
export const mutations = {

  msgHandle(state) {
    console.log("wsCenter state msgHandle", state);
  }


};
export const actions = {

  /**
   * @description 初始化webSocket连接
   * @param {*} state 
   */
  initWs({ commit, dispatch, state, rootState }, weChatId) {
    // console.log("wsCenter state", state);
    if ('WebSocket' in window) {
      state.ws = new WebSocket("ws://192.168.42.204:8080/socketServer/" + weChatId);
    } else if ('MozWebSocket' in window) {
      state.ws = new MozWebSocket("ws://localhost:8080/socketServer/" + state.weChatId);
    } else {
      alert("该浏览器不支持websocket");
    }

    state.ws.onopen = function (evt) {
      console.log("websocket连接成功");
    }
    // state.ws.send( ){ }
    state.ws.onmessage = function (evt) {
      let msg = JSON.parse(evt.data);
      console.log("ws接收到消息", msg);
      //根据不消息类型调用函数,      
      state.msgMap[msg.type]({ commit, dispatch, state, rootState }, msg);
    }

    state.ws.onclose = function (evt) {
      console.log("websocket已关闭");
    }

  },

  /**
   * @description ws方式发送消息
   * @param context 
   * @param message: object {
   *            sender: string,
   *            senderImg: string,
   *            receiver: string,
   *            type:string,
   *            content:string
   *          } 
   * @returns void
   */
  sendMsg({ commit, dispatch, state, rootState }, msg) {
    if (state.ws.readyState === WebSocket.OPEN) {
      try {
        state.ws.send(JSON.stringify(msg));
        if (!!state.msgMap["setSendMsg"]) {
          state.msgMap["setSendMsg"]({ commit, dispatch, state, rootState }, msg);
        }
        console.log("wsCenter actions sendMsg success");
      } catch (error) {
        console.log("wsCenter actions sendMsg error", error);
      }
    } else {
      console.log("wsCenter actions sendMsg失败,请连接");
    }
  },
  /**
   * @description ws方式发送执行功能的请求，比如添加好友功能
   * @param {*} context 
   * @param {*} apply 
   */
  sendFunc({ commit, dispatch, state, rootState }, apply) {
    if (state.ws.readyState === WebSocket.OPEN) {
      try {
        state.ws.send(JSON.stringify(apply));
      } catch (error) {
        console.log("wsCenter actions sendFuncError", Erroe);
      }
    }
  }



}