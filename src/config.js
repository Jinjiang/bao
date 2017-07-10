/**
 * @fileOverview
 * Generate basic webpack config.
 */

function genBasicConfig () {
  return {
    entry: 'index.js',
    output: {
      path: '.',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        { test: /\.js$/, use: { loader: 'babel-loader', options: { presets: ['env']}}, exclude: /(node_modules|bower_components)/ },
        { test: /\.json$/, use: 'json-loader' },
        { test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }]},
        { test: /\.vue$/, use: 'vue-loader' }
      ]
    }
  }
}

exports.genBasicConfig = genBasicConfig
