<template>
    <div class="prize">
        <van-uploader class="uploader" :after-read="onRead">
            点击添加奖品图片
        </van-uploader>
        <div class="prize_info" v-for="item in 3">
            <span class="prize_rank">名次</span>
            <input class="prize_prize" type="text" placeholder="点击输入奖品名称，没有则不填">
            <input class="prize_value" type="text">
            <span class="prize_tag">元</span>
        </div>
        <p class="total_value">共计
            <span>200</span>元
        </p>
        <div class="send">
            <p>请选择发奖方式</p>
            <input name="send" id="mail" type="radio">
            <label for="mail">邮寄</label>
            <input name="send" id="self" type="radio">
            <label for="self">客户自取</label>
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
      addressShow: false
    };
  },
  methods: {
    onRead() {
      console.log("数据读取完毕");
    }
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
</style>

