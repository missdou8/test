<template>
  <div class="resetPwd">
     <van-cell-group>
        <van-field v-model="password" type="password" placeholder="请设置您的登录密码" icon="clear" @click-icon="password = ''"/>
        <van-field v-model="rePassword" type="password" placeholder="请再次输入您的密码" icon="clear" @click-icon="rePassword = ''"/>
      </van-cell-group>
      <div class="btn_box">
        <van-button :disabled="btnEnable" class="reg_btn" size="large" @click="resetPwd()">提交</van-button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      rePassword: ""
    };
  },
  computed: {
    btnEnable() {
      if (this.password && this.rePassword) {
        return false;
      }
      return true;
    }
  },
  components: {},
  created() {},
  methods: {
    resetPwd() {
      if (this.password !== this.rePassword) {
        return this.$toast("两次输入的密码应该一致！");
      }
      this.http.user
        .resetPassword({
          newPassword: this.password,
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
.resetPwd {
  height: 100%;
  text-align: center;
  padding-top: 3.7rem;
  background-image: url(../../assets/zhuce_back.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.btn_box {
  position: relative;
  overflow: hidden;
  padding: 0.95rem 0.3rem 0.6rem 0.3rem;
}
.reg_btn {
  background-color: rgb(252, 198, 0);
  height: 0.9rem;
  line-height: 0.9rem;
  color: rgb(17, 17, 17);
  border-width: 0;
  font-weight: 600;
}
.reg_btn.van-button--disabled {
  opacity: 0.6;
}
</style>
<style>
.resetPwd .van-field__button {
  padding-left: 10px;
  height: 44px;
}
.resetPwd .van-cell {
  padding: 0.4rem 0.3rem 0.2rem 0.35rem;
  color: #fff;
}
.resetPwd .van-cell input {
  color: #fff;
}
.resetPwd .van-cell-group,
.resetPwd .van-cell,
.resetPwd .van-cell input,
.resetPwd .van-cell button {
  background-color: initial;
}
.resetPwd .van-hairline--top-bottom::after {
  border-top-width: 0;
  border-color: rgb(54, 44, 18);
  left: 0.3rem;
  width: 13.2rem;
}
.resetPwd .van-cell:not(:last-child)::after {
  border-color: rgb(54, 44, 18);
  left: 0.3rem;
  width: 6.6rem;
}
.resetPwd .van-field__button {
  height: 0.95rem;
}
.resetPwd .code_box .van-cell__value {
  margin-top: 0.2rem;
}
.resetPwd .van-checkbox__label {
  margin-left: 0.1rem;
}
.resetPwd .van-checkbox__icon {
  color: initial;
  border: 0;
  background-color: initial;
  font-size: 0;
  background-image: url(../../assets/zhuce_icon01.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.resetPwd .van-checkbox--checked {
  background-image: url(../../assets/zhuce_icon02.png);
}
</style>