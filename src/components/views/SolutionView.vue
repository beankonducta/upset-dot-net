<template>
  <div id="solution-view">
    <h1 id="header" v-if="solution.feeling">Feeling {{ solution.feeling }}, eh?</h1>
    <div id="list">
      <p>{{ solution.message }}</p>
      <p v-for="solution in solutions" :key="solution.feeling"> {{ solution.feeling }}</p>
      <!-- <p v-if="validSolution(solution.bodyLanguage)" class="list-item"><b>Body Language</b> - {{ solution.bodyLanguage }}</p>
      <p v-if="validSolution(solution.oppositeAction)" class="list-item"><b>Opposite Emotional Action</b> - {{ solution.oppositeAction }}</p>
      <p v-if="validSolution(solution.breathing)" class="list-item"><b>Physical Action</b> - {{ solution.breathing }}</p>-->
    </div>
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
