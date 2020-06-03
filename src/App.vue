<template>
  <div id="app">
    <FeelingView v-on:feeling-emit="changeView($event)" v-if="view == 0" />
    <SolutionView v-on:back-emit="changeView()" v-if="view == 1" v-bind:solution="solution" />
  </div>
</template>

<script>
import FeelingView from "./components/views/FeelingView.vue";
import SolutionView from "./components/views/SolutionView.vue";
import * as feelingsolution from "./logic/FeelingSolution.js";

// const FEELING_VIEW = 0;
// const SOLUTION_VIEW = 1;

export default {
  name: "App",
  components: {
    FeelingView,
    SolutionView
  },
  methods: {
    changeView(event) {
      if (!event) {
        this.view = 0;
        return;
      }
      this.feeling = event;
      this.solutionFromFeeling();
      this.view = 1;
    },
    solutionFromFeeling() {
      this.solution = feelingsolution.solutionFromFeeling(this.feeling);
    }
  },
  data() {
    return {
      view: 0,
      feeling: "feeling",
      solution: {
        feeling: "",
        message: "",
        bodyLanguage: "",
        oppositeAction: "",
        breathing: ""
      }
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  height: 40px;
  border: none;
  border-radius: 5px;
  margin: 10px;
}

button:hover {
  cursor: pointer;
}

input {
  border-radius: 5px;
  height: 40px;
  margin: 10px;
  text-align: center;
}
</style>
