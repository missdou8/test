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
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      pagesize: 10,
      currentpage: 1, //当前页(默认从第一页开始)
      total: 0 //总条数
    };
  },
  /**
   * postUrl 接口地址
   */
  props: ["postModule", "postUrl"],
  watch: {
    list() {
      this.$emit("returnData", {
        total: this.total,
        list: this.list
      });
    }
  },
  methods: {
    getData() {
      return this.http[this.postModule]
        [this.postUrl]({
          pagesize: this.pagesize,
          currentpage: this.currentpage
        })
        .then(res => {
          let data = res.data;
          this.total = data.total;
          //这里返回的是原数据列表
          // data[this.postUrl].forEach(d => {
          //   data[this.postUrl].Time = timestamp_switch_time(d.time);
          // });
          // this.$emit("returnData",data)
          this.list = this.list.concat(data[this.postUrl]);
          return data;
        });
    },
    onLoad() {
      this.getData().then(data => {
        this.loading = false;
        if (data.total <= this.currentpage * this.pagesize)
          this.finished = true;
        else this.currentpage++;
      });
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        } else {
          this.currentpage++;
        }
      }, 500);
    },
    onRefresh() {
      this.currentpage = 1;
      this.getData(1).then(() => {
        this.isLoading = false;
        this.currentpage = 1;
      });
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
