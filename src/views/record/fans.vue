<template>
    <div id="fans">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="title">
                    <span>全部粉丝</span>
                    <span>6666666人</span>
                </div>
                <van-cell v-for="item in list" :key="item"  value="2018/5/3 12:34:45" label="10000001" :title="item + '用户昵称'">
                    <img slot="icon" src="../../assets/icon_S01.png" alt="" srcset="">
                </van-cell>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  created() {},
  methods: {
    onLoad() {
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
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    }
  }
};
</script>


<style scoped>
#fans {
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
