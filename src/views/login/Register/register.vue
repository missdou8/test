<template>
  <div class="register">
     <h3 v-if="noPass" class="title_dec">您的审核未通过请修改信息重新提交</h3>
     <van-cell-group>
        <van-field v-model="name" label="姓名" placeholder="请输入姓名" icon="clear" @click-icon="name = ''" :disabled="ispass"/>
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" icon="clear" @click-icon="phone = ''" :disabled="ispass"/>
        <van-field class="code_box" center v-model="code" label="验证码" placeholder="请输入手机验证码" icon="clear" @click-icon="code = ''" :disabled="ispass">
          <van-button slot="button" size="small" type="primary" @click="sendClick()" :disabled="ispass||!ifSend">
            <span v-if="ifSend">发送验证码</span>
            <span v-else>{{time}}s后可重新发送</span>
          </van-button>
        </van-field>
        <van-field v-model="password" type="password" label="密码" placeholder="请设置您的登录密码" icon="clear" @click-icon="password = ''" :disabled="ispass"/>
        <van-field v-model="rePassword" type="password" label="确认密码" placeholder="请再次输入您的密码" icon="clear" @click-icon="rePassword = ''" :disabled="ispass"/>
      </van-cell-group>
      <div class="btn_box">
        <van-button :disabled="btnEnable||ispass" class="reg_btn" size="large" @click="register()">申请</van-button>
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
      time: 10,
      ispass: false, // 是否处于审核状态
      noPass:false  // 审核未通过标识
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
  created() {
    //检测是否存在userid
    if (this.$route.query.id) {
      this.http.user.registerInfo({
          id: this.$route.query.id
        })
        .then(res => {
          //验证码发送成功时显示
          this.name = res.data.name;
          this.phone = res.data.mobile;
          if(res.data.auditStatus==0){
            this.code = "****";
            this.password = "********";
            this.rePassword = "********";
            this.ispass = true;
          }else{
            this.noPass = true;
          }
        });
    } else {
      this.ispass = false;
    }
  },
  methods: {
    register() {
      if (this.password !== this.rePassword)
        return this.$toast("两次输入的密码应该一致！");
      //发送注册请求
      this.http.user.register({
          name: this.name,
          mobile: this.phone,
          SMSCode: this.code,
          password: this.password,
          confirmPassword:this.rePassword
        })
        .then(res => {
           this.$dialog.alert({
              title: '嘀嗒比赛',
              message: res.data.msg
            }).then(() => {
              this.$router.push({path: "/login", replace: true});
            });
        });
    },
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
      this.finish();
      this.http.verify
        .SMSCode({
          mobile: this.phone,
          r: Math.random()
        })
        .then(res => {
          //验证码发送成功时显示
          this.ifSend = true;
          this.time = 10;
        });
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
.title_dec{
  padding: 15px;
  text-align: left;
  font-size: .3rem;
  color: #f00;
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
.reg_btn.van-button--disabled,
.register .van-field--disabled {
  opacity: 0.6;
  background: #ccc;
}
</style>
