<template>
  <div class="main">
    <div class="header">
      <div class="header_lists">
<!--        <div>-->
<!--          <a class="service" @click="serviceClick"></a>-->
<!--          <span>客服</span>-->
<!--        </div>-->
        <div>
          <a class="unread" href="/front/user/exchange">
            <span class="dotted" v-show="userInfo.unreadPrizesCount != 0 "></span>
          </a>
          <span>兑奖</span>
        </div>
        <div>
          <router-link class="message" to="/announce/index">
            <span class="dotted" v-show="userInfo.unreadMailCount != 0 "></span>
          </router-link>
          <span>公告</span>
        </div>
        <div>
          <router-link class="setting" to="/user/index"></router-link>
          <span>设置</span>
        </div>
      </div>
      <div class="header_icon">
        <img :src=" userInfo.icon || icon" alt="头像">
        <div class="user_info">
          <div class="userTest">
            <span>未认证</span><span>已认证</span>
          </div>
          <div class="user_name">
            乐牌赛事组织者
          </div>
          <div class="userInfo_bottom">
            <div>
              <span></span>
              <span>8888</span>
            </div>
            <div>
              <span></span>
              <span>8888</span>
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
            <span>{{userInfo.visitCount}}</span>
<!--            <span>浏览</span>-->
            <span>邀请</span>
          </router-link>
        </li>
        <li>
          <router-link to="#">
            <span>{{userInfo.likeCount}}</span>
<!--            <span>赞</span>-->
            <span>粉丝</span>
          </router-link>
        </li>
        <li>
          <router-link to="#">
            <span>{{userInfo.matchCount}}</span>
<!--            <span>比赛</span>-->
            <span>感言</span>
          </router-link>
        </li>
        <li>
          <router-link to="user/record/fans">
            <span>{{userInfo.watchersCount}}</span>
