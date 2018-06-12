<template>
  <div class="changePwd">
     <van-cell-group>
       <van-field v-model="oldPassword" type="password" label="旧密码" placeholder="请输入旧密码" icon="clear" @click-icon="oldPassword = ''"/>
        <van-field v-model="newPassword" type="password" label="新密码" placeholder="请输入新密码" icon="clear" @click-icon="newPassword = ''"/>
        <van-field v-model="rePassword" type="password" label="确认新密码" placeholder="请再次输入新密码" icon="clear" @click-icon="rePassword = ''"/>
      </van-cell-group>
      <div class="btn_box">
        <van-button :disabled="btnEnable" class="reg_btn" size="large" @click="changePwd()">提交</van-button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      rePassword:""
    };
  },
  computed: {
    btnEnable() {
      if (
        this.oldPassword &&
        this.newPassword &&
        this.rePassword
      ) {
        return false;
      }
      return true;
    }
  },
  components: {},
  created() {},
  methods: {
    changePwd() {
      if (this.newPassword !== this.rePassword) {
        return this.$toast("两次输入的密码应该一致！");
      }
      let data = {
        password: this.newPassword
      };
      console.log(data)
    },
  }
};
</script>

<style scoped>
.changePwd {
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
