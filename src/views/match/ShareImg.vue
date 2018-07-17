<template>
    <div id="share-img" ref="share">
        <van-uploader class="append_img" :after-read="append">
        </van-uploader>
        <div class="share-img">
            <img :src="finalImg" alt="要分享的图片">
            <div class="share-btn">
                <button @click="cancleClick">重新选择</button>
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
      link: "https://baidu.com"
    };
  },
  mounted() {
    let file = this.$store.state.match.shareImgFile;
    let that = this;
    if (file) {
      new AlloyCrop({
        image_src: file.content,
        width: 320,
        height: 320,
        output: 1,
        ok_text: "剪切",
        cancel_text: "取消",
        ok: function(dataURI, canvas) {
          that.finalImg = dataURI;
        },
        cancel: function() {
          that.$router.go(-1);
        }
      });
    }
  },
  methods: {
    append() {
      console.log("获取图片后");
    },
    sureClick() {
      //点击确定后，将当前页面画为图片，上传
      html2canvas(this.$refs.share, {
        scale: 1
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        let file = this.dataURLtoFile(dataURL, "share");
        let files = {
          file: file,
          content: dataURL
        };
        console.log(files);
        this.upload(files, src => {
          console.log(src);
        });
      });
    },
    cancleClick() {},
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
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
  padding-top: 0.8rem;
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
}
.qr-code {
  text-align: center;
}
.qr-code p {
  padding: 0 0.36rem;
}
.share-btn {
  display: flex;
  justify-content: space-around;
  padding: 0.15rem 0;
}
.share-btn button {
  color: #ffcc00;
  font-size: 0.3rem;
}
</style>
