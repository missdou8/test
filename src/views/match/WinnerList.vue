<template>
    <table>
        <thead>
            <th>排名</th>
            <th>玩家</th>
            <th>奖品</th>
        </thead>
        <tbody>
            <van-pull-refresh class="match_list" v-model="refreshing" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false" :offset="100">
                    <tr v-for="item in list">
                        <td>{{item.order}}</td>
                        <td>
                            <img :src="item.icon" alt="用户头像"> {{item.nickname}}
                        </td>
                        <td>
                            <p v-for="prize in item.prize">{{prize.name}} {{prize.value}}</p>
                        </td>
                    </tr>
                </van-list>
            </van-pull-refresh>
        </tbody>
    </table>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 10,
      currentPage: 1,
      list: []
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    onLoad() {
      this.currentPage += 1;
      this.fetchList().then(data => {
        this.loading = false;
        if (data.total <= this.currentPage * this.pageSize) {
          this.finished = true;
        }
      });
    },
    onRefresh() {
      this.list = [];
      this.currentPage = 1;
      this.finished = false;
      this.fetchList().then(() => {
        this.refreshing = false;
      });
    },
    fetchList() {
      this.http.match
        .winnerList({
          pagesize: this.pageSize,
          currentpage: this.currentPage,
          id: this.$route.query.id
        })
        .then(res => {
          let data = res.data;
          this.list = this.list.concat(data.winnerList);
          return data;
        });
    }
  }
};
</script>
