var path = require('path');

module.exports = {
    // 选择一个入口文件
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'src/js/app.js')
    ],
    // 输出文件位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            // 处理jsx和es6语法的
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径
                loader: 'babel',// 加载模块 "babel"
                query: {
                    presets: ['es2015', 'react']
                }
            },
            // 处理js中引用的css
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' //Run both loaders 两个加载器中间用！隔开，而且执行顺序是从右往左
            },
           // 处理sass文件
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            // 处理图片的加载器
            {
                test: /\.(png|jpg)$/,
                // 如果图片的大小小于limit的限制大小，那webpack就会把图片装化为base64的字符串，添加在js文件中。否则是图片路径
                // name属性可以控制大于2.5kb的图片的输出位置
                loader: 'url?limit=25000&name=img/[name].[ext]'
            }
        ]
    }
}
