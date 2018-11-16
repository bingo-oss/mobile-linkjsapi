import Vue from 'vue';
import weex from 'weex-vue-render';

weex.init(Vue);



const App = require('../../src/views/other-demo.vue');
import buiweex from 'bui-weex';
Vue.use(buiweex);
new Vue(Vue.util.extend({el: '#root'}, App));
