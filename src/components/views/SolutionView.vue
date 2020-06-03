<template>
  <div id="solution-view">
    <h1 v-if="solution.feeling">Solution to {{ solution.feeling }}:</h1>
    <p>{{ solution.message }}</p>
    <p class="list-item">Body Language - {{ solution.bodyLanguage }}</p>
    <p class="list-item">Opposite Action - {{ solution.oppositeAction }}</p>
    <p class="list-item">Breathing - {{ solution.breathing }}</p>
    <button v-on:click="$emit('back-emit')">Back</button>
  </div>
</template>

<script>
export default {
  name: "SolutionView",
  props: {
    solution: {
      feeling: String,
      message: String,
      bodyLanguage: String,
      oppositeAction: String,
      breathing: String
    }
  },
  methods: {}
};
</script>

<style scoped>
#solution-view {
  padding: 30px;
}

.list-item {
  padding: 10px;
}
</style>