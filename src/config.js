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
    module: {
      rules: [
        { test: /\.js$/, use: {
          loader: resolveGlobal('babel-loader'),
          options: { presets: resolveGlobal(['babel-preset-env'])}},
          exclude: /(node_modules|bower_components)/ },
        { test: /\.jsx$/, use: {
          loader: resolveGlobal('babel-loader'),
          options: { presets: resolveGlobal(['babel-preset-env', 'babel-preset-react'])}}},
        { test: /\.json$/, use: 'json-loader' },
        { test: /\.css$/, use: [{ loader: resolveGlobal("style-loader") }, { loader: resolveGlobal("css-loader") }]},
        { test: /\.vue$/, use: resolveGlobal('vue-loader') }
      ]
    },
    resolve: { alias: {}},
    plugins: []
  }
}

function resolveGlobal (name) {
  if (Array.isArray(name)) {
    return name.map(require.resolve)
  }
  return require.resolve(name)
}

exports.genBasicConfig = genBasicConfig
