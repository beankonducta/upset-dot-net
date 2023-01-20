<template>
  <div id="app">
    <button id="about" v-on:click.self="changeView('about')">{{ aboutButtonText() }}</button>
    <FeelingView
      v-on:feeling-emit="changeView($event)"
      v-if="view == 0"
      v-bind:error="error"
      v-bind:loading="loading"
    />
    <SolutionView v-on:back-emit="changeView()" v-if="view == 1" v-bind:solution="solution" />
    <AboutView v-if="view == 2" />
  </div>
</template>

<script>
import FeelingView from "./components/views/FeelingView.vue";
import SolutionView from "./components/views/SolutionView.vue";
import AboutView from "./components/views/AboutView.vue";

const getUrl = `https://api.jsonbin.io/v3/b/63cb0e3e15ab31599e3b8a69`;
const axios = require("axios").default;
// const _ = require("lodash");

// const FEELING_VIEW = 0;
// const SOLUTION_VIEW = 1;

export default {
  name: "App",
  mounted() {
  },
  components: {
    FeelingView,
    SolutionView,
    AboutView
  },
  methods: {
    changeView(event) {
      // badly needs refactor lol
      if (this.view !== 2) this.lastView = this.view;
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
      this.$lyticus.trackClick(this.feeling.toLowerCase());
      this.loading = true;
      axios
        .get(getUrl)
        .then(response => {
          const value = response.data.record
          let w = null
          value.forEach(val => {
            if(val.emotion.toLowerCase() === this.feeling.toLowerCase()) {
              this.loading = false
              w = val
            }
            val.synonyms.forEach(word => {
              if(word.toLowerCase() === this.feeling.toLowerCase()) {
                val.emotion = word
                this.loading = false
                w = val
              }
            })
          })
          if(w != null) {
            this.solution = w;
            this.view = 1
          } else this.error = "No solution found for that feeling :(";
          
        //   const value = _.toArray(response.data).filter(val => {
        //     if (!val.options) {
        //       this.loading = false;
        //       return val.emotion.toLowerCase() === this.emotion.toLowerCase();
        //     }
        //     for (let option of val.synonyms.split(", ")) {
        //       if (this.feeling.toLowerCase().includes(option.toLowerCase())) {
        //         this.loading = false;
        //         return true;
        //       }
        //     }
        //   });
        //   if (value.length > 0) {
        //     this.solution = value[0];
        //     this.view = 1;
        //   } else this.error = "No solution found for that feeling :(";
        // })
        }).catch((err) => {
          console.log(err)
          this.error = "Unable to connect to API :(";
        })
      }
  },
  data() {
    return {
      view: 0,
      lastView: 0,
      feeling: "feeling",
      solution: {},
      error: "",
      loading: false
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Arvo&display=swap");

#app {
  font-family: "Arvo", serif;
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
  color: #f5164e;
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

* {
  font-family: "Arvo", serif;
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
  background: #f5164e;
  color: white;
}

button:hover:disabled {
  cursor: default;
  border-color: #51355a;
  color: #513551;
  background: white;
}

button:active {
  background: #513551;
}

button:focus {
  outline: none;
  box-shadow: none;
}

button:disabled {
  opacity: 0.5;
}

.loading {
  -webkit-animation: blink 0.5s infinite;
  animation: blink 0.5s infinite;
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

@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>
