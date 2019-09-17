<template>
  <div class="login">
    <header>
      <svg style="width:2rem;height:2rem;" @click="exit">
        <use xlink:href="#exit" />
      </svg>
    </header>
    <div class="container">
      <div v-if="loginPage">微信号/QQ/邮箱登录</div>
      <div v-else>注册账号</div>
      <div class="account">
        <span>账号</span>
        <input class="account" v-model="weChatId" type="text" placeholder="请填写微信号/QQ号/邮箱" />
      </div>
      <div class="account">
        <span>密码</span>
        <!-- <input class="account" v-model="password" type="password" placeholder="请填写密码"> -->
        <input class="account" v-model="password" type="password" placeholder="请填写密码" />
      </div>
      <span class="phone-login-option">用手机号登录</span>

      <button class="submit" :class="{'active':active}" @click="login" v-if="loginPage">登录</button>
      <button class="submit" :class="{'active':active}" @click="register" v-else>注册</button>
    </div>

    <div class="choose-list" v-if="chooseList" @click.prevent="chooseList=false">
      <div>登录其他账号</div>
      <div v-if="loginPage" @click="swicthPage('register')">注册</div>
      <div v-else @click="swicthPage('login')">登录</div>
      <div>微信安全中心</div>
    </div>

    <div class="error-pop" v-if="errorPop">
      <div class="pop-content">
        <div v-if="loginPage">登录失败</div>
        <div v-else>注册失败</div>
        <!-- <div>账号或者密码错误，请重新填写</div> -->
        <div>{{errorText}}</div>
        <div class="pop-footer" @click="errorPop=false">确定</div>
      </div>
    </div>

    <footer>
      <span>找回密码</span>
      <span>紧急冻结</span>
      <span @click="chooseList=true">微信安全中心</span>
    </footer>
  </div>
