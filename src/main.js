import Vue from 'vue'

import App from './components/app.vue'

// mount a root Vue instance
Vue.use(require('vue-sync'))

new Vue({
    render(h) {
      return h(App)
    }
}).$mount('app')
