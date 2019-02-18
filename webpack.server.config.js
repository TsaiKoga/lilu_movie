var webpack = require("webpack");
var fs = require("fs");
var path = require("path");

module.exports = {
  entry: [
    path.resolve(__dirname, 'server.js')
  ],

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

  node: {
    __filename: true,
    __dirname: true
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
}
