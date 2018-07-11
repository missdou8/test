<template>
    <div id="editImg">
      <div ref="crop_result" class="preview flex">
        <shear-img class="icon flex" ref="shear_img" :img-width="200" :img-height="200" @imgAjax='imgAjax($event)'></shear-img>
      </div>
      <div class="img_box">
        <van-button class="updata_btn"  type="default" @click="updataImg()">上传您的最新头像</van-button>
        <van-row gutter="10">
          <van-col span="8"><img src="../../../assets/logo.png" alt="" srcset="" @click="updataImg()"></van-col>
          <van-col span="8"><img src="../../../assets/logo.png" alt="" srcset=""></van-col>
          <van-col span="8"><img src="../../../assets/logo.png" alt="" srcset=""></van-col>
          <van-col span="8"><img src="../../../assets/logo.png" alt="" srcset=""></van-col>
          <van-col span="8"><img src="../../../assets/logo.png" alt="" srcset=""></van-col>
          <van-col span="8"><img src="../../../assets/logo.png" alt="" srcset=""></van-col>
        </van-row>
      </div>
    </div>
</template>

<script>
import shearImg from "../../../components/shearImg.vue";
export default {
  data() {
    return {};
  },
  components: {
    shearImg
  },
  methods: {
    updataImg() {
      this.$refs.shear_img.updataImg();
    },
    imgAjax(img) {
      console.log(img);
      console.log("发送请求吧");
    }
  }
};
</script>


<style scoped>
#editImg {
  display: flex;
  flex-flow: column;
  text-align: center;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.preview {
  flex: 1;
}
.img_box {
  flex: 1.5;
}
.preview .icon {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  background-color: #ccc;
}
#editImg .img_box img {
  max-width: 90%;
  max-height: 90%;
}
.updata_btn {
  margin-bottom: 30px;
}
</style>
<style>
#editImg .img_box .van-row {
  padding: 10px;
}
#editImg .img_box .van-col {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#editImg .preview img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 50%;
}
</style>


