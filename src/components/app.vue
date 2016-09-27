<style media="screen" lang="less">
  .app {
    
  }
</style>

<template lang="pug">
  .app
    editor(v-bind:site="site")
</template>

<script lang="coffee">
######## TODO: Placeholder for data from API #####################
card1 = 
  id: 1
  template: '<p>Title: {{ card.title }}</p><p>Content: {{ card.content }}</p>'
  data:
    title: "This is a card title"
    content: "This is card content"
card2 =
  id: 2
  template: '<p>Title: {{ card.title }}</p><p>Content: {{ card.content }}</p>'
  schema:
    title:
      type: 'text'
    content:
      type: 'html'
    background:
      type: 'image'
  data:
    title: "This is another title"
    content: "This is more content"

page1 =
  id: 1
  cards: [card1, card2]
  template: '<html><head><title>{{ page.title }}</title></head><body><h1>This is blueprint text</h1><div id="content">{{ content }}</div><footer>This is the footer</footer></body></html>'
  data:
    title: 'Woot'
    
site =
  id: 1
  pages: [page1]
######################################################################
    

module.exports =
  components:
    Editor: require('./editor.vue')
  data: ->
    site: site
        
</script>
