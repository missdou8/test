<template>
  <div id="verificaCode">
    <!-- 图片验证码 -->
    <img v-if="codeType=='IMG'" @click="getImgCode" ref="imgCode" src="/api/verify/imgCode?type=forget">
    <!-- 短信验证码 -->
    <button v-else @click="sendClick" :disabled="sendSuccess">{{sendSuccess?time+'s后可重新发送':'发送验证码'}}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendSuccess: false, //true验证码发送 false验证码未发送
      time: 0 //时间
    };
  },
  /**
   * codeType   验证码类型
   * 1. IMG：图片验证码
   * 调用的时候使用  this.$refs.verifica_code.getImgCode()
   * 2. SMS：短信验证码
   *     1) codePhone  接受验证码的手机号
   *     2) codeTime   重新发送验证码的时长，默认为60s （选填）
   */
  props: ["codeType", "codeMobile", "codeTime"],
  mounted() {
    this.time = this.codeTime||60;
  },
  methods: {
    // 获取图片二维码接口
    // 使用的话请在登录失败是调用getImgCode函数
    getImgCode() {
      this.$refs.imgCode.src = `/api/verify/imgCode?r=${Math.random()}`;
    },
    //获取短信二维码
    sendClick() {
      let regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[45678]|19[89]|16[6])[0-9]{8}$/;
      if (!regMobile.test(this.codeMobile)) return this.$toast("请检查手机号是否正确");
      this.finish();
      this.http.verify
        .SMSCode({
          mobile: this.codeMobile,
          r: Math.random()
        })
        .then(res => {
          this.$toast(res.msg)
        });
    },
    //定时器
    finish() {
      this.sendSuccess = true;
      let Time = setInterval(() => {
        if (this.time <= 1) {
          clearInterval(Time);
          this.sendSuccess = false;
          this.time = this.codeTime||60;
        } else {
          this.time--;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
#verificaCode,
#verificaCode img {
  width: 100%;
  height: 100%;
}
#verificaCode button,#verificaCode img {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
#verificaCode button{
  color: rgb(228, 186, 29);
}
#verificaCode button:disabled{
  opacity: 0.5;
}
</style>
