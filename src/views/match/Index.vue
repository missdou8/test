<template>
  <div class="main">
    <div class="header">
      <!--            <div class="header_lists">-->
      <!--                <div>-->
      <!--                    <a class="unread" href="/front/user/exchange">-->
      <!--                        <span class="dotted" v-show="userInfo.unreadPrizesCount != 0 "></span>-->
      <!--                    </a>-->
      <!--                    <span>兑奖</span>-->
      <!--                </div>-->
      <!--                <div>-->
      <!--                    <router-link class="message" to="/announce/index">-->
      <!--                        <span class="dotted" v-show="userInfo.unreadMailCount != 0 "></span>-->
      <!--                    </router-link>-->
      <!--                    <span>公告</span>-->
      <!--                </div>-->
      <!--                <div>-->
      <!--                    <router-link class="setting" to="/user/index"></router-link>-->
      <!--                    <span>设置</span>-->
      <!--                </div>-->
      <!--            </div>-->
      <div class="settings">
        <router-link class="setting" to="/user/index">
          <img src="../../assets/shouye_icon_shezhi.png" alt>
        </router-link>
      </div>
      <div class="header_icon">
        <img :src=" userInfo.icon || icon" alt="头像">
        <div class="user_info">
          <div class="userTest">
            <span v-show="isAuthentication">未认证</span>
            <span v-show="noAuthentication">已认证</span>
          </div>
          <div class="user_name">{{userInfo.name}}</div>
          <div class="userInfo_bottom">
            <div>
              <img
                style="margin: 0 .1rem 0 0;width: .32rem;height: .32rem;"
                src="../../assets/sszzz_icon_lilan.png"
                alt
              >
              <span>{{userInfo.visitCount || 0}}</span>
            </div>
            <div>
              <img
                style="margin: 0 .1rem 0 0;width: .32rem;height: .32rem;"
                src="../../assets/sszzz_icon_ganzhu.png"
                alt
              >
              <span>{{userInfo.likeCount || 0}}</span>
            </div>
          </div>
        </div>

        <!--        <div class="user_info">-->
        <!--          <span class="user_title">{{userInfo.name || '广告主名称'}}</span>-->
        <!--          <p>-->
        <!--            <span :class="userInfo.certification == 1? 'authyes':'authno'"></span>-->
        <!--            <span class="user_id">-->
        <!--              <i class="user_id_title">嘀嗒号：</i>-->
        <!--              {{userInfo.id}}-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--        <router-link to="user/story" class="my-story">我的故事>></router-link>-->
      </div>
      <ul class="match_info">
        <li>
          <router-link to="match/detail/lnvitation">
            <span>{{userInfo.invitationCount || 0}}</span>
            <!--            <span>浏览</span>-->
            <span>邀请</span>
          </router-link>
        </li>
        <li>
          <router-link to="match/detail/fans">
            <span>{{userInfo.watchersCount || 0}}</span>
            <!--            <span>赞</span>-->
            <span>粉丝</span>
          </router-link>
        </li>
        <li>
          <router-link to="match/detail/recollections">
            <span>{{userInfo.newPlayerComments || 0}}</span>
            <!--            <span>比赛</span>-->
            <span>感言</span>
          </router-link>
        </li>
        <li>
          <router-link to="user/record/fans">
            <span>{{userInfo.unreadMailCount || 0}}</span>
            <!--            <span>粉丝</span>-->
            <span>邮件</span>
          </router-link>
        </li>
      </ul>
      <div class="position">
        <ul class="position_ul">
          <li>
            <!--            <router-link to="match/detail/signUpNameList">-->
            <router-link to="user/story">
              <img src="../../assets/shouye_icon_gs.png" alt>
              <!--              <span>管理</span>-->
              <span>故事</span>
              <!--              报名名单-->
            </router-link>
          </li>
          <!--          <li>-->
          <!--            <router-link to="user/customized">-->
          <!--              <img src="" alt="">-->
          <!--              <span>定制</span>-->
          <!--            </router-link>-->
          <!--          </li>-->
          <li>
            <router-link to="match/detail/myPrize">
              <img src="../../assets/shouye_icon_jp.png" alt>
              <span>奖品</span>
            </router-link>
          </li>
          <li>
            <router-link to="match/detail/exchange">
              <img src="../../assets/shouye_icon_dh.png" alt>
              <span>兑换</span>
            </router-link>
          </li>
          <li>
            <a to="#" @click="serviceClick">
              <img src="../../assets/shouye_icon_kf.png" alt>
              <span>客服</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div style="height: .8rem;"></div>
    <van-tabs
      background="none"
      v-model="active"
      class="match_main"
      :line-width="40"
      color="#f88002"
    >
      <van-tab v-for="(item, index) in tabs.length" :key="index">
        <div slot="title">
          <p class="tab_dotted">
            {{tabs[index]}}
            <span class="dotted" v-show="index==2 && isNewComment"></span>
          </p>
        </div>
        <van-pull-refresh class="match_list" v-model="refreshing" @refresh="onRefresh(active)">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad(active)"
            :immediate-check="false"
            :offset="100"
          >
            <!--            <div class="match_list_content" v-if="active < 2">-->
            <!--              <div-->
            <!--                class="match_list_item"-->
            <!--                v-for="item in list"-->
            <!--                :key="item.id"-->
            <!--                @click="toDetail(item.id)"-->
            <!--              >-->
            <!--                <img :src="item.cover ||cover" alt="封面图片">-->
            <!--                <div class="list_attri">-->
            <!--                  <span-->
            <!--                    v-show="matchType == 1"-->
            <!--                    class="list_person-num"-->
            <!--                  >{{ item.signupCount | trimNum}}</span>-->
            <!--                  <span class="list_pv">{{item.visitCount | trimNum}}</span>-->
            <!--                  <span class="list_like">{{item.likeCount | trimNum}}</span>-->
            <!--                </div>-->
            <!--                <div :class="progressTag(item.status)" v-show="matchType == 1">-->
            <!--                  <p>{{code2Word(item.status)}}</p>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <div class="prize_list_item">
              <div class="prize_list_img">
                <img src alt="商品图片">
              </div>
              <div class="prize_list_center">
                <p class="prize_name">奖品名称奖品名称奖品名称奖品名称奖品名称</p>
                <div class="prize_label">
                  <span>乐牌跑的快</span>
                  <span>奖品描述奖品描述奖品描述奖品描述</span>
                  <span>私密</span>
                </div>
                <div class="prize_time">开赛时间：2019-08-08 16:00</div>
              </div>
              <div class="prize_list_status">待审核</div>
            </div>
            <div class="prize_list_item">
              <div class="prize_list_img">
                <img src alt="商品图片">
              </div>
              <div class="prize_list_center">
                <p class="prize_name">奖品名称奖品名称奖品名称奖品名称奖品名称</p>
                <div class="prize_label">
                  <span>乐牌跑的快</span>
                  <span>奖品描述奖品描述奖品描述奖品描述</span>
                  <span>私密</span>
                </div>
                <div class="prize_time">开赛时间：2019-08-08 16:00</div>
              </div>
              <div class="prize_list_status">待审核</div>
            </div>
            <div class="prize_list_item">
              <div class="prize_list_img">
                <img src alt="商品图片">
              </div>
              <div class="prize_list_center">
                <p class="prize_name">奖品名称奖品名称奖品名称奖品名称奖品名称</p>
                <div class="prize_label">
                  <span>乐牌跑的快</span>
                  <span>奖品描述奖品描述奖品描述奖品描述</span>
                  <span>私密</span>
                </div>
                <div class="prize_time">开赛时间：2019-08-08 16:00</div>
              </div>
              <div class="prize_list_status">待审核</div>
            </div>
            <div class="prize_list_item">
              <div class="prize_list_img">
                <img src alt="商品图片">
              </div>
              <div class="prize_list_center">
                <p class="prize_name">奖品名称奖品名称奖品名称奖品名称奖品名称</p>
                <div class="prize_label">
                  <span>乐牌跑的快</span>
                  <span>奖品描述奖品描述奖品描述奖品描述</span>
                  <span>私密</span>
                </div>
                <div class="prize_time">开赛时间：2019-08-08 16:00</div>
              </div>
              <div class="prize_list_status">待审核</div>
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
import { ImagePreview } from "vant";

