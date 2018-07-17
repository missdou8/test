<template>
    <div id="share-img">
        <van-uploader class="append_img" :after-read="append">
        </van-uploader>
        <div class="share-img">
            <img :src="finalImg" alt="要分享的图片">
            <div>
                <button>重新选择</button>
                <button>确定</button>
            </div>
        </div>
        <div>
            <me-qrcode class="qr_code" v-if="link" :qr-url='link' :qr-size='300'></me-qrcode>
            <p>嘀嗒比赛，专业的棋牌竞技比赛平台，主打闪电赛，赛程短，夺冠快，奖品丰厚，扫一扫，快速开赛！</p>
        </div>
    </div>
</template>

<script>
import AlloyCrop from "alloycrop";
import meQrcode from "../../components/meQrcode.vue";

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
          let formData = new FormData();
          let blob = _this.convertBase64UrlToBlob(base64, "image/png");
          formData.append("file", blob, Date.now() + ".png");
          //在此处发送一个ajax请求
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          };
          _this.http.resource.uploadImg(formData, "post", config).then(res => {
            let data = res.data.src[0];
            //将后端生成的图片路径抛出
            _this.$emit("getImgUrl", data);
          });
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
    }
  }
};
</script>


<style scoped>
#share-img {
  background-color: #212121;
  overflow: hidden;
  padding-top: 1rem;
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
  height: 6.85rem;
}
</style>
