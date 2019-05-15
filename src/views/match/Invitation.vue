<template>
    <div id="lnvitation_box">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh()">
            <ul class="lnvitation_list">
                <li class="lnvitation_item" v-for="(item , index) in gamePlayerList" :key="index">
                    <img :src="item.icon" alt="头像">
                    <span>{{item.nickname}}</span>
                </li>
            </ul>
        </van-pull-refresh>
    </div>
</template>

<script>
    export default {
        name: "Lnvitation",
        data() {
            return {
                gamePlayerList: [],//列表循环信息
                isLoading: false
            }
        },
        methods: {
            onRefresh() {
                this.isLoading = false;
            },
            service(){
                this.http.invitation.invitationList().then(res => {
                    this.gamePlayerList = res.data.invitationList;
                })
            }
        },
        created() {
            this.service();
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