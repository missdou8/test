<template>
  <div>
    <prize-detail :data="prizeData" :currentIndex="currentPrizeNum"></prize-detail>
  </div>
</template>

<script>
import PrizeDetail from "./components/PrizeDetail";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentPrizeNum: 0,
      prizeData: {}
    };
  },
  components: {
    PrizeDetail
  },
  mounted() {
    console.log(this.$route.query.prizeData);
    this.prizeData = this.$route.query.prizeData;
  }
};
</script>

