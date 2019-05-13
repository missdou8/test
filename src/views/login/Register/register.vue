<template>
  <div class="register">
    <div v-if="!checkCode">
      <div class="cell border_bottom">
        <input v-model="phoneNumber" type="tel" placeholder="请输入手机号">
      </div>
      <div class="cell border_bottom">
        <input v-model="code" type="number" placeholder="请输入手机验证码">
        <button class="code_msg" @click="sendCode" :disabled="sendCodeEnable">{{codeBtnTitle}}</button>
      </div>
      <normal-button class="next" :disabled="!canNext" @click.native="nextClick">下一步</normal-button>
    </div>
    <div v-else>
      <div class="cell border_bottom">
        <input v-model="password" type="password" placeholder="请输入密码">
      </div>
      <p class="password_tips">密码需要包含数字及英文字母，最少6位</p>
      <normal-button class="next" :disabled="!canFinish" @click.native="register">完成</normal-button>
    </div>
  </div>
</template>

<script>
import NormalButton from "../../../components/button/NormalButton";
export default {
  data() {
    return {
      phoneNumber: "",
      code: "",
      password: "",
      codeBtnTitle: "获取验证码",
      sendCodeEnable: false,
      countDownNum: 60,
      checkCode: false //验证码是否验证成功
    };
  },
  computed: {
    canNext() {
      return this.utils.isPhoneNum(this.phoneNumber) && this.code.length >= 4;
    },
    canFinish() {
      return this.password;
    }
  },
  components: {
    NormalButton
  },
  methods: {
    sendCode() {
      if (!this.utils.isPhoneNum(this.phoneNumber)) {
        return this.$toast("请检查手机号是否正确");
      }
      this.http.verify
        .SMSCode({
          mobile: this.phoneNumber,
          r: Math.random()
        })
        .then(res => {
          this.countDown(this.countDownNum);
          this.$toast(res.msg);
        });
    },
    nextClick() {
      this.http.user
        .checkAccount({
          mobile: this.phoneNumber,
          SMSCode: this.code
        })
        .then(result => {
          this.checkCode = true;
        });
    },
    countDown(time) {
      this.sendCodeEnable = true;
      let timer = setInterval(() => {
        this.codeBtnTitle = `重新获取(${time}s)`;
        if (time == 0) {
          clearInterval(timer);
          this.sendCodeEnable = false;
          this.codeBtnTitle = "获取验证码";
        }
        time--;
      }, 1000);
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
              this.$router.go(-1);
            });
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
  padding: 0.3rem 0 0.3rem 0.72rem;
}
input {
  width: 4.2rem;
}
.next {
  margin-top: 0.8rem;
}
.code_msg {
  font-size: 0.3rem;
}
.password_tips {
  color: #c0c4cc;
  font-size: 0.28rem;
  margin-top: 0.4rem;
  text-align: center;
}
</style>
