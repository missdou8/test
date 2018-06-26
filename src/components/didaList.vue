<template>
  <div id="didaList">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <!-- 开放html架构 -->
        <slot></slot>
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
  props: ["maxPage"],
  methods: {
    onLoad() {
      this.$emit("load", this.currentPage);
      if (this.currentPage >= this.maxPage && this.maxPage != null)
        this.finished = true;
      else this.currentPage++;
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

<style>
#didaList {
  height: 100%;
}
#didaList .title {
  line-height: 30px;
  overflow: hidden;
  padding: 5px 15px;
}
#didaList .title span:nth-child(2) {
  float: right;
}
#didaList .van-cell {
  padding: 0.2rem 0.3rem;
}
#didaList .van-cell img {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin-right: 0.1rem;
}
#didaList .van-cell .van-cell__title span {
  font-size: 0.25rem;
  font-weight: 600;
}
#didaList .van-cell .van-cell__value {
  line-height: 0.8rem;
}
#didaList .van-cell:not(:last-child)::after {
  height: 198%;
}
</style>
