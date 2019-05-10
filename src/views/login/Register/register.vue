<template>
  <div class="register">
    <div class="cell border_bottom">
      <input v-model="phoneNumber" type="tel" placeholder="请输入手机号">
    </div>
    <div class="cell">
      <input v-model="code" type="number" placeholder="请输入手机验证码">
      <button @click="sendCode" :disabled="sendCodeEnable">{{codeBtnTitle}}</button>
    </div>
    <van-field v-model="password" type="password" placeholder="请设置您的登录密码"/>

    <div class="btn_box">
      <van-button :disabled="btnEnable" class="btn" size="large" @click="register()">申请</van-button>
    </div>
  </div>
</template>

<script>
import verificaCode from "../../../components/verificaCode.vue";
import { log } from "util";
export default {
  data() {
    return {
      phoneNumber: "",
      code: "",
      password: "",
      codeBtnTitle: "获取验证码",
      sendCodeEnable: false
    };
  },
  computed: {
    btnEnable() {
      if (this.phoneNumber && this.code && this.password) {
        return false;
      }
      return true;
    }
  },
  components: {
    verificaCode
  },
  methods: {
    sendCode() {
      console.log(this.utils);
      if (this.utils.isPhoneNum(this.phoneNumber))
        return this.$toast("请检查手机号是否正确");
      this.http.verify
        .SMSCode({
          mobile: this.codeMobile,
          r: Math.random()
        })
        .then(res => {
          this.finish(true);
          this.$toast(res.msg);
        })
        .catch(() => {
          //接口错误的话(清除倒计时并重置时间)
          this.finish(false);
        });
    },
    register() {
      //发送注册请求
      this.http.user
        .register({
          mobile: this.phoneNumber,
          SMSCode: this.code,
          password: this.password
        })
        .then(res => {
          this.$dialog
            .alert({
              title: "嘀嗒比赛",
              message: res.msg
            })
            .then(() => {
              this.$router.push({ path: "/login", replace: true });
            });
        })
        .catch(() => {
          //初始化短信验证码倒计时
          this.$refs.verifica_phone_code.finish(false);
        });
    }
  }
};
</script>

<style scoped>
.register {
  padding-top: 2rem;
}
.phone_code {
  height: 100%;
}
.cell {
}
</style>