export default {
  data() {
    return {
      active: "",
      icon: icon,
      cover: cover,
      userInfo: Object, //头像地址
      // tabs: ["当前赛事", "历史赛事", "获奖感言"],
      tabs: ["待处理赛事", "当前赛事", "历史赛事"],
      list: [],
      refreshing: false,
      loading: false,
      finished: false,
      matchType: 1,
      matchPage: 1,
      pageSize: 10,
      isNewComment: false, //是否有新评论
      commentsList: [], //评论列表信息
      isAuthentication: false,
      noAuthentication: false
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
      this.commentsList = [];
      /**
       * 前两个tab一个数据接口
       * 第三个一个数据接口
       */
      if (this.active < 2) {
        this.fetchList();
      } else {
        this.isNewComment = false;
        this.fetchCommentsList();
      }
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
      console.log(this.userInfo);
      this.isNewComment = this.userInfo.newPlayerComments;
      this.$store.commit("setInfo", this.userInfo);

      if (this.userInfo.certification == 1) {
        this.isAuthentication = true;
        this.noAuthentication = false;
      } else {
        this.isAuthentication = false;
        this.noAuthentication = true;
      }
    });
    // 新版
    // this.http.matchOrganizer.getUserInfo().then(res =>{
    //     console.log(res);
    //     this.userInfo = res.data;
    //     this.$store.commit("setInfo", this.userInfo);

    // if(this.userInfo.certification == 1){
    //     this.isAuthentication = true;
    //     this.noAuthentication = false;
    // }else{
    //     this.isAuthentication = false;
    //     this.noAuthentication = true;
    // }
    // })
  },
  methods: {
    bigger(src) {
      ImagePreview({
        images: [src],
        onClose() {
          // do something
        }
      });
    },
    commentClick(data) {
      this.$router.push({
        path: "/match/comment",
        query: {
          data: JSON.stringify(data)
        }
      });
    },
    code2Word(code) {
      let word = this.config.matchStatus;
      return word[code];
    },
    onLoad(tab) {
      this.matchPage += 1;
      if (tab < 2) {
        this.fetchList().then(data => {
          this.loading = false;
          if (data.total <= this.matchPage * this.pageSize) {
            this.finished = true;
          }
        });
      } else {
        this.fetchCommentsList().then(data => {
          this.loading = false;
          if (data.total <= this.matchPage * this.pageSize) {
            this.finished = true;
          }
        });
      }
    },
    onRefresh(tab) {
      this.list = [];
      this.commentsList = [];
      this.matchPage = 1;
      this.finished = false;
      if (tab < 2) {
        this.fetchList().then(() => {
          this.refreshing = false;
        });
      } else {
        this.fetchCommentsList().then(() => {
          this.refreshing = false;
        });
      }
    },
    commentToDetail(data) {
      this.toDetail(JSON.parse(data).matchId);
    },
    toDetail(id) {
      this.$store.commit("setId", id);
      this.$router.push("match/detail");
    },
    createClick() {
      //清空赛事信息
      this.$store.commit("setDetail", {});
      this.$store.commit("setGameName", { id: 0, name: "请选择" });
      this.$store.commit("setTime", 0);
      this.$store.commit("setAttendPerson", { templateId: 0, title: "请选择" });
      this.$store.commit("setAttendStyle", { id: 0, value: "请选择" });
      this.$store.commit("setIfSave", false);
      this.$store.commit("setPrizeCover", "");
      this.$store.commit("setgainPrizeAddress", {});

      //初始化默认数据
      this.$store.commit("setRankPrizes", [
        {
          beginRank: 1,
          endRank: 1,
          ispartInPrize: 0,
          prizes: [
            {
              name: null,
              price: null,
              prizeCount: null,
              icon: null
            }
          ]
        }
      ]);
      this.$store.commit("setPartSet", [
        { name: null, price: null, prizeCount: null, icon: null }
      ]);
      this.$store.commit("setSendStyle", -1);
      //判断是否有权限创建
      // if (this.userInfo.certification != 1) {
      //   return this.$toast("请先实名认证");
      // }
      if (this.userInfo.latitude == 0) {
        return this.$toast("需要进行店铺地址定位");
      }
      if (this.userInfo.shopName == "") {
        return this.$toast("请先设置店铺名称");
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
    fetchCommentsList() {
      return this.http.prizes
        .commentsList({ pagesize: this.pageSize, currentpage: this.matchPage })
        .then(res => {
          let data = res.data;
          this.commentsList = this.commentsList.concat(data.commentsList);
          return data;
        });
    },
    serviceClick() {
      location.href = `${this.config.customerServiceUrl}&tel=${
        this.userInfo.mobile
      }&partnerId=${this.userInfo.id}&uname=广告主后台_${
        this.userInfo.name
      }&groupId=a0855fa7e13e490ca78dfbef7efb7516`;
    },
    progressTag(code) {
      if (code == 0 || code == 5) {
        return "edit_info0";
      } else if (code == 2 || code == 3 || code == 4) {
        return "edit_info2";
      } else {
        return "edit_info1";
      }

      this.$store.commit("setPartSet", [
        { name: null, price: null, prizeCount: null, icon: null }
      ]);
      this.$store.commit("setSendStyle", -1);
      //判断是否有权限创建
      // if (this.userInfo.certification != 1) {
      //   return this.$toast("请先实名认证");
      // }
      if (this.userInfo.latitude == 0) {
        return this.$toast("需要进行店铺地址定位");
      }
      if (this.userInfo.shopName == "") {
        return this.$toast("请先设置店铺名称");
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
    fetchCommentsList() {
      return this.http.prizes
        .commentsList({ pagesize: this.pageSize, currentpage: this.matchPage })
        .then(res => {
          let data = res.data;
          this.commentsList = this.commentsList.concat(data.commentsList);
          return data;
        });
    },
    serviceClick() {
      location.href = `${this.config.customerServiceUrl}&tel=${
        this.userInfo.mobile
      }&partnerId=${this.userInfo.id}&uname=广告主后台_${
        this.userInfo.name
      }&groupId=a0855fa7e13e490ca78dfbef7efb7516`;
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
  background-color: #f0f1f2;
}

.header {
  background: -webkit-linear-gradient(
    left,
    #07141b,
    #0d2d3a
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #07141b,
    #0d2d3a
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #07141b,
    #0d2d3a
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #07141b, #0d2d3a); /* 标准的语法 */
  color: #fff;
  position: relative;
}

.header_icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.15rem;
  padding-top: 0.3rem;
}

.user_info {
  font-size: 0.2rem;
  flex-grow: 2;
}

.userTest {
  display: flex;
  width: 2.3rem;
}

.userTest > span {
  display: block;
  width: 0.9rem;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  border-radius: 0.05rem;
}

.userTest > span:nth-child(2) {
  background: #67c23a;
}

.userTest > span:nth-child(1) {
  background: #f56c6c;
}

.user_name {
  font-size: 0.36rem;
  font-weight: 300;
  padding: 0.1rem 0 0.05rem 0;
}

.userInfo_bottom {
  display: flex;
  width: 2rem;
  height: 0.3rem;
  line-height: 0.3rem;
}

.userInfo_bottom > div {
  flex: 1;
  display: flex;
}

.position {
  height: 1rem;
}

.position_ul {
  width: 95%;
  height: 1.73rem;
  background: #ffffff;
  margin: 0 auto;
  display: flex;
  border-radius: 0.13rem;
  box-shadow: 0 0.1rem 0.1rem #d9dde7;
}

.position_ul > li {
  flex: 1;
  align-items: center;
  text-align: center;
  padding-top: 0.24rem;
  font-size: 0.3rem;
}

.position_ul > li > a {
  color: #000;
}

.position_ul > li img {
  display: block;
  width: 0.8rem;
  border-radius: 0.4rem;
  margin: 0 auto;
}

.header_icon img {
  width: var(--head-icon1);
  height: var(--head-icon1);
  border-radius: 50%;
  margin: 0 0.2rem 0 0.4rem;
}

.header_lists > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header_lists span {
  font-size: 0.2rem;
  margin-top: 0.1rem;
}

.dotted {
  background-color: red;
  border-radius: 50%;
  color: #fff;
  font-size: 0.24rem;
  height: 0.2rem;
  line-height: 0.3rem;
  width: 0.2rem;
  position: absolute;
  top: -0.05rem;
  right: -0.05rem;
  text-align: center;
}

.settings {
  position: absolute;
  right: 0.4rem;
  top: 0.2rem;
  height: 0.4rem;
  width: 0.4rem;
}

.settings .setting {
  display: block;
  width: 0.4rem;
  height: 0.4rem;
}

.settings .setting > img {
  width: 100%;
  height: 100%;
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
  padding: 0.2rem 0 0.3rem 0;
}

.match_info li {
  flex-basis: 0;
  flex-grow: 1;
  font-size: 0.3rem;
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
  background-color: #1f3038;
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
  margin-bottom: 0.9rem;
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
  background: url("../../assets/chauangkjian_icon.png") center/100% 100%
    no-repeat;
  display: inline-block;
  height: 0.63rem;
  width: 0.44rem;
  vertical-align: text-bottom;
}

.match_list_item img {
  height: 100%;
  max-width: 100%;
  padding-bottom: 0.08rem;
}

.prize_list_item {
  height: 2rem;
  display: flex;
  padding: 0.23rem;
  background-color: #ffffff;
}

.prize_list_img {
  padding-right: 0.2rem;
}

.prize_list_img > img {
  width: 1.53rem;
  height: 1.53rem;
  border: 0.01rem solid #000;
  display: block;
}

.prize_list_center {
  flex: 4;
}

.prize_name {
  width: 3.6rem;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.3rem;
}

.prize_label {
  display: flex;
  line-height: 0.31rem;
  padding-top: 0.07rem;
}

.prize_label span:nth-child(1) {
  font-size: 0.2rem;
  width: 1.22rem;
  height: 0.31rem;
  border-radius: 0.6rem;
  background: #fef4e6;
  border: 0.005rem solid #f9a42f;
  color: #f9930a;
  text-align: center;
}

.prize_label span:nth-child(2) {
  width: 1.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.2rem;
  font-size: 0.28rem;
}

.prize_label span:nth-child(3) {
  width: 0.56rem;
  height: 0.29rem;
  background: #d66cf5;
  text-align: center;
  color: #ffffff;
  border-radius: 0.02rem;
  font-size: 0.13rem;
}

.prize_time {
  padding: 0.15rem 0;
  font-size: 0.2rem;
  color: #c0c4cc;
}

.prize_list_status {
  flex: 1;
  text-align: center;
  line-height: 1.6rem;
  color: #f23f3f;
  font-size: 0.28rem;
}

.tab_dotted {
  position: relative;
}

.tab_dotted .dotted {
  top: 0.18rem;
  right: 0.42rem;
}

.comments_list {
  margin-top: 0.13rem;
  line-height: 1;
}
</style>
