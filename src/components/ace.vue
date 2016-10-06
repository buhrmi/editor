<template lang="pug">
  .ace(v-if="template")
    textarea(v-model="template.content")
</template>

<script lang="coffee">
module.exports =
  props: ['template']
</script>

<style lang="less" scoped>
 textarea {
   width: 100%;
   height: 100%;
 }
 .ace {
   width: 100%;
 }
</style>
