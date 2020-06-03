<template>
  <div id="feeling-view">
    <h1 id="header">I'm Feeling:</h1>
    <input v-model="feeling" />
    <br>
    <button v-on:click="$emit('feeling-emit', feeling)">Submit</button>
    <p id="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "FeelingView",
  props: {
    error: String
  },
  methods: {
    randomFeeling() {
      const ran = Math.floor(Math.random() * 6) + 1;
      if (ran === 1) return "anger";
      if (ran === 2) return "sad";
      if (ran === 3) return "envy";
      if (ran === 4) return "shame";
      if (ran === 5) return "guilt";
      if (ran === 6) return "jealous";
    }
  },
  data() {
    return {
      feeling: this.randomFeeling()
    };
  }
};
</script>

<style scoped>
#feeling-view {
  padding: 30px;
}

#header {
  padding: 10px;
}

#error {
  color: #9E2B25;
  padding: 5px;
}
</style>