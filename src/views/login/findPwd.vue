<template>
  <div class="findpwd">
    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" icon="clear" @click-icon="phone = ''"/>
      <van-field class="code_box" center v-model="imgCode" label="验证码" placeholder="请输入验证码" icon="clear" @click-icon="imgCode = ''">
        <van-button id="code" slot="button" size="small">
          <img class="img" src="../../assets/code.png" alt="" srcset="">
        </van-button>
      </van-field>
      <van-field center v-model="phoneCode" label="手机验证码" placeholder="请输入手机验证码" icon="clear" @click-icon="phoneCode = ''">
        <van-button slot="button" size="small" type="primary" @click="sendClick()" :disabled="!ifSend">
          <span v-if="ifSend">发送验证码</span>
          <span v-else>{{time}}s后可重新发送</span>
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
      time: 150
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
    },
    goResetPwd(){
      this.$router.push({
        path:'resetPwd',
        query: {
          phone: this.phone
        }
      });
    }
  }
};
</script>
<style scoped>
.findpwd {
  background-color: #fff;
  height: 100%;
  text-align: center;
  padding-top: 20px;
}
.img {
  height: 100%;
}
#code {
  border: none;
  padding: 0;
  height: 44px;
}
#code:active::before {
  opacity: 0;
}
.findpwd .code_box {
  padding: 0;
  padding-left: 15px;
  line-height: 44px;
}
.btn_box {
  padding: 15px;
}
.find_btn {
  background-color: #108ee9;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  color: #fff;
}
.find_btn.van-button--disabled {
  opacity: 0.6;
}
</style>
<style>
.findpwd .code_box .van-field__button {
  padding-left: 10px;
  height: 44px;
}
</style>


