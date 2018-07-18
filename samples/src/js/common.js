import linkapi from 'linkapi';
import {
    baseURL, ENV
} from '../js/config.js';

const common = {
    install: function (Vue) {
        Vue.prototype.linkapi = linkapi;
        Vue.prototype.baseURL = baseURL;
        Vue.prototype.ENV = ENV;
    }
}

export default common;