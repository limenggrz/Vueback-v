var path = require('path')//因为有些配置必须绝对路径,导入改模式进行处理
var HtmlWebpackPlugin = require('html-webpack-plugin')//webpack中所有的插件都需要导入后进行使用
// 导出webpack需要的
module.exports = {
    //入口文件
    entry: './src/main.js',


    output: {
        //输出的路径,webpack2起就规定必须是绝对路径
        path: path.join(__dirname, "dist"),
        // publicPath: "dist",
        //输出文件名
        filename: 'bundle.js'
    },
    //解析文件配置种类
    module: {
        rules: [
            // 配置的是用来解析.css文件的loader(style-loader和css-loader)
            {
                // 1.0 用正则匹配当前访问的文件的后缀名是  .css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
            },
            // 解析less
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            //解析图片字体用的,以后可能需要修改该配置,以支持更多的文件类型
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // limit参数表示，如果图片大于50b的时候，就是路径形式，如果小于50b，就把图片变成base64格式
                        limit: 50
                    }
                }]
            },
            //配置解析vue.webpack
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            //解析es6等新语法
            {
                test: /\.js$/,
                exclude: /node_modules/,//我们在main.js入口中导入的第三方包,不需要解析,所以这里排除(好处:提高打包效率)
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            title: '个人微商'
        })
    ]
}