import Vue from 'vue'
import VueMoment from 'vue-moment'
import App from 'components/app.vue'

Vue.use(VueMoment)

new Vue(App).$mount('#app')
