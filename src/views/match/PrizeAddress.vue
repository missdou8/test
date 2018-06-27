<template>
    <div class="Address">
        <van-cell-group class="address">
            <van-cell title="所在小区" value="江苏省 南京市 玄武区" is-link @click="select" />
            <van-field v-model="address" label="详细地址" type="textarea" placeholder="街道、小区门牌等" rows="3" autosize/>
        </van-cell-group>
        <van-popup v-model="show" position="bottom">
            <van-area ref="van_area" :area-list="areaList" @confirm="onConfirm" @cancel="show=false" :value="areaId" />
        </van-popup>
        <button class="finish_btn">完成</button>
    </div>
</template>

<script>
import cityCode from "../../service/cityCode.js";
export default {
  data() {
    return {
      show: false,
      areaList: {},
      address: "",
      areaId: ""
    };
  },
  methods: {
    select() {
      this.show = true;
    }
  }
};
</script>


<style>
.Address .van-cell__title {
  max-width: 90px;
}
.Address .van-cell__value {
  text-align: left;
}
</style>

<style scoped>
.Address::before {
  content: "";
  display: table;
}
.Address {
  position: relative;
}
.address {
  margin-top: 0.7rem;
}
.finish_btn {
  background-color: #fcc600;
  font-size: 0.32rem;
  font-weight: bold;
  height: 0.96rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
