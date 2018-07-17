<template>
  <div class="main">
    <div class="header">
      <div class="header_lists">
        <a @click="serviceClick"></a>
        <router-link to="/user/exchange/index"></router-link>
        <router-link to="/announce/index"></router-link>
        <router-link to="/user/index"></router-link>
      </div>
      <div class="header_icon">
        <img :src=" userInfo.icon || icon" alt="头像">
        <div class="user_info">
          <span class="user_title">{{userInfo.name || 广告主名称}}</span>
          <p>
            <span :class="userInfo.certification == 1? 'authyes':'authno'"></span>
            <span class="user_id">
              <i class="user_id_title">嘀嗒号：</i>{{userInfo.id}}</span>
          </p>
        </div>
        <router-link to="user/story" class="my-story">我的故事>></router-link>
      </div>
      <ul class="match_info">
        <li>
          <router-link to="#">
            <span>
              {{userInfo.visitCount}}
            </span>
            <span>
              浏览
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="#">
            <span>
              {{userInfo.likeCount}}
            </span>
            <span>
              赞
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="#">
            <span>
              {{userInfo.matchCount}}
            </span>
            <span>
              比赛
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="user/record/fans">
            <span>
              {{userInfo.watchersCount}}
            </span>
            <span>
              粉丝
            </span>
          </router-link>
        </li>
      </ul>
    </div>
    <van-tabs v-model="active" class="match_main" :line-width="40">
      <van-tab v-for="(item, index) in tabs.length" :title="tabs[index]" :key="index">
        <van-pull-refresh class="match_list" v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false" :offset="100">
            <div class="match_list_content">
              <div class="match_list_item" v-for="item in list" :key="item.id" @click="toDetail(item.id)">
                <img :src="item.cover ||cover" alt="封面图片">
                <div class="list_attri">
                  <span v-show="matchType == 1" class="list_person-num">{{ item.signupCount | trimNum}}</span>
                  <span class="list_pv">{{item.visitCount | trimNum}}</span>
                  <span class="list_like">{{item.likeCount | trimNum}}</span>
                </div>
                <div :class="progressTag(item.status)" v-show="matchType == 1">
                  <p>{{code2Word(item.status)}}</p>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-button @click="createClick" class="create-btn">
      <span class="btn_icon"></span>
      新建比赛
    </van-button>
  </div>
</template>

