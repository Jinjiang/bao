/**
 * @fileOverview
 * Generate basic webpack config.
 */
const path = require('path')

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
  vue: require.resolve('vue-loader')
}
const cssnext = require('postcss-cssnext')

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
        { test: /\.vue$/, use: { loader: pathMap.vue }}
      ]
    },
    resolve: { alias: {}},
    plugins: []
  }
}

exports.genBasicConfig = genBasicConfig
