<template>
    <div id="shearImg">
      <van-uploader class="uploader" :after-read="getImgUrl">
        <img :src="imgSrc||defImg" alt="logo" srcset="">
      </van-uploader>
    </div>
</template>

<script>
import AlloyCrop from "alloycrop";
export default {
  data() {
    return {
      imgSrc:''
    };
  },
  /**
   * defImg     默认头像
   * imgWidth   目的图片宽
   * imgHeight  目的图片高
   */
  props: ["imgWidth", "imgHeight", "defImg"],
  methods: {
    getImgUrl(file) {
      let _this = this;
      //对图片进行裁剪
      new AlloyCrop({
        image_src: file.content,
        width: _this.imgWidth,
        height: _this.imgHeight,
        output: 1,
        className: "m-clip-box",
        ok_text: "剪切",
        cancel_text: "取消",
        ok: function(base64, canvas) {
          //不能去修改父组件的数据，所以要使用一个微数据
          _this.imgSrc = base64;
          // 将base64文件转换为bolb文件
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
          console.log("取消剪裁");
        }
      });
    },
    /**
     * base64转文件流
     * @param {base64} //base64数据
     * @param {string} //format格式
     * @return {file}  文件blob
     */
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
#shearImg,
.uploader {
  width: 100%;
  height: 100%;
}
.uploader {
  display: flex;
  justify-content: center;
  align-items: center;
}
#shearImg .uploader img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}
</style>




