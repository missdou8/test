<template>
    <van-tabs v-model="active" class="announce" :line-width="40">
        <van-tab v-for="(item, index) in tabs.length" :title="tabs[index]" :key="index">
            <van-pull-refresh v-show="0==active" class="list" v-model="refreshing" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <van-cell-group>
                        <van-cell title="邮件通知消息" icon="mail" label="这里是一串的信息，是不同的页面" value="时间">
                            <img class="mail_icon" slot="icon" src="../../assets/message.png" alt="邮件">
                        </van-cell>
                    </van-cell-group>
                </van-list>
            </van-pull-refresh>
            <van-pull-refresh v-show="1==active" v-model="refreshing" class="list">
                <van-list v-model="loading">
                    <div class="cover">
                        <img src="../../assets/banner_task.png" alt="封面图片">
                    </div>
                </van-list>
            </van-pull-refresh>
        </van-tab>
    </van-tabs>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabs: ["邮件通知", "活动"],
      refreshing: false,
      loading: false,
      finished: false
    };
  },
  methods: {
    onRefresh() {
      console.log("刷新");
    },
    onLoad() {
      console.log("加载更多");
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
}
.cover img {
  width: 100%;
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


