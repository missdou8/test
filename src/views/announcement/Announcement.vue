<template>
  <van-tabs v-model="active" class="announce" :line-width="40">
    <van-tab v-for="(item, index) in tabs.length" :title="tabs[index]" :key="index">
      <van-pull-refresh v-show="0==active" class="list" v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="mailLoading" :finished="finished" @load="onLoadMail" :immediate-check="false">
          <van-cell-group>
            <van-cell v-for="item in mailList" :key="item.id" :title="item.title" icon="mail" :label="item.description" :value="item.time | formateTime" @click="toMailDetail(item.id)">
              <img class="mail_icon" slot="icon" :src="item.isRead | mailStatus" alt="邮件">
            </van-cell>
          </van-cell-group>
        </van-list>
      </van-pull-refresh>
      <van-pull-refresh v-show="1==active" v-model="nrefreshing" class="list" @refresh="nonRefresh">
        <van-list :immediate-check="false" v-model="loading" :finished="nfinished">
          <div class="cover" v-for="item in noticeList" :key="item.id" @click="toNoticeDetail(item.type, item.url, item.id)">
            <img :src="item.cover" alt="封面图片">
          </div>
        </van-list>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>

<script>
import { timeFormate } from "lputils";
import mailImg from "../../assets/message.png";
import mailImgNew from "../../assets/message_new.png";

export default {
  data() {
    return {
      active: 0,
      tabs: ["邮件通知", "活动"],
      refreshing: false,
      nrefreshing: false,
      mailLoading: false,
      finished: false,
      nfinished: false,
      pageNum: 10,
      currentMail: 1,
      currentNotice: 1,
      mailList: [],
      noticeList: [],
      loading: false
    };
  },
  watch: {
    active() {
      if (this.active == 1) {
        this.onLoadNotice();
      }
    }
  },
  filters: {
    formateTime(time) {
      return timeFormate(time * 1000, "YY-MM-DD HH:mm");
    },
    mailStatus(status) {
      return status ? mailImg : mailImgNew;
    }
  },
  created() {
    this.onLoadMail();
  },
  methods: {
    onRefresh() {
      this.currentMail = 1;
      this.finished = false;
      this.mailList = [];
      this.onLoadMail().then(() => {
        this.refreshing = false;
      });
    },
    nonRefresh() {
      this.currentNotice = 1;
      this.nfinished = false;
      this.noticeList = [];
      this.onLoadNotice().then(() => {
        this.nrefreshing = false;
      });
    },
    onLoadMail() {
      return this.http.notice
        .mailNotificationList({
          pagesize: this.pageNum,
          currentpage: this.currentMail
        })
        .then(res => {
          this.mailLoading = false;
          this.mailList = res.data.noticeList;
        });
    },
    onLoadNotice() {
      return this.http.notice
        .noticeList({
          pagesize: this.pageNum,
          currentpage: this.currentNotice
        })
        .then(res => {
          this.loading = false;
          this.noticeList = res.data.noticeList;
        });
    },
    toMailDetail(id) {
      this.$router.push({
        path: "/announce/detail/mail",
        query: {
          id: id
        }
      });
    },
    toNoticeDetail(type, url, id) {
      if (type == 1) {
        location.href = url;
      } else {
        this.$router.push({
          path: "/announce/detail/notice",
          query: {
            id: id
          }
        });
      }
    }
  }
};
</script>

<style>
.announce .van-cell__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>


<style scoped>
.announce {
  height: 100%;
}
.cover {
  margin: 0.2rem;
  text-align: center;
}
.cover img {
  max-height: 3rem;
  max-width: 100%;
}
.list {
  margin-top: 0.2rem;
}
.mail_icon {
  height: 0.7rem;
  width: 0.7rem;
  margin-right: 0.2rem;
}
</style>


