import Vue from 'vue'
import App from './components/app.vue'

Vue.use(require('vue-sync'))


// Global Application State
window.AppState = {
  editingTemplate: null,
  templateEditorOpen: false
}

new Vue({
    render(h) {
      return h(App)
    }
}).$mount('app')
