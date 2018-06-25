<template>
  <div class="main">
    <div class="header">
      <div class="header_lists">
        <button>客服系统</button>
        <!-- <button>兑换中心</button> -->
        <router-link to="/user/exchange/index">兑换中心</router-link>
        <button>公告</button>
        <router-link to="/user/index">设置</router-link>
      </div>
      <div class="header_icon">
        <img :src=" userInfo.icon || '../../assets/logo.png'" alt="头像">
        <span>{{userInfo.name || 广告主名称}}</span>
        <p>
          <span>{{userInfo.certification == 1 ? "认证" : '未认证'}}</span>
          <span>滴答ID：{{userInfo.id}}</span>
        </p>
      </div>
      <div>
        <div>
          <button>我的故事</button>
        </div>
      </div>
    </div>
    <ul class="match_info">
      <li>{{userInfo.visitCount}}浏览</li>
      <li>{{userInfo.likeCount}}点赞</li>
      <li>{{userInfo.matchCount}}场比赛</li>
      <li>
        <router-link to="user/record/fans">{{userInfo.watchersCount}}粉丝</router-link>
      </li>
    </ul>
    <van-tabs v-model="active" class="match_main">
      <van-tab v-for="(item, index) in tabs.length" :title="tabs[index]" :key="index">
        <van-pull-refresh class="match_list" v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="match_list_content">
              <div class="match_list_item" v-for="item in list" :key="item" @click="toDetail">
                <img :src="item.cover" alt="封面图片">
                <span class="list_person-num">{{item.applyCount}}人数</span>
                <div class="list_attri">
                  <span class="list_pv">{{item.visitCount}}浏览次数</span>
                  <span class="list_like">{{item.likeCount}}点赞人数</span>
                </div>
                <div class="edit_info">
                  <p>{{item.auditStatus | code2Word}}</p>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-button @click="createClick" class="create-btn">新建比赛</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      userInfo: Object, //头像地址
      tabs: ["当前赛事", "历史赛事"],
      list: [],
      refreshing: false,
      loading: false,
      finished: false,
      matchType: 1,
      matchPage: 1,
      pageSize: 6
    };
  },
  watch: {
    active() {
      this.matchType = this.active + 1;
      this.fetchList();
    }
  },
  filters: {
    code2Word(code) {
      let word = "";
      switch (code) {
        case 0:
          word = "新建未审核";
          break;
        case 1:
          word = "新建提审中";
          break;
        case 2:
          word = "信息修改提审中";
          break;
        case 3:
          word = "申请被驳回";
          break;
        case 4:
          word = "审核通过，等待发布";
          break;
        case 5:
          word = "已发布";
      }
      return word;
    }
  },
  created() {
    //获取用户信息
    this.http.user.getUserInfo().then(res => {
      this.userInfo = res.data;
    });
    // this.fetchList(1, 1);
  },
  methods: {
    onLoad() {
      this.fetchList().then(data => {
        this.loading = false;
        if (data.total <= this.matchPage * this.pageSize) {
          this.finished = true;
        }
      });
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      this.fetchList(1).then(() => {
        this.refreshing = false;
      });
    },
    toDetail() {
      this.$router.push("match/detail");
    },
    createClick() {
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
/* .header {
  background-color: #1c1a1a;
  color: #fff;
} */
.header_icon {
  display: flex;
  flex-direction: column;
}
.header_icon img {
  width: 1.54rem;
  height: 1.54rem;
  border-radius: 50%;
}
/* 顶部选项 */
.header_lists {
  text-align: right;
}
.header_lists button,
.header_lists a {
  padding: 0.1rem 0.2rem;
}
.match_info {
  display: flex;
  justify-content: space-around;
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
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
}

.match_list_content {
  display: flex;
  flex-wrap: wrap;
}
.match_list_item {
  border: 0.01rem solid blue;
  margin: 0.2rem auto;
  width: 45%;
  height: 3rem;
  position: relative;
}
.match_list_item img {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.list_person-num,
.list_attri,
.edit_info {
  position: absolute;
}
.list_person-num {
  top: 0;
  right: 0.2rem;
}
.list_attri {
  bottom: 0;
  right: 0;
}
.edit_info {
  left: 0;
  top: 1rem;
}
</style>

