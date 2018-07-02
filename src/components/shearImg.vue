<template>
    <div id="shearImg">
      <van-uploader class="uploader" :after-read="getImgUrl">
        <img :src="imgUrl" alt="图片" srcset="">
      </van-uploader>
    </div>
</template>

<script>
import AlloyCrop from "alloycrop";
export default {
  data() {
    return {
      imgUrl: ""
    };
  },
  /**
   * defImg     默认头像
   * imgWidth   目的图片宽
   * imgHeight  目的图片高
   */
  created() {
    this.imgUrl = this.defImg;
  },
  props: ["imgWidth", "imgHeight", "defImg"],
  methods: {
    getImgUrl(file){
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
           _this.imgUrl = base64;
          // canvas转为blob并上传
          canvas.toBlob(function(blob) {
            //FormData对象
            let formData = new FormData();
            //FormData对象接受三个参数，第三个参数为文件名，
            //通常我们只传前两个参数，第三个参数不传则使用默认文件名，这里使用的Blob对象，所以需要一个文件名，用时间戳代替。
            formData.append("icon", blob);
            //在此处发送一个ajax请求
            _this.$emit("imgAjax", formData);
          }, file.type || "image/png");
        },
        cancel: function() {
          console.log("取消剪裁");
        }
      });
    },
    // 将base64文件转换为bolb文件
    getBlobBydataURI(dataURI, type) {
      var binary = atob(dataURI.split(",")[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    }
  }
};
</script>
<style scoped>
#shearImg,.uploader{
  width: 100%;
  height: 100%;
}
.uploader{
  display: flex;
  justify-content: center;
  align-items: center;
}
#shearImg .uploader img{
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}
</style>




