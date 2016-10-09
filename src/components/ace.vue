<template lang="pug">
  .ace(v-show="template")
    #template_ace
</template>

<script lang="coffee">
editor = null

module.exports =
  props: ['template']
  data: ->
    appState: window.AppState
  watch:
    'appState.templateEditorOpen': (isOpen, oldValue) ->
      return unless isOpen
      return if editor
      editor = ace.edit("template_ace");
      editor.setTheme("ace/theme/monokai");
      editor.setOptions fontSize: "12pt"
      # editor.getSession().setMode("ace/mode/javascript");
      editor.getSession().setMode("ace/mode/html");
      if this.appState.editingTemplate
        editor.setValue( this.appState.editingTemplate.html)
      editor.getSession().on 'change', =>
        this.appState.editingTemplate.html = editor.getValue()
        
    'appState.editingTemplate': (newTemplate) ->
      return unless editor && newTemplate
      
      editor.setValue(newTemplate.html)
</script>

<style lang="less" scoped>
 @import '../globals.less';
 
 textarea {
   display: none;
 }
 .ace {
   width: 100%;
   height: 100%;
 }
 #template_ace {
   height: 100%;
   width: 100%;
 }
</style>
