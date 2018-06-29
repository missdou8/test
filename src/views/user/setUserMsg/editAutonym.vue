<template>
  <div id="editAutonym">
    <div class="mask" :class="{ 'maskShow': !userinfo.certification==0||!userinfo.certification==1}"></div>
    <h3 class="dec dec_err" v-if="userinfo.certification==2">
      <i></i>认证未通过请修改后重新提交</h3>
    <h3 class="dec dec_sucess" v-if="userinfo.certification==1">
      <i></i>认证已通过</h3>
    <van-cell-group class="input_box">
      <van-field v-model="name" placeholder="请输入您的真实姓名">
        <img class="left_icon" slot="icon" src="../../../assets/shiming_icon01.png" alt="">
      </van-field>
      <van-field v-model="IDcard" placeholder="请输入身份证号">
        <img class="left_icon" slot="icon" src="../../../assets/shiming_icon02.png" alt="">
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-row class="row">
        <van-col span="12">
          <van-uploader class="uploader" :after-read="onFrontPic">
            <h3>手持身份证正面照</h3>
            <div class="img_box" :class="{ 'img_box__err': userinfo.certification==2}">
              <img ref="frontPic" :src="imgBox.frontPic" alt="">
            </div>
          </van-uploader>
        </van-col>
        <van-col span="12">
          <van-uploader class="uploader" :after-read="onBackPic">
            <h3>手持身份证反面照</h3>
            <div class="img_box" :class="{ 'img_box__err': userinfo.certification==2}">
              <img ref="backPic" :src="imgBox.backPic" alt="">
            </div>
          </van-uploader>
        </van-col>
      </van-row>
    </van-cell-group>
    <div class="autonym_bottom">
      <p class="autonym_dec">
        <span>提交认证代表你已同意 </span>
        <router-link to="/user/edit/autonym/tips">《实名认证协议》</router-link>
      </p>
      <van-button :disabled="btnEnable" class="autonym_btn" size="large" @click="Autonym()">{{userinfo.certification==0?'审核中':'提交'}}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      IDcard: "",
      imgBox: {},
      userinfo: {},
      reqData: null
    };
  },
  computed: {
    btnEnable() {
      if (this.name && this.IDcard) return false;
      return true;
    }
  },
  created() {
    this.getCertification();
  },
  methods: {
    onFrontPic(file) {
      this.upload(file, "frontPic");
    },
    onBackPic(file) {
      this.upload(file, "backPic");
    },
    getCertification() {
      this.http.user.getCertification().then(res => {
        // 实名认证状态 4 未提交 0审核中 1审核通过 2 审核未通过
        this.userinfo = res.data;
        // if (res.data.certification == 0) {
        //   this.btnTxt = "审核中...";
        // } else if (res.data.certification == 1) {
        //   this.autonym = false;
        // }
      });
    },
    Autonym() {
      if (
        this.imgBox.frontPic &&
        this.imgBox.backPic &&
        this.IDcard == "" &&
        this.name == ""
      )
        return this.$toast("信息不能为空");
      //上传的图片【使用FormData上传】
      this.http.user
        .certification({
          frontPic: this.imgBox.frontPic,
          backPic: this.imgBox.backPic,
          idCard: this.IDcard,
          realname: this.name
        })
        .then(res => {
          this.$dialog
            .alert({
              title: "嘀嗒比赛",
              message: res.msg
            })
            .then(() => {
              this.$router.push({ path: "/user/index" });
            });
        });
    },
    upload(file, type) {
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let formData = new FormData();
      formData.append("file", file.file);
      this.http.resource.uploadImg(formData, "post", config).then(res => {
        let data = res.data.src[0];
        this.imgBox[type] = data;
        this.$refs[type].src = data;
      });
    }
  }
};
</script>


<style scoped>
#editAutonym {
  height: 100%;
  text-align: center;
}
#file {
  display: none;
}
.row {
  margin-top: 0.25rem;
  padding: 0.25rem;
}
.row h3 {
  font-size: 0.26rem;
  margin: 0.25rem 0 0.15rem 0;
  color: rgb(135, 135, 135);
}
.img_box {
  height: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../../assets/shiming_tu_01.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.img_box::before {
  content: "";
  position: absolute;
  width: 40%;
  height: 40%;
  background: url(../../../assets/shiming_anniu_paizhao.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 1;
}
.img_box__err::after {
  content: "重新上传";
  position: absolute;
  top: 70%;
  font-size: 0.2px;
  font-weight: 600;
  z-index: 1;
}
.img_box img {
  max-width: 100%;
  max-height: 96%;
  z-index: 2;
}
.autonym_bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.autonym_dec {
  padding: 0.3rem;
  font-size: 0.28rem;
}
.autonym_dec a {
  color: rgb(255, 80, 0);
}
.autonym_btn {
  background-color: rgb(252, 189, 0);
  height: 0.95rem;
  line-height: 0.95rem;
  color: #000;
  font-size: 0.3rem;
  font-weight: 600;
  border: 0;
  border-radius: 0;
}
.left_icon {
  width: 100%;
}
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
}
.maskShow {
  display: none;
}
.dec {
  color: rgb(255, 80, 0);
  background: rgb(255, 246, 186);
  font-size: 0.26rem;
  line-height: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dec i {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.1rem;
}
.dec_err i {
  background-image: url(../../../assets/shiming_icon_zhuyi.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.dec_sucess {
  font-size: 0.35rem;
  line-height: 1.1rem;
}
.dec_sucess i {
  width: 0.65rem;
  height: 0.65rem;
  background-image: url(../../../assets/shiming_icon_tongguo.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.autonym_btn.van-button--disabled {
  opacity: 0.6;
}
.uploader {
  width: 100%;
  height: 100%;
}
</style>
<style>
#editAutonym .van-field__icon {
  left: 0;
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
}
#editAutonym .van-field--has-icon .van-field__control {
  padding: 0 0.6rem;
}
#editAutonym .input_box .van-cell {
  padding: 0.3rem;
}
#editAutonym .van-cell:not(:last-child)::after {
  height: 195%;
}
</style>

