<template>
    <div id="exchangeIndex">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <van-panel class="panel" v-for="(i,index) in prizeList" :key="index">
          <div class="panel_header" slot="header">
            <van-cell value="2018/5/3 12:34:45" label="10000001" title="用户昵">
              <img slot="icon" src="../../../assets/logo.png" alt="" srcset="">
            </van-cell>
          </div>
          <van-card title="九阳榨汁机" desc="收货地址：北京市昌平区回龙观东大街338号腾讯众创空间 A322  陈奕迅  18888888888" currency="" price="邮寄奖品" :thumb="imageURL"/>
          <div class="footer" slot="footer">
              <van-button class="btn gobtn" size="small" @click="showAlert(index)">去发货</van-button>
              <van-button class="btn gobtn" size="small" @click="showPopup(index)">未取货</van-button>
          </div>
        </van-panel>
        <!-- <van-panel v-for="prize in prizeList" :key="prize.id" class="panel">
            <div class="panel_header" slot="header">
              <van-cell :value="prize.time" :label="prize.matchdec" :title="prize.nickname">
                <img slot="icon" :src="prize.icon" alt="" srcset="">
              </van-cell>
            </div>
            <van-card :title="prize.prize.name" :desc="prize.receivingDec" :price="prize.prizeType" :thumb="prize.prize.img"/>
            邮寄物品
            <div v-if="prize.prize.type == 0" class="footer" slot="footer">
                <van-button v-if="prize.receiving.status==2" class="btn sendbtn" size="small">已发货</van-button>
                <van-button v-else-if="prize.receiving.status==3" class="btn outbtn" size="small">确认取出</van-button>
                <van-button v-else class="btn gobtn" size="small" @click="showAlert(prize.id)">去发货</van-button>
            </div>
            自提物品
            <div v-else class="footer" slot="footer">
                <van-button v-if="prize.receiving.status==1" class="btn gobtn" size="small" @click="showPopup(prize.id)">未取货</van-button>
                <van-button v-else class="btn outbtn" size="small">已取货</van-button>
            </div>
        </van-panel> -->
      </van-list>
        <van-dialog title= '嘀嗒比赛' v-model="showDialog" show-cancel-button :before-close="beforeClose">
            <van-field v-model="express_name" label="快递公司" placeholder="请输入快递公司名称"/>
            <van-field v-model="express_number" label="快递单号" placeholder="请输入快递单号"/>
        </van-dialog>
        <number-word-input ref="number_word_input" @goodsIdAjax="goodsIdAjax($event)"></number-word-input>
    </div>
</template>

