<template>
  <div>
    <template v-for="(item,index) in data">
      <input ref="radio" type="radio" :id="item.id" :name="item.name" @click="select(item.content,$event)" :value="item.value">
      <label :for="item.id">{{item.value}}
      </label>
    </template>
    <div class="pop" ref="pop">
      <p></p>
      <span class="pop_arrow"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {};
  },
  methods: {
    select(content, evt) {
      let popDom = this.$refs.pop;
      //为弹框赋值
      popDom.querySelector("p").innerHTML = content;
      let dom = evt.target;
      //向外传递选择的值
      this.$emit("selected", { id: dom.id, value: dom.value });
      let gapX = -popDom.offsetWidth * 0.5 + dom.offsetWidth;
      let gapY = -25 - popDom.offsetHeight;
      popDom.style.opacity = 1;
      popDom.style.left = dom.offsetLeft + gapX + "px";
      popDom.style.top = dom.offsetTop + gapY + "px";
      // 计算箭头位置
      let arrowDom = document.querySelector(".pop_arrow");
      arrowDom.style.left = popDom.offsetWidth * 0.5 - 20 + "px";
      //修正
      let left = popDom.style.left;
      let over = Number(left.split("px")[0]);
      if (over < 0) {
        popDom.style.left = dom.offsetLeft + gapX - over + 5 + "px";
        arrowDom.style.left = popDom.offsetWidth * 0.5 - 20 + over + "px";
      }
    }
  }
};
</script>

<style scoped>
.pop {
  background-color: #f40;
  position: absolute;
  max-width: 2rem;
  opacity: 0;
  transition: opacity 500ms ease-in-out, left 200ms ease;
  z-index: 1000;
  left: 0;
  top: 0;
}
.pop_arrow {
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


