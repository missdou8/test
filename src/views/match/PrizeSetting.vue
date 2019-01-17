<template>
  <div>
    <prize-detail :data="prizeData"></prize-detail>
  </div>
</template>

<script>
import PrizeDetail from "./components/PrizeDetail";
export default {
  data() {
    return {
      prizeData: {
        fromIndex: 10,
        endIndex: 0,
        prizeTitle: "",
        imgSrc: "",
        prizeNum: 0,
        prizeValue: 0
      }
    };
  },
  components: {
    PrizeDetail
  }
};
</script>

