<template>
    <div id="exchangeIndex">
      <dida-list ref="dida_list" post-module="prizes" post-url="prizeList" no-data-text="暂无兑奖信息" @returnData="getPrizeList($event)">
        <van-panel class="panel" v-for="(prize,index) in prizeList" :key="index">
          <div class="panel_header" slot="header">
            <van-cell :value="prize.time">
              <img slot="icon" :src="prize.icon||imageURL" alt="" srcset="">
              <div class="panel_title" slot="title">
                <p>{{prize.nickname}}</p>
                <p>{{prize.match.name}}</p>
                <p>第{{prize.match.ranking}}名</p>
              </div>
            </van-cell>
          </div>
          <van-card :title="prize.prize.name" :desc="prize.receivingDec" currency="" :price="prize.prizeType" :thumb="prize.prize.img"/>
          <div class="footer" slot="footer">
            <van-button v-if="prize.prize.type == 0" class="btn"
              :class="{'gobtn':prize.receiving.status==1,'sendbtn':prize.receiving.status==2||shipInfoArr.indexOf(prize.id)!=-1,'outbtn':prize.receiving.status==3}" 
              size="small" @click="showAlert(prize.id)" :disabled="prize.receiving.status!=1||shipInfoArr.indexOf(prize.id)!=-1">
              {{shipInfoArr.indexOf(prize.id)!=-1?'已发货':prize.btnText}}
            </van-button>
            <van-button v-else class="btn" size="small" @click="showPopup(prize.id)" 
              :class="{'gobtn':prize.receiving.status==1,'outbtn':prize.receiving.status==3||pickUpPrizeArr.indexOf(prize.id)!=-1}" 
              :disabled="prize.receiving.status!=1||pickUpPrizeArr.indexOf(prize.id)!=-1">
              {{pickUpPrizeArr.indexOf(prize.id)!=-1?'已取出':prize.btnText}}
            </van-button>
          </div>
        </van-panel>
      </dida-list>
      <!-- 模态弹框 -->
      <van-dialog title= '嘀嗒比赛' v-model="showDialog" show-cancel-button :before-close="beforeClose">
        <van-field v-model="express_name" label="快递公司" placeholder="请输入快递公司名称"/>
        <van-field v-model="express_number" label="快递单号" placeholder="请输入快递单号"/>
      </van-dialog>
      <!-- 数字键盘 -->
      <number-word-input ref="number_word_input" @goodsIdAjax="goodsIdAjax($event)"></number-word-input>
    </div>
</template>

<script>
import img from "../../assets/icon.png";
import numberWordInput from "../../components/numberWordInput.vue";
import didaList from "../../components/didaList.vue";
import { timestamp_switch_time } from "lputils";
export default {
  data() {
    return {
      prizeList: [], //兑奖信息列表
      imageURL: img,
      showDialog: false,
      express_name: "",
      express_number: "",
      prizesId: null, //选中的奖品id
      pickUpPrizeArr: [], //存储点击自提取货按钮的物品id
      shipInfoArr: [] //存储点击邮寄取按钮的物品id
    };
  },
  components: {
    numberWordInput,
    didaList
  },
  methods: {
    //获取兑奖信息列表
    getPrizeList(data) {
      this.total = data.total;
      this.prizeList = data.list;
      //数据处理(确保数据存在)
      if (this.prizeList.length > 0) {
        this.prizeList.forEach(p => {
          p.time = timestamp_switch_time(p.prize.time);
          if (p.prize.type == 0) {
            p.prizeType = "邮寄奖品";
            //根据状态改变按钮文案
            if (p.receiving.status == 1) p.btnText = "去发货";
            else if (p.receiving.status == 2) p.btnText = "已发货";
            else p.btnText = "已收货";
          } else {
            p.prizeType = "自取奖品";
            if (p.receiving.status == 1) p.btnText = "确认取出";
            else p.btnText = "已取出";
          }
          p.receivingDec = `收货地址${p.receiving.address} ${
            p.receiving.consignee
          } ${p.receiving.mobile}`;
        });
      }
    },
    goodsIdAjax(value) {
      this.http.prizes
        .pickUpPrize({
          code: value,
          id: this.prizesId
        })
        .then(res => {
          //请求成功后关闭输入框
          this.$refs.number_word_input.closePop();
          //修改按钮状态
          this.pickUpPrizeArr.push(this.prizesId);
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
            this.http.prizes
              .shipInfo({
                id: this.prizesId,
                express: this.express_name,
                waybillNumber: this.express_number
              })
              .then(res => {
                //修改按钮状态
                this.shipInfoArr.push(this.prizesId);
              });
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
  position: initial;
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
.sendbtn {
  background: none;
  border: 1px solid rgb(252, 198, 0);
  color: rgb(252, 198, 0);
}
.outbtn {
  background: none;
  color: rgb(255, 80, 0);
  border: 0;
  padding: 0;
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
  height: 194%;
}
#exchangeIndex .panel_header img {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}
#exchangeIndex .panel_header .van-cell__title{
  width: 40%;
}
#exchangeIndex .panel_header .panel_title{
  color: rgb(117, 117, 117);
  font-size: 0.2rem;
  line-height: 18px;
}
#exchangeIndex .panel_header .panel_title p{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#exchangeIndex .panel_header .panel_title p:nth-child(1){
  color:#000;
  font-size: 0.25rem;
  font-weight: 600;
}

#exchangeIndex .panel_header .van-cell__value {
  font-size: 0.14rem;
  text-align: right;
  align-self: flex-end;
  line-height: 18px;
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


