var path = require('path');
var webpack = require('webpack');
// 提取css文件的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin")
// 自动生成index.html页面插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 选择一个入口文件
    //entry:path.resolve(__dirname,'src/js/app.js'),
    //entry: [
    //    'webpack/hot/dev-server',
    //    'webpack-dev-server/client?http://localhost:8080',
    //    path.resolve(__dirname, 'src/js/app.js')
    //],
    // 输出文件位置
    // 把入口文件变为对象
    entry: {
        app: path.resolve(__dirname, 'src/js/app'),
        // 分离第三方引用
        vendors: ['react', 'react-dom']
    },
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
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                //loader: 'style!css' //Run both loaders 两个加载器中间用！隔开，而且执行顺序是从右往左
            },
            // 处理sass文件
            {
                test: /\.scss$/,
                // css-loader和sass.loader文件必须连在一起写才可以抽离sass文件
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                //loader: 'style!css!sass'
            },
            // 处理图片的加载器
            {
                test: /\.(png|jpg)$/,
                // 如果图片的大小小于limit的限制大小，那webpack就会把图片装化为base64的字符串，添加在js文件中。否则就是图片路径
                // name属性可以控制大于2.5kb的图片的输出位置
                loader: 'url?limit=25000&name=img/[name].[ext]'
            }
        ]
    },
    resolve: {
        // 自动扩展文件后缀名
        // extensions 第一个是空字符串! 对应不需要后缀的情况.
        extensions: ['', '.js', '.json', '.scss', '.jsx'],
        // 模块别名定义，方便后续直接引用别名，这样不用写长的路径名。比如直接 require('AppStore') 即可
        alias: {
            //AppStore: 'js/stores/AppStores.js',
            //ActionType: 'js/actions/ActionType.js',
            //AppAction: 'js/actions/AppAction.js'
        }
    },
    // 在这个属性里面定义的包不会被打包进bundle。需要引入cdn
    //externals: {
    //    // 前边这个名称是在项目中引用用的，相当于import React from  ‘reacta’ 中的react，
    //    //'reacta':"react",
    //    'reacta':"react",
    //    'react-doma':"react-dom",
    //     '$1':"jQuery"
    //},
    plugins:[
        //分离第三方应用插件，name属性会自动指向entry中vendros属性，filename属性中的文件会自动构建到output中的path属性下面
        new webpack.optimize.CommonsChunkPlugin({name:'vendors', filename:'vendors.js'}),
        // 用webpack压缩代码，可以忽略代码中的警告
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 可以新建多个抽离样式的文件，这样可以有多个css文件，内联样式无法抽离。
        new ExtractTextPlugin("style.css"),

        new webpack.DefinePlugin({
            //内置插件，去掉react中的警告，react会自己判断
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //自动生成html页面插件
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css": ["style.css"],
                    "js": ["bundle.js", "vendors.js"]
                }
            },
            // 去掉注释等代码
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ]
}
