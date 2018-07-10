<template>
  <div class="changePwd">
    <van-cell-group class="input_top">
      <van-field v-model="oldPassword" type="password" placeholder="请输入旧密码"/>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="newPassword" type="password" placeholder="请输入新密码"/>
      <van-field v-model="rePassword" type="password" placeholder="请再次输入新密码"/>
    </van-cell-group>
    <dida-btn :btn-enable="btnEnable" @submetData="changePwd()"></dida-btn>
  </div>
</template>

<script>
import didaBtn from "../../../components/didaBtn.vue";
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      rePassword: ""
    };
  },
  computed: {
    btnEnable() {
      if (this.oldPassword && this.newPassword && this.rePassword) {
        return false;
      }
      return true;
    }
  },
  components: {
    didaBtn
  },
  created() {},
  methods: {
    changePwd() {
      if (this.newPassword !== this.rePassword) {
        return this.$toast("两次输入的密码应该一致！");
      }
      this.http.user
        .changePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.rePassword
        })
        .then(res => {
          this.$dialog
            .alert({
              title: "嘀嗒比赛",
              message: res.msg
            })
            .then(() => {
              this.$router.go(-1);
            });
        });
    }
  }
};
</script>

<style scoped>
.changePwd {
  text-align: center;
  padding-top: 20px;
}
.input_top {
  margin-bottom: 0.3rem;
}
</style>
