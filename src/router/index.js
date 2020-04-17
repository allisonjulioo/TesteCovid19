import Vue from "vue";
import Router from "vue-router";
import Questionaire from "../components/questionaire/Quest.vue";
import Winner from "../components/winner/Winner.vue";

Vue.use(Router);

const routes = [
  {
    path: "/questionaire",
    name: "questionaire",
    component: Questionaire,
  },
  {
    path: "/winner",
    name: "winner",
    meta: { title: 'Skills - MyApp' },
    component: Winner,
  },
  {
    path: "**",
    component: Questionaire,
  },
];

const router = new Router({
  mode: "history",
  linkExactActiveClass: "is-active",
  routes,
});

export default router;
