<template>
    <div id="shearImg">
      <img :src="imgUrl" alt="图片" srcset="">
      <input id="file" ref="file" type="file" name="image" accept="image/gif, image/jpeg, image/png">
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
        };
        reader.readAsDataURL(file);
      };
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
#file {
  display: none;
}
</style>




