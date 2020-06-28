import Vue from 'vue';
import App from './App.vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

new Vue({
  render(h) { return h(App); },
}).$mount('#app');
