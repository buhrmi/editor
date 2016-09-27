<style media="screen" lang="less">
  .app {
    
  }
</style>

<template lang="pug">
  .app
    editor(v-bind:site="site")
</template>

<script lang="coffee">
######## TODO: These things should be synced with the API #####################
card1 = 
  template: '<p>Title: {{ card.title }}</p><p>Content: {{ card.content }}</p>'
  data:
    title: "This is a card title"
    content: "This is card content"
card2 =
  template: '<p>Title: {{ card.title }}</p><p>Content: {{ card.content }}</p>'
  data:
    title: "This is another title"
    content: "This is more content"

page1 =
  cards: [card1, card2]
  template: '<html><head><title>{{ page.title }}</title></head><body><h1>This is blueprint text</h1>{{ content }}</body></html>'
  data:
    title: 'Woot'
    
site =
  pages: [page1]
######################################################################
    

module.exports =
  components:
    Editor: require('./editor.vue')
  data: ->
    site: site
        
</script>
