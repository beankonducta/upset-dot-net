<template>
  <div id="app">
    <FeelingView
      v-on:feeling-emit="changeView($event)"
      v-if="view == 0"
      v-bind:error="error"
    />
    <SolutionView
      v-on:back-emit="changeView()"
      v-if="view == 1"
      v-bind:solution="solution"
    />
  </div>
</template>

<script>
import FeelingView from "./components/views/FeelingView.vue";
import SolutionView from "./components/views/SolutionView.vue";

const getUrl = "https://api.jsonbin.io/b/5ed7ec1c79382f568bd28799/4";
const axios = require("axios").default;
const _ = require("lodash");

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
      this.error = null;
      this.solutionFromFeeling();
    },
    solutionFromFeeling() {
      const autocorrectedFeeling = this.feeling.toLowerCase(); // need to actually autocorrect here
      axios.get(getUrl).then(response => {
        const value = _.toArray(response.data).filter(
          val => val.feeling.toLowerCase() === autocorrectedFeeling
        );
        if (value.length > 0) {
          this.solution = value[0];
          this.view = 1;
        } else this.error = "No solution found for that feeling :(";
      });
    }
  },
  data() {
    return {
      view: 0,
      feeling: "feeling",
      solution: {},
      error: ""
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

p {
  color: #51355a;
}

h1, h2, h3, h4, h5, h6 {
  color: #51355a;
}

button {
  padding: 10px;
  margin: 20px;
  font-size: 20px;
  text-align: center;
  border-style: solid;
  border-radius: 7px;
  border-width: 2px;
  border-color: #51355a;
  color: #513551;
  background: white;
}

button:hover {
  cursor: pointer;
  background: #9E2B25;
  color: white;
}

input {
  padding: 10px;
  margin: 20px;
  font-size: 20px;
  text-align: center;
  border-style: solid;
  border-radius: 7px;
  border-width: 2px;
  border-color: #51355a;
  color: #513551;
}

input:focus {
  outline: none;
}
</style>
