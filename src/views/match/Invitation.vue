<template>
    <div id="lnvitation_box">
        <ul class="lnvitation_list">
            <li class="lnvitation_item" v-for="(item , index) in gamePlayerList">
                <img :src="item.icon" alt="头像">
                <span>{{item.nickname}}</span>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        name: "Lnvitation",
        data() {
            return {
                gamePlayerList: [],//列表循环信息
            }
        },
        methods: {

        },
        created() {
            //获取玩家列表
            this.http.invitation.invitationList().then(res => {
                this.gamePlayerList = res.data.invitationList;
            })
        }
    }
</script>

<style scoped>
    #lnvitation_box {
        background-color: #fff;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .lnvitation_list {
        display: flex;
        flex-direction: column;
    }

    .lnvitation_item {
        height: 1.2rem;
        border-bottom: .005rem solid #e1e3e9;
        margin-left: .3rem;
        display: flex;
        line-height: .95rem;
        align-items: center;
    }

    .lnvitation_item > img {
        display: block;
        width: .8rem;
        height: .8rem;
        border-radius: .8rem;
        background: #c0c4cc;
        align-items: center;
    }

    .lnvitation_item > span {
        padding-left: .2rem;
    }
</style>