<template>
    <div id="userIndex">
        <van-cell-group>
            <van-cell class="user_box" is-link to="/user/edit/img">
                <div class="user_img_box">
                    <img src="../../assets/avatar.png" alt="">
                </div>
                <div class="user_msg">
                    <h3>点击修改头像</h3>
                    <p>店铺ID:6666666</p>
                </div>
            </van-cell>
        </van-cell-group>
        <van-cell-group class="user_edit_box">
            <van-cell title="店铺名称" value="大洋百货" :is-link="true" :to="{ path: '/user/edit/shop', query: { shop_name: '大洋百货' }}">
                <img slot="icon" src="../../assets/icon_S01.png" alt="" srcset="">
            </van-cell>
            <van-cell title="店主名字" value="陈奕迅" is-link :to="{ path: '/user/edit/name', query: { user_name: '陈奕迅' }}">
                <img slot="icon" src="../../assets/icon_S01.png" alt="" srcset="">
            </van-cell>
            <van-cell class="gray" title="实名认证" value="未认证，认证信息仅自己可见" is-link to="/user/edit/autonym">
            <img slot="icon" src="../../assets/icon_S01.png" alt="" srcset="">
            </van-cell>
            <van-cell title="店铺座机" value="010-89789789" is-link :to="{ path: '/user/edit/plane', query: { plane: '010-89789789' }}">
            <img slot="icon" src="../../assets/icon_S01.png" alt="" srcset="">
            </van-cell>
            <van-cell title="手机号码" value="18612908099" is-link :to="{ path: '/user/edit/phone', query: { phone: '18612908099' }}">
            <img slot="icon" src="../../assets/icon_S01.png" alt="" srcset="">
            </van-cell>
            <van-cell title="店铺地址" value="北京市昌平区回龙观东大街338号腾讯众创空间A322室" is-link to="/user/edit/address">
            <img slot="icon" src="../../assets/icon_S01.png" alt="" srcset="">
            </van-cell>
        </van-cell-group>
        <van-cell-group class="user_footer">
            <van-cell title="修改密码" icon="edit" is-link to="/user/edit/Pwd">
            <img slot="icon" src="../../assets/icon_S01.png" alt="" srcset="">
            </van-cell>
            <van-cell title="重新登录" icon="clear" @click="loginOutClick()" is-link>
            <img slot="icon" src="../../assets/icon_S01.png" alt="" srcset="">
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
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
          _this.apiService.user.logout().then(res => {
            location.reload();
          });
        })
        .catch(() => {
          console.log("取消注销");
        });
    }
  }
};
</script>


<style scoped>
#userIndex {
  height: 100%;
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
  background-color: #ccc;
  width: 68px;
  height: 68px;
  overflow: hidden;
  border-radius: 50%;
}
.user_img_box img {
  width: 90%;
  border-radius: 50%;
}
.user_msg {
  margin-left: 15px;
}
.user_msg h3 {
  color: #333;
  font-size: 14px;
}
.user_msg p {
  font-size: 12px;
  color: #666;
}
.user_footer,
.user_edit_box {
  margin-top: 15px;
}
.user_footer img,.user_edit_box img{
    width: 40px;
}
</style>
<style>
#userIndex .user_box .van-cell__value {
  display: flex;
  align-items: center;
}
#userIndex .user_edit_box .van-cell__value {
  text-align: left;
  flex: 3;
}
.user_edit_box .van-cell,.user_footer .van-cell{
  align-items: center;
  padding-left: 5px;
}
#userIndex .gray .van-cell__value {
  color: #ccc;
}
</style>


