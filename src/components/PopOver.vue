<template>
  <div>
    <template v-for="(item,index) in data">
      <input type="radio" :id="index" :name="item.name" @click="select(item.content,$event)" :value="item.value">
      <label :for="index">{{item.value}}
      </label>
    </template>
    <div class="pop" ref="pop" :style="popStyle">{{content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      popStyle: {
        left: -100 + "px",
        top: -100 + "px"
      },
      content: String
    };
  },
  methods: {
    select(content, evt) {
      let popDom = this.$refs.pop;
      let dom = evt.target;
      let gapX = 0;
      let gapY = -25 - popDom.offsetHeight;
      this.$set(this.popStyle, "left", dom.offsetLeft + gapX + "px");
      this.$set(this.popStyle, "top", dom.offsetTop + gapY + "px");
      //为弹框赋值
      this.content = content;
    }
  }
};
</script>

<style scoped>
.pop {
  background-color: #f40;
  position: absolute;
  max-width: 2rem;
}
.pop::after {
  border: 20px solid #f40;
  content: "";
  border-top-color: #f40;
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-right-color: transparent;
  position: absolute;
  bottom: -40px;
  left: 0px;
}
</style>


