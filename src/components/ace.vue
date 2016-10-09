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
      if this.template
        editor.setValue( this.template.html)
      editor.getSession().on 'change', =>
        this.template.html = editor.getValue()
         
    template: (newTemplate) ->
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
