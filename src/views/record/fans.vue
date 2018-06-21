<template>
    <div id="fans">
        <dida-list ref="dida_list" :list-data="list" :maxPage="5" title-text="全部粉丝" title-number="10000" @refresh="refresh()" @load="getData(pagesize,$event)"></dida-list>
    </div>
</template>

<script>
import didaList from "../../components/didaList.vue";
export default {
  data() {
    return {
      list: [],
      pagesize:10,
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
