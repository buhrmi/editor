import Vue from 'vue'
import App from './components/app.vue'

Vue.use(require('vue-sync'))



window.AppState = {
  editingTemplate: null
}

new Vue({
    render(h) {
      return h(App)
    }
}).$mount('app')
