var webpack = require('webpack');
var path = require("path");

module.exports = {
  entry: [
    path.resolve(__dirname, 'assets/javascripts/app.js')
  ],
  output: {
    path: path.resolve(__dirname, "public/javascripts"),
    filename: "bundle.js"
  },
  plugins: (process.env.NODE_ENV === 'heroku') ? [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('heroku')
      }
    }),
    new webpack.optimize.DedupePlugin(),                  // 有些JS库有自己的依赖树，并且这些库可能有交叉的依赖，DedupePlugin可以找出他们并删除重复的依赖
    new webpack.optimize.OccurrenceOrderPlugin(),         //
    new webpack.optimize.CommonsChunkPlugin('common.js'), // 提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用
    new webpack.optimize.UglifyJsPlugin()                 // 解析/压缩/美化所有的js chunk
  ] : [],
  node: {
    __filename: false,
    __dirname: false,
    net: 'empty',
    dns: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            query: { presets: [ "@babel/preset-env", "@babel/preset-react" ] }
        }
      }, {
        test: /.node$/, use: 'node-loader'
      }]
  }
};
