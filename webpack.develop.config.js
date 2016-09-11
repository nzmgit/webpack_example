var path = require('path');

module.exports = {
    // 选择一个入口文件
    entry:[
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname,'src/js/app.js')
    ],

    // 输出文件位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
}
