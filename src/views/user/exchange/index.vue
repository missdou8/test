<template>
    <div id="exchangeIndex">
        <van-panel class="panel" title="用户昵称" desc="百家望超市榨汁机比赛第1名" status="2018/5/3 12:34:45">
            <van-card title="九阳榨汁机" desc="收货地址：北京市昌平区回龙观东大街338号腾讯众创空间 A322  陈奕迅  18888888888" currency="" price="邮寄奖品" :thumb="imageURL"/>
            <div class="footer" slot="footer">
                <van-button size="small" type="primary" @click="showDialog=true">去发货</van-button>
            </div>
        </van-panel>
        <van-panel class="panel" title="用户昵称" desc="百家望超市榨汁机比赛第1名" status="2018/5/3 12:34:45">
            <van-card title="九阳榨汁机" desc="收货地址：北京市昌平区回龙观东大街338号腾讯众创空间 A322  陈奕迅  18888888888" currency="" price="邮寄奖品" :thumb="imageURL"/>
            <div class="footer" slot="footer">
                <van-button size="small" type="danger" @click="setShowPopup(true)">已取出</van-button>
            </div>
        </van-panel>
        <van-panel class="panel" title="用户昵称" desc="百家望超市榨汁机比赛第1名" status="2018/5/3 12:34:45">
            <van-card title="九阳榨汁机" desc="收货地址：北京市昌平区回龙观东大街338号腾讯众创空间 A322  陈奕迅  18888888888" currency="" price="邮寄奖品" :thumb="imageURL"/>
            <div class="footer" slot="footer">
                <van-button size="small" type="default">已发货</van-button>
            </div>
        </van-panel>
        <van-dialog title= '嘀嗒比赛' v-model="showDialog" show-cancel-button :before-close="beforeClose">
            <van-field v-model="express_name" label="快递公司" placeholder="请输入快递公司名称"/>
            <van-field v-model="express_number" label="快递单号" placeholder="请输入快递单号"/>
        </van-dialog>
        <number-word-input ref="number_word_input" @goodsIdAjax="goodsIdAjax($event)"></number-word-input>
    </div>
</template>

<script>
import img from "../../../assets/avatar.png";
import numberWordInput from "../../../components/numberWordInput.vue";
export default {
  data() {
    return {
      imageURL: img,
      showDialog: false,
      express_name: "",
      express_number: ""
    };
  },
  created() {},
  components: {
    numberWordInput
  },
  methods: {
    expressAjax() {
      console.log(`运单号${this.express_name}-${this.express_number}`);
    },
    goodsIdAjax(number) {
      console.log("提货码" + number);
    },
    setShowPopup(bool) {
      this.$refs.number_word_input.setShowPopup(bool);
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        done();
        this.$dialog
          .confirm({
            title: "嘀嗒比赛",
            message: `运单号${this.express_name}-${
              this.express_number
            }提交后不能修改，确认提交？`
          })
          .then(() => {
            this.expressAjax();
          });
      } else {
        done();
      }
    }
  }
};
</script>

<style scoped>
#exchangeIndex {
  height: 100%;
}
.panel {
  margin-top: 15px;
}
.footer {
  text-align: right;
}
</style>
<style>
#exchangeIndex .van-card__desc {
  overflow: inherit;
  white-space: inherit;
}
</style>


