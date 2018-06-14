<template>
    <div id="editImg">
      <div class="preview">
        <img src="../../assets/logo.png" alt="" srcset="">
      </div>
      <div class="img_box">
        <van-row gutter="10">
          <van-col span="8"><img src="../../assets/logo.png" alt="" srcset=""></van-col>
          <van-col span="8"><img src="../../assets/logo.png" alt="" srcset=""></van-col>
          <van-col span="8"><img src="../../assets/logo.png" alt="" srcset=""></van-col>
          <van-col span="8"><img src="../../assets/logo.png" alt="" srcset=""></van-col>
          <van-col span="8"><img src="../../assets/logo.png" alt="" srcset=""></van-col>
          <van-col span="8"><img src="../../assets/logo.png" alt="" srcset=""></van-col>
        </van-row>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>


<style scoped>
#editImg {
  height: 100%;
  display: flex;
  flex-flow: column;
  text-align: center;
}
.preview,
.img_box {
  flex: 1;
}
#editImg .img_box img{
  max-width: 90%;
  max-height: 90%;
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
</style>


