<style media="screen" lang="less">
  .app {
    color: red;
  }
</style>

<template lang="pug">
  .app
    editor(v-bind:cards="cards")
</template>

<script lang="coffee">
card1 = 
  data:
    title: "This is a card title"
    content: "This is card content"
card2 =
  data:
    title: "This is another title"
    content: "This is more content"

module.exports =
  components:
    Editor: require('./editor.vue')
  data: ->
    cards: [card1, card2]
        
</script>
