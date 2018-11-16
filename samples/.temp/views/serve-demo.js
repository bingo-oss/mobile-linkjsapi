import App from '../../src/views/serve-demo.vue'
import buiweex from 'bui-weex';
Vue.use(buiweex);
App.el = '#root'
new Vue(App)
