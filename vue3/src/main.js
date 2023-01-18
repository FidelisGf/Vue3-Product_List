/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import pinia from './store'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import VueAxios from 'vue-axios'
import axios from '@/Service/Service'
import VueImageZoomer from 'vue-image-zoomer'
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
import InnerImageZoom from 'vue-inner-image-zoom';App

const app = createApp(App)
app.use(pinia)
app.use(InnerImageZoom)
app.use(VueImageZoomer)
app.use(VueAxios, axios)
registerPlugins(app)
app.mount('#app')
