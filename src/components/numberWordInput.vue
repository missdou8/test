<template>
  <div id="numberWordInput">
    <van-popup class="popup" v-model="show_popup" position="bottom" :overlay="false">
      <ul class="key_input border_top border_left">
        <li v-for="i in 6" :key="i" class="border_right border_bottom">{{value.split("")[i-1]}}</li>
      </ul>
      <van-number-keyboard :show="true" extra-key="取消" @input="onInput" @delete="onDelete"/>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      show_popup: false
    };
  },
  methods: {
    onInput(key) {
      if (key == "取消") {
        this.value = "";
        this.show_popup = false;
      } else this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        //发送一个请求
        this.$emit("goodsIdAjax", this.value);
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    showPopup() {
      this.show_popup = true;
    },
    closePop() {
      this.value = "";
      this.show_popup = false;
    }
  }
};
</script>

<style scoped>
/* 键盘输入表单 */
.key_input {
  width: 90%;
  margin: 15px auto;
  height: 50px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.key_input li {
  font-size: 24px;
  font-style: normal;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  height: 100%;
  line-height: 50px;
  position: relative;
}

/* 上下左右边框样式 */

.border_top::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.border_bottom::after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.border_left::after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-left: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}

.border_right::before {
  content: " ";
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-right: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
#numberWordInput .popup {
  height: 295px;
}
</style>

