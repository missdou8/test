<template>
  <div class="comment">
    <DidaCommentList
      class="comments_list"
      :data="commentData"
      :disabeld="true"
      :type="0"
      @toDetail="commentToDetail"
      @getImgSrc="bigger"
    ></DidaCommentList>
    <div class="reply">
      <textarea class="reply_text" placeholder="请输入您的回复" v-model="replyValue"></textarea>
    </div>
    <div class="reply_submit_container">
      <button class="reply_submit" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";

export default {
  data() {
    return {
      commentData: JSON.parse(this.$route.query.data),
      replyValue: "感谢评价"
    };
  },
  methods: {
    submit() {
      if (!this.replyValue) {
        return this.$toast("请输入您的回复");
      }
      this.http.prizes
        .commentReply({
          commentId: this.commentData.commentId,
          content: this.replyValue
        })
        .then(() => {
          this.$router.go(-1);
        });
    },
    commentToDetail(data) {
      console.log(data);
      this.toDetail(data.id);
    },
    toDetail(id) {
      this.$store.commit("setId", id);
      this.$router.push("detail");
    },
    bigger(src) {
      ImagePreview({
        images: [src],
        onClose() {
          // do something
        }
      });
    }
  }
};
</script>


<style scoped>
.comment {
  padding-top: 0.15rem;
  position: relative;
  line-height: 1;
}
.reply {
  height: 3.35rem;
  width: 100%;
  padding: 0.15rem;
}
.reply_text {
  width: 100%;
  height: 100%;
}
.reply_submit_container {
  position: absolute;
  bottom: 0.68rem;
  text-align: center;
  width: 100%;
}
.reply_submit {
  background-color: #fcc600;
  border-radius: 0.08rem;
  color: #000;
  font-size: 0.32rem;
  margin: 0.15rem 0.08rem;
  width: 6.41rem;
  height: 0.9rem;
}
</style>

