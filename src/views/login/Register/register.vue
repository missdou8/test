<template>
  <div class="register">
    <div class="cell border_bottom">
      <input v-model="phone" type="tel" placeholder="请输入手机号">
    </div>
    <div class="cell">
      <input v-model="code" type="number" placeholder="请输入手机验证码">
    </div>
    <verifica-code
      class="phone_code"
      code-type="SMS"
      slot="button"
      :code-mobile="phone"
      ref="verifica_phone_code"
    ></verifica-code>

    <van-field v-model="password" type="password" placeholder="请设置您的登录密码"/>

    <div class="btn_box">
      <van-button :disabled="btnEnable" class="btn" size="large" @click="register()">申请</van-button>
    </div>
  </div>
</template>

<script>
import verificaCode from "../../../components/verificaCode.vue";
export default {
  data() {
    return {
      phone: "",
      code: "",
      password: ""
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
    register() {
      //发送注册请求
      this.http.user
        .register({
          mobile: this.phone,
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
