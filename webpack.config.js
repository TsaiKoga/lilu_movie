var path = require("path");

module.exports = {
  entry: [
    'webpack/hot/dev-server',             // 热启动，只有development模式下使用
    path.join(__dirname, "public/javascripts/app.js")
  ],
  output: {
    path: path.resolve(__dirname, "public/javascripts"), // output.path 生成的js存储路径
    publicPath: 'http://localhost:8080/', // output.publicPath:会重写你项目中html的src的前缀，例如<script src='重写前缀'>
    filename: "bundle.js"
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: { presets: ['react', 'es2015'] }
      }, {
        test: /.json$/, loader: 'json-loader'
      }, {
        test: /.node$/, loader: 'node-loader'
      }
    ]
  }

};
