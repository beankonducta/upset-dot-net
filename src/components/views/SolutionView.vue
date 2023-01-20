<template>
  <div id="solution-view">
    <h1 id="header" v-if="solution.emotion">Feeling {{ solution.emotion }}, eh?</h1>
    <div id="list">
      <p> <b>Here's a Tip</b> - {{ solution.practicalTip }}</p>
      <!-- <p v-for="solution in solutions" :key="solution.feeling"> {{ solution.feeling }}</p> -->
      <p v-if="validSolution(solution.oppositeReaction)" class="list-item"><b>Opposite Reaction</b> - {{ solution.oppositeReaction }}</p>
    </div>
    <button v-on:click="$emit('back-emit')">Back</button>
  </div>
</template>

<script>
export default {
  name: "SolutionView",
  props: {
    solution: {
      emotion: String,
      practicalTip: String,
      oppositeReaction: String
    }
  },
  methods: {
    validSolution(solution) {
      return solution !== null && solution !== "";
    }
  }
};
</script>

<style scoped>
#solution-view {
  margin: 0 auto;
  padding: 30px;
  max-width: 600px;
}

#header {
  padding: 10px;
  border-bottom: 4px solid #f5164e;
}

#list {
  text-align: left;
}

.list-item {
}
</style>
