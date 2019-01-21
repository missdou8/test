<template>
  <div>
    <prize-detail v-for="(item ,index) in rankPrizes" :key="`rank${index}`" :data="item"></prize-detail>
  </div>
</template>

<script>
import PrizeDetail from "./components/PrizeDetail";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    PrizeDetail
  },
  computed: {
    ...mapState({
      rankPrizes(state) {
        return state.match.rankPrizes;
      }
    })
  }
};
</script>

