<template>
    <div id="myPrize_box">
        <div class="edit">
            <span @click="edit()" v-show="isShowEdit">编辑</span>
            <span v-show="isShowDelete" style="color: #2a9ae7;" @click="deletePrize(1)">删除</span>
            <span v-show="isShowDelete" @click="deletePrize(2)">取消</span>
        </div>
        <van-pull-refresh class="refresh" v-model="isLoading" @refresh="onRefresh()">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad()"
            >
                <div class="myPrize_list_box">
                    <ul class="myPrize_list">
                        <li class="myPrize_item" v-for="(item , index) in prizeList" @click="PrizeItem(index)" :key="index">
                            <img class="statusImg" src="../../assets/duihao.png" alt="" v-show="item.isShowStatus">
                            <img class="prizeImg" src="" alt="">
                            <span>{{item.prize}}</span>
                        </li>
                    </ul>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    export default {
        name: "myPrize",
        data() {
            return {
                isShowDelete: false,
                isShowEdit: true,
                prizeList: [
                    {imgUrl: '', prize: '奖品A1', isShowStatus: false},
                    {imgUrl: '', prize: '奖品A2', isShowStatus: false},
                    {imgUrl: '', prize: '奖品A3', isShowStatus: false},
                    {imgUrl: '', prize: '奖品A4', isShowStatus: false},
                    {imgUrl: '', prize: '奖品A5', isShowStatus: false},
                    {imgUrl: '', prize: '奖品A6', isShowStatus: false},
                    {imgUrl: '', prize: '奖品A7', isShowStatus: false},
                    {imgUrl: '', prize: '奖品A8', isShowStatus: false},
                    {imgUrl: '', prize: '奖品A9', isShowStatus: false},
                    {imgUrl: '', prize: '奖品A10', isShowStatus: false},
                ],
                count: 0,
                isLoading: false,
                matchPage: 1,
                pageSize: 10,
                loading: false,
                finished: false
            }
        },
        created() {
            this.service();
        },
        methods: {
            edit() {
                this.isShowDelete = true;
                this.isShowEdit = !this.isShowEdit;
            },
            deletePrize(status) {
                console.log(status);
                this.isShowDelete = !this.isShowDelete;
                this.isShowEdit = !this.isShowEdit;
                if (status == 1) {
                    var deleteArr = [];
                    for (var i = 0; i < this.prizeList.length; i++) {
                        if (this.prizeList[i].isShowStatus == true) deleteArr.push(this.prizeList[i]);
                    }
                    console.log('This is the element to be deleted:', deleteArr);
                } else {
                    console.log('取消');
                }
            },
            PrizeItem(index) {
                if (this.isShowDelete) this.prizeList[index].isShowStatus = !this.prizeList[index].isShowStatus;
            },
            onRefresh() {
                this.isLoading = false;
                this.prizeList = [];
                this.matchPage = 1;
                this.pageSize = 10;
                this.service();
            },
            service() {
                this.http.prizes.myPrizeList(
                    {
                        pagesize: this.pageSize,
                        currentpage: this.matchPage
                    }
                ).then(res => {
                    this.prizeList = res.data.myPrizeList;
                })
            },
            onLoad(){
                this.loading = false;
                this.finished = true;
            }
        }
    }
</script>

<style scoped>
    #myPrize_box {
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
    }

    .edit {
        height: .75rem;
        border-bottom: .005rem solid #c0c4cc;
        text-align: right;
        line-height: .75rem;
        padding-right: .5rem;
    }

    .edit > span {
        padding: 0 0 0 .4rem;
    }

    .myPrize_list_box {
        height: 100%;
        overflow-y: auto;
    }

    .myPrize_list > .myPrize_item {
        float: left;
        width: 33.333%;
        height: 3rem;
        display: flex;
        flex-direction: column;
        padding-top: .4rem;
        text-align: center;
        position: relative;
    }

    .myPrize_item > .prizeImg {
        height: 1.95rem;
        width: 1.95rem;
        border: .005rem solid #c0c4cc;
        margin: 0 auto;
    }

    .myPrize_item > .statusImg {
        width: .45rem;
        height: .45rem;
        border-radius: .5rem;
        background: #f9930a;
        padding: .05rem;
        position: absolute;
        right: .4rem;
        top: .5rem;
    }

    .myPrize_item > span {
        padding-top: .1rem;
    }

    .refresh {
        overflow-y: auto;
    }
</style>