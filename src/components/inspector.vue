<template lang="pug">
  .inspector
    .separator(v-show="hoveredType == 'seperator'" v-bind:style="hoveredElementPositioning")
    .card(v-show="hoveredType == 'card'" v-bind:style="hoveredElementPositioning")
    .inspector_window
      .title_bar {{ inspectorTitle ? inspectorTitle : 'No Selection' }}
      .fields
        .field(v-for="(fieldDef, fieldName) in editingSchema")
          label {{ fieldName }}
          input(v-model="editingData[fieldName]")
          span ({{ fieldDef['type'] }})    
</template>

<script lang="coffee">
module.exports =
  props: ['hoveredElement', 'selectedElement', 'page']
  data: ->
    hoveredType: null
    inspectorTitle: null
    editingData: null
    editingSchema: null
    hoveredElementBounds: null
    hoveredElementPositioning: null
    
  mounted: ->
    inspectorEl = document.querySelectorAll('.inspector_window')[0]
    interact(inspectorEl)
      .draggable
        inertia: true
        restrict:
          restriction: 'body'
          endOnly: true
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        onmove: (event) ->
          x = parseFloat(inspectorEl.getBoundingClientRect().left) + event.dx
          y = parseFloat(inspectorEl.getBoundingClientRect().top) + event.dy
          inspectorEl.style.left = x + 'px'
          inspectorEl.style.top  = y + 'px'
      .resizable
        edges: { left: true, right: true, bottom: true, top: true }
      .on 'resizemove', (event) ->
        x = parseFloat(inspectorEl.getBoundingClientRect().left)
        y = parseFloat(inspectorEl.getBoundingClientRect().top)
        inspectorEl.style.width  = event.rect.width + 'px';
        inspectorEl.style.height = event.rect.height + 'px';
    
  watch: 
    selectedElement: (newElement, oldElement) ->
      return unless newElement
        
      if newElement.classList.contains('__card')
        id = newElement.dataset.id
        for card in this.page.cards
          selectedCard = card if parseInt(card.id) == parseInt(id)
        return unless selectedCard
        
        this.editingData = selectedCard.data
        this.editingSchema = selectedCard.schema
        this.inspectorTitle = 'Edit Card'
      
      else
        this.editingData = null
        this.editingSchema = null
        this.inspectorTitle = 'Insert Card'

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
  .inspector_window {
    border: 1px solid #ccc;
    width: 290px;
    height: 400px;
    position: fixed;
    top: 150px;
    left: 900px;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 17px -4px;
    border-radius: 7px;
    overflow: auto;
    .title_bar {
      border-bottom: 1px solid #ddd;
      padding: 4px 12px;
    }
    .fields {
      padding: 12px;
    }
  }
  .separator {
    position: fixed;
    border-top: 1px solid blue;
    pointer-events: none;
  }
  .card {
    position: fixed;
    border: 1px solid blue;
    pointer-events: none;
  }
</style>
