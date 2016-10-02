<template lang="pug">
  .editor(v-bind:class="{previewing: previewing}")
    .menu
      a.toggle_button(@click="togglePreview") {{ previewing ? 'Edit' : 'Preview' }}
    .preview_wrapper(@mousemove="updatedHoveredElement" @click="selectHoveredElement")
      browser-facade
      iframe#page
    input(v-model='site.pages[0].data.title')
    inspector(v-show="!previewing" v-bind:hovered-element="hoveredElement" v-bind:selected-element="selectedElement")
</template>

<style media="screen" lang="less" scoped>
  .preview_wrapper {
    // width: 100%;
    margin: 100px 60px;
    // transform: scale(0.8);
    transition: all 0.3s;
    position: relative;
    // margin-top: 60px;
  }

  .menu {
    height: 30px;
    box-shadow:  0px 5px 10px rgba(0,0,0,0.1);
    padding: 16px;
    background-color: white;
    position: fixed;
    transition: all 0.3s;
    top: 0;
    width: 100%;
    z-index: 1000;
    .toggle_button {
      position: fixed;
      top: 10px;
      right: 10px;
      border: 1px solid black;
      z-index: 1000;
      padding: 8px 12px;
      cursor: pointer;
      background: white;
    }
  }
  #page {
    pointer-events: none;
    border: none;
    width: 100%;
    position: relative;
    box-shadow:  0px 5px 10px rgba(0,0,0,0.1);
    background: white;
    top: 0;
    transition: all 0.3s;
  }
  .editor.previewing {
    .browser_facade {
      opacity: 0;
    }
    .preview_wrapper {
      transform: scale(1);
      // width: 100%;
      margin: 0;
    }
    #page {
      top: -56px;
      pointer-events: all;
    }
    .menu {
      top: -62px;
      box-shadow:  0px 0px 0px rgba(0,0,0,0.0);
    }
  }
  

</style>

<script lang="coffee">

  module.exports =
    components:
      BrowserFacade: require('./browser_facade.vue')
      Inspector: require('./inspector.vue')
    props: [
      'site'
    ]
    computed:
      currentPage: ->
        this.site.pages[0]
    data: ->
      previewing: false
      hoveredElement: null
      selectedElement: null
    mounted: ->
      this.renderPage()
    methods: 
      renderPage: ->
        pageElement = document.getElementById('page')
        pageDoc = pageElement.contentDocument
        pageData = this.currentPage.data
        # rendering is done using liquid. first, the content elements are rendered, then the blueprint is rendered.
        separator = '<div class="__card_separator"></div>'
        contentHTML = separator
        for card in this.currentPage.cards
          cardLiquid = Liquid.parse(card.template)
          cardHTML = cardLiquid.render({card: card.data, page: pageData})
          contentHTML += "<div class='__card' data-id='#{card.id}'>" + cardHTML + '</div>' + separator
        blueprintTemplate = this.currentPage.template
        blueprintLiquid = Liquid.parse(blueprintTemplate)
        renderedHTML = blueprintLiquid.render({page: pageData, content: contentHTML})
        # renderedPage = blueprintHTML.replace('{{ yield }}', cardHTML + cardHTML) # TODO: make it real
        pageDoc.getElementsByTagName('html')[0].innerHTML = renderedHTML
        document.title = pageDoc.title
        page.style.height = pageDoc.body.scrollHeight + 'px'
      
      
      updatedHoveredElement: (event) ->  
        pageDoc = document.getElementById('page').contentDocument
        mousePageY = event.clientY - document.getElementById('page').getBoundingClientRect().top
        mousePageX = event.clientX - document.getElementById('page').getBoundingClientRect().left
        separators = pageDoc.getElementsByClassName('__card_separator')
        for separator in separators
          top = separator.getBoundingClientRect().top
          if Math.abs(top - mousePageY) < 10
            return this.hoveredElement = separator
        cards = pageDoc.getElementsByClassName('__card')
        for card in cards
          top = card.getBoundingClientRect().top
          bottom = top + card.getBoundingClientRect().height
          if mousePageY > top && mousePageY < bottom
            return this.hoveredElement = card
        
        
        this.hoveredElement = null
      
      selectHoveredElement: (event) ->
        this.selectedElement = this.hoveredElement
          
      hidePageElements: ->
        true
        
      togglePreview: ->
        this.previewing = !this.previewing
        this.hoveredElement = null if this.previewing
        
</script>
