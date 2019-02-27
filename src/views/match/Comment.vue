<template>
  <div class="comment">
    <DidaCommentList class="comments_list" :data="commentData" :type="0"></DidaCommentList>
    <div class="reply">
      <textarea class="reply_text" placeholder="请输入您的回复" v-model="replyValue"></textarea>
    </div>
    <div class="reply_submit_container">
      <button class="reply_submit" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentData: JSON.parse(this.$route.query.data),
      replyValue: ""
    };
  },
  mounted() {},
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
    }
  }
};
</script>


<style scoped>
.comment {
  padding-top: 0.15rem;
  position: relative;
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

