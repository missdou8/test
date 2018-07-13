<template>
  <div id="authority">
    <div class="authority findpwd">
      <van-cell-group>
        <van-field v-model="phone" type="number" placeholder="请输入手机号"/>
        <van-field class="imgcode_box" type="number" center v-model="imgCode" placeholder="请输入验证码">
          <van-button class="imgcode" slot="button" size="small">
            <verifica-code code-type="IMG" ref="verifica_code"></verifica-code>
          </van-button>
        </van-field>
        <van-field class="phonecode_box" center v-model="phoneCode" type="number" placeholder="请输入手机验证码">
          <van-button class="phonecode" slot="button" size="small" type="primary">
            <verifica-code code-type="SMS" :code-mobile="phone"></verifica-code>
          </van-button>
        </van-field>
      </van-cell-group>
      <div class="btn_box">
        <van-button :disabled="btnEnable" class="btn" size="large" @click="goResetPwd()">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import verificaCode from "../../components/verificaCode.vue";
export default {
  data() {
    return {
      phone: "",
      imgCode: "",
      phoneCode: ""
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
  components: {
    verificaCode
  },
  methods: {
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
          this.$refs.verifica_code.getImgCode();
        });
    }
  }
};
</script>
<style scoped>
@import "../../style/authority.css";
</style>
