import { createApp } from 'vue'
import App from './App.vue'
import style from './style/index.css'
const app = createApp(App)
app.use(style)
app.mount('#app')
