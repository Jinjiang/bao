/**
 * @fileOverview
 * Generate basic webpack config.
 */
const path = require('path')
const webpack = require('webpack')

const pathMap = {
  babel: require.resolve('babel-loader'),
  babelEnv: require.resolve('babel-preset-env'),
  babelReact: require.resolve('babel-preset-react'),
  typescript: require.resolve('ts-loader'),
  json: require.resolve('json-loader'),
  style: require.resolve("style-loader"),
  css: require.resolve("css-loader"),
  postcss: require.resolve("postcss-loader"),
  less: require.resolve("less-loader"),
  sass: require.resolve("sass-loader"),
  vue: require.resolve('vue-loader'),
  file: require.resolve('file-loader')
}
const cssnext = require('postcss-cssnext')

function genBasicConfig (isDevMode) {
  return isDevMode ? genDevBasicConfig() : genProdBasicConfig()
}

function initConfig () {
  return {
    entry: path.resolve('index.js'),
    output: {
      path: path.resolve('.'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        { test: /\.js$/, use: {
          loader: pathMap.babel,
          options: { presets: pathMap.babelEnv }},
          exclude: /(node_modules|bower_components)/},
        { test: /\.jsx$/, use: {
          loader: pathMap.babel,
          options: { presets: [pathMap.babelEnv, pathMap.babelReact]}}},
        { test: /\.tsx?$/, use: pathMap.typescript },
        { test: /\.json$/, use: pathMap.json },
        { test: /\.css$/, use: [
          { loader: pathMap.style },
          { loader: pathMap.css, options: { importLoaders: 1 }},
          { loader: pathMap.postcss, options: { plugins: () => [cssnext()]}}
        ]},
        { test: /\.less$/, use: [
          { loader: pathMap.style },
          { loader: pathMap.css, options: { importLoaders: 1 }},
          { loader: pathMap.postcss, options: { plugins: () => [cssnext()]}},
          { loader: pathMap.less }]},
        { test: /\.s(c|a)ss$/, use: [
          { loader: pathMap.style },
          { loader: pathMap.css, options: { importLoaders: 1 }},
          { loader: pathMap.postcss, options: { plugins: () => [cssnext()]}},
          { loader: pathMap.sass }]},
        { test: /\.vue$/, use: { loader: pathMap.vue,
          options: { postcss: [cssnext()]}}},
        { test: /\.(png|svg|jpg|gif)$/, use: { loader: pathMap.file }},
        { test: /\.(woff|woff2|eot|ttf|otf)$/, use: { loader: pathMap.file }}
      ]
    },
    resolve: { alias: {}},
    plugins: []
  }
}

function genDevBasicConfig() {
  const config = initConfig()
  config.devtool = 'inline-source-map'
  return config
}

function genProdBasicConfig () {
  const config = initConfig()
  config.plugins.push(genEnvPlugin())
  config.plugins.push(genMinPlugin())
  return config
}

function genEnvPlugin () {
  return new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  })
}

function genMinPlugin () {
  return new webpack.optimize.UglifyJsPlugin()
}

exports.genBasicConfig = genBasicConfig
