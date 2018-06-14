<template>
  <div class="main">
    <div class="header">
      <div class="header_icon">
        <img src="../../assets/logo.png" alt="头像">
        <span>广告主名称</span>
        <p>
          <span>认证</span>
          <span>滴答ID：123456789</span>
        </p>
      </div>
      <div>
        <div class="header_lists">
          <button>客服系统</button>
          <button>兑换中心</button>
          <button>公告</button>
          <button>设置</button>
        </div>
        <div>
          <button>我的故事</button>
        </div>
      </div>
    </div>
    <ul class="match_info">
      <li>浏览</li>
      <li>点赞</li>
      <li>场比赛</li>
      <li>粉丝</li>
    </ul>
    <van-tabs v-model="active" class="match_main">
      <van-tab v-for="(item, index) in tabs.length" :title="tabs[index]" :key="index">
        <van-pull-refresh class="match_list" v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="match_list_content">
              <div class="match_list_item" v-for="item in list" :key="item" @click="toDetail">
                <span class="list_person-num">人数</span>
                <div class="list_attri">
                  <span class="list_pv">浏览次数</span>
                  <span class="list_like">点赞人数</span>
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
      tabs: ["当前赛事", "历史赛事"],
      list: [],
      refreshing: false,
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      console.log("你好");
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
      setTimeout(() => {
        this.refreshing = false;
        console.log("获取最新的数据");
      }, 2000);
    },
    toDetail() {
      this.$router.push("match/detail");
    },
    createClick() {}
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
  display: flex;
  justify-content: space-around;
}
.header_icon {
  display: flex;
  flex-direction: column;
}
.header_icon img {
  width: 2rem;
  border-radius: 1rem;
}
/* 顶部选项 */
.header_lists button {
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

.list_person-num,
.list_attri {
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
</style>