</template>
<script>
import { post } from "@/utils/fetch-tool.js";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      loginPage: true,
      weChatId: "",
      password: "",
      chooseList: false,
      errorPop: false,
      errorText: "账号或者密码错误，请重新填写"
    };
  },
  created: function() {
    console.log("token:", !!window.localStorage.getItem("token"));

    // var txt = "";
    // txt = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
    // txt+= "<p>Browser Name: " + navigator.appName + "</p>";
    // txt+= "<p>Browser Version: " + navigator.appVersion + "</p>";
    // txt+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
    // txt+= "<p>Platform: " + navigator.platform + "</p>";
    // txt+= "<p>User-agent header: " + navigator.userAgent + "</p>";
    // txt+= "<p>User-agent language: " + navigator.systemLanguage + "</p>";
    // console.log('navigater:' , txt);
  },
  computed: {
    active: function() {
      return this.weChatId !== "" && this.password !== "";
    }
  },
  methods: {
    ...mapMutations({ initData: "initData" }),
    exit: function() {
      console.log("退出");
      // window.opener = null;
      // window.open('','_self');
      // window.close();
      open(location, "_self").close();
    },
    login: function() {
      // var that = this;
      // if( this.active ){
      //     fetch('/api/login',{
      //         method:"post",
      //         headers:{
      //             "Content-type":"application/x-www-form-urlencoded",
      //             },
      //             body:"weChatId="+this.weChatId+"&password="+this.password+"&device=device"
      //     }) // 返回一个Promise对象
      //         .then((res)=>{
      //             console.log("res",res)
      //             return res.text() // res.text()是一个Promise对象
      //         })
      //         .then((res)=>{
      //             console.log("返回的",res) // res是最终的结果
      //             if( res === "登录失败" ){
      //                 this.setError('账号或者密码错误，请重新填写');
      //             }else{
      //                 this.$store.state.dataHandler.weChatId = this.weChatId;
      //                 this.$store.state.dataHandler.token = res;
      //                 localStorage.setItem('token',res);
      //                 localStorage.setItem('wechatId',this.weChatId);
      //                 post('/api/queryUserInfo',{'weChatId':this.weChatId})
      //                     .then( res => res.json() )
      //                     .then(
      //                         res  => {
      //                             this.$store.state.dataHandler.user = res;
      //                             console.log('personInfo1',res);
      //                             // return res;
      //                         }
      //                     )
      //                 this.$store.commit('dataHandler/REQFRIENDLIST');
      //                 this.$store.commit('dataHandler/WEBSOCKETCONNECTION');
      //                 console.log("登录成功");
      //                 this.$router.replace("/");
      //             }
      //     });
      // }

      let that = this;
      if (this.active) {
        console.log("账号密码", {
          weChatId: this.weChatId,
          password: this.password
        });
        post("/api/login", { weChatId: this.weChatId, password: this.password })
          .then(res => res.json())
          .catch(error => this.setError(error))
          .then(res => {
            // console.log("返回的res", res);
            if (res.code === 0) {
              // this.$store.commit("dataHandler/initData", {
              //   weChatId: this.weChatId,
              //   token: res.data
              // });
              this.$store.dispatch("dataHandler/initData", {
                weChatId: this.weChatId,
                token: res.data
              });
              // this.$store.commit("wsCenter/link");
              this.$router.replace("/");
            } else if (res.code === -2) {
              this.setError(res.data);
            }
          });
      }
    },
    register: function() {
      post("/api/register", {
        weChatId: this.weChatId,
        password: this.password
      })
        .then(res => res.json())
        .catch(error => this.setError(error))
        .then(res => {
          // console.log( "注册信息:" , res.data );
          if (res.data == "注册成功") {
            console.log("注册成功:", res.data);
            this.swicthPage("login");
          } else {
            this.setError(res.data);
          }
        });
    },
    setError: function(errorText) {
      this.errorPop = true;
      this.errorText = errorText;
    },
    swicthPage: function(page) {
      switch (page) {
        case "login":
          this.loginPage = true;
          this.weChatId = "";
          this.password = "";
          break;
        case "register":
          this.loginPage = false;
          this.weChatId = "";
          this.password = "";
          break;
      }
    }
  },
  components: {},
  mounted: function() {
    // console.log('screen',window.screen.width );
    // console.log('screen',window.screen.height );
  }
};
</script>
<style scoped>
.login {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
header {
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  padding: 0 0.75rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 3rem;
  /* background: #333; */
  /* color:#333; */
}
.container {
  box-sizing: border-box;
  padding: 3rem 0.75rem 0 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
.container div:first-child {
  width: 100%;
  height: 6rem;
  line-height: 6rem;
  font-size: 1.5rem;
  font-weight: 200;
  /* background: cyan; */
}
.container input {
  height: 2.8rem;
  line-height: 2.8rem;
  border: none;
  border-bottom: 0.01rem solid #e8e8e8;
  /* background: cyan; */
  text-indent: 4rem;
  outline: none;
}
.container input:focus {
  border-bottom: 0.01rem solid #97dfc2;
}
.container .account,
.container .password {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
}
.container .account span,
.container .password span {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  min-width: 0;
  height: 3rem;
  line-height: 3rem;
  /* background:orange; */
  z-index: 1;
}
.phone-login-option {
  margin: 1rem 0;
  display: inline-block;
  color: #7283a4;
}
.submit {
  margin: 1rem 0 0 0;
  width: 100%;
  height: 2.6rem;
  background: #b4ecce;
  border: none;
  border-radius: 0.3rem 0.3rem;
  color: #c2f0d7;
  font-size: 1rem;
  outline: none;
}
.active {
  color: #e6f8ef;
  background: #07c160;
}

.choose-list {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* align-content: flex-end; */
  width: 100%;
  height: 100%;
  background: rgba(60, 60, 60, 0.3);
  z-index: 1;
}
.choose-list div {
  box-sizing: border-box;
  padding-left: 0.75rem;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  background: #fff;
  color: #757575;
}
.choose-list div:first-child {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.error-pop {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(60, 60, 60, 0.3);
}
.error-pop .pop-content {
  box-sizing: border-box;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 10rem;
  background: #fff;
  border-radius: 0.5rem;
}
.error-pop .pop-content div {
  width: 100%;
  min-height: 1.5rem;
  font-size: 1rem;
  text-align: center;
  letter-spacing: 0.02rem;
  color: #8d8d8d;
}
.error-pop .pop-content div:first-child {
  color: #353535;
  font-weight: 800;
}
.error-pop .pop-content div:last-child {
  position: relative;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  color: #596d96;
}
.error-pop .pop-content div:last-child:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0.036rem;
  background-color: rgb(190, 190, 190);
  left: 0;
  top: 0;
  transform: scaleY(0.5);
  z-index: 1;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  /* background:#333; */
}
footer span {
  padding: 0 0.5rem;
  display: inline-block;
  min-width: 0;
  min-height: 1.1rem;
  line-height: 1.1rem;
  border-right: 0.01rem solid #dedede;
  color: #7283a4;
  font-size: 0.75rem;
}
footer span:last-child {
  border: none;
}
</style>