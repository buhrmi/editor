<template lang="pug">
  .inspector
    .separator(v-show="hoveredType == 'seperator'" v-bind:style="hoveredElementPositioning")
    .card(v-show="hoveredType == 'card'" v-bind:style="hoveredElementPositioning")
    .ui_window.inspector.docked
      .inspector_tabs
        .tab_button.selected Content
        .tab_button Layout
        .tab_button Data
        .tab_button Assets
      .inspector_content(v-if="editingObject")
        .button(@click="appState.editingTemplate = editingObject.template") Edit Template
        .fields
          .field(v-for="(fieldDef, fieldName) in editingObject.schema")
            label {{ fieldName }}
            input(v-model="editingObject.data[fieldName]")
            span ({{ fieldDef['type'] }})
      .inspector_content(v-show="!editingObject") No Selection
    .ui_window.template_editor.docked(v-show="appState.editingTemplate")
      .title_bar Template
      .button(@click="appState.editingTemplate = null") Close
      ace(v-bind:template="appState.editingTemplate")
</template>

<script lang="coffee">
module.exports =
  components:
    Ace: require('./ace.vue')
  props: ['hoveredElement', 'selectedElement', 'page']
  data: ->
    hoveredType: null
    inspectorTitle: null
    editingObject: null
    editingTemplate: null
    hoveredElementBounds: null
    hoveredElementPositioning: null
    appState: AppState
  methods:
    editTemplate: (template) ->
      this.$store.state.editingTemplate = template
  mounted: ->
    windows = document.querySelectorAll('.ui_window')
    for _uiWindow in windows
      do ->
        uiWindow = _uiWindow
        # interact(uiWindow)
        #   .draggable
        #     inertia: true
        #     restrict:
        #       restriction: 'body'
        #       endOnly: true
        #       elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        #     onmove: (event) ->
        #       x = parseFloat(uiWindow.getBoundingClientRect().left) + event.dx
        #       y = parseFloat(uiWindow.getBoundingClientRect().top) + event.dy
        #       uiWindow.style.left = x + 'px'
        #       uiWindow.style.top  = y + 'px'
        #   .resizable
        #     edges: { left: true, right: true, bottom: true, top: true }
        #   .on 'resizemove', (event) ->
        #     x = parseFloat(uiWindow.getBoundingClientRect().left)
        #     y = parseFloat(uiWindow.getBoundingClientRect().top)
        #     uiWindow.style.width  = event.rect.width + 'px';
        #     uiWindow.style.height = event.rect.height + 'px';

  watch: 
    selectedElement: (newElement, oldElement) ->
      return unless newElement
        
      if newElement.classList.contains('__card')
        id = newElement.dataset.id
        for card in this.page.cards
          selectedCard = card if parseInt(card.id) == parseInt(id)
        return unless selectedCard
        
        this.editingObject = selectedCard
        this.inspectorTitle = 'Card Data'
      
      else
        this.editingObject = null
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
  @import '../globals.less';
  
  .ui_window {
    // border: 1px solid #ccc;
    width: 290px;
    height: 400px;
    position: fixed;
    top: 150px;
    left: 900px;
    background: @menu-light-bg;
    // box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 17px -4px;
    // border-radius: 7px;
    overflow: auto;
    color: #ccc;
    &.inspector.docked {
      width: @sidebar-width;
      top: 0;
      right: 0;
      bottom: 0;
      left: auto;
      height: auto;
    }
    &.template_editor.docked {
      width: auto;
      height: @template-editor-height;
      right: @sidebar-width;
      bottom: 0;
      left: 0;
      top: auto;
    }
    .inspector_tabs {
      height: @menu-height;
      // background: @menu-dark-bg;
      border-left: 1px solid @menu-dark-bg;
      background-color: @menu-dark-bg;
      .tab_button {
        display: inline-block;
        height: @menu-height;
        padding: 0 20px;
        font-size: 13px;
        background: linear-gradient(#343434, #393939);
        border-bottom: 1px solid @menu-dark-bg;
        border-right: 1px solid @menu-dark-bg;
        line-height: @menu-height;
        &.selected {
          border-bottom: none;
          background: @menu-light-bg;
        }
      }
    }
    input {
      padding: 4px 4px;
      display: block;
      font-size: 12px;
      font-family: Arial, Helvetica, sans-serif;
      text-shadow: 0 -1px rgba(0, 0, 0, 0.3);
      width: 100%;
      border: 0;
      margin: 0;
      color: #d6d6d6;
      -webkit-transition: color 0.05s ease;
      transition: color 0.05s ease;
      position: relative;
      background: -webkit-linear-gradient(#343434, #393939);
      background: linear-gradient(#343434, #393939);
      color: #999999;
      box-shadow: 0 1px 0 #535353;
      height: 24px;
      // width: 60px;
      border: 1px solid #272727;
      border-radius: 2px;
      &:focus {
        color: #eee;
      }
    }
    .inspector_content {
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
  .button {
    user-select: none;
    background: linear-gradient(#656565, #5f5f5f);
    
    display: inline-block;
    text-align: center;
    text-decoration: none;
    color: #d6d6d6;
    padding: 4px 10px;
    line-height: 20px;
    box-shadow: 0 1px 0 #535353, inset 0 1px 0 rgba(255, 255, 255, 0.08);
    background-color: linear-gradient(#656565, #5f5f5f);
    border: 1px solid #3c3c3c;
    border-radius: 2px;
    font-size: 12px;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    &:hover {
      color: #eee;
    }
  }
</style>
