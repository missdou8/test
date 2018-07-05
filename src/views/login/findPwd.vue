<template>
  <div class="findpwd">
    <van-cell-group>
      <van-field v-model="phone" placeholder="请输入手机号"/>
      <van-field class="code_box" center v-model="imgCode" placeholder="请输入验证码">
        <van-button id="code" slot="button" size="small" @click="codeImgClick">
          <img class="img" ref="codeImg" src="/api/verify/imgCode?type=forget" alt="" srcset="">
        </van-button>
      </van-field>
      <van-field class="phone_box" center v-model="phoneCode" placeholder="请输入手机验证码">
        <van-button id="phonecode" slot="button" size="small" type="primary" @click="sendClick()" :disabled="!ifSend">
          <span v-if="ifSend">发送验证码</span>
          <span class="disabled__btn" v-else>{{time}}s后可重新发送</span>
        </van-button>
      </van-field>
    </van-cell-group>
     <div class="btn_box">
        <van-button :disabled="btnEnable" class="find_btn" size="large" @click="goResetPwd()">下一步</van-button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      imgCode: "",
      phoneCode: "",
      ifSend: true,
      time: 10
    };
  },
  computed: {
    btnEnable() {
      if (this.phone && this.imgCode && this.phoneCode) {
        return false;
      }
      return true;
    }
  },
  methods: {
    finish() {
      this.ifSend = false;
      //进行倒计时提示
      let Time = setInterval(() => {
        if (this.time <= 1) {
          clearInterval(Time);
          this.ifSend = true;
          this.time = 10;
        } else {
          this.time--;
        }
      }, 1000);
    },
    sendClick() {
      if(this.phone=='') return this.$toast("请检查手机号是否正确");
      this.finish();
      this.http.verify
        .SMSCode({
          mobile: this.phone,
          r: Math.random()
        })
        .then(res => {
          //验证码发送成功时显示
          this.$toast(res.msg)
        });
    },
    codeImgClick() {
      this.$refs.codeImg.src = `/api/verify/imgCode?r=${Math.random()}`;
    },
    goResetPwd() {
      this.http.user
        .forgetPassword({
          mobile: this.phone,
          imgCode: this.imgCode,
          SMSCode: this.phoneCode
        })
        .then(res => {
          this.$router.push("resetPwd");
        })
        .catch(() => {
          //重新获取二维码
          this.codeImgClick();
        });
    }
  }
};
</script>
<style scoped>
.findpwd {
  height: 100%;
  text-align: center;
  padding-top: 3.7rem;
  background-image: url(../../assets/zhuce_back.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.img {
  height: 100%;
  width: 100%;
}
#code {
  border: none;
  padding: 0;
  height: 0.95rem;
  width: 2.2rem;
}
#code:active::before {
  opacity: 0;
}
.findpwd .code_box {
  padding-top: 0;
  padding-bottom: 0;
}

#phonecode {
  padding: 0;
  height: 0.75rem;
  line-height: 0.75rem;
  margin-top: 0.18rem;
  width: 2.2rem;
  border-color: rgb(93, 79, 24);
  color: rgb(228, 186, 29);
  font-size: 0.26rem;
  font-weight: 600;
}
#phonecode:active::before {
  opacity: 0;
}
.findpwd .phone_box {
  padding-top: 0;
  padding-bottom: 0;
}

.btn_box {
  position: relative;
  overflow: hidden;
  padding: 0.95rem 0.3rem 0.6rem 0.3rem;
}
.find_btn {
  background-color: rgb(252, 198, 0);
  height: 0.9rem;
  line-height: 0.9rem;
  color: rgb(17, 17, 17);
  border-width: 0;
  font-weight: 600;
}
.find_btn.van-button--disabled,
.disabled__btn {
  opacity: 0.6;
}
</style>
<style>
.findpwd .van-field__button {
  padding-left: 10px;
  height: 44px;
}
.findpwd .van-cell {
  padding: 0.4rem 0.3rem 0.2rem 0.35rem;
  color: #fff;
}
.findpwd .van-cell input {
  color: #fff;
}
.findpwd .van-cell-group,
.findpwd .van-cell,
.findpwd .van-cell input,
.findpwd .van-cell button {
  background-color: initial;
}
.findpwd .van-hairline--top-bottom::after {
  border-top-width: 0;
  border-color: rgb(54, 44, 18);
  left: 0.3rem;
  width: 13.2rem;
}
.findpwd .van-cell:not(:last-child)::after {
  border-color: rgb(54, 44, 18);
  left: 0.3rem;
  width: 6.6rem;
}
.findpwd .van-field__button {
  height: 0.95rem;
}
/* .findpwd .code_box .van-cell__value,
.findpwd .phone_box .van-cell__value {
  margin-top: 0.2rem;
} */
.findpwd .code_box::after {
  height: 198%;
}
</style>


