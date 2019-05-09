<template>
    <div id="exchangeDetails_box">
        <div class="exchangeDetails_box_center">
            <div class="exchangeDetails_top">
                <div class="prize_img">
                    <img src="" alt="">
                </div>
                <div class="prize_name">小米运动手环</div>
                <div class="prize_number">x3</div>
            </div>
            <div class="exchangeDetails_bottom">
                <ul class="user_info">
                    <li class="user_info_item">
                        <span>比赛名称：</span>
                        <span>小米运动手环争霸赛</span>
                    </li>
                    <li class="user_info_item">
                        <span>流水单号：</span>
                        <span>42557489652114748</span>
                    </li>
                    <li class="user_info_item">
                        <span>比赛名次：</span>
                        <span style="color: #f9930a;">第 3 名</span>
                    </li>
                    <li class="user_info_item">
                        <span>获取方式：</span>
                        <span>自提</span>
                    </li>
                    <li class="user_info_item">
                        <span>组织者名称：</span>
                        <span>河北二打一协会</span>
                    </li>
                    <li class="user_info_item">
                        <span>兑奖编码：</span>
                        <span>42557489652114748</span>
                    </li>
                </ul>
                <div class="confirm">
                    <span class="confirm_button">确认取货</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "exchangeDetails"
    }
</script>

<style scoped>
    #exchangeDetails_box{
        height: 100%;
        background-color: #ffffff;
    }
    .exchangeDetails_box_center{
        width: 90%;
        margin: 0 auto;
    }
    .exchangeDetails_top{
        border-bottom: .005rem solid #c0c4cc;
        position: relative;
    }
    .prize_img{
        padding-top: .3rem;
    }
    .prize_img > img{
        display: block;
        width: 1.95rem;
        height: 1.95rem;
        background: #c0c4cc;
        margin: 0 auto;
    }
    .prize_name{
        text-align: center;
        padding: .12rem 0 .2rem 0;
    }
    .prize_number{
        position: absolute;
        bottom: 0;
        right: 0;
        padding: .12rem 0 .2rem 0;
        color: #909399;
    }
    .user_info{
        display: flex;
        flex-direction: column;
        padding-top: .13rem;
    }
    .user_info_item{
        display: flex;
    }
    .user_info_item > span:nth-child(1){
        display: block;
        width: 1.9rem;
        color: #909399;
    }
    .confirm{
        display: flex;
        padding-top: 1rem;
    }
    .confirm_button{
        display: block;
        height: .82rem;
        width: 2.3rem;
        background-color: #ffc300;
        text-align: center;
        line-height: .82rem;
        font-size: .3rem;
        margin: 0 auto;
        border-radius: .1rem;
    }
</style>