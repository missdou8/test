<template>
    <div>
        <DidaCommentList
                class="comments_list"
                v-for="(item,index) in commentsList"
                :key="`comment${index}`"
                :data="item"
                :type="0"
                @next="commentClick"
                :disabeld="true"
                :isComment="true"
                @toDetail="commentToDetail"
                @getImgSrc="bigger"
        ></DidaCommentList>
    </div>

</template>

<script>
    import { ImagePreview } from "vant";
    export default {
        name: "recollections",
        data(){
            return {
                commentsList: [], //评论列表信息
                isNewComment: false,
            }
        },
        methods:{
            bigger(src) {
                ImagePreview({
                    images: [src],
                    onClose() {
                        // do something
                    }
                });
            },
            commentToDetail(data) {
                this.toDetail(JSON.parse(data).matchId);
            },
            commentClick(data) {
                this.$router.push({
                    path: "/match/comment",
                    query: {
                        data: JSON.stringify(data)
                    }
                });
            },
        },
        created() {
            return this.http.prizes
                .commentsList({ pagesize: this.pageSize, currentpage: this.matchPage })
                .then(res => {
                    let data = res.data;
                    this.commentsList = this.commentsList.concat(data.commentsList);
                    console.log(data)
                    return data;
                });
        }
    }
</script>

<style scoped>
    .comments_list {
        margin-top: 0.13rem;
        line-height: 1;
    }
</style>