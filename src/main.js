import Vue from 'vue'
import App from './App.vue'
import Lyticus from 'lyticus'

Vue.config.productionTip = false

const lyticus = new Lyticus('PWLwclOCg0jCPUMYfuYtr', {
  development: process.env.NODE_ENV === 'development'
})

// Track the navigator
lyticus.trackNavigator()

// Start history mode to automatically track page views
lyticus.startHistoryMode()

Vue.prototype.$lyticus = lyticus

new Vue({
  render: h => h(App),
}).$mount('#app')
