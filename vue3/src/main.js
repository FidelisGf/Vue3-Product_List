/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import { createPinia } from 'pinia'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import VueAxios from 'vue-axios'
import axios from '@/Service/Service'


const app = createApp(App)
app.use(createPinia())
app.use(VueAxios, axios)
registerPlugins(app)
app.mount('#app')
