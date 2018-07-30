<template>
  <div id="share-img" ref="share">
    <van-uploader class="append_img" :after-read="append">
    </van-uploader>
    <div class="share-img">
      <img :src="finalImg" alt="要分享的图片">
      <div class="share-btn" v-show="isEdit">
        <button @click="reChooseClick">重新选择</button>
        <button @click="sureClick">确定</button>
      </div>
    </div>
    <div class="qr-code">
      <me-qrcode class="qr_code" v-if="link" :qr-url='link' :qr-size='qrSize'></me-qrcode>
      <p>嘀嗒比赛，专业的棋牌竞技比赛平台，主打闪电赛，赛程短，夺冠快，奖品丰厚，扫一扫，快速开赛！</p>
    </div>
  </div>
</template>

<script>
import AlloyCrop from "alloycrop";
import meQrcode from "../../components/meQrcode.vue";
const html2canvas = require("html2canvas");
export default {
  components: {
    meQrcode
  },
  data() {
    return {
      finalImg: require("../../assets/logo.png"),
      link: this.config.downLoadURL,
      isEdit: true,
      qrSize: 115
    };
  },
  mounted() {
    this.qrSize = document.body.offsetWidth * 0.3;
    let imgURL = this.$store.state.match.shareCropImg;
    if (imgURL) {
      return (this.finalImg = imgURL);
    }
    let file = this.$store.state.match.shareImgFile;
    if (file) {
      this.crop(file);
    }
  },
  methods: {
    append(file) {
      this.crop(file);
    },
    crop(data) {
      let that = this;
      new AlloyCrop({
        image_src: data.content,
        width: 320,
        height: 300,
        output: 1,
        ok_text: "剪切",
        cancel_text: "取消",
        ok: function(dataURI, canvas) {
          let formData = new FormData();
          let blob = that.convertBase64UrlToBlob(dataURI, "image/png");
          formData.append("file", blob, Date.now() + ".png");
          //在此处发送一个ajax请求
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          };
          that.http.resource.uploadImg(formData, "post", config).then(res => {
            let data = res.data.src[0];
            that.$store.commit("setShareCropImg", data);
            that.finalImg = dataURI;
          });
        },
        cancel: function() {
          that.$router.go(-1);
        }
      });
    },
    sureClick() {
      //需要先判断剪切的图片是否存在
      if (!this.$store.state.match.shareCropImg) {
        return this.$toast("请上传剪切图");
      }
      /**
       * 1. 将无用元素设置为不可见
       * 2. 合成图片并上传
       */
      this.isEdit = false;
      this.$nextTick(() => {
        html2canvas(this.$refs.share, {
          scale: 2
        }).then(canvas => {
          let dataURI = canvas.toDataURL("image/png");
          let formData = new FormData();
          let blob = this.convertBase64UrlToBlob(dataURI, "image/png");
          formData.append("file", blob, Date.now() + ".png");
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          };
          this.http.resource.uploadImg(formData, "post", config).then(res => {
            let data = res.data.src[0];
            this.$store.commit("setShareImg", data);
            this.$router.go(-1);
          });
        });
      });
    },
    reChooseClick() {
      let contain = document.querySelector("#share-img");
      let input = contain.querySelector(".van-uploader__input");
      input.click();
    },
    convertBase64UrlToBlob(base64, mimeType) {
      let bytes = window.atob(base64.split(",")[1]);
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      let _blob = new Blob([ab], { type: mimeType });
      return _blob;
    }
  }
};
</script>


<style scoped>
#share-img {
  height: 100%;
  background: url("../../assets/share_bg.png") center/100% 100% no-repeat;
  overflow: hidden;
  position: relative;
}
.append_img {
  opacity: 0;
  position: absolute;
  top: 1000px;
  left: 1000px;
}
.share-img {
  text-align: center;
  height: 100%;
}
.share-img img {
  max-height: 50%;
  max-width: 80%;
  margin-bottom: 0.15rem;
  margin-top: 18%;
}
.qr-code {
  text-align: center;
  position: absolute;
  bottom: 0.24rem;
}
.qr-code p {
  color: #fff;
  font-size: 0.24rem;
  margin-top: 0.1rem;
  padding: 0 0.56rem;
  line-height: 1.2;
}
.share-btn {
  display: flex;
  justify-content: space-between;
  padding: 0rem 0.42rem;
}
.share-btn button {
  color: #ffcc00;
  font-size: 0.34rem;
}
</style>
<style>
#share-img .qr_code img {
  border-radius: 0.15rem;
}
</style>
