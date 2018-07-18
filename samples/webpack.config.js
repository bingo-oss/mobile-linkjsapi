var fs = require('fs');
var webpack = require('webpack');
var glob = require("glob");
var copy = require('copy-webpack-plugin');

var bannerPlugin = new webpack.BannerPlugin(
    '// { "framework": "Vue" }\n',
    {raw: true}
)

// var optimizePlugin = new webpack.optimize.UglifyJsPlugin({
//   compress: {
//     warnings: false
//   },
//   //保留banner
//   comments: /{ "framework": "Vue" }/,
//   sourceMap: true
// })

//  文件拷贝插件,将图片和字体拷贝到dist目录
var copyPlugin = new copy([
    {from: './src/image', to: "./image"},
    {from: './node_modules/bui-weex/src/font', to: "./font"}
])

// 遍历文件入口,动态生成入口
function getEntries () {
    var entryFiles = glob.sync('./src/entry/**', { 'nodir': true})
    var entries = {};
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.split('entry/')[1];
        filename = filename.substr(0, filename.lastIndexOf('.'));
        entries[filename] = filePath;
    }
    return entries;
}

// 生成webpack配置
function getBaseConfig() {
    return {
        entry: getEntries(),
        output: {
            path: 'dist',
        },
        resolve: {
            alias : {
                src : __dirname + '/src',
                css : __dirname + '/src/css',

            },
            extensions: ['', '.js', '.vue', '.scss']
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                }, {
                    test: /\.vue(\?[^?]+)?$/,
                    loaders: []
                }, {
                    test: /\.scss$/,
                    loader: 'style!css!sass'
                },{
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },
        vue: {},
        plugins: [bannerPlugin, copyPlugin]
    }
}

var webConfig = getBaseConfig();
webConfig.output.filename = '[name].web.js';
webConfig.module.loaders[1].loaders.push('vue');

var weexConfig = getBaseConfig();
weexConfig.output.filename = '[name].weex.js';
weexConfig.module.loaders[1].loaders.push('weex');
//按需增加webConfig
// module.exports = [webConfig,weexConfig];
module.exports = [weexConfig];