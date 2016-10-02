<style media="screen" lang="less">
  .app {
    
  }
</style>

<template lang="pug">
  .app
    editor(v-bind:site="site")
    p site.pages[0].data.title is {{ site.pages[0].data.title }}
</template>

<script lang="coffee">
######## TODO: Placeholder for data from API #####################
card1 = 
  id: 1
  template: '<div class="card">Title: {{ card.title }}</p><p>Content: {{ card.content }}</div>'
  data:
    title: "This is a card title"
    content: "This is card content"
card2 =
  id: 2
  template: '<div class="card">Title: {{ card.title }}</p><p>Content: {{ card.content }}</div>'
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
  template: '<html><head><style>.card {padding: 40px;}</style><title>{{ page.title }}</title></head><body><h1>This is blueprint text</h1><div id="content">{{ content }}</div><footer>This is the footer</footer></body></html>'
  data:
    title: 'Woot'
    
site =
  id: 1
  pages: [page1]
######################################################################
VueSync = require('vue-sync')
websocket = VueSync.websocketStrategy('ws://localhost:8000')

module.exports =
  components:
    Editor: require('./editor.vue')
  data: ->
    site: site
  sync:
    'site': websocket()
        
</script>
