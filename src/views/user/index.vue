<template>
  <div id="userIndex">
    <div class="userIndex">
      <van-cell-group>
<!--        <van-cell class="user_box">-->
<!--          <div class="user_img_box">-->
<!--            <shear-img-->
<!--              ref="shear_img"-->
<!--              :def-img="userinfo.icon||defImg"-->
<!--              :img-width="300"-->
<!--              :img-height="300"-->
<!--              @getImgUrl="getImgUrl($event)"-->
<!--            ></shear-img>-->
<!--          </div>-->
<!--          <div class="user_msg">-->
<!--            <h3>点击修改头像</h3>-->
<!--            <p>-->
<!--              店铺ID:-->
<!--              <span>{{userinfo.id}}</span>-->
<!--            </p>-->
<!--          </div>-->
<!--        </van-cell>-->
<!--      </van-cell-group>-->

        <div class="user_box">
          <div class="header_img">头像</div>
          <div class="user_img_box">
            <shear-img
                    ref="shear_img"
                    :def-img="userinfo.icon||defImg"
                    :img-width="300"
                    :img-height="300"
                    @getImgUrl="getImgUrl($event)"
            ></shear-img>
          </div>
        </div>
      </van-cell-group>

      <van-cell-group class="user_edit_box">
<!--        <van-cell-->
<!--          title="店铺名称"-->
<!--          :value="userinfo.shopName"-->
<!--          :is-link="true"-->
<!--          :to="{ path: '/user/edit/shop', query: { shopName: userinfo.shopName}}"-->
<!--        ></van-cell>-->
<!--        <van-cell-->
<!--          title="店主名字"-->
<!--          :value="userinfo.name"-->
<!--          is-link-->
<!--          :to="{ path: '/user/edit/name', query: { name: userinfo.name}}"-->
<!--        ></van-cell>-->
<!--        &lt;!&ndash; <van-cell class="gray" title="实名认证" :value="autonymText+',认证信息仅自己可见'" is-link to="/user/edit/autonym"></van-cell> &ndash;&gt;-->
<!--        <van-cell-->
<!--          title="店铺座机"-->
<!--          :value="userinfo.telephone"-->
<!--          is-link-->
<!--          :to="{ path: '/user/edit/plane', query: { telephone: userinfo.telephone }}"-->
<!--        ></van-cell>-->
        <van-cell
                title="嘀嗒号"
                :value="userinfo.id"
        ></van-cell>
        <van-cell
          title="手机号"
          :value="userinfo.mobile"
        ></van-cell>
        <!--          is-link-->
        <!--          :to="{ path: '/user/edit/phone', query: { mobile: userinfo.mobile}}"-->
        <van-cell
          class="address"
          title="地址"
          :value="userinfo.address"
          is-link
          :to="{ path: '/user/edit/address', 
        query: {
           address: userinfo.address,
           areaId:userinfo.areaId,
           regionName:userinfo.regionName,
           longitude:userinfo.longitude,
           latitude:userinfo.latitude
           }
        }"
        ></van-cell>
      </van-cell-group>
      <van-cell-group class="user_footer">
        <van-cell title="修改密码" is-link to="/user/edit/Pwd"></van-cell>
        <van-cell title="重新登录" @click="loginOutClick()" is-link></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import icon from "../../assets/icon.png";
import shearImg from "../../components/shearImg.vue";
export default {
  data() {
    return {
      defImg: icon, //默认头像
      userinfo: {},
      autonymText: "" //认证状态文案
    };
  },
  created() {
    this.getUserInfo();
  },
  components: {
    shearImg
  },
  methods: {
    getUserInfo() {
      this.http.user.getUserInfo().then(res => {
        this.userinfo = res.data;
        // 实名认证状态 0 未实名认证 1 已实名认证 2认证驳回 3审核中
        let textArr = ["未认证", "已认证", "认证驳回", "审核中"];
        this.autonymText = textArr[res.data.certification];
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
          _this.http.user.logout().then(res => {
            this.$store.commit("setIsLogin", false);
            location.reload();
          });
        })
        .catch(() => {});
    },
    //修改头像(图片剪切上传后获取url)
    getImgUrl(imgUrl) {
      this.http.user.setUserInfo({ icon: imgUrl }).then(res => {
        this.$dialog.alert({
          title: "嘀嗒比赛",
          message: res.msg
        });
      });
    }
  }
};
</script>


<style scoped>
#userIndex {
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
}
.user_box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  margin: 0 .3rem .1rem .3rem;
  font-size: .3rem;
}
.header_img{
  flex: 1;
}
.user_img_box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--head-icon1);
  height: var(--head-icon1);
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
  content: " ";
  position: absolute;
  pointer-events: none;
  box-sizing: border-box;
  right: 0;
  top: 100%;
  bottom: 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  border-bottom: 1px solid #eee;
  left: 0.3rem;
  border-top: 0;
  width: 6.6rem;
}
#userIndex .user_edit_box::after {
  top: 95%;
}
</style>


