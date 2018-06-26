<template>
    <div id="fans">
        <dida-list ref="dida_list" :maxPage="maxPage" @refresh="refresh()" @load="getData(pagesize,$event)">
          <div class="title">
            <span>12345</span>
            <span>12345人</span>
          </div>
          <van-cell v-for="item in list" :key="item" value="2018/5/3 12:34:45" label="10000001" :title="item + '用户昵称'">
            <img slot="icon" src="../../assets/logo.png" alt="" srcset="">
          </van-cell>
        </dida-list>
    </div>
</template>

<script>
import didaList from "../../components/didaList.vue";
export default {
  data() {
    return {
      list: [],
      pagesize: 10,
      maxPage: null
    };
  },
  components: {
    didaList
  },
  methods: {
    /**
     * pagesize 一页显示数量
     * currentpage 页码(默认为1)
     */
    getData(pagesize, currentpage) {
      console.log(currentpage);
      // 这里模拟请求数据时间为一秒
      this.maxPage = 5;
      // 这里模拟请求数据时间为一秒
      setTimeout(() => {
        for (let i = 0; i < pagesize; i++) {
          //在旧数据基础上插入新数据
          this.list.push(this.list.length + 1);
        }
        this.$refs.dida_list.hideLoading();
      }, 500);
    },
    refresh() {
      // 这里模拟请求数据时间为一秒
      setTimeout(() => {
        //更新数据成功后设置loading隐藏
        this.$refs.dida_list.hideIsLoading();
        this.$toast("刷新成功");
      }, 500);
    }
  }
};
</script>


<style scoped>
#fans {
  height: 100%;
}
</style>
