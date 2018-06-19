<template>
    <div id="shearImg">
      <img :src="imgUrl" alt="图片" srcset="">
      <input id="file" ref="file" type="file" name="image" accept="image/gif, image/jpeg, image/png">
    </div>
</template>

<script>
import AlloyCrop from "alloycrop";
import img from "../assets/avatar.png";
export default {
  data() {
    return {
      imgUrl: img
    };
  },
  /**
   * imgWidth   目的图片宽
   * imgHeight  目的图片高
   */
  props: ["imgWidth", "imgHeight"],
  methods: {
    updataImg() {
      let _this = this;
      //获取到点击图片的元素
      this.$refs.file.click();
      //当 file改变值得时候设置图片
      this.$refs.file.onchange = () => {
        let file = this.$refs.file.files[0];
        let reader = new FileReader();
        reader.onload = function() {
          let url = reader.result;
          //对图片进行裁剪
          new AlloyCrop({
            image_src: url,
            width: _this.imgWidth,
            height: _this.imgHeight,
            output: 1,
            className: "m-clip-box",
            ok_text: "剪切",
            cancel_text: "取消",
            ok: function(base64, canvas) {
              //将canvas保存为图片
              let image = new Image();
              _this.imgUrl = canvas.toDataURL("image/png");
              // canvas转为blob并上传
              canvas.toBlob(function(blob) {
                //FormData对象
                let fd = new FormData();
                //FormData对象接受三个参数，第三个参数为文件名，
                //通常我们只传前两个参数，第三个参数不传则使用默认文件名，这里使用的Blob对象，所以需要一个文件名，用时间戳代替。
                fd.append("file", blob, Date.now() + ".jpg");
                //在此处发送一个ajax请求
                _this.$emit("imgAjax",fd.get("file"));
              }, file.type || "image/png");
            },
            cancel: function() {
              console.log("取消剪裁");
            }
          });
        };
        reader.readAsDataURL(file);
      };
    }
  }
};
</script>
<style scoped>
#file {
  display: none;
}
</style>




