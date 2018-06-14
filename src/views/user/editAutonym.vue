<template>
    <div id="editAutonym">
      <van-cell-group>
        <van-field v-model="name" placeholder="请输入您的真实姓名" />
        <van-field v-model="IDcard" placeholder="请输入身份证号" />
      </van-cell-group>
      <van-cell-group>
        <van-row class="row">
          <van-col span="12">
            <h3>手持身份证正面照片</h3>
            <div class="img_box">
              <img @click="setImg" src="../../assets/banner_task.png" alt="">
            </div>
          </van-col>
          <van-col span="12">
            <h3>手持身份证反面照片</h3>
            <div class="img_box">
              <img @click="setImg" src="../../assets/banner_task.png" alt="">
            </div>
          </van-col>
        </van-row>
        <p class="autonym_dec">
          <span>提交认证代表你已同意 </span> 
          <router-link to="/user/edit/autonym/tips">实名认证协议</router-link>
        </p>
        <van-button class="autonym_btn" size="large" @click="Autonym()">提交</van-button>
        <input id="file" ref="file" type="file" name="photo" accept="image/gif, image/jpeg, image/png">
      </van-cell-group>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      IDcard: "",
      imgBox: []
    };
  },
  methods: {
    setImg(event) {
      let ele = event.target;
      //获取到点击图片的元素
      this.$refs.file.click();
      //当 file改变值得时候设置图片
      this.$refs.file.onchange = () => {
        ele.setAttribute("src", URL.createObjectURL(this.$refs.file.files[0]));
        //处理上传图片信息
        let form = new FormData();
        let img = this.$refs.file.files[0];
        form.append("file", img, img.name);
        this.imgBox.push(form.get('file'));
      };
    },
    Autonym() {
      //上传的图片【使用FormData上传】
      console.log(this.imgBox);
    }
  }
};
</script>


<style scoped>
#editAutonym {
  height: 100%;
  text-align: center;
}
#file {
  display: none;
}
.row {
  margin-top: 15px;
  padding: 10px;
}
.row h3 {
  font-size: 15px;
}
.img_box {
  background-color: #000;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 5px 5px 5px;
}
.img_box img {
  max-width: 90%;
  max-height: 90%;
}
.autonym_dec {
  margin-top: 35px;
  padding: 10px;
}
.autonym_btn {
  background-color: #108ee9;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  width: 90%;
  margin: 20px auto;
}
</style>

