<template lang="pug">
  .editor
    .menu
      a Preview
    .preview_wrapper
      browser-facade
      .page
        .card(v-for="card in cards")
          .card_title {{ card.data.title }}
          .card_content {{ card.data.content }}
</template>

<style media="screen" lang="less" scoped>
  .preview_wrapper {
    width: 100%;
    margin: 0 auto;
    transform: scale(0.8);
  }
  .menu {
    height: 30px;
    box-shadow:  0px 5px 10px rgba(0,0,0,0.1);
    padding: 16px;
    background-color: white;
  }
  .page {
    position: relative;
    box-shadow:  0px 5px 10px rgba(0,0,0,0.1);
    background: white;
  }
  
  // This should not be hardcoded
  .card {
    padding: 30px;
  }
</style>

<script lang="coffee">
  module.exports =
    components:
      BrowserFacade: require('./browser_facade.vue')
    props: [
      'cards'
    ]
    data: ->
      appName: 'Qurate Cloud Site Editor'
</script>
