<template>
  <div id="authority">
    <div class="authority login loginPosition">
      <van-cell-group style="margin-top: 2rem;">
        <van-field v-model="phone" type="number" placeholder="请输入手机号"/>
        <van-field v-model="password" type="password" placeholder="请输入密码"/>
        <van-field class="imgcode_box" type="number" center v-model="code" placeholder="请输入验证码">
          <van-button class="imgcode" slot="button" size="small" @click="getImgCode">
            <img
              ref="imgCode"
              src="/api/verify/imgCode?type=forget"
            >
          </van-button>
        </van-field>
      </van-cell-group>
      <div class="btn_box">
        <van-button class="btn" size="large" :disabled="btnEnable" @click="Login()">登录</van-button>
        <div class="btn_box_footer">
          <router-link class="fing" to="/findPwd" style="color: #2a9ae7;"><u>忘记密码</u></router-link>
        </div>
      </div>
      <div class="login_bottom">
        <p class="btn_box_dec">
          <span>登录即视为你同意我们的</span>
          <router-link to="/registerTips">《用户使用协议》</router-link>
        </p>
        <p style="font-size: 0.24rem;color: #c0c4cc;">
          如需注册请前往嘀嗒比赛公众号
        </p>
      </div>

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
  computed: {
    btnEnable() {
      if (this.phone && this.code && this.password) {
        return false;
      }
      return true;
    }
  },
  methods: {
    getImgCode() {
      this.$refs.imgCode.src = `/api/verify/imgCode?r=${Math.random()}`;
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
        this.$store.commit("setIsLogin", true);
      })
      .catch(() => {
        //重新获取验证码
        this.$refs.verifica_code.getImgCode();
      });
    }
  }
};
</script>

<style scoped>
@import "../../style/authority.css";

.loginPosition {
  position: relative;
  overflow: hidden;
}

.login_bottom {
  position: absolute;
  width: 100%;
  bottom: 1rem;
}

.btn_box_dec {
  font-size: 0.24rem;
  color: #c0c4cc;
  padding-bottom: 0.15rem;
  margin: 0 auto;
}

.btn_box_dec a {
  color: #c0c4cc;
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

.btn {
  border-radius: .9rem;
  margin-top: .4rem;
}
</style>

<style>
.login .van-checkbox__label {
  margin-left: 0.1rem;
}

.login .van-checkbox__icon--round .van-icon {
  color: #3b3a39;
  border: 0;
  background-color: initial;
  background-image: url(../../assets/zhuce_icon01.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login .van-checkbox__icon--checked .van-icon {
  background-image: url(../../assets/zhuce_icon02.png);
  color: #000;
}

.login .van-checkbox__icon--checked .van-icon::before {
  content: "";
}
</style>