<script>
import img from "../../../assets/logo.png";
import numberWordInput from "../../../components/numberWordInput.vue";
import { timestamp_switch_time } from "lpreset.css";
export default {
  data() {
    return {
      prizeList: [], //兑奖信息列表
      loading: false,
      finished: false,
      imageURL: img,
      showDialog: false,
      express_name: "",
      express_number: "",
      pagesize: 10, //每页显示条数
      currentPage: 1, //当前页(默认从第一页开始)
      total: null, //总记录数
      prizesId: null //选中的奖品id
    };
  },
  components: {
    numberWordInput
  },
  methods: {
    //获取兑奖信息列表
    getPrizeList(pagesize, currentpage) {
      this.http.prizes
        .prizeList({
          pagesize: pagesize,
          currentpage: currentpage
        })
        .then(res => {
          this.total = res.data.total;
          this.prizeList = res.data.prizeList;
          //数据处理
          this.prizeList.forEach(p => {
            this.prizeList.time = timestamp_switch_time(p.prize.time);
            this.prizeList.matchdec = `${p.match.name}第${p.match.ranking}名`;
            if (p.prize.type == 0) this.prizeList.prizeType = "邮寄奖品";
            else this.prizeList.prizeType = "自取奖品";
            this.receivingDec = `收货地址${p.receiving.address} ${
              p.receiving.consignee
            } ${p.receiving.mobile}`;
          });
          //加载数据成功后设置loading隐藏
          this.loading = false;
        })
        .catch(() => {
          this.total = 5;
          //请求出错的时候隐藏加载动画
          for (let i = 0; i < this.pagesize; i++) {
            this.prizeList.push(i);
            this.loading = false;
          }
        });
    },
    //无限加载数据
    onLoad() {
      setTimeout(() => {
        this.getPrizeList(this.pagesize, this.currentPage);
        if (this.currentPage >= this.total && this.total != null)
          this.finished = true;
        else this.currentPage++;
      }, 500);
    },
    goodsIdAjax(value) {
      console.log(value);
      console.log(this.prizesId);
      this.http.prizes
        .pickUpPrize({
          code: value,
          id: this.prizesId
        })
        .then(res => {
          //请求成功后关闭输入框
          this.$refs.number_word_input.closePop();
        });
    },
    showPopup(id) {
      this.prizesId = id;
      this.$refs.number_word_input.showPopup();
    },
    showAlert(id) {
      this.showDialog = true;
      this.prizesId = id;
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
            console.log(this.prizesId);
            console.log(this.express_name);
            console.log(this.express_number);
            this.http.prizes
              .pickUpPrize({
                id: this.prizesId,
                express: this.express_name,
                waybillNumber: this.express_number
              })
              .then(res => {});
          })
          .catch(() => {
            this.express_name = "";
            this.express_number = "";
          });
      } else {
        done();
        this.express_name = "";
        this.express_number = "";
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
  margin-top: 0.2rem;
}
.footer {
  text-align: right;
}
.btn {
  padding: 0 0.35rem;
  height: 0.55rem;
  font-size: 0.28rem;
  line-height: 0.55rem;
  font-weight: 600;
}
.gobtn {
  background-color: rgb(252, 198, 0);
  color: rgb(17, 17, 17);
  border: 0;
}
.outbtn {
  background: none;
  color: rgb(255, 80, 0);
  border: 0;
  padding: 0;
}
.sendbtn {
  border-color: rgb(252, 198, 0);
  color: rgb(252, 198, 0);
}
</style>
<style>
#exchangeIndex .van-card__desc {
  overflow: inherit;
  white-space: inherit;
}
#exchangeIndex .panel_header .van-cell {
  align-items: center;
  padding: 0.12rem 0.15rem;
}
#exchangeIndex .panel_header .van-cell::after {
  border-bottom-width: 1px;
  left: 0.12rem;
}
#exchangeIndex .panel_header img {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}
#exchangeIndex .panel_header .van-cell__title span {
  font-size: 0.25rem;
  font-weight: 600;
}
#exchangeIndex .panel_header .van-cell__label {
  color: rgb(117, 117, 117);
  font-size: 0.2rem;
}
#exchangeIndex .panel_header .van-cell__value {
  font-size: 0.14rem;
}
#exchangeIndex .van-card {
  background: #fff;
  padding: 0.12rem 0.15rem 0.12rem 1.8rem;
}
#exchangeIndex .van-card__thumb {
  width: 1.5rem;
  height: 1.3rem;
  left: 0.12rem;
  background: rgb(250, 250, 250);
  display: flex;
  justify-content: center;
  align-items: center;
}
#exchangeIndex .van-card__thumb img {
  max-width: 1rem;
  max-height: 1rem;
}
#exchangeIndex .van-card__row {
  margin-bottom: 0.2rem;
}
#exchangeIndex .van-card__content {
  padding-top: 0.2rem;
}
#exchangeIndex .van-card__title {
  flex: 1;
  font-weight: 600;
}
#exchangeIndex .van-card__price {
  flex: none;
  min-width: auto;
  background: rgb(17, 17, 17);
  border-radius: 3px;
  color: rgb(252, 198, 0);
  padding: 0 0.1rem;
}
#exchangeIndex .van-hairline--top-bottom::after,
#exchangeIndex .van-hairline--top::after {
  border: none;
}
</style>


