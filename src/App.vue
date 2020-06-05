<template>
  <div id="app">
    <button id="about" v-on:click.self="changeView('about')">{{ aboutButtonText() }}</button>
    <FeelingView v-on:feeling-emit="changeView($event)" v-if="view == 0" v-bind:error="error" />
    <SolutionView v-on:back-emit="changeView()" v-if="view == 1" v-bind:solution="solution" />
    <AboutView v-if="view == 2" />
  </div>
</template>

<script>
import FeelingView from "./components/views/FeelingView.vue";
import SolutionView from "./components/views/SolutionView.vue";
import AboutView from "./components/views/AboutView.vue";

const getUrl = "https://api.jsonbin.io/b/5ed996a62f5fd957fda40f53";
const axios = require("axios").default;
const _ = require("lodash");

// const FEELING_VIEW = 0;
// const SOLUTION_VIEW = 1;

export default {
  name: "App",
  components: {
    FeelingView,
    SolutionView,
    AboutView
  },
  methods: {
    changeView(event) {
      // badly needs refactor lol
      if(this.view !== 2) this.lastView = this.view;
      if (event === "about") {
        this.view = this.view === 2 ? this.lastView : 2;
        return;
      }
      if (!event) {
        this.view = 0;
        return;
      }
      this.feeling = event;
      this.error = null;
      this.solutionFromFeeling();
    },
    aboutButtonText() {
      return this.view === 2 ? "Back" : "About";
    },
    solutionFromFeeling() {
      axios
        .get(getUrl)
        .then(response => {
          const value = _.toArray(response.data).filter(val => {
            if (!val.options)
              return val.feeling.toLowerCase() === this.feeling.toLowerCase();
            for (let option of val.options.split(', ')) {

              if (this.feeling.toLowerCase().includes(option.toLowerCase())) return true;
            }
          });
          if (value.length > 0) {
            this.solution = value[0];
            this.view = 1;
          } else this.error = "No solution found for that feeling :(";
        })
        .catch(() => {
          this.error = "Unable to connect to API :(";
        });
    }
  },
  data() {
    return {
      view: 0,
      lastView: 0,
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

#about {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  margin: 20px;
  font-size: 20px;
  text-align: center;
  border-width: 0px;
  color: #513551;
  background: white;
}

#about:hover {
  cursor: pointer;
  background: white;
  color: #513551;
}

#about:focus {
  outline: none;
}

p {
  color: #51355a;
}

h1,
h2,
h3,
h4,
h5,
h6 {
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
  background: #9e2b25;
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
