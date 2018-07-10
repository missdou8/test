<template>
  <div id="didaList">
    <h3 v-if="total==0&&noDataText" class="noDataText">{{noDataText}}</h3>
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
   * postModule 接口模块名
   * postUrl    接口地址名
   * dataName   接口中数据参数名不传与接口地址名一样
   * reqData    传递参数对象
   *            没有记录时显示的文本提示
   */
  props: ["postModule", "postUrl", "dataName","reqData","noDataText"],
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
        [this.postUrl](Object.assign({
          pagesize: this.pagesize,
          currentpage: this.currentpage
        },this.reqData))
        .then(res => {
          let data = res.data;
          this.total = data.total;
          //这里返回的是原数据列表
          this.list = this.list.concat(data[this.dataName || this.postUrl]);
          return data;
        });
    },
    onLoad() {
      this.getData().then(data => {
        this.loading = false;
        if (this.total <= this.currentpage * this.pagesize)
          this.finished = true;
        else this.currentpage++;
      });
    },
    onRefresh() {
      //下拉的时候第一步清空数组列表
      this.list = [];
      this.currentpage = 1;
      //请求第一页数据
      this.getData(1).then(() => {
        this.isLoading = false;
        //如果首屏不够的情况下从第二页开始继续执行onLoad()方法
        this.currentpage++;
        // 切记要将finished变为false[如果下拉加载到底不，finished变为了true，再次请求数据的时候将不会再执行下拉加载]
        this.finished = false;
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
#didaList{
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
#didaList .noDataText {
  font-size: 0.4rem;
  padding: 0.2rem;
  margin-top: 1rem;
  line-height: 0.6rem;
  text-align: center;
}
</style>
