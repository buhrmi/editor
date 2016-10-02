<template lang="pug">
  .inspector
    .separator(v-show="hoveredType == 'seperator'" v-bind:style="hoveredElementPositioning")
    .card(v-show="hoveredType == 'card'" v-bind:style="hoveredElementPositioning")
    p Selected Element: {{ selectedType }} {{ selectedData }}
</template>

<script lang="coffee">
module.exports =
  props: ['hoveredElement', 'selectedElement']
  data: ->
    hoveredType: null
    selectedType: null
    selectedData: null
    hoveredElementBounds: null
    hoveredElementPositioning: null
  
  watch: 
    selectedElement: (newElement, oldElement) ->
      return unless newElement
      
      if newElement.classList.contains('__card')
        id = newElement.dataset.id
        this.selectedData = "card ID #{id} (TODO: use vuex and get data from store)"
      else
        this.selectedData = 'placeholder to insert a new card'

    hoveredElement: (newElement, oldElement) ->
      oldElement.classList.remove('hovered') if oldElement
      
      unless newElement
        this.hoveredType = null
        return
        
      newElement.classList.add('hovered')
      
      pageElement = document.getElementById('page')
      this.hoveredElementBounds = {
        top: newElement.getBoundingClientRect().top + pageElement.getBoundingClientRect().top,
        left: newElement.getBoundingClientRect().left + pageElement.getBoundingClientRect().left,
        width: newElement.getBoundingClientRect().width,
        height: newElement.getBoundingClientRect().height
      }
      this.hoveredElementPositioning = {
        top: this.hoveredElementBounds.top + 'px',
        left: this.hoveredElementBounds.left + 'px',
        width: this.hoveredElementBounds.width + 'px',
        height: this.hoveredElementBounds.height + 'px',
      }
      
      if newElement.classList.contains('__card_separator')  
        this.hoveredType = 'seperator'
      if newElement.classList.contains('__card')  
        this.hoveredType = 'card'
        
</script>

<style lang="less" scoped>
  .separator {
    position: absolute;
    border-top: 1px solid blue;
    pointer-events: none;
  }
  .card {
    position: absolute;
    border: 1px solid blue;
    pointer-events: none;
  }
</style>
