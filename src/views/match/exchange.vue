<template>
    <div id="exchange_box">
        <ul class="exchange_list">
            <li class="exchange_item" @click="jumpExchangeDetails()">
                <div class="change_item_top">
                    <div class="change_item_userImg">
                        <img src="" alt="">
                    </div>
                    <div class="user_info">
                        <div>不凡的开心</div>
                        <div>
                            <span>红包内测福利赛</span>
                            <span>第20名</span>
                        </div>
                    </div>
                    <div class="user_time">
                        开赛时间：2019-03-20 19:00:00
                    </div>
                </div>
                <div class="change_item_bottom">
                    <div class="change_item_prizeImg">
                        <img src="" alt="">
                    </div>
                    <div class="prize_info">
                        <div class="prize_name">周末福利大放送迪士尼儿童背包带USB充电孔哈哈哈哈</div>
                        <div class="prize_address">河北省唐山市路南区万科新里程小区 202 单元 4 楼 702 室内  沈鹏 13547885645</div>
                        <div class="prize_time">2019-03-22 19:00:00</div>
                    </div>
                    <div class="mode">
                        <span>自提</span>
                    </div>
                </div>
                <div class="cargoStatus">
                    已收货
                </div>
            </li>
            <li class="exchange_item">
                <div class="change_item_top">
                    <div class="change_item_userImg">
                        <img src="" alt="">
                    </div>
                    <div class="user_info">
                        <div>不凡的开心</div>
                        <div>
                            <span>红包内测福利赛</span>
                            <span>第20名</span>
                        </div>
                    </div>
                    <div class="user_time">
                        开赛时间：2019-03-20 19:00:00
                    </div>
                </div>
                <div class="change_item_bottom">
                    <div class="change_item_prizeImg">
                        <img src="" alt="">
                    </div>
                    <div class="prize_info">
                        <div class="prize_name">周末福利大放送迪士尼儿童背包带USB充电孔哈哈哈哈</div>
                        <div class="prize_address">河北省唐山市路南区万科新里程小区 202 单元 4 楼 702 室内  沈鹏 13547885645</div>
                        <div class="prize_time">2019-03-22 19:00:00</div>
                    </div>
                    <div class="mode">
                        <span>自提</span>
                    </div>
                </div>
                <div class="cargoStatus">
                    已收货
                </div>
            </li>
            <li class="exchange_item">
                <div class="change_item_top">
                    <div class="change_item_userImg">
                        <img src="" alt="">
                    </div>
                    <div class="user_info">
                        <div>不凡的开心</div>
                        <div>
                            <span>红包内测福利赛</span>
                            <span>第20名</span>
                        </div>
                    </div>
                    <div class="user_time">
                        开赛时间：2019-03-20 19:00:00
                    </div>
                </div>
                <div class="change_item_bottom">
                    <div class="change_item_prizeImg">
                        <img src="" alt="">
                    </div>
                    <div class="prize_info">
                        <div class="prize_name">周末福利大放送迪士尼儿童背包带USB充电孔哈哈哈哈</div>
                        <div class="prize_address">河北省唐山市路南区万科新里程小区 202 单元 4 楼 702 室内  沈鹏 13547885645</div>
                        <div class="prize_time">2019-03-22 19:00:00</div>
                    </div>
                    <div class="mode">
                        <span>自提</span>
                    </div>
                </div>
                <div class="cargoStatus">
                    已收货
                </div>
            </li>
        </ul>
        <div class="bottom_button">
            <div class="sao_Button">扫码兑奖</div>
            <div class="dui_Button">输入兑换码</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Exchange",
        methods:{
            jumpExchangeDetails(){
                this.$router.push({path:'/match/detail/exchangeDetails'});
            }
        }
    }
</script>

<style scoped>
    #exchange_box{
        display: flex;
        flex-direction: column;
        /*overflow: none;*/
    }
    .exchange_list{
        flex: 8;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #f0f1f2;
    }
    .exchange_item{
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        margin-bottom: .2rem ;
    }
    .change_item_top{
        border-bottom: .005rem solid #c0c4cc;
        padding: .1rem 0;
        margin-left: .3rem;
        display: flex;
        align-items: center;
    }
    .change_item_userImg{
        width: .6rem;
        height: .6rem;
        background-color: #c0c4cc;
        overflow: hidden;
        border-radius: .8rem;
    }
    .change_item_userImg > img{
        display: block;
        width: .6rem;
        height: .6rem;
    }
    .user_info{
        flex: 3;
        display: flex;
        flex-direction: column;
        padding-left: .2rem;
    }
    .user_info > div:nth-child(1){
        font-size: .3rem;
    }
    .user_info > div:nth-child(2){
        font-size: .22rem;
        color: #c0c4cc;
    }
    .user_info > div > span:nth-child(1){
        padding-right: .2rem;
    }
    .user_time{
        flex: 4;
        font-size: .2rem;
        text-align: right;
        padding-top: .44rem;
        padding-right: .15rem;
        color: #c0c4cc;
    }
    .change_item_bottom{
        padding: .18rem .2rem 0 .3rem;
        display: flex;
    }
    .change_item_prizeImg{
        height: 1.45rem;
        width: 1.45rem;
        background: #c0c4cc;
    }
    .prize_info{
        padding-left: .2rem;
        width: 4.7rem;
    }
    .prize_name{
        font-size: .3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .prize_address{
        padding-top: .1rem;
        color: #c0c4cc;
        font-size: .22rem;
        line-height: .25rem;
    }
    .prize_time{
        font-size: .2rem;
        color: #c0c4cc;
    }
    .mode{
        width: .62rem;
        height: .31rem;
        border: .01rem solid #409dff;
        color: #409dff;
        border-radius: .6rem;
        font-size: .2rem;
        text-align: center;
        line-height: .31rem;
        margin-top: .1rem;
    }
    .cargoStatus{
        text-align: right;
        padding: 0 .3rem .1rem 0;
        color: #f9930a;
        font-size: .3rem;
    }
    .bottom_button{
        display: flex;
        padding: .1rem 1rem;
    }
    .bottom_button > .sao_Button , .dui_Button{
        width: 2.54rem;
        height: .95rem;
        background-color: #ffc300;
        text-align: center;
        line-height: .95rem;
        border-radius: .1rem;
        margin: .15rem;
        font-size: .32rem;
    }
</style>