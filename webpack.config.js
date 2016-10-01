var path = require("path");

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    path.join(__dirname, "public/javascripts/app.js")
  ],
  output: {
    path: path.resolve(__dirname, "views"),
    publicPath: "/assets/",
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
