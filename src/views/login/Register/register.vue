<template>
  <div id="authority">
    <div class="authority register">
      <van-cell-group>
        <van-field v-model="name" placeholder="请输入姓名"/>
        <van-field v-model="phone" type="number" placeholder="请输入手机号"/>
        <van-field class="phonecode_box" type="number" center v-model="code" placeholder="请输入手机验证码">
          <van-button class="phonecode" slot="button" size="small" type="primary">
            <verifica-code code-type="SMS" :code-mobile="phone"></verifica-code>
          </van-button>
        </van-field>
        <van-field v-model="password" type="password" placeholder="请设置您的登录密码"/>
        <van-field v-model="rePassword" type="password" placeholder="请再次输入您的密码"/>
      </van-cell-group>
      <div class="btn_box">
        <van-button :disabled="btnEnable" class="btn" size="large" @click="register()">申请</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import verificaCode from "../../../components/verificaCode.vue";
export default {
  data() {
    return {
      name: "",
      phone: "",
      code: "",
      password: "",
      rePassword: "",
    };
  },
  computed: {
    btnEnable() {
      if (
        this.name &&
        this.phone &&
        this.code &&
        this.password &&
        this.rePassword
      ) {
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
      if (this.password !== this.rePassword)
        return this.$toast("两次输入的密码应该一致！");
      //发送注册请求
      this.http.user
        .register({
          name: this.name,
          mobile: this.phone,
          SMSCode: this.code,
          password: this.password,
          confirmPassword: this.rePassword
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
        });
    }
  }
};
</script>

<style>
@import "../../../style/authority.css";
</style>