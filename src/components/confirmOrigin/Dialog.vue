<template>
  <div v-show="value" class="cover">
    <div class="content">
      <div class="content_content">
        <p class="title" v-if="title">{{title}}</p>
        <p>{{message}}</p>
      </div>
      <div class="content_btn">
        <button
          v-show="showCancelButton"
          class="cancel_btn"
          @click="handleAction('cancel')"
        >{{cancelButtonText || '取消'}}</button>
        <button
          v-show="showConfirmButton"
          class="sure_btn"
          @click="handleAction('confirm')"
        >{{confirmButtonText || '确定'}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: {
        confirm: false,
        cancel: false
      }
    };
  },
  props: {
    value: Boolean,
    title: String,
    message: String,
    callback: Function,
    className: [String, Object, Array],
    beforeClose: Function,
    confirmButtonText: String,
    cancelButtonText: String,
    showCancelButton: Boolean,
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleAction(action) {
      this.onClose(action);
    },
    onClose(action) {
      this.$emit("close", false);
      this.$emit(action);
      this.callback && this.callback(action);
    }
  }
};
</script>

<style scoped>
.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 100;
  top: 0;
  left: 0;
}
.content {
  background-color: #fff;
  border-radius: 0.2rem;
  width: 6.2rem;
  height: 3.37rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.content_content {
  background-color: #fff;
  width: 5.61rem;
  height: 1.6rem;
  margin: 0 auto;
  margin-top: 0.24rem;
  color: #2a2a2a;
  font-size: 0.27rem;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
}
.content_btn {
  display: flex;
  justify-content: space-around;
  margin-top: 0.2rem;
}
.sure_btn,
.cancel_btn {
  color: #000;
  padding: 0.1rem 0.38rem;
  height: 0.72rem;
  border-radius: 0.1rem;
}
.sure_btn {
  background-color: #fdc500;
}
.cancel_btn {
  border: 1px solid #ffd321;
}
.title {
  text-align: center;
  margin-bottom: 0.3rem;
  font-size: 0.32rem;
  display: none;
}
</style>
