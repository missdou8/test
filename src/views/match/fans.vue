<template>
    <div id="fans_box">
        <ul class="fans_list">
            <li class="fans_item" v-for="(item , index) in fansList">
                <div class="fans_img">
                    <img :src="item.img" alt="">
                </div>
                <div class="fans_name">
                    <span>{{item.fans_name}}</span>
                </div>
                <div class="fans_time">
                    <span>{{item.fans_time}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "fans",
        data(){
            return {
                fansList:[
                    {
                        img:'',
                        fans_name:'库里',
                        fans_time:'2019-03-04 09:00:49'
                    },
                    {
                        img:'',
                        fans_name:'哈登',
                        fans_time:'2019-03-04 09:00:49'
                    },
                    {
                        img:'',
                        fans_name:'潘多拉',
                        fans_time:'2019-03-04 09:00:49'
                    },
                    {
                        img:'',
                        fans_name:'奥德赛',
                        fans_time:'2019-03-04 09:00:49'
                    },
                    {
                        img:'',
                        fans_name:'詹姆斯',
                        fans_time:'2019-03-04 09:00:49'
                    },
                    {
                        img:'',
                        fans_name:'杜兰特',
                        fans_time:'2019-03-04 09:00:49'
                    },
                    {
                        img:'',
                        fans_name:'科比·布莱恩特',
                        fans_time:'2019-03-04 09:00:49'
                    },
                    {
                        img:'',
                        fans_name:'乔丹',
                        fans_time:'2019-03-04 09:00:49'
                    },
                    {
                        img:'',
                        fans_name:'疾风剑豪',
                        fans_time:'2019-03-04 09:00:49'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    #fans_box {
        background-color: #ffffff;
    }
    .fans_list {
        display: flex;
        flex-direction: column;
    }
    .fans_item {
        margin-left: .3rem;
        border-bottom: .01rem solid #e1e3e9;
        display: flex;
        height: 1.2rem;
        align-items: center;
    }
    .fans_item > div {
        align-items: center;
    }
    .fans_img {
        padding-right: .15rem;
    }
    .fans_img > img {
        display: block;
        width: .8rem;
        height: .8rem;
        border-radius: .8rem;
        background-color: #efefef;
    }
    .fans_time {
        color: #c0c4cc;
        font-size: .22rem;
        flex: 1;
        text-align: right;
        padding-right: .3rem;
    }
</style>