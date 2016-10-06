<template lang="pug">
  .editor(v-bind:class="{previewing: previewing, editing_template: appState.editingTemplate}")
    .menu
      .site.button Current Page: {{ currentPage.data.title }}
      .preview_button.button(@click="togglePreview")
        span.fa(v-bind:class="{'fa-eye': !previewing, 'fa-edit': previewing}")
    .preview_wrapper(@mousemove="updatedHoveredElement" @click="selectHoveredElement")
      browser-facade(v-bind:page="currentPage")
      iframe#page
    inspector(v-show="!previewing" v-bind:hovered-element="hoveredElement" v-bind:selected-element="selectedElement" v-bind:page="currentPage")
</template>

<style media="screen" lang="less" scoped>
   @import '../globals.less';
   
  .editor {
    overflow: auto;
    transition: all 0.3s;
    position: absolute;
    top: @menu-height;
    bottom: 0;
    left: 0;
    right: @sidebar-width;
    &.editing_template {
      bottom: @template-editor-height;
    }
  }
  
  .preview_wrapper {
    margin: 0px 60px;
    transition: all 0.3s;
    position: relative;
    top: 30px;
    height: 100% - @menu-height;
  }

  .menu {
    height: @menu-height;
    line-height: @menu-height;
    box-shadow:  0px 5px 10px rgba(0,0,0,0.3);
    background-color: @menu-light-bg;
    border-bottom: 1px solid @menu-dark-bg;
    position: fixed;
    transition: all 0.3s;
    top: 0;
    right: @sidebar-width;
    left: 0;
    z-index: 1000;
    color: #ccc;
    
    .preview_button {
      border: 1px solid black;
      z-index: 1000;
      // position: fixed;
      display: inline-block;
      right: @sidebar-width;
      background-color: @menu-light-bg;
      border-bottom: 1px solid @menu-dark-bg;
      // transition: all 0.3s;
    }
    
    .button {
      display: inline-block;
      height: inherit;
      padding: 0 16px;
      cursor: pointer;
      top: 0;
      .fa {
        font-size: 22px;
      }
      &:hover {
        // background-color: @menu-dark-bg;
        color: #eee;
      }
    }
    
    a {
      color: #bbb;
    }
  
  }
  #page {
    pointer-events: none;
    border: none;
    width: 100%;
    position: relative;
    box-shadow:  0px 5px 10px rgba(0,0,0,0.3);
    background: white;
    top: 0;
    transition: all 0.3s;
    min-height: 0%;
    overflow: none;
  }
  .editor.previewing {
    margin-top: 0px;
    top: 0px;
    height: ~"calc(100% - 0px)";
    overflow: hidden;
    right: 0;
    .browser_facade {
      opacity: 0;
      padding: 0px 16px 0px 16px;
    }
    .preview_wrapper {
      // transform: scale(1);
      top: 0px;
      margin: 0;
      height: 100%;
    }
    .preview_button {
      right: 0;
      position: fixed;
    }
    #page {
      min-height: 100%;
      pointer-events: all;
      overflow: auto;
      height: 100% !important;
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
      appState: AppState
    mounted: ->
      this.renderPage()
    watch:
      'site':
        handler: -> this.renderPage()
        deep: true
    methods: 
      renderPage: ->
        pageElement = document.getElementById('page')
        pageDoc = pageElement.contentDocument
        pageData = this.currentPage.data
        # rendering is done using liquid. first, the content elements are rendered, then the blueprint is rendered.
        separator = '<div class="__card_separator"></div>'
        contentHTML = separator
        for card in this.currentPage.cards
          cardLiquid = Liquid.parse(card.template.content)
          cardHTML = cardLiquid.render({card: card.data, page: pageData})
          contentHTML += "<div class='__card' data-id='#{card.id}'>" + cardHTML + '</div>' + separator
        blueprintTemplate = this.currentPage.template.content
        blueprintLiquid = Liquid.parse(blueprintTemplate)
        renderedHTML = blueprintLiquid.render({page: pageData, content: contentHTML, cards: (card.data for card in this.currentPage.cards)})
        pageDoc.getElementsByTagName('html')[0].innerHTML = renderedHTML
        document.title = pageDoc.title + ' | Editor'
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
