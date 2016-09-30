import Vue from 'vue'

import App from './components/app.vue'

// mount a root Vue instance
Vue.use(require('vue-sync'))

new Vue({
  el: 'body',
  components: {
    app: App
  }
})
