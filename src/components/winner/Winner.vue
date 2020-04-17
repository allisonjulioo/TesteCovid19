<template>
  <div id="winner">
    <h3>{{winner ? "Suceesso" : "Deu ruim"}}!</h3>
    <img :src="img" alt width="200" class="img" />
    <h2
      class="message"
    >{{winner ? "Que isso, hein! você é incorruptível pelas fakenews" : "Parece que as fakenews te corromperam"}}.</h2>
    <p class="classification">
      <span>Acertos</span>
      <strong>{{result.hits}}</strong>
    </p>
    <p class="classification">
      <span>Erros</span>
      <strong>{{result.error}}</strong>
    </p>
    <p class="classification">
      <span>Não respondidas</span>
      <strong>{{total - (result.error + result.hits)}}</strong>
    </p>
    <p class="classification">
      <span>Total</span>
      <strong>{{total }}</strong>
    </p>
    <router-link class="btn" to="/">Tentar novamente</router-link>
  </div>
</template>

<script>
import { quest } from "@/helpers/questionaire/";

export default {
  name: "Winner",
  data() {
    return {
      body: document.querySelector("body"),
      meta: document.querySelector('meta[name="theme-color"]'),
      img: "",
      total: 0,
      winner: false,
      result: {}
    };
  },
  beforeDestroy() {
    this.body.style = {};
    this.meta.setAttribute("content", "#ff9800");
  },
  mounted() {
    this.total = quest.length;
    this.result = JSON.parse(localStorage.getItem("result"));
    this.body.style.background = "#ffd93b";
    this.meta.setAttribute("content", "#ffd93b");
    this.winner = parseInt((this.result.hits / 100) * quest.length * 100) >= 70;

    this.winner
      ? (this.img = require("@/assets/happy.png"))
      : (this.img = require("@/assets/sad.png"));
  }
};
</script>

<style lang="scss">
#winner {
  max-width: 300px;
  text-align: center;
  h3 {
    margin: 20px auto 20px;
    font-size: 1.6em;
    line-height: 1;
    max-width: 100%;
    color: black;

    @media (max-width: 981px) {
      max-width: 100%;
      padding: 0 20px;
    }
  }
  .message {
    text-align: center;
    padding: 0 12px;
    color: black;
    font-weight: normal;
    margin: 16px auto;
    display: block;
  }
  .classification {
    width: 100%;
    display: flex;
    margin: 12px 0;
    justify-content: space-between;
  }
}
</style>