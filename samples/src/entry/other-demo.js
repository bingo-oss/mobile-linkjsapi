import App from '../views/other-demo.vue'
import buiweex from 'bui-weex'
import common from '../js/common'

Vue.use(buiweex);
Vue.use(common);
App.el = '#root'

new Vue(App)