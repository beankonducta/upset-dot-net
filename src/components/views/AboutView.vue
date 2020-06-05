<template>
  <div id="about-view">
    <h1>What <i>is</i> this tool?</h1>
    <p>
      This site was created to be a simple, easy to use resource in a moment of turmoil. It's based on DBT skills for emotion regulation.
      It's meant to be used
      <i>in the moment</i>, as a way to help change your emotional response to a given situation. Each 'solution'
      gives you a body language adjustment, a breathing exercise and an opposite emotion / reaction tip. It should only
      take a couple of minutes to follow the provided 'solution' and take back control of your emotional state.
    </p>
     <h1>What <i>isn't</i> this tool?</h1>
    <p>
      This site is not medical advice. It isn't written by a medical professional, rather made by a programmer who found
      these exercises invaluable when dealing with undesirable emotional responses to normal situations. The 'solutions' are 
      not actual solutions, rather simple steps to help regain control of your emotions.
    </p>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  methods: {}
};
</script>

<style scoped>
#about-view {
  margin: 0 auto;
  padding: 30px;
  max-width: 600px;
}
p {
    text-align: left;
}
</style>