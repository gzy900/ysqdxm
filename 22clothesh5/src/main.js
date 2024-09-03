import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router";
import SvgIcon from './components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(router)
app.component('SvgIcon', SvgIcon)

app.mount('#app')
