<template>
  <div id="rules">
    <ul class="rule_select">
      <li class="select_item" v-for="item in selectRules" :key="item.name">
        <div class="rule_each select_item">
          <span class="ruleTitle">{{item.name}}：</span>
          <ul>
            <li class="rulename" v-for="rule in item.ruleContent" :key="rule.name" @click="showDesc(rule.rules, $event)">{{rule.name}}</li>
          </ul>
        </div>
        <ul class="select_rules">
          <span class="triangle"></span>
          <li class="select_rule" v-for="rule in ruleContent" :key="rule">
            {{rule}}
          </li>
        </ul>
      </li>
    </ul>
    <ul class="rule_text">
      <li class="select_item" v-for="item in textRules" :key="item.name">
        <div class="text_each">
          <span class="ruleTitle text_title" @click="textClick">
            <i class="text_triangle"></i>{{item.name}}</span>
        </div>
        <ul class="text_content select_rules">
          <li class="text_rules" v-for="rule in item.rules" :key="rule">{{rule}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectRules: [],
      textRules: [],
      ruleContent: ""
    };
  },
  created() {
    let gameId = this.$route.query.id;
    let xhr = new XMLHttpRequest();
    xhr.timeout = 3000;
    xhr.open(
      "GET",
      `https://cdn.didabisai.com/appweb/gamerule/${gameId}.json`,
      true
    );
    xhr.send();
    let that = this;
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        let obj = JSON.parse(xhr.responseText);
        // 生成可以选择的选项
        that.selectRules = obj.selectRules;
        that.textRules = obj.textRule;
      }
    };
  },
  methods: {
    showDesc(rules, event) {
      // 事件触发者
      let target = event.target;
      // 规则显示框
      let dom = target.parentElement.parentElement.nextElementSibling;
      //如果当前状态为打开状态，那么把他关闭，并且后边的逻辑就不执行了
      if (target.classList.contains("active")) {
        target.classList.remove("active");
        dom.style.display = "none";
        return;
      }
      this.ruleContent = rules;
      let selectRuleDom = document.querySelectorAll(".select_rules");
      for (let i = 0; i < selectRuleDom.length; i++) {
        selectRuleDom[i].style.display = "none";
      }
      this.ruleContent && (dom.style.display = "block");
      // 去除所有按钮的点击效果
      let actives = document.querySelectorAll(".rulename");
      for (let i = 0; i < actives.length; i++) {
        actives[i].classList.remove("active");
      }
      target.classList.add("active");
    },
    textClick(event) {
      let currentDom = event.target;
      currentDom.tagName === "I" && (currentDom = currentDom.parentElement);
      let selectRuleDom = document.querySelectorAll(".select_rules");
      let dom = currentDom.parentElement.nextElementSibling;

      //如果当前状态为打开状态，那么把他关闭，并且后边的逻辑就不执行了
      if (currentDom.classList.contains("text_active")) {
        currentDom.classList.remove("text_active");
        dom.style.display = "none";
        return;
      }

      for (let i = 0; i < selectRuleDom.length; i++) {
        selectRuleDom[i].style.display = "none";
      }
      dom.style.display = "block";
      // 去除三角的反转效果
      let actives = document.querySelectorAll(".text_title");
      for (let i = 0; i < actives.length; i++) {
        actives[i].classList.remove("text_active");
      }
      currentDom.classList.add("text_active");
    }
  }
};
</script>


<style scoped>
ul {
  display: inline;
}

#rules {
  background-color: #fff;
  text-align: center;
}

h1 {
  color: #fff;
  display: inline-block;
  font-size: 0.4rem;
  padding: 0.36rem 0 0.36rem 0.6rem;
  text-align: center;
}

.rule_select,
.rule_text {
  text-align: left;
}

.rule_each {
  margin: 0 0.24rem;
}

.select_item {
  position: relative;
  padding: 0.15rem 0;
}
.select_item::after {
  content: "";
  position: absolute;
  bottom: 0;
  height: 0.01rem;
  width: 100%;
  background-color: #f5f5f5;
}

.select_rules {
  position: relative;
  background-color: #111;
  color: #d5b01d;
  display: none;
  padding: 0.16rem 0.3rem 0.3rem;
  margin-top: 0.2rem;
}

.ruleTitle {
  color: #000;
  font-size: 0.28rem;
}

.rulename {
  border: 0.02rem solid #ffe533;
  border-radius: 0.1rem;
  color: #3b3b3b;
  display: inline-block;
  font-size: 0.24rem;
  margin: 0.15rem 0.13rem;
  padding: 0.04rem 0.12rem;
}

.text_each {
  margin: 0 0.24rem;
}

.text_title {
  padding-right: 0.5rem;
  position: relative;
}

.text_content {
  background-color: transparent;
  padding: 0;
  margin-top: 0.24rem;
}

.text_rules {
  color: #959595;
  font-size: 0.24rem;
  line-height: 0.4rem;
  margin: 0 0.24rem;
}

.active {
  background-color: #111111;
  color: #d5b01d;
}

.specialRule .ruleTitle {
  background: url("../assets/guize_star.png") left center no-repeat;
  background-size: 0.28rem 0.28rem;
  color: #e8bb56;
  padding-left: 0.3rem;
}

.specialRule .rulename {
  border-color: #b59243;
  color: #e8bb56;
}

.specialRule .active {
  background-color: #b59243;
  color: #162237;
}

.triangle {
  position: absolute;
  top: -0.4rem;
  left: 50%;
  transform: translateX(-50%);
  border: 0.2rem solid transparent;
  border-bottom-color: #111;
}

.text_triangle {
  position: absolute;
  top: 0.04rem;
  right: 0;
  border: 0.15rem solid transparent;
  border-left-color: #111;
  border-left-width: 0.15rem;
}

.text_active .text_triangle {
  position: absolute;
  top: 0.11rem;
  right: 0;
  border: 0.15rem solid transparent;
  border-top-color: #111;
  border-top-width: 0.15rem;
}

.select_rule {
  line-height: 0.4rem;
}
</style>
