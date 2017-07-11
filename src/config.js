/**
 * @fileOverview
 * Generate basic webpack config.
 */
const path = require('path')

function genBasicConfig () {
  return {
    entry: path.resolve('index.js'),
    output: {
      path: path.resolve('.'),
      filename: 'bundle.js'
    },
    context: path.resolve(__dirname, '../'),
    module: {
      rules: [
        { test: /\.js$/, use: { loader: 'babel-loader', options: { presets: ['env']}}, exclude: /(node_modules|bower_components)/ },
        { test: /\.jsx$/, use: { loader: 'babel-loader', options: { presets: ['env', 'react']}}},
        { test: /\.json$/, use: 'json-loader' },
        { test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }]},
        { test: /\.vue$/, use: 'vue-loader' }
      ]
    }
  }
}

exports.genBasicConfig = genBasicConfig
