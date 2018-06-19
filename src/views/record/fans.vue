<template>
    <div id="fans">
        <dida-list :list-data="list" title-text="全部粉丝" title-number="10000" @refresh="refresh"></dida-list>
    </div>
</template>

<script>
import didaList from "../../components/didaList.vue";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.list.push(this.list.length + 1);
    }
  },
  components: {
    didaList
  },
  methods: {
    refresh() {
      // setTimeout(() => {
        this.$toast("刷新成功");
        console.log(this.isLoading)
      // }, 1000);
      this.isLoading = false;
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
