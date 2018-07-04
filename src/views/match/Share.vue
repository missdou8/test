<template>
    <div class="share">
        <div class="prizeImg">
            <img src="#" alt="奖品图片">
        </div>
        <p class="match_title">比赛名称</p>
        <p class="match_code">
            <span v-for="item in 6">5</span>
        </p>
        <p class="match_code_desc">输入邀请码即可报名成功</p>
        <img class="qr_code" src="#" alt="二维码图片">
        <p class="qr_code_desc">长按识别二维码下载客户端参加比赛</p>
    </div>
</template>

<style scoped>
.share {
  background: url("../../assets/share.png") no-repeat;
  position: relative;
}
.prizeImg {
  padding: 0.4rem 0;
  position: absolute;
  top: 4.5%;
  left: 3.05%;
  height: 30.36%;
  width: 94.72%;
}
.prizeImg img {
  height: 100%;
}
.match_title {
  position: absolute;
  top: 37.28%;
}
.match_code {
  position: absolute;
  top: 48.79%;
}
.match_code_desc {
  position: absolute;
  top: 57.44%;
}
.qr_code {
  position: absolute;
  top: 68.43%;
}
.qr_code_desc {
  position: absolute;
  bottom: 4.33%;
}
</style>

