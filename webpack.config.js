var path = require("path");

module.exports = {
  entry: [
    'webpack/hot/dev-server',             // 热启动，只有development模式下使用
    path.join(__dirname, "assets/javascripts/app.js")
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    // port: 8082,
    // historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, "public/javascripts"), // output.path 生成的js存储路径
    publicPath: 'http://localhost:8080/javascripts',     // output.publicPath:会重写你项目中html的src的前缀，例如<script src='重写前缀'>
    filename: "bundle.js"
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    dns: 'empty',
    tls: 'empty'
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
      }
    ]
  }

};
