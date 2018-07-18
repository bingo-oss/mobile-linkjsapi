let baseURL;
/**
 * [ENV description]
 * @type {Number}
 * 1 playground生产环境
 * 2 link生产环境
 */
let ENV = 2;

switch (ENV) {
    case 1:
        baseURL = 'http://10.201.76.107:8899/';
        break;
    case 2:
        // 测试环境
        baseURL = 'http://zhanyou.projects.bingosoft.net:8081/';

        break;
    case 3:
        // 正式环境
        // baseURL = 'https://mics.yuexiu.com/';
        baseURL = 'https://gw.yuexiu.com/news/';
        // baseURL = 'https://114.67.23.11/news/'
        break;
    default:
        // statements_def
        break;
}


export {
    baseURL,
    ENV
}
