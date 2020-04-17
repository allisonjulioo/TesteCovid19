import Vue from "vue";
import App from "./App.vue";
import router from './router'
import "../style.scss";
import "../animate.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
