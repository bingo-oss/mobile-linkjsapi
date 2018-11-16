import App from '../../src/views/microblog-demo.vue'
import buiweex from 'bui-weex';
Vue.use(buiweex);
App.el = '#root'
new Vue(App)
