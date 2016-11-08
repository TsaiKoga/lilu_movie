var webpack = require("webpack");
var fs = require("fs");
var path = require("path");

module.exports = {
  entry: path.resolve(__dirname, 'server.js'),

  output: {
    filename: 'server.bundle.js'
  },
  target: 'node',

  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
  plugins: [
    new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
  ],

  node: {
    __filename: true,
    __dirname: true
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
      }]

  }
}
