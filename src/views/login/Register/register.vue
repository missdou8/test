<template>
  <div class="register">
     <van-cell-group>
        <van-field v-model="name" label="姓名" placeholder="请输入姓名" icon="clear" @click-icon="name = ''"/>
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" icon="clear" @click-icon="phone = ''"/>
        <van-field class="code_box" center v-model="code" label="验证码" placeholder="请输入手机验证码" icon="clear" @click-icon="code = ''">
          <van-button slot="button" size="small" type="primary" @click="sendClick()" :disabled="!ifSend">
            <span v-if="ifSend">发送验证码</span>
            <span v-else>{{time}}s后可重新发送</span>
          </van-button>
        </van-field>
        <van-field v-model="password" type="password" label="密码" placeholder="请设置您的登录密码" icon="clear" @click-icon="password = ''"/>
        <van-field v-model="rePassword" type="password" label="确认密码" placeholder="请再次输入您的密码" icon="clear" @click-icon="rePassword = ''"/>
      </van-cell-group>
      <div class="btn_box">
        <van-button :disabled="btnEnable" class="reg_btn" size="large" @click="register()">申请</van-button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      phone: "",
      code: "",
      password: "",
      rePassword: "",
      ifSend: true,
      time: 150
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
  components: {},
  created() {},
  methods: {
    register() {
      if (this.password !== this.rePassword) {
        return this.$toast("两次输入的密码应该一致！");
      }
      let data = {
        name: this.name,
        mobile: this.phone,
        code: this.code,
        password: this.password
      };
      console.log(data)
    },
    finish() {
      this.ifSend = true;
    },
    sendClick() {
      this.ifSend = false;
      let Time = setInterval(() => {
        if (this.time <= 1) {
          clearInterval(Time);
          this.ifSend = true;
          this.time = 150;
        } else {
          this.time--;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.register {
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
