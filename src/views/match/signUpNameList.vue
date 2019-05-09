<template>
    <div id="signUpNameList">
        <div class="all_election">
            <div class="state" @click="allElection()" :style="electionStyle">
                <img src="../../assets/duihao.png" alt="" v-show="isAllElection">
            </div>
            <div style="padding-left: .15rem;">全选</div>
        </div>
        <div class="name_list">
            <ul class="name_list_ul">
                <li class="name_list_li" v-for="(item , index) in nameList">
                    <div class="state" @click="isChoice(index)" :style="item.choiceStyle">
                        <img src="../../assets/duihao.png" alt="" v-show="item.Choice">
                    </div>
                    <div class="user_header">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="user_info">
                        <p>{{item.user_name}}</p>
                        <p>{{item.user_id}}</p>
                    </div>
                    <div class="apply_state">
                        <span v-if="item.apply_state == 0" style="color: #f9930a">已同意</span>
                        <span v-if="item.apply_state == 1" style="color: #c0c4cc;">未审核</span>
                        <span v-if="item.apply_state == 2" style="color: #c0c4cc;">已拒绝</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="operation">
            <div @click="agree()">同意</div>
            <div @click="refuse()">拒绝</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "signUpNameList",
        data(){
            return {
                isAllElection:false,
                electionStyle:{},
                nameList:[
                    {
                        img:'',
                        user_name:'不凡的开心',
                        user_id:'62183684',
                        apply_state:0,//申请状态
                        Choice:false,//选中状态
                        choiceStyle:{}
                    },
                    {
                        img:'',
                        user_name:'不凡的快乐',
                        user_id:'62183684',
                        apply_state:1,
                        Choice:false,
                        choiceStyle:{}
                    },
                    {
                        img:'',
                        user_name:'不凡的伤心',
                        user_id:'62183684',
                        apply_state:2,
                        Choice:false,
                        choiceStyle:{}
                    },
                    {
                        img:'',
                        user_name:'不凡的难过',
                        user_id:'62183684',
                        apply_state:2,
                        Choice:false,
                        choiceStyle:{}
                    },
                    {
                        img:'',
                        user_name:'不凡的happy',
                        user_id:'62183684',
                        apply_state:0,
                        Choice:false,
                        choiceStyle:{}
                    },
                    {
                        img:'',
                        user_name:'不凡的奥特曼',
                        user_id:'62183684',
                        apply_state:0,
                        Choice:false,
                        choiceStyle:{}
                    }]
            }
        },
        methods:{
            allElection(){
                this.isAllElection = !this.isAllElection;
                if(this.isAllElection){
                    this.electionStyle = {'border' : 'none'};
                    for(var i=0;i<this.nameList.length;i++){
                        this.nameList[i].choiceStyle = {'border' : 'none'};
                        this.nameList[i].Choice = true;
                    }
                }else if(!this.isAllElection){
                    this.electionStyle = {
                        'border': '.005rem solid #c0c4cc',
                        'border-radius': '.5rem',
                        'width': '.45rem',
                        'height': '.45rem;'
                    };
                    for(var i=0;i<this.nameList.length;i++){
                        this.nameList[i].choiceStyle = {
                            'border': '.01rem solid #c0c4cc',
                            'border-radius': '.5rem',
                            'width': '.45rem',
                            'height': '.45rem;'
                        };
                        this.nameList[i].Choice = false;
                    };
                }
            },
            isChoice(index){
                this.nameList[index].Choice = !this.nameList[index].Choice;
                if(this.nameList[index].Choice){
                    this.nameList[index].choiceStyle = {'border' : 'none'}
                }else if (!this.nameList[index].Choice){
                    this.nameList[index].choiceStyle = {
                        'border': '.01rem solid #c0c4cc',
                        'border-radius': '.5rem',
                        'width': '.45rem',
                        'height': '.45rem;'
                    }
                }
            },
            agree(){
                var agreeNameList = [];
                for(var i=0;i<this.nameList.length;i++){
                    if(this.nameList[i].Choice){
                        agreeNameList.push(
                            {
                                userName:this.nameList[i].user_name,
                                user_id:this.nameList[i].user_id
                            }
                        )
                    }
                }
                console.log('同意的名单：' , agreeNameList);
            },
            refuse(){
                var refuseNameList = [];
                for(var i=0;i<this.nameList.length;i++){
                    if(this.nameList[i].Choice){
                        refuseNameList.push(
                            {
                                userName:this.nameList[i].user_name,
                                user_id:this.nameList[i].user_id
                            }
                        )
                    }
                }
                console.log('拒绝的名单：' , refuseNameList);
            }
        }
    }
</script>

<style scoped>
    #signUpNameList{
        display: flex;
        flex-direction: column;
    }
    .all_election{
        height: .65rem;
        border-bottom: .005rem solid #c0c4cc;
        padding-left: .3rem;
        display: flex;
        align-items: center;
    }
    .state{
        border: .01rem solid #c0c4cc;
        border-radius: .5rem;
        width: .45rem;
        height: .45rem;
    }
    .state > img{
        display: block;
        width: .45rem;
        height: .45rem;
        border-radius: .45rem;
        background: #f9930a;
        padding: .05rem;
        align-items: center;
    }
    .name_list{
        flex: 1;
    }
    .name_list_ul{
        display: flex;
        flex-direction: column;
    }
    .name_list_li{
        height: 1rem;
        border-bottom: .005rem solid #c0c4cc;
        align-items: center;
        display: flex;
        margin-left: .3rem;
    }
    .user_header{
        background: #c0c4cc;
        height: .8rem;
        width: .8rem;
        border-radius: .8rem;
        margin-left: .15rem;
        margin-right: .15rem;
    }
    .apply_state{
        flex: 1;
        text-align: right;
        padding-right: .3rem;
    }
    .user_info > p:nth-child(1){
        font-size: .32rem;
    }
    .operation{
        display: flex;
        padding: .1rem 1rem;
    }
    .operation > div{
        width: 2.54rem;
        height: .95rem;
        background-color: #ffc300;
        text-align: center;
        line-height: .95rem;
        border-radius: .1rem;
        margin: .15rem;
        font-size: .32rem;
    }
    .operation > div:nth-child(2){
        background-color: #dcdfe6;
        color: #909399;
    }
</style>