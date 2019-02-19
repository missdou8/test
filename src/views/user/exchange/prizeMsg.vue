<template>
    <div id="prizeMsg">
        <div class="prize_box">
            <div class="prize_hd">
                <div class="img_box">
                    <img :src="prizeDetail.prize_img" alt="">
                </div>
                <p>{{prizeDetail.prize_name}} <span>x</span> {{prizeDetail.prize_num}}</p>
            </div>
            <div class="prize_bd">
                <img class="sign" v-if="status==3" src="../../../assets/wode_yinzhang.png" alt="">
                <ul>
                    <li v-for="(title,key,index) in DetailTitle" :key="index">
                        {{title}} : <span 
                        :class="{
                            red:key=='match_ranking',
                            grey:key=='match_sn'
                        }"
                    >{{prizeDetail[key]}}</span>
                    </li>
                </ul>
                <van-button v-if='status!=3' class='btn' size="large" @click="submit()">确认取货</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import goodsImg from "../../../assets/bianji_morentu.png"
import { setTimeout } from 'timers';
export default {
  data() {
    return {
        prizeDetail:{},
        goodsImgURL:goodsImg,
        DetailTitle:{
            match_name:'比赛名称',
            match_sn:'流 水 号 ',
            match_ranking:'比赛名次',
            prize_type:'获取方式',
            merchantName:'商家名称',
            prize_pickupCode:'兑  奖 码 '
        },
        status:1,  //取货状态   1未取货 3取货
    };
  },
  computed: {},
  components: {},
  created() {
    let Detail = this.$store.state.prizes.prizeDetail
    this.prizeDetail.prize_img       = Detail.prize.img||this.goodsImg
    this.prizeDetail.prize_name      = Detail.prize.name||'' 
    this.prizeDetail.prize_num       = Detail.prize.num||''
    //列表数据与Title对应
    this.prizeDetail.match_name       = Detail.match.name||'';
    this.prizeDetail.match_sn         = Detail.match.sn||''
    this.prizeDetail.match_ranking    = `第${Detail.match.ranking||''}名`
    this.prizeDetail.prize_type       = Detail.prize.type == 0 ? '邮寄' : '自取'
    this.prizeDetail.merchantName     = Detail.merchantName||''
    this.prizeDetail.prize_pickupCode = Detail.prize.pickupCode||''
    // 根据领取情况来显示领取标记
    this.status = Detail.prize.status
  },
  methods: {
      submit(){
        this.http.prizes.pickUpPrize({
            code: this.prizeDetail.prize_pickupCode,
        }).then(res => {
            this.$toast({
                duration: 2000,     // 持续展示 toast
                forbidClick: true,   // 禁用背景点击
                message: '奖品领取成功！'
            });
            //更新状态
            setTimeout(()=>{
                this.status = 3;
                //更新本地存储状态，防止刷新页面数据还原
                let Detail = this.$store.state.prizes.prizeDetail
                Detail.prize.status = 3;
                this.$store.commit("setprizeDetail", Detail);
            },2000)
        });
    }
  }
};
</script>


<style scoped>
#prizeMsg{
    padding:.15rem;
}
.prize_box {
    background-color: #fff;
    border-radius: 10px;
}
.prize_hd{
    padding:.25rem .15rem;
    text-align: center;
    border-bottom: 1px solid #ccc;
}
.img_box{
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 auto;
    background-color: rgb(250,250,250);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.img_box img{
    width: 90%;
    height: 90%;
    max-width: 1.3rem;
    max-height: 1.3rem;
}
.prize_hd p{
    font-size: .3rem;
    color: #000;
}
.prize_hd p span{
    margin:0 .1rem;
}
.prize_bd {
    position: relative;
    padding:.2rem .15rem;
}
.prize_bd ul li{
    color: rgb(158,158,158);
    font-size: .28rem;
    line-height: .5rem;
}
.prize_bd ul li span{
    color: #000;
    display: inline-block;
    width: 70%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: middle;
}
.red{
    color: #f00!important;
}
.grey{
    color: rgb(158,158,158)!important;
}
.prize_bd .btn{
    width: 45%;
    display: block;
    margin: .1rem auto;
    line-height: .7rem;
    height: .7rem;
    background-color: rgb(250,198,0);
    border-radius: 5px;
}
.sign{
    position: absolute;
    width: 1.6rem;
    height: 1.6rem;
    right: .4rem;
    top: -1.2rem;
}
</style>
