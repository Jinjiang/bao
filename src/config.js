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
    resolve: {
      alias: {}
    },
    context: path.resolve(__dirname, '../'),
    module: {
      rules: [
        { test: /\.js$/, use: {
          loader: 'babel-loader',
          options: { presets: resolveModulePath(['babel-preset-env'])}},
          exclude: /(node_modules|bower_components)/ },
        { test: /\.jsx$/, use: {
          loader: 'babel-loader',
          options: { presets: resolveModulePath(['babel-preset-env', 'babel-preset-react'])}}},
        { test: /\.json$/, use: 'json-loader' },
        { test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }]},
        { test: /\.vue$/, use: 'vue-loader' }
      ]
    }
  }
}

function resolveModulePath (names) {
  if (typeof names === 'string') {
    return resolveModulePath([names])
  }
  const result = names.map(require.resolve)
  // console.log(names, result)
  return result
}

exports.genBasicConfig = genBasicConfig
