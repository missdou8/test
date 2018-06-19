<template>
    <div id="didaList">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="title">
                    <span>{{titleText}}</span>
                    <span>{{titleNumber}}人</span>
                </div>
                <van-cell v-for="item in listData" :key="item"  value="2018/5/3 12:34:45" label="10000001" :title="item + '用户昵称'">
                    <img slot="icon" src="../assets/icon_S01.png" alt="" srcset="">
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
      currentPage: 1 //当前页
    };
  },
  /**
   * list 数据结构
   */
  props: ['listData','maxPage','titleText','titleNumber'],

  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.listData.push(this.listData.length + 1);
        }
        this.loading = false;
        if (this.listData.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      setTimeout(() => {
        this.$emit("refresh",this.isLoading);
        this.isLoading = false;
      }, 500);
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
