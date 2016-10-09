<style media="screen" lang="less">
  .app {
    height: 100%;
    // overflow: auto;
  }
</style>

<template lang="pug">
  .app
    editor(v-bind:site="site")
</template>

<script lang="coffee">
######## TODO: Placeholder for data from API #####################
template1 =
  id: 1
  html: '<html><head><style>.card {padding: 40px;}</style><title>{{ page.title }}</title></head><body><h1>This is blueprint text</h1><div id="content">{{ content }}</div><footer>This is the footer</footer></body></html>'
template2 =
  id: 2
  html: '<div class="card">Title: {{ card.title }}</p><p>Content: {{ card.content }}</div>'
  
card1 = 
  id: 1
  template_id: 2
  template: template2
  schema:
    title:
      type: 'text'
    content:
      type: 'html'
    background:
      type: 'image'
  data:
    title: "This is a card title"
    content: "This is card content"
card2 =
  id: 2
  template_id: 2
  template: template2
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
  template: template1
  # cards: [card1, card2,card2,card2,card2,card2,card2,card2]
  data:
    title: 'My Site'
    
site =
  id: 1
  pages: [page1]
  templates: [template1, template2]
  
######################################################################
VueSync = require('vue-sync')
websocket = VueSync.websocketStrategy('ws://localhost:8000')
# localSync = VueSync.localStrategy('ws://localhost:8000')


module.exports =
  components:
    Editor: require('./editor.vue')
  data: ->
    site: site
  sync:
    'site': websocket('mystuff')
        
</script>
