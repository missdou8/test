<template>
    <div id="lnvitation_box">
        <ul class="lnvitation_list">
            <li class="lnvitation_item">
                <img src="" alt="头像">
                <span>昵称昵称昵称</span>
            </li>
            <li class="lnvitation_item">
                <img src="" alt="头像">
                <span>昵称昵称昵称</span>
            </li>
            <li class="lnvitation_item">
                <img src="" alt="头像">
                <span>昵称昵称昵称</span>
            </li>
            <li class="lnvitation_item">
                <img src="" alt="头像">
                <span>昵称昵称昵称</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Lnvitation",
        data (){
            return {
                gamePlayerList:[]//列表循环信息
            }
        },
        methods:{

        },
        created() {
            //组件后获取玩家列表
        }
    }
</script>

<style scoped>
    #lnvitation_box{
        background-color: #fff;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .lnvitation_list{
        display: flex;
        flex-direction: column;
    }
    .lnvitation_item{
        height: .95rem;
        border-bottom: .005rem solid #c0c4cc;
        margin-left: .3rem;
        display: flex;
        line-height: .95rem;
        align-items: center;
    }
    .lnvitation_item > img{
        display: block;
        width: .8rem;
        height: .8rem;
        border-radius: .8rem;
        background: #c0c4cc;
        align-items: center;
    }
    .lnvitation_item > span{
        padding-left: .2rem;
    }
</style>