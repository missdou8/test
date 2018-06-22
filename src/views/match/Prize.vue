<template>
  <div class="prize">
    <van-nav-bar title="填写奖品信息" left-text="取消" right-text="保存" @click-left="onClickLeft" @click-right="onClickRight" />
    <van-uploader class="uploader" :after-read="onRead">
      <span v-show="!prizeImageShow">点击添加奖品图片</span>
      <img class="prize_img" ref="prizeImage" v-show="prizeImageShow" alt="封面图片">
    </van-uploader>
    <div class="prize_info" v-for="(item,index) in 3">
      <span class="prize_rank">名次</span>
      <input class="prize_prize" type="text" placeholder="点击输入奖品名称，没有则不填" @blur="prizeInput(index,$event)">
      <input class="prize_value" type="text" @blur="valueInput(index, $event)">
      <span class="prize_tag">元</span>
    </div>
    <p class="total_value">共计
      <span>{{totalPrize}}</span>元
    </p>
    <div class="send">
      <p>请选择发奖方式</p>
      <van-radio-group v-model="radio" class="send-style" @change="sendStyleClick">
        <van-radio v-for="item in sendStyle" :key="item.name" :name="item.name">{{item.value}}</van-radio>
      </van-radio-group>
    </div>
    <div class="address" v-show="addressShow">
      <p>请选择自提地址</p>
      <div>地址</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressShow: false,
      prizeImageShow: false,
      rankList: [],
      rankPrize: [],
      sendStyle: [
        {
          name: 0,
          value: "邮寄"
        },
        {
          name: 1,
          value: "客户自取"
        }
      ],
      radio: 0
    };
  },
  computed: {
    totalPrize() {
      if (!this.rankPrize) {
        return this.rankPrize.reduce((total, item) => {
          return total.price + item.price;
        });
      }
    }
  },
  created() {
    if (!this.$store.state.match.id) {
      this.$toast("需要选择游戏之后才可以设置奖品");
      setTimeout(() => {
        this.$emit("prizeShow", false);
      }, 2000);
      return;
    }
    if (!this.$store.state.match.attendPerson) {
      this.$toast("需要设置比赛规模后才可以设置奖品");
      setTimeout(() => {
        this.$emit("prizeShow", false);
      }, 2000);
    }
    this.http.match
      .prizesList({
        gameId: this.$store.state.match.id,
        playerCount: this.$store.state.match.attendPerson
      })
      .then(res => {
        let data = res.data;
        this.rankList = data.prizesList.map(item => {
          let rankItem = item.rank.split(",").join("-");
          this.rankPrize[index].rank = rankItem;
          return rankItem;
        });
      });
  },
  methods: {
    onRead(file) {
      this.$refs.prizeImage.src = file.content;
      this.prizeImageShow = true;
    },
    onClickLeft() {
      this.$emit("prizeShow", false);
    },
    onClickRight() {
      this.$store.commit("setRankPrize", this.rankPrize);
      this.$store.commit("setIfSave", true);
      this.$emit("prizeShow", false);
    },
    prizeInput(index, evt) {
      let dom = evt.target;
      this.rankPrize[index].name = dom.value;
    },
    valueInput(index, evt) {
      let dom = evt.target;
      this.rankPrize[index].price = dom.value;
    },
    sendStyleClick() {}
  }
};
</script>

<style scoped>
.prize {
  text-align: center;
}
.uploader {
  background-color: #555;
  border-radius: 0.2rem;
  color: #fff;
  margin: 0.3rem 0;
  padding: 0.3rem;
  width: 85%;
}
.prize_info {
  display: flex;
}
.prize_value,
.prize_tag,
.prize_rank,
.prize_prize {
  width: 0;
}
.prize_value {
  border: 1px solid #000;
  flex-grow: 2;
}
.prize_rank {
  flex-grow: 2;
}
.prize_tag {
  flex-grow: 1;
}
.prize_prize {
  flex-grow: 7;
  padding: 0 0.2rem;
}
.total_value {
  text-align: right;
}
.send,
.address {
  text-align-last: left;
}
.prize_img {
  width: 100%;
}
.send-style {
  display: flex;
  font-size: 0.2rem;
  justify-content: space-around;
}
</style>

