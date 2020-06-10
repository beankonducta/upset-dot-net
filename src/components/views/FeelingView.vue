<template>
  <div id="feeling-view">
    <h1 id="header">I'm Feeling:</h1>
    <input v-model="feeling" placeholder="placeholder"/>
    <br />
    <button v-on:click="submit()" :disabled="!feeling || feeling.length === ''" v-bind:class="loading ? 'loading' : ''">
      Submit
    </button>
    <p id="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "FeelingView",
  props: {
    error: String,
    loading: Boolean
  },
  methods: {
    randomFeeling() {
      const ran = Math.floor(Math.random() * 9) + 1;
      if (ran === 1) return "anger";
      if (ran === 2) return "sad";
      if (ran === 3) return "envy";
      if (ran === 4) return "shame";
      if (ran === 5) return "guilt";
      if (ran === 6) return "jealous";
      if (ran === 7) return "extremely mad at my friend";
      if (ran === 8) return "stressed about everything";
      if (ran === 9) return "happy";
    },
    submit() {
      this.$emit("feeling-emit", this.feeling);
    }
  },
  data() {
    return {
      feeling: '',
      placeholder: this.randomFeeling()
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
  color: #f5164e;
  padding: 5px;
}
</style>
