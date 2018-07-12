<template>
  <div id="register">
    <div class="register">
      <van-cell-group>
        <van-field v-model="name" placeholder="请输入姓名"/>
        <van-field v-model="phone" type="number" placeholder="请输入手机号"/>
        <van-field class="code_box" type="number" center v-model="code" placeholder="请输入手机验证码">
          <van-button id="code" slot="button" size="small" type="primary">
            <verifica-code code-type="SMS" :code-mobile="phone"></verifica-code>
          </van-button>
        </van-field>
        <van-field v-model="password" type="password" placeholder="请设置您的登录密码"/>
        <van-field v-model="rePassword" type="password" placeholder="请再次输入您的密码"/>
      </van-cell-group>
      <div class="btn_box">
        <van-button :disabled="btnEnable" class="reg_btn" size="large" @click="register()">申请</van-button>
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

<style scoped>
#register {
overflow: auto;
}
#register .register{
  min-height: 100%;
  text-align: center;
  padding-top: 35vh;
  background-image: url(../../../assets/zhuce_back.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
.title_dec {
  color: #f00;
  position: absolute;
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  top: 0.2rem;
  font-size: 0.26rem;
  left: 0;
  background-image: url(../../../assets/zhuce_back_tishi.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#code {
  padding: 0;
  height: 0.75rem;
  line-height: .75rem;
  margin-top: 0.18rem;
  width: 2.2rem;
  border-color: rgb(93, 79, 24);
  color: rgb(228, 186, 29);
  font-size: 0.26rem;
  font-weight: 600;
}
#code:active::before {
  opacity: 0;
}
#register .code_box {
  padding-top: 0;
  padding-bottom: 0;
}
.btn_box {
  position: relative;
  overflow: hidden;
  padding: 0.6rem 0.3rem 0.6rem 0.3rem;
}
.reg_btn {
  background-color: rgb(252, 198, 0);
  height: 0.9rem;
  line-height: 0.9rem;
  color: rgb(17, 17, 17);
  border-width: 0;
  font-weight: 600;
}
.reg_btn.van-button--disabled{
  opacity: 0.6;
}
</style>
<style>
#register .van-field__button {
  padding-left: 10px;
  height: 44px;
}
#register .van-cell {
  padding: 0.4rem 0.3rem 0.2rem 0.35rem;
  color: #fff;
}
#register .van-cell input {
  color: #fff;
}
#register .van-cell-group,
#register .van-cell,
#register .van-cell input,
#register .van-cell button {
  background-color: initial;
}
#register .van-hairline--top-bottom::after {
  border-top-width: 0;
  border-color: rgb(54, 44, 18);
  left: 0.3rem;
  width: 13.2rem;
}
#register .van-cell:not(:last-child)::after {
  border-color: rgb(54, 44, 18);
  left: 0.3rem;
  width: 6.6rem;
}
#register .van-field__button {
  height: 0.95rem;
}
/* .register .code_box .van-cell__value {
  margin-top: 0.2rem;
} */
</style>