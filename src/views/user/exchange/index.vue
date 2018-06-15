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
                <van-button size="small" type="danger" @click="show=true">已取出</van-button>
            </div>
        </van-panel>
        <van-panel class="panel" title="用户昵称" desc="百家望超市榨汁机比赛第1名" status="2018/5/3 12:34:45">
            <van-card title="九阳榨汁机" desc="收货地址：北京市昌平区回龙观东大街338号腾讯众创空间 A322  陈奕迅  18888888888" currency="" price="邮寄奖品" :thumb="imageURL"/>
            <div class="footer" slot="footer">
                <van-button size="small" type="default">已发货</van-button>
            </div>
        </van-panel>
        <van-popup class="popup" v-model="show" position="bottom" :overlay="false">
            <ul class="key_input border_top border_left">
                <li v-for="i in 6" :key="i" class="border_right border_bottom">{{value.split("")[i-1]}}</li>
            </ul>
            <van-number-keyboard :show="true" extra-key="取消" @input="onInput" @delete="onDelete"/>
        </van-popup>
        <van-dialog title= '嘀嗒比赛' v-model="showDialog" show-cancel-button :before-close="beforeClose">
            <van-field v-model="express_name" label="快递公司" placeholder="请输入快递公司名称"/>
            <van-field v-model="express_number" label="快递单号" placeholder="请输入快递单号"
  />
</van-dialog>
    </div>
</template>

<script>
import img from "../../../assets/avatar.png";
export default {
  data() {
    return {
      imageURL: img,
      show: false,
      showDialog: false,
      value: "",
      express_name: "",
      express_number: ""
    };
  },
  created() {},
  methods: {
    expressAjax() {
      console.log(`运单号${this.express_name}-${this.express_number}`);
    },
    goodsIdAjax() {
      console.log("提货码"+this.value);
    },
    onInput(key) {
      if (key == "取消") {
        this.value = "";
        this.show = false;
      } else this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        //发送一个请求
        this.goodsIdAjax()
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        done();
        this.$dialog
          .confirm({
            title: "嘀嗒比赛",
            message: `运单号${this.express_name}-${this.express_number}提交后不能修改，确认提交？`
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

/* 键盘输入表单 */
.key_input {
  width: 90%;
  margin: 15px auto;
  height: 50px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.key_input li {
  font-size: 24px;
  font-style: normal;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  height: 100%;
  line-height: 50px;
  position: relative;
}

/* 上下左右边框样式 */

.border_top::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.border_bottom::after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.border_left::after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-left: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}

.border_right::before {
  content: " ";
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-right: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
</style>
<style>
#exchangeIndex .van-card__desc {
  overflow: inherit;
  white-space: inherit;
}
#exchangeIndex .popup {
  height: 295px;
}
</style>


