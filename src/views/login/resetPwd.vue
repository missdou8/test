<template>
  <div id="authority">
    <div class="authority resetPwd">
      <van-cell-group>
        <van-field v-model="password" type="password" placeholder="请设置您的登录密码"/>
        <van-field v-model="rePassword" type="password" placeholder="请再次输入您的密码"/>
      </van-cell-group>
      <div class="btn_box">
        <van-button :disabled="btnEnable" class="btn" size="large" @click="resetPwd()">提交</van-button>
      </div>
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
@import "../../style/authority.css";
</style>