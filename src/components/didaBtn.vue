<template>
    <div class="btn_box">
         <van-button :disabled="btnEnable" class="reg_btn" size="large" @click="submet()">完成</van-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      typeHttp: "" //设置请求接口
    };
  },
  /**
   * btnEnable 表单禁用条件
   * type      属于那种请求 0修改用户信息 1 修改商铺信息 不传type需要自行配置请求 事件为submetData
   * dataList  数据列表（请求对象）
   */
  props: ["btnEnable", "type", "dataList", "detectionList"],
  methods: {
    submet() {
      if(this.type == 0) this.typeHttp = 'setUserInfo';
      else if (this.type == 1) this.typeHttp = 'setUserShop';
      else return this.$emit("submetData");
      //检测表单输入正确值(目前只考虑单个参数情况下)
      if (!this.detectionList.reg.test(this.dataList[this.detectionList.name])) {
        return this.$toast(this.detectionList.msg);
      } else {
      this.http.user[this.typeHttp](this.dataList)
        .then(res => {
          this.$dialog
            .alert({
              title: "嘀嗒比赛",
              message: res.msg
            })
            .then(() => {
              this.$router.go(-1);
            });
        });
      }
    }
  }
};
</script>


<style scoped>
.btn_box {
  padding: 0 15px 15px 15px;
}
.reg_btn {
  /* background-color: #108ee9;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  color: #fff; */
  background-color: inherit;
  border: none;
  height: 40px;
  line-height: 40px;
  color: rgb(255, 80, 0);
  font-weight: 600;
  text-align: right;
  font-size: 0.35rem;
}
.reg_btn.van-button--disabled {
  opacity: 0.6;
}
</style>
