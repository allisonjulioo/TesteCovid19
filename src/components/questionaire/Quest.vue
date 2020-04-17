<template>
  <div id="quest">
    <img v-if="answer" class="large-img animated bounceIn fasted" :src="img" alt />
    <div class="todo">
      <section>
        <h5>{{quest.indexOf(selected) +1 }} | {{quest.length}}</h5>
        <h3 class="animated fadeInDown fasted">{{selected.ask}}</h3>
        <img class="img animated fadeIn fasted" :src="selected.img" />
        <p
          class="animated infinite timmer"
          :class="{'pulse red': time <= 0, 'flash':  time > 0 && time <= 5 }"
        >{{time}}s</p>
        <p class="p">
          <strong v-if="answer">{{isHit ? "Sim" : "Não"}}</strong>
        </p>
        <span
          class="animated"
          :class="{'tada': isHit, 'shake': !isHit }"
          v-if="answer"
          v-html="message"
        ></span>
      </section>
      <section class="actions">
        <button class="no btn" v-if="!answer" @click="setResponse('false')">Não</button>
        <button class="yes btn" v-if="!answer" @click="setResponse('true')">Sim</button>
      </section>
    </div>
    <section>
      <button class="btn" v-if="answer && !isLast" @click="nextQuestion()">Próxima pergunta >></button>
      <router-link class="btn" v-if="isLast && answer" to="/winner">Resultado</router-link>
    </section>
  </div>
</template>

<script>
import { quest } from "@/helpers/questionaire/";

export default {
  name: "Quest",
  components: {},
  data() {
    return {
      timeValue: () => {},
      answer: false,
      index: 0,
      nextIndex: 0,
      message: "",
      img: "",
      isHit: false,
      isLast: false,
      body: document.querySelector("body"),
      meta: document.querySelector('meta[name="theme-color"]'),
      result: {
        hits: 0,
        error: 0
      },
      text: [
        "O tempo acabou! :-(",
        "Você acertou!",
        "Sua reposta está errada!"
      ],
      selected: {},
      quest: quest,
      time: 20
    };
  },
  beforeDestroy() {
    this.body.style = {};
    this.meta.setAttribute("content", "#ff9800");
  },
  created() {
    this.selected = this.quest[0];
    this.countdown();
  },
  methods: {
    countdown() {
      this.timeValue = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          clearInterval(this.timeValue);
          this.answer = true;
          this.message = this.text[0];
          this.body.style.background = "#607D8B";
          this.meta.setAttribute("content", "#607D8B");
          this.img = require("@/assets/clock.png");
        }
      }, 1000);
      this.timeValue;
    },
    setResponse(response) {
      this.index = this.quest.indexOf(this.selected);
      this.nextIndex = this.index + 1;

      if (response === this.selected.answer) {
        this.returnAnswer(true);
        this.isHit = true;
        this.result.hits++;
        if (this.index + 1 === this.quest.length) {
          this.saveStorage();
        }
      } else {
        this.returnAnswer(false);
        this.isHit = false;
        this.result.error++;
        if (this.index === this.quest.length) {
          this.saveStorage();
        }
      }
    },
    nextQuestion() {
      this.time = 20;
      this.answer = false;
      this.body.style = {};
      this.meta.setAttribute("content", " #ff9800");
      this.countdown();
      this.selected = this.quest[this.nextIndex];
    },
    returnAnswer(t) {
      t
        ? (this.body.style.background = "#61a168")
        : (this.body.style.background = "#d62c2c");
      this.meta.setAttribute("content", t ? "#61a168" : "#d62c2c");
      clearInterval(this.timeValue);
      this.answer = true;
      this.message = this.text[t ? 1 : 2];
      this.img = require(t ? "@/assets/check.png" : "@/assets/close.png");
    },
    saveStorage() {
      localStorage.setItem("result", JSON.stringify(this.result));
      this.isLast = true;
    }
  }
};
</script>

<style lang="scss">
.red {
  background: red !important;
  color: #fff !important;
}
.large-img {
  opacity: 0.6;
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  z-index: 0;

  @media (max-width: 981px) {
    width: 87%;
    top: 22vh;
  }
}
#quest {
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 981px) {
      flex-direction: column;
    }
  }
  text-align: center;
  .todo {
    position: relative;
    z-index: +1;
  }
  .img {
    max-width: 300px;
    border-radius: 50%;
    height: 300px;
    width: 100%;
    object-fit: cover;
    box-shadow: 0 6px 12px #0a0a0a6e;
    @media (max-width: 981px) {
      height: 240px;
      max-width: 240px;
    }
  }
  h3 {
    margin: 20px auto 20px;
    font-size: 1.6em;
    line-height: 1;
    max-width: 60%;
    color: white;
    @media (max-width: 981px) {
      max-width: 100%;
      padding: 0 20px;
    }
  }
  span {
    color: #f4f9ea;
    margin: 20px 0;
    display: block;
  }
  .p {
    margin: 20px 0;
  }
  .timmer {
    font-size: 20px;
    color: #333;
    position: fixed;
    top: 8px;
    right: 0;
    left: 0;
    margin: 0 auto;
    background: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
  }
}
</style>
