<template>
    <div class="customized">
        <div class="customized_info">
            <div class="customized_number border_bottom">
                <span>预估参赛人数</span>
                <input type="text">
            </div>
            <div class="customized_phone border_bottom">
                <span>手机号</span>
                <input type="text">
            </div>
            <div class="customized_introduce">
                <span>请写下您对比赛的描述吧 ~</span>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
        <div class="next">
            <span>请填写您的定制比赛需求，我们收到后会尽快和您取得联系</span>
            <span>下一步</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "customized"
    }
</script>

<style scoped>
    .customized {
        display: flex;
        flex-direction: column;
    }
    .customized_info {
        display: flex;
        flex-direction: column;
        flex: 5;
    }
    .customized_number , .customized_phone {
        padding-left: .3rem;
        height: 1rem;
        display: flex;
        align-items: center;
    }
    .customized_introduce {
        padding: .3rem .3rem;
    }
    .customized_introduce > span {
        color: #c0c4cc;
    }
    .customized_introduce > textarea {
        margin-top: .3rem;
        height: 5rem;
        width: 100%;
    }
    .customized_number > span , .customized_phone > span {
        align-items: center;
        flex: 1;
        color: #c0c4cc;
    }
    .customized_number > input , .customized_phone > input {
        text-align: right;
        padding-right: .3rem;
    }
    .next {
        text-align: center;
        flex: 1;
    }
    .next > span:nth-child(1) {
        font-size: .2rem;
    }
    .next > span:nth-child(2) {
        display: block;
        width: 6.6rem;
        height: .82rem;
        background: #ffc300;
        border-radius: .1rem;
        margin: 0 auto;
        text-align: center;
        line-height: .82rem;
        font-size: .3rem;
        margin-top: .2rem;
    }
</style>