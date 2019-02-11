<template>
  <div>
    <prize-detail :rankData="prizeData"></prize-detail>
  </div>
</template>

<script>
import PrizeDetail from "./components/PrizeDetail";
import { mapState } from "vuex";
export default {
  data() {
    return {
      prizeData: {}
    };
  },
  components: {
    PrizeDetail
  },
  mounted() {
    /**
     * 初始化本名词数据
     */
    let data = JSON.parse(this.$route.query.prizeData);
    this.prizeData = data;
  }
};
</script>

