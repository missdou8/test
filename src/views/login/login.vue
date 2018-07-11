<template>
  <div id="login">
      <van-cell-group>
        <van-field v-model="phone" placeholder="请输入手机号"/>
        <van-field v-model="password" type="password" placeholder="请输入密码"/>
        <van-field class="code_box" center v-model="code" placeholder="请输入验证码">
          <van-button id="code" slot="button" size="small">
            <verifica-code code-type="IMG" ref="verifica_code"></verifica-code>
          </van-button>
        </van-field>
      </van-cell-group>
      <div class="btn_box">
        <p class="btn_box_dec">
          <span>登录即视为你同意我们的</span> 
          <router-link to="/registerTips">《用户使用协议》</router-link>
        </p>
        <van-button class="login_btn" size="large" :disabled="btnEnable" @click="Login()">登录</van-button>
        <div class="btn_box_footer">
          <van-checkbox v-model="checked" class="checked">自动登录</van-checkbox>
          <router-link class="fing" to="/findPwd">忘记密码?</router-link>
        </div>
      </div>
      <div class="new_user">
        <van-button class="new_user_btn" type="default" @click="goRegister()">新用户申请办比赛</van-button>
      </div>
  </div>
</template>
<script>
import verificaCode from "../../components/verificaCode.vue";
export default {
  data() {
    return {
      phone: "",
      password: "",
      code: "",
      checked: true
    };
  },
  computed: {
    btnEnable() {
      if (this.phone && this.code && this.password) {
        return false;
      }
      return true;
    }
  },
  components: {
    verificaCode
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },
    Login() {
      this.http.user
        .login({
          mobile: this.phone,
          password: this.password,
          imgCode: this.code
        })
        .then(res => {
          //登录成功的时候直接跳转首页
          this.$router.push("match");
        })
        .catch(() => {
          //重新获取二维码
          this.$refs.verifica_code.getImgCode()
        });
    }
  }
};
</script>

<style scoped>
#login {
  text-align: center;
  padding-top: 3.5rem;
  background-image: url(../../assets/zhuce_back.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
}
.img {
  height: 100%;
  width: 100%;
}
#code {
  border: none;
  padding: 0;
  height: 0.95rem;
  width: 2.2rem;
}
#code:active::before {
  opacity: 0;
}
#login .code_box {
  padding-top: 0;
  padding-bottom: 0;
}
.btn_box {
  position: relative;
  overflow: hidden;
  padding: 0.5rem 0.3rem 0.6rem 0.3rem;
}
.btn_box_dec {
  font-size: 0.28rem;
  color: rgb(97, 97, 97);
  padding-bottom: 0.15rem;
}
.btn_box_dec a {
  color: rgb(255, 80, 0);
}
.login_btn {
  background-color: rgb(252, 198, 0);
  height: 0.9rem;
  line-height: 0.9rem;
  color: rgb(17, 17, 17);
  border-width: 0;
  font-weight: 600;
}
.btn_box_footer {
  position: relative;
  overflow: hidden;
  margin-top: 0.2rem;
  font-size: 0.28rem;
  color: rgb(228, 186, 29);
}
.btn_box_footer .checked {
  float: left;
}
.btn_box_footer .fing {
  float: right;
  color: rgb(228, 186, 29);
}
.new_user {
  text-align: center;
  font-size: 15px;
}
.new_user_btn {
  background-color: initial;
  border-color: rgb(93, 79, 24);
  color: rgb(228, 186, 29);
  padding: 0 0.2rem;
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.26rem;
  font-weight: 600;
}
.new_user_dec {
  color: #f00;
  position: absolute;
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  top: 0.2rem;
  font-size: 0.26rem;
  left: 0;
  background-image: url(../../assets/zhuce_back_tishi.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.login_btn.van-button--disabled{
  opacity: 0.6;
}
</style>

<style>
#login .van-field__button {
  padding-left: 10px;
  height: 44px;
}
#login .van-cell {
  padding: 0.4rem 0.3rem 0.2rem 0.35rem;
  color: #fff;
}
#login .van-cell input {
  color: #fff;
}
#login .van-cell-group,
#login .van-cell,
#login .van-cell input,
#login .van-cell button {
  background-color: initial;
}
#login .van-hairline--top-bottom::after {
  border-top-width: 0;
  border-color: rgb(54, 44, 18);
  left: 0.3rem;
  width: 13.2rem;
}
#login .van-cell:not(:last-child)::after {
  border-color: rgb(54, 44, 18);
  left: 0.3rem;
  width: 6.6rem;
}
#login .van-field__button {
  height: 0.95rem;
}
#login .van-checkbox__label {
  margin-left: 0.1rem;
}
#login .van-checkbox__icon--round .van-icon{
  color: #3b3a39;
  border: 0;
  background-color: initial;
  background-image: url(../../assets/zhuce_icon01.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#login .van-checkbox__icon--checked .van-icon {
  background-image: url(../../assets/zhuce_icon02.png);
  color:#000;
}
</style>

