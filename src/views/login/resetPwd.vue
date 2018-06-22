<template>
  <div class="resetPwd">
     <van-cell-group>
        <van-field v-model="password" type="password" label="密码" placeholder="请设置您的登录密码" icon="clear" @click-icon="password = ''"/>
        <van-field v-model="rePassword" type="password" label="确认密码" placeholder="请再次输入您的密码" icon="clear" @click-icon="rePassword = ''"/>
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
      this.apiService.user
        .login({
          mobile: this.$route.query.id,
          newPassword: this.password,
          confirmPassword: this.rePassword
        })
        .then(res => {
          this.$dialog
            .alert({
              title: "嘀嗒比赛",
              message: res.data.msg
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
  background-color: #fff;
  height: 100%;
  text-align: center;
  padding-top: 20px;
}
.btn_box {
  padding: 15px;
}
.reg_btn {
  background-color: #108ee9;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  color: #fff;
}
.reg_btn.van-button--disabled {
  opacity: 0.6;
}
</style>