<script>
import icon from "../../assets/icon.png";
import cover from "../../assets/banner_task.png";
export default {
  data() {
    return {
      active: "",
      icon: icon,
      cover: cover,
      userInfo: Object, //头像地址
      tabs: ["当前赛事", "历史赛事"],
      list: [],
      refreshing: false,
      loading: false,
      finished: false,
      matchType: 1,
      matchPage: 1,
      pageSize: 10
    };
  },
  watch: {
    active() {
      this.$store.commit("setTabActive", this.active);
      this.matchType = this.active + 1;
      //清空列表数据
      this.matchPage = 1;
      this.finished = false;
      this.list = [];
      this.fetchList();
    }
  },
  filters: {
    trimNum(num) {
      if (num > 10000) {
        return num / 10000 + "w";
      }
      return num;
    }
  },
  created() {
    //获取用户信息
    this.active = this.$store.state.match.tabActive;
    this.http.user.getUserInfo().then(res => {
      this.userInfo = res.data;
      this.$store.commit("setInfo", this.userInfo);
    });
  },
  methods: {
    code2Word(code) {
      let word = this.config.matchStatus;
      return word[code];
    },
    onLoad() {
      this.matchPage += 1;
      this.fetchList().then(data => {
        this.loading = false;
        if (data.total <= this.matchPage * this.pageSize) {
          this.finished = true;
        }
      });
    },
    onRefresh() {
      this.list = [];
      this.matchPage = 1;
      this.finished = false;
      this.fetchList(1).then(() => {
        this.refreshing = false;
      });
    },
    toDetail(id) {
      this.$store.commit("setId", id);
      this.$router.push("match/detail");
    },
    createClick() {
      //清空赛事信息
      this.$store.commit("setDetail", {});
      this.$store.commit("setGameName", { id: 0, name: "未选择" });
      this.$store.commit("setTime", "");
      this.$store.commit("setAttendPerson", { id: 0, value: "未选择" });
      this.$store.commit("setAttendStyle", { id: 0, value: "未选择" });
      this.$store.commit("setIfSave", false);
      this.$store.commit("setPrizeCover", "");
      this.$store.commit("setRankPrize", []);
      this.$store.commit("setShareImg", "");

      //判断是否有权限创建
      if (this.userInfo.certification != 1) {
        return this.$toast("请先实名认证");
      }
      if (this.userInfo.latitude == 0) {
        return this.$toast("需要进行店铺地址定位");
      }
      this.$router.push("match/create");
    },
    fetchList() {
      //获取比赛信息
      return this.http.match
        .matchList({
          pagesize: this.pageSize,
          currentpage: this.matchPage,
          type: this.matchType
        })
        .then(res => {
          let data = res.data;
          this.list = this.list.concat(data.matchList);
          return data;
        });
    },
    serviceClick() {
      location.href = `https://www.sobot.com/chat/h5/index.html?sysNum=ded7079b7502494fad26fc73147a40ca&source=1&moduleType=2&tel=${
        this.userInfo.mobile
      }&partnerId=${this.userInfo.id}&uname=广告主${this.userInfo.name}`;
    },
    progressTag(code) {
      if (code == 0 || code == 5) {
        return "edit_info0";
      } else if (code == 2 || code == 3 || code == 4) {
        return "edit_info2";
      } else {
        return "edit_info1";
      }
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
/* 顶部 */
.header {
  background: url("../../assets/header_bg.png") left top/ 100% 100% no-repeat;
  color: #fff;
}
.header_icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.15rem;
}
.user_info {
  font-size: 0.2rem;
  flex-grow: 2;
}
.user_title {
  font-size: 0.35rem;
}
.user_id {
  color: #b0b0b0;
}
.user_id_title {
  color: #646464;
}
.header_icon img {
  width: 1.54rem;
  height: 1.54rem;
  border-radius: 50%;
  margin: 0 0.35rem;
}
.my-story {
  color: #ac7901;
  font-size: 0.24rem;
  flex-grow: 1;
  padding-right: 0.1rem;
  text-align: right;
}
.authyes {
  background: url("../../assets/renzheng.png") no-repeat;
}
.authno {
  background: url("../../assets/renzhengno.png") no-repeat;
}
.authyes,
.authno {
  background-size: 100% 100%;
  display: inline-block;
  height: 0.25rem;
  margin-right: 0.1rem;
  width: 0.75rem;
  vertical-align: text-top;
}
/* 顶部选项 */
.header_lists {
  line-height: 0;
  padding: 0.08rem 0 0 0;
  text-align: right;
}

.header_lists a:nth-child(1) {
  background-image: url("../../assets/header_kefu.png");
}
.header_lists a:nth-child(2) {
  background-image: url("../../assets/header_gift.png");
}
.header_lists a:nth-child(3) {
  background-image: url("../../assets/header_message.png");
}
.header_lists a:nth-child(4) {
  background-image: url("../../assets/header_setting.png");
}
.header_lists a {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: inline-block;
  height: 0.4rem;
  margin: 0 0.125rem;
  width: 0.4rem;
}
.match_info {
  display: flex;
  justify-content: space-around;
  padding: 0.3rem 0;
}
.match_info li {
  flex-basis: 0;
  flex-grow: 1;
}
.match_info li a {
  width: 100%;
}
.match_info a {
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
}
.match_info a::after {
  position: absolute;
  right: 0;
  top: 50%;
  background-color: #3d3015;
  content: "";
  height: 0.6rem;
  width: 0.01rem;
  transform: translateY(-50%);
}
.match_info a span:first-child {
  color: #b9b9b9;
}
.match_info a span:nth-child(2) {
  color: #656564;
}

.match_main {
  flex-basis: 0;
  flex-grow: 1;
  margin-bottom: 1rem;
  position: relative;
  overflow-y: hidden;
}
.match_list {
  overflow-y: auto;
  position: absolute;
  top: 44px;
  width: 100%;
  bottom: 0;
  height: 100%;
  padding-bottom: 44px;
}
.create-btn {
  background-color: #fcc600;
  font-size: 0.3rem;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 0.94rem;
  width: 100%;
}
.btn_icon {
  background: url("../../assets/btn_icon.png") center/100% 100% no-repeat;
  display: inline-block;
  height: 0.46rem;
  width: 0.44rem;
  vertical-align: text-bottom;
}
.match_list_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem;
  justify-content: space-between;
}
.match_list_item {
  background-color: #fff;
  box-shadow: 0 0.1rem 0.1rem #e3e3e3;
  margin-bottom: 0.2rem;
  width: 48%;
  height: 2.35rem;
  padding: 0 0 0.45rem;
  position: relative;
  text-align: center;
}
.match_list_item img {
  height: 100%;
  max-width: 100%;
  padding-bottom: 0.08rem;
}

.list_attri {
  border-top: 0.01rem solid #f5f5f5;
  font-size: 0.16rem;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.list_pv,
.list_person-num,
.list_like {
  background: url("../../assets/user_icon.png") left/0.18rem 0.18rem no-repeat;
  padding-left: 0.23rem;
}
.list_person-num {
  color: #fca600;
}
.list_pv {
  background-image: url("../../assets/user_attri.png");
  background-size: 0.21rem 0.18rem;
}
.list_like {
  background-image: url("../../assets/user_like.png");
}
.edit_info0,
.edit_info1,
.edit_info2 {
  color: #fff;
  font-size: 0.21rem;
  padding: 0 0.2rem 0 0.1rem;
  position: absolute;
  top: 0;
}
.edit_info0 {
  background: url("../../assets/di_green.png") left/100% 100% no-repeat;
}
.edit_info1 {
  background: url("../../assets/di_ju.png") left/100% 100% no-repeat;
}
.edit_info2 {
  background: url("../../assets/di_red.png") left/100% 100% no-repeat;
}
</style>

