import Vue from 'vue'
window.Vue = Vue

import App from './components/app.vue'

// mount a root Vue instance
Vue.use(require('vue-sync'))

// new Vue({
//   el: 'body',
//   components: {
//     app: App
//   }
// })

new Vue({
    render(h) {
      return h(App)
    }
}).$mount('body')
