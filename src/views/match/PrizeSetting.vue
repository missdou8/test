<template>
  <div class="setting">
    <prize-detail :rankData="prizeData"></prize-detail>
    <div class="more_add">
      <p class="add_detail" @click="addMore">继续添加奖品</p>
    </div>
    <div class="attend_prize">
      <span>参与奖</span>
      <span>除以上奖品外，同时获得参与奖</span>
      <van-switch v-model="checked" active-color="#0daf52"/>
    </div>
    <div class="setting_button">
      <button class="btn_delete" @click="deleteClick">删除</button>
      <button class="btn_save" @click="saveClick">保存</button>
    </div>
  </div>
</template>

<script>
import PrizeDetail from "./components/PrizeDetail";
import { mapState } from "vuex";
export default {
  data() {
    return {
      prizeData: {},
      checked: false
    };
  },
  components: {
    PrizeDetail
  },
  computed: {
    ...mapState({
      rankPrizes(state) {
        return state.match.totalPrizes;
      },
      currentData(state) {
        return state.match.currentRankData;
      }
    })
  },
  mounted() {
    /**
     * 通过index从本地缓存中初始化数据
     * 初始化一个当前的数据用来修改和设置
     */
    let data = JSON.parse(
      JSON.stringify(this.rankPrizes[this.$route.query.index])
    );
    if (!this.currentData) {
      this.prizeData = data;
      this.$store.commit("setCurrentRankData", data);
    } else {
      this.prizeData = this.currentData;
    }
  },
  methods: {
    deleteClick() {
      this.$dialog
        .confirm({
          message: "您确定删除该名次的所有奖品配置么？",
          confirmButtonText: "我确定",
          cancelButtonText: "继续编辑"
        })
        .then(() => {
          if (this.rankPrizes.length === 1) {
          }
          this.rankPrizes.splice(this.$route.query.index, 1);
          if (this.rankPrizes.length === 0) {
            this.rankPrizes[0] = {
              beginRank: 1,
              endRank: 1,
              ispartInPrize: 0,
              prizes: [
                {
                  name: null,
                  price: null,
                  prizeCount: null,
                  icon: null
                }
              ]
            };
          }
          this.$router.go(-1);
        })
        .catch(() => {});
    },
    saveClick() {
      /**
       * 验证所有的字段都填写了
       */
      this.prizeData.ispartInPrize = this.checked ? 1 : 0;
      for (const item in this.prizeData) {
        let flag = false;
        for (const i of this.prizeData.prizes) {
          for (const key in i) {
            if (i.hasOwnProperty(key)) {
              const element = i[key];
              if (!element && element !== 0) {
                flag = true;
              }
            }
          }
        }

        if (flag || (!this.prizeData[item] && this.prizeData[item] !== 0)) {
          return this.$toast("请填写完整再保存");
        }
      }
      //保存的是所有的奖品信息
      this.rankPrizes[this.$route.query.index] = this.prizeData;
      this.$store.commit("setTotalPrizes", this.rankPrizes);
      this.$router.go(-1);
    },
    addMore() {
      //将本名词的奖品添加一组空数据
      this.prizeData.prizes.push({
        name: "暂无奖品",
        price: 0,
        prizeCount: 0,
        icon: ""
      });
    }
  }
};
</script>

<style scoped>
.setting {
  position: relative;
  height: 100%;
  overflow: auto;
}
.more_add {
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  padding: 0.25rem 0.23rem;
  margin: 0.21rem 0;
}
.add_detail {
  background: url("../../assets/prize_add_more.png") no-repeat;
  color: #135ada;
  font-size: 0.28rem;
  background-size: 0.32rem 0.32rem;
  background-position: left center;
  padding-left: 0.4rem;
}
.attend_prize {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.25rem;
}
.attend_prize span:first-child {
  font-size: var(--font-size-bigger);
}
.attend_prize span {
  font-size: 0.3rem;
}
.setting_button {
  display: flex;
  justify-content: space-between;
  justify-content: space-evenly;
  margin: 0.7rem 0;
}
.btn_delete,
.btn_save {
  font-size: 0.32rem;
  height: 0.8rem;
  width: 2.3rem;
}
.btn_delete {
  background-color: #d83c3c;
  border: 1px solid #d83c3c;
  color: #fff;
}
.btn_save {
  border: 1px solid #ffd321;
}
</style>


