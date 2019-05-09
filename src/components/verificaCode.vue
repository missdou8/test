<template>
  <div class="verificaCode">
    <!-- 图片验证码 -->
    <img
      v-if="codeType=='IMG'"
      @click="getImgCode"
      ref="imgCode"
      src="/api/verify/imgCode?type=forget"
    >
    <!-- 短信验证码 -->
    <button v-else @click="sendClick" :disabled="sendSuccess">{{sendSuccess?time+'秒后可重新发送':'发送验证码'}}</button>
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
    this.time = this.codeTime || 60;
  },
  methods: {
    // 获取图片二维码接口
    // 使用的话请在登录失败是调用getImgCode函数
    getImgCode() {
      this.$refs.imgCode.src = `/api/verify/imgCode?r=${Math.random()}`;
    },
    //获取短信二维码
    sendClick() {
      let regMobile = /^1\d{10}$/;
      if (!regMobile.test(this.codeMobile))
        return this.$toast("请检查手机号是否正确");
      this.http.verify
        .SMSCode({
          mobile: this.codeMobile,
          r: Math.random()
        })
        .then(res => {
          this.finish(true);
          this.$toast(res.msg);
        })
        .catch(() => {
          //接口错误的话(清除倒计时并重置时间)
          this.finish(false);
        });
    },
    //定时器
    // type = true   //开启倒计时
    // type = false  //关闭倒计时并初始化
    finish(type) {
      let Time;
      let clearTime = () => {
        this.sendSuccess = false;
        this.time = 0;
        clearInterval(Time);
      };
      if (type) {
        this.time = this.codeTime || 60;
        this.sendSuccess = true;
        Time = setInterval(() => {
          if (this.time <= 1) clearTime();
          else this.time--;
        }, 1000);
      } else {
        //初始化倒计时
        clearTime();
      }
    }
  }
};
</script>

<style scoped>
.verificaCode {
  height: 0.75rem;
  line-height: 0.75rem;
  width: 2.2rem;
  position: relative;
}
.verificaCode img {
  width: 100%;
  height: 100%;
}
.verificaCode button,
.verificaCode img {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.verificaCode button {
  color: rgb(228, 186, 29);
}
.verificaCode button:disabled {
  opacity: 0.5;
}
</style>
