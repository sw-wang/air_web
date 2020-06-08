import Vue from 'vue'
import App from './App.vue'
import router from '@/config/router.config'
import store from './store'
// import axios from "@/config/axios.js";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/utils/prototype';
import '@/utils/filter'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
