import { createApp } from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva';
import './assets/main.css'

const app = createApp(App)
app.mount('#app')
app.use(VueKonva)



