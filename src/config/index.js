/**
 * 代码配置文件
 */

export default {
  matchStatus: {
    0: "新建未审核",
    1: "新建提审中",
    2: "信息修改未提审",
    3: "信息修改审核中",
    4: "审核不通过",
    5: "审核已通过",
    6: "被取消",
    7: "已发布",
    8: "报名中",
    9: "比赛中",
    10: "比赛结束"
  }, //比赛的状态
  attendType: {
    0: "免费报名",
    1: "分享报名",
    2: "邀请赛"
  }, //赛制中报名方式
  defaultIcon: require("../assets/icon.png"), //默认头像
  downLoadURL: "https://www.didabisai.com/download.html", //嘀嗒下载页
  customerServiceUrl:
    "https://www.sobot.com/chat/h5/index.html?sysNum=ded7079b7502494fad26fc73147a40ca&source=1&moduleType=2", //客服网页基本链接，后边接更多个性化参数
  outputWidth: window.innerWidth || 500 //压缩图片输出的width
};
