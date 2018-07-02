<template>
  <div id="userIndex">
    <van-cell-group>
      <van-cell class="user_box">
        <div class="user_img_box">
          <shear-img ref="shear_img" :def-img="imgUrl" :img-width="300" :img-height="300" @imgAjax='imgAjax($event)'></shear-img>
        </div>
        <div class="user_msg">
          <h3>点击修改头像</h3>
          <p>店铺ID:
            <span>{{userinfo.id}}</span>
          </p>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="user_edit_box">
      <van-cell title="店铺名称" :value="userinfo.shopName" :is-link="true" :to="{ path: '/user/edit/shop', query: { shopName: userinfo.shopName}}"></van-cell>
      <van-cell title="店主名字" :value="userinfo.name" is-link :to="{ path: '/user/edit/name', query: { name: userinfo.name}}"></van-cell>
      <van-cell class="gray" title="实名认证" value="未认证，认证信息仅自己可见" :is-link="no_autonym" :to="autonym_url"></van-cell>
      <van-cell title="店铺座机" :value="userinfo.telephone" is-link :to="{ path: '/user/edit/plane', query: { plane: userinfo.telephone }}"></van-cell>
      <van-cell title="手机号码" :value="userinfo.mobile" is-link :to="{ path: '/user/edit/phone', query: { phone: userinfo.mobile}}"></van-cell>
      <van-cell class="address" title="店铺地址" :value="userinfo.address" is-link :to="{ path: '/user/edit/address', query: { address: userinfo.address,areaId:userinfo.areaId,regionName:userinfo.regionName}}"></van-cell>
    </van-cell-group>
    <van-cell-group class="user_footer">
      <van-cell title="修改密码" is-link to="/user/edit/Pwd"></van-cell>
      <van-cell title="重新登录" @click="loginOutClick()" is-link></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import img from "../../assets/logo.png";
import shearImg from "../../components/shearImg.vue";
export default {
  data() {
    return {
      userinfo: {},
      no_autonym: true, //false认证 true未认证
      autonym_url: "/user/edit/autonym", //认证链接
      imgUrl: img
    };
  },
  created() {
    // this.getUserInfo();
  },
  components: {
    shearImg
  },
  methods: {
    getUserInfo() {
      this.http.user.getUserInfo().then(res => {
        this.userinfo = res.data;
        if (res.data.certification == 1) this.no_autonym = false;
        else this.autonym_url = "/user/edit/autonym";
      });
    },
    //注销登录
    loginOutClick() {
      let _this = this;
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "确定要注销么？"
        })
        .then(() => {
          console.log("注销登录");
          _this.http.user.logout().then(res => {
            location.reload();
          });
        })
        .catch(() => {
          console.log("取消注销");
        });
    },
    // //修改头像
    // updataImg() {
    //   this.$refs.shear_img.updataImg();
    // },
    imgAjax(formData) {
      console.log(formData)
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      //  this.http.resource.uploadImg(formData, "post", config).then(res => {
      //     this.$dialog
      //       .alert({
      //         title: "嘀嗒比赛",
      //         message: res.msg
      //       })
      //       .then(() => {
      //         this.getUserInfo();
      //       });
      //   });
    }
  }
};
</script>


<style scoped>
#userIndex {
  height: 100%;
  background-color: #fff;
}
.user_box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user_img_box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: #ccc;
  overflow: hidden;
  border-radius: 50%;
}
.user_img_box img {
  width: 100%;
  border-radius: 50%;
}
.user_msg {
  margin-left: 0.45rem;
}
.user_msg h3 {
  color: rgb(158, 158, 158);
  font-size: 0.3rem;
}
.user_msg p {
  font-size: 0.24rem;
  color: rgb(158, 158, 158);
}
.user_msg p span {
  margin-left: 0.16rem;
  color: #000;
}
.user_footer,
.user_edit_box {
  margin-top: 15px;
}
.user_footer img,
.user_edit_box img {
  width: 40px;
}
</style>
<style>
#userIndex .van-cell {
  padding-right: 0.3rem;
  font-size: 0.3rem;
}
#userIndex .user_footer,
#userIndex .user_edit_box {
  margin-top: -1px;
}
#userIndex .user_box .van-cell__value {
  display: flex;
  align-items: center;
}
#userIndex .user_edit_box .van-cell__value {
  text-align: left;
  flex: 3;
}
.user_edit_box .van-cell,
.user_footer .van-cell {
  align-items: center;
  font-size: 0.3rem;
}
#userIndex .gray .van-cell__value {
  color: #ccc;
}
#userIndex .address .van-cell__title {
  align-self: baseline;
}
#userIndex .van-hairline--top-bottom::after {
  left: 15px;
}
</style>


