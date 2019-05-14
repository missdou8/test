<template>
  <div class="games">
    <select-cell
      v-for="(item,index) in lists"
      :key="`game${index}`"
      @cellSelected="selected"
      :game="item.name"
      :index="index"
      :selected="selectedIndex"
    ></select-cell>
  </div>
</template>


<script>
import SelectCell from "../../components/SelectCell";
export default {
  data() {
    return {
      lists: [],
      selectedIndex: null
    };
  },
  components: {
    SelectCell
  },
  created() {
    (async () => {
      this.lists = await this.fetchGameList();
      //已选中位置
      this.selectedIndex = this.lists.findIndex(item => {
        return item.id == this.$store.state.match.gameName.id;
      });
    })();
  },
  methods: {
    selected(index) {
      this.selectedIndex = index;
      this.$store.commit("setGameName", this.lists[index]);
      this.$router.go(-1);
    },
    fetchGameList() {
      return this.http.match.gameList().then(res => {
        let data = res.data;
        return data.gameList;
      });
    }
  }
};
</script>


<style scoped>
.games {
  background-color: #fff;
}
</style>
