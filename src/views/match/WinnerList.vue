<template>
  <div id="win-list">
    <ul class="title">
      <li>排名</li>
      <li>玩家</li>
      <li>奖品</li>
    </ul>
    <van-pull-refresh class="match_list" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false" :offset="100">
        <div>
          <div class="th" v-for="item in list">
            <div>{{item.order}}</div>
            <div>
              <img :src="item.icon || config.defaultIcon" alt="用户头像"> {{item.nickname}}
            </div>
            <div>
              <p v-for="prize in item.prize">{{prize.name}} {{prize.value}}</p>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
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
      return this.http.match
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

<style scoped>
#win-list {
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  justify-content: space-around;
}
.match_list {
  flex-basis: 0;
  flex-grow: 1;
}
.th {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  padding: 0.2rem 0;
  border-bottom: 0.01rem solid #f5f5f5;
}
.th > div {
  flex-basis: 0;
  flex-grow: 1;
  text-align: center;
}
.th > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0.3rem;
}
.th img {
  border-radius: 50%;
  margin-right: 0.1rem;
  width: 0.5rem;
}
</style>
