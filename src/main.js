import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/app.vue'

// mount a root Vue instance
Vue.use(Vuex)
Vue.use(require('vue-sync'))



window.AppState = {
  editingTemplate: null
}

new Vue({
    render(h) {
      return h(App)
    }
}).$mount('app')
