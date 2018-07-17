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
            <me-qrcode class="qr_code" v-if="link" :qr-url='link' :qr-size='150'></me-qrcode>
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
      finalImg: "",
      link: "https://baidu.com",
      isEdit: true
    };
  },
  mounted() {
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
        height: 320,
        output: 1,
        ok_text: "剪切",
        cancel_text: "取消",
        ok: function(dataURI, canvas) {
          let file = that.dataURLtoFile(dataURI, Date.now() + ".png");
          let files = {
            file: file,
            content: dataURI
          };
          that.upload(files, src => {
            that.$store.commit("setShareCropImg", src);
            that.finalImg = dataURI;
          });
        },
        cancel: function() {
          that.$router.go(-1);
        }
      });
    },
    sureClick() {
      /**
       * 1. 将无用元素设置为不可见
       * 2. 合成图片并上传
       */
      this.isEdit = false;
      this.$nextTick(() => {
        html2canvas(this.$refs.share, {
          scale: 1
        }).then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          let file = this.dataURLtoFile(dataURL, Date.now() + ".png");
          let files = {
            file: file,
            content: dataURL
          };
          this.upload(files, src => {
            this.$store.commit("setShareImg", src);
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
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  }
};
</script>


<style scoped>
#share-img {
  background-color: #212121;
  overflow: hidden;
  padding-top: 0.6rem;
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
}
.share-img img {
  height: 5.4rem;
  margin-bottom: 0.15rem;
}
.qr-code {
  margin-top: 0.15rem;
  text-align: center;
}
.qr-code p {
  margin-top: 0.1rem;
  padding: 0 0.36rem;
}
.share-btn {
  display: flex;
  justify-content: space-between;
  padding: 0rem 0.42rem;
}
.share-btn button {
  color: #ffcc00;
  font-size: 0.36rem;
}
</style>
<style>
#share-img .qr_code img {
  border-radius: 0.15rem;
}
</style>
