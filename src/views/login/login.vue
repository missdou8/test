<template>
  <div class="login">
      <van-cell-group>
        <van-field v-model="phone" label="账号" placeholder="请输入手机号" icon="clear" @click-icon="phone = ''"/>
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" icon="clear" @click-icon="password = ''"/>
        <van-field class="code_box" center v-model="code" label="验证码" placeholder="请输入验证码" icon="clear" @click-icon="code = ''">
          <van-button id="code" slot="button" size="small">
            <img class="img" src="../../assets/code.png" alt="" srcset="">
          </van-button>
        </van-field>
      </van-cell-group>
      <div class="btn_box">
        <p class="btn_box_dec">
          <span>登录即视为你同意我们的</span> 
          <router-link to="/registerTips">用户使用协议</router-link>
        </p>
        <van-button class="login_btn" size="large" @click="Login()">登录</van-button>
        <div class="btn_box_footer">
          <van-checkbox v-model="checked" class="checked">自动登录</van-checkbox>
          <router-link class="fing" to="/findPwd">忘记密码?</router-link>
        </div>
      </div>
      <div class="new_user">
        <van-button class="new_user_btn" type="default" @click="goRegister()">新用户申请办比赛</van-button>
        <p class="new_user_dec">您的注册申请未通过</p>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      code: "",
      checked: true
    };
  },
  methods: {
    goRegister(){
      this.$router.push("/register");
    },
    Login(){
      this.$router.push("user/set/index");
    }
  }
};
</script>

<style scoped>
.login {
  background-color: #fff;
  height: 100%;
  text-align: center;
  padding-top: 20px;
}
.img {
  height: 100%;
}
#code {
  border: none;
  padding: 0;
  height: 44px;
}
#code:active::before {
  opacity: 0;
}
.login .code_box {
  padding: 0;
  padding-left: 15px;
  line-height: 44px;
}
.btn_box {
  padding: 15px;
}
.btn_box_dec {
  font-weight: 400;
  font-size: 14px;
  color: rgba(69, 90, 100, 0.6);
  padding-bottom: 15px;
}
.btn_box_dec a {
  color: #f00;
  text-decoration: underline;
}
.login_btn {
  background-color: #108ee9;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  color: #fff;
}
.btn_box_footer {
  position: relative;
  overflow: hidden;
  margin-top: 15px;
  font-size: 15px;
}
.btn_box_footer .checked {
  float: left;
}
.btn_box_footer .fing {
  float: right;
}
.new_user {
  text-align: center;
  font-size: 15px;
}
.new_user_btn {
  border-radius: 45px;
  background: #108ee9;
  color: #fff;
  padding: 0 25px;
}
.new_user_dec{
  color: #f00;
  margin-top: 15px;
}
</style>

<style>
.login .van-field__button {
  padding-left: 10px;
  height: 44px;
}
</style>

