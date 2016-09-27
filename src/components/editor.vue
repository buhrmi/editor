<template lang="pug">
  .editor(v-bind:class="{previewing: previewing}")
    .menu
      a.toggle_button(@click="togglePreview") {{ previewing ? 'Edit' : 'Preview' }}
    .preview_wrapper(@mousemove="updatedHoveredElement")
      browser-facade
      iframe#page
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
    props: [
      'site'
    ]
    computed:
      currentPage: ->
        this.site.pages[0]
    data: ->
      previewing: true
      appName: 'Qurate Cloud Site Editor'
      hoveredElement: null
    ready: ->
      this.renderPage()
    watch: 
      hoveredElement: (newElement, oldElement) ->
        console.log('hovering ', newElement, oldElement)
        oldElement.classList.remove('hovered') if oldElement
        return unless newElement
        newElement.classList.add('hovered')
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
          contentHTML += cardHTML + separator
        blueprintTemplate = this.currentPage.template
        blueprintLiquid = Liquid.parse(blueprintTemplate)
        renderedHTML = blueprintLiquid.render({page: pageData, content: contentHTML})
        # renderedPage = blueprintHTML.replace('{{ yield }}', cardHTML + cardHTML) # TODO: make it real
        pageDoc.getElementsByTagName('html')[0].innerHTML = renderedHTML
        document.title = pageDoc.title
        page.style.height = pageDoc.body.scrollHeight + 'px'
      updatedHoveredElement: (event) ->
        
        pageDoc = document.getElementById('page').contentDocument
        separators = pageDoc.getElementsByClassName('__card_separator')
        pageY = event.clientY - document.getElementById('page').getBoundingClientRect().top
        pageX = event.clientX - document.getElementById('page').getBoundingClientRect().left
        for separator in separators
          y = separator.getBoundingClientRect().top
          if Math.abs(y - pageY) < 10
            return this.hoveredElement = separator
        
        this.hoveredElement = null
        
      hidePageElements: ->
        true
      togglePreview: ->
        this.previewing = !this.previewing
        
</script>