<!--            <span>粉丝</span>-->
            <span>邮件</span>
          </router-link>
        </li>
      </ul>
      <div class="position">
        <ul class="position_ul">
          <li>
            <router-link to="match/detail/signUpNameList">
              <img src="" alt="">
              <span>管理</span>
            </router-link>
          </li>
          <li>
            <router-link to="#">
              <img src="" alt="">
              <span>定制</span>
            </router-link>
          </li>
          <li>
            <router-link to="match/detail/myPrize">
              <img src="" alt="">
              <span>奖品</span>
            </router-link>
          </li>
          <li>
            <router-link to="match/detail/exchange">
              <img src="" alt="">
              <span>兑换</span>
            </router-link>
          </li>
          <li>
            <a to="#" @click="serviceClick">
              <img src="" alt="">
              <span>客服</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div style="height: 1rem;"></div>
    <van-tabs background="none" v-model="active" class="match_main" :line-width="40" color="#f88002">
      <van-tab  v-for="(item, index) in tabs.length" :key="index">
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
            <div v-if="active < 3" class="prize_list_content">
                <div class="prize_list_item">
                  <div class="prize_list_img">
                    <img src="" alt="商品图片">
                  </div>
                  <div class="prize_list_center">
                    <p class="prize_name">奖品名称奖品名称奖品名称奖品名称奖品名称</p>
                    <div class="prize_label">
                      <span>乐牌跑的快</span>
                      <span>奖品描述奖品描述奖品描述奖品描述</span>
                      <span>私密</span>
                    </div>
                    <div class="prize_time">
                      开赛时间：2019-08-08 16:00
                    </div>
                  </div>
                  <div class="prize_list_status">
                    待审核
                  </div>
                </div>
              <div class="prize_list_item">
                <div class="prize_list_img">
                  <img src="" alt="商品图片">
                </div>
                <div class="prize_list_center">
                  <p class="prize_name">奖品名称奖品名称奖品名称奖品名称奖品名称</p>
                  <div class="prize_label">
                    <span>乐牌跑的快</span>
                    <span>奖品描述奖品描述奖品描述奖品描述</span>
                    <span>私密</span>
                  </div>
                  <div class="prize_time">
                    开赛时间：2019-08-08 16:00
                  </div>
                </div>
                <div class="prize_list_status">
                  待审核
                </div>
              </div>
              <div class="prize_list_item">
                <div class="prize_list_img">
                  <img src="" alt="商品图片">
                </div>
                <div class="prize_list_center">
                  <p class="prize_name">奖品名称奖品名称奖品名称奖品名称奖品名称</p>
                  <div class="prize_label">
                    <span>乐牌跑的快</span>
                    <span>奖品描述奖品描述奖品描述奖品描述</span>
                    <span>私密</span>
                  </div>
                  <div class="prize_time">
                    开赛时间：2019-08-08 16:00
                  </div>
                </div>
                <div class="prize_list_status">
                  待审核
                </div>
              </div>
            </div>
            <DidaCommentList
              class="comments_list"
              v-for="(item,index) in commentsList"
              :key="`comment${index}`"
              :data="item"
              :type="0"
              @next="commentClick"
              :disabeld="true"
              :isComment="true"
              @toDetail="commentToDetail"
              @getImgSrc="bigger"
              v-else
            ></DidaCommentList>
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
      commentsList: [] //评论列表信息
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
      this.isNewComment = this.userInfo.newPlayerComments;
      this.$store.commit("setInfo", this.userInfo);
    });
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
      this.$store.commit("setGameName", { id: 0, name: "未选择" });
      this.$store.commit("setTime", 0);
      this.$store.commit("setAttendPerson", { id: 0, value: "未选择" });
      this.$store.commit("setAttendStyle", { id: 0, value: "未选择" });
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
.userTest{
  display: flex;
  width: 2.3rem;
}
.userTest > span{
  display: block;
  flex: 1;
  width: 0.5rem;
  height: 0.4rem;
  margin: 0 0.08rem;
  text-align: center;
  line-height: 0.4rem;
  border-radius: .05rem;
}
.userTest > span:nth-child(2){
  background: #67c23a;
}
.userTest > span:nth-child(1){
  background: #f56c6c;
}
.user_name{
  font-size: .38rem;
  font-weight: 300;
  padding: .1rem 0;
}
.userInfo_bottom{
  display: flex;
  width: 2rem;
}
.userInfo_bottom > div{
  flex: 1;
}
.position{
  height: 1rem;
}
.position_ul{
  width: 95%;
  height: 1.8rem;
  background: #ffffff;
  margin: 0 auto;
  display: flex;
  border-radius: .13rem;
}
.position_ul > li{
  flex: 1;
  align-items: center;
  text-align: center;
  padding-top: .3rem;
}
.position_ul > li > a{
  color: #000;
}
.position_ul > li img{
  display: block;
  width: .8rem;
  height: .8rem;
  border-radius: .8rem;
  border: .05rem solid #e8ebf4;
  margin: 0 auto;
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
  margin: 0 0.2rem 0 0.4rem;
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
  padding: 0.1rem 0 0 0;
  text-align: right;
  display: flex;
  justify-content: flex-end;
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

.header_lists .service {
  background-image: url("../../assets/header_kefu.png");
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.message {
  background-image: url("../../assets/header_message.png");
  position: relative;
}
.unread {
  background-image: url("../../assets/header_gift.png");
  position: relative;
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
.header_lists .setting {
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
  padding: 0 0 0.3rem 0;
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

.prize_list_content{
  display: flex;
  flex-direction: column;
  width: 95%;
  background: #ffffff;
  margin: 0 auto;
}
.prize_list_item{
  height: 2rem;
  display: flex;
  padding: .1rem;
}
.prize_list_img{
  flex: 2;
}
.prize_list_img > img{
  width: 1.73rem;
  height: 1.73rem;
  border: 0.01rem solid #000;
  display: block;
}
.prize_list_center{
  flex: 4;
}
.prize_name{
  width: 3.6rem;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.prize_label{
  display: flex;
  line-height: .31rem;
  padding-top: .07rem;
}
.prize_label span:nth-child(1){
  font-size: .2rem;
  width: 1.22rem;
  height:  0.31rem;
  border-radius: .6rem;
  background: #fef4e6;
  border: .005rem solid #f9a42f;
  color: #f9930a;
  text-align: center;
}
.prize_label span:nth-child(2){
  width: 1.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: .2rem;
}
.prize_label span:nth-child(3){
  width: .56rem;
  height: .29rem;
  background: #d66cf5;
  text-align: center;
  color: #ffffff;
  border-radius: .02rem;
  font-size: .13rem;
}
.prize_time{
  padding: .25rem 0;
  font-size: .2rem;
  color: #c0c4cc;
}
.prize_list_status{
  flex: 1;
  text-align: center;
  line-height: 1.6rem;
  color: #f23f3f;
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

                                                                                             