<template>
  <div id="feeling-view">
    <h1>I'm Feeling:</h1>
    <input v-model="feeling" />
    <button v-on:click="$emit('feeling-emit', feeling)">Submit</button>
  </div>
</template>

<script>
export default {
  name: "FeelingView",
  props: {},
  methods: {
    randomFeeling() {
      const ran = Math.floor(Math.random() * 3) + 1;
      if (ran === 1) return "angry";
      if (ran === 2) return "sad";
      if (ran === 3) return "joyful";
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
</style>