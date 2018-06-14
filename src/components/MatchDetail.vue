<template>
    <div class="match-detail">
        <img src="../assets/logo.png" alt="比赛封面">
        <header>
            <h1>大洋百货500ml洗发露争夺赛</h1>
            <a href="#">查看奖品</a>
        </header>
        <div>比赛详情</div>
        <div>
            <h1>比赛奖品
                <span>商家邮寄</span>
            </h1>
            <ul>
                <li>
                    <p>第1名：奖品名称</p>
                    <img src="../assets/logo.png" alt="奖品">
                </li>
            </ul>
            <div>
                <p>自提地址：</p>
                <p>北京回龙观</p>
            </div>
        </div>
        <div class="like_info">
            <span>like</span>
            <span>share</span>
        </div>
    </div>
</template>

<style scoped>
.match-detail {
  position: relative;
}
.like_info {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}
</style>
