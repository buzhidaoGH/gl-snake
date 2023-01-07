const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = (env, argv) => {
  let plugins = [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      inject: 'head',
      scriptLoading: 'blocking',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    argv.mode === 'production' ? new CleanWebpackPlugin() : undefined
  ]

  return {
    entry: './src/index.ts',  //指定入口文件
    optimization: {
      minimize: argv.mode === 'production' // 关闭代码压缩，可选
    },
    plugins: plugins.filter((element) => element),
    output: { //指定打包文件后目标目录
      path: path.resolve(__dirname, 'dist'), // 指定打包文件的目录
      filename: 'snake.js', // 打包后文件的名称
      environment: {
        arrowFunction: true, // webpack是否使用箭头函数
        const: true //webpack是否使用const
      }
    },
    module: { //指定webpack打包时使用的loader模块
      rules: [ // 指定要加载的规则
        {
          test: /\.ts$/, // test指定的是规则生效的文件
          use: [ // 要使用的loader
            'ts-loader' // ts-loader加载器
          ],
          exclude: /node-modules/  // 要排除的文件
        },
        {
          test: /\.less$/, // 设置less文件的处理
          use: ['style-loader', 'css-loader', 'less-loader']
        }
      ]
    },
    resolve: { // 对引用的模块进行配置
      extensions: ['.ts', '.tsx', '.js'], // 引用时可以忽略的后缀
      alias: {
        '@src': path.resolve(__dirname, 'src')
      }
    }
  }
}
