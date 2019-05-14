<template>
  <div class="games">
    <select-cell
      v-for="(item,index) in lists"
      :key="`game${index}`"
      @cellSelected="selected"
      :game="item.title"
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
      this.lists = await this.fetchPersonStyle(this.$route.query.gameId);
      //已选中位置
      this.selectedIndex = this.lists.findIndex(item => {
        return (
          item.templateId == this.$store.state.match.attendPerson.templateId
        );
      });
    })();
  },
  methods: {
    selected(index) {
      this.selectedIndex = index;
      this.$store.commit("setAttendPerson", this.lists[index]);
      this.$router.go(-1);
    },
    fetchPersonStyle(id) {
      return this.http.match
        .playerCountList({
          gameId: id
        })
        .then(res => {
          let data = res.data;
          return data.playerCountList;
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
