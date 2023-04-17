<template>
  <div id="app">
    <button id="about" v-on:click.self="changeView('about')">{{ aboutButtonText() }}</button>
    <FeelingView v-on:feeling-emit="changeView($event)" v-if="view == 0" v-bind:error="error"
      v-bind:loading="loading" />
    <SolutionView v-on:back-emit="changeView()" v-if="view == 1" v-bind:solution="solution" />
    <AboutView v-if="view == 2" />
  </div>
</template>

<script>
import FeelingView from "./components/views/FeelingView.vue";
import SolutionView from "./components/views/SolutionView.vue";
import AboutView from "./components/views/AboutView.vue";

// const getUrl = `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`;
// const axios = require("axios").default;

import { Configuration, OpenAIApi } from "openai";
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API
});

const openai = new OpenAIApi(configuration);

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
      try {
        openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: 'user', content: `Is ${this.feeling} an emotion / feeling? Return yes or no, single word only.` }],
        }).then(res => {
          console.log(res.data.choices[0].message.content)
          if (res.data.choices[0].message.content.toLowerCase().includes("no")) {
            this.error = "That's not a real emotion!"
            this.loading = false;
            return;
          } else {
            openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: [{ role: 'user', content: `Is ${this.feeling} positive or negative? Please return a single word.`, }]
            }).catch(err => console.log(err)).then(res => {
              console.log(res.data.choices[0].message.content)
              if (res.data.choices[0].message.content.toLowerCase().includes("positive")) {
                this.solution = { oppositeReaction: "Nothing, just be happy!", practicalTip: "Enjoy the positive vibes!", emotion: this.feeling }
                this.view = 1
                this.loading = false;
                return;
              } else {
                openai.createChatCompletion({
                  model: "gpt-3.5-turbo",
                  messages: [{ role: 'user', content:`Using the following JSON schema, {"oppositeReaction": "",
        "practicalTip":""}, please return a DBT based response to ${this.feeling}, where the oppositeReaction is a positive, opposite emotion, and the practical tip is a specific couple of sentences to regulate the negative emotion in the moment. Please make sure the response is valid JSON.`}],
                  max_tokens: 1000,
                }).then(res => {
                  let val = JSON.parse(res.data.choices[0].message.content);
                  this.solution = { oppositeReaction: val.oppositeReaction, practicalTip: val.practicalTip }
                  this.solution.emotion = this.feeling
                  this.loading = false
                  this.view = 1
                })
              }
            })
          }
        })
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
      // axios
      //   .get(getUrl)
      //   .then(response => {
      //     const value = response.data.record
      //     let w = null
      //     value.forEach(val => {
      //       if(val.emotion.toLowerCase() === this.feeling.toLowerCase()) {
      //         this.loading = false
      //         w = val
      //       }
      //       val.synonyms.forEach(word => {
      //         if(word.toLowerCase() === this.feeling.toLowerCase()) {
      //           val.emotion = word
      //           this.loading = false
      //           w = val
      //         }
      //       })
      //     })
      //     if(w != null) {
      //       this.solution = w;
      //       this.view = 1
      //     } else this.error = "No solution found for that feeling :(";

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
      // }).catch((err) => {
      //   console.log(err)
      //   this.error = "Unable to connect to API :(";
      // })
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
  cursor: not-allowed;
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
  opacity: 0.4;
}

.loading {
  -webkit-animation: blink 0.5s infinite;
  animation: blink 0.5s infinite;
}

.loading:hover {
  border-color: #51355a;
  color: #513551;
  background: white;
  cursor: not-allowed;
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
    opacity: 0.4;
  }

  50% {
    opacity: 0.1;
  }

  100% {
    opacity: 0.4;
  }
}

@keyframes blink {
  0% {
    opacity: 0.4;
  }

  50% {
    opacity: 0.1;
  }

  100% {
    opacity: 0.4;
  }
}
</style>
