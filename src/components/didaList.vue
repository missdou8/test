<template>
  <div id="didaList">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div class="title">
          <span>{{titleText}}</span>
          <span>{{titleNumber}}人</span>
        </div>
        <van-cell v-for="item in listData" :key="item" value="2018/5/3 12:34:45" label="10000001" :title="item + '用户昵称'">
          <img slot="icon" src="../assets/logo.png" alt="" srcset="">
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      currentPage: 1 //当前页(默认从第一页开始)
    };
  },
  /**
   * list 数据结构
   * maxPage 最大页数
   * titleText 标题左侧显示文本
   * titleNumber 标题右侧显示文本
   */
  props: ["listData", "maxPage", "titleText", "titleNumber"],
  methods: {
    onLoad() {
      this.$emit("load", this.currentPage);
      this.currentPage += 1;
      if (this.currentPage > this.maxPage) {
        this.finished = true;
      }
    },
    onRefresh() {
      this.$emit("refresh");
    },
    hideLoading() {
      this.loading = false;
    },
    hideIsLoading() {
      this.isLoading = false;
    }
  }
};
</script>


<style scoped>
#didaList {
  height: 100%;
}
.title {
  line-height: 30px;
  overflow: hidden;
  padding: 5px 15px;
}
.title span:nth-child(2) {
  float: right;
}
</style>
