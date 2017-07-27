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
  eslint: require.resolve('eslint-loader'),
  style: require.resolve('style-loader'),
  css: require.resolve('css-loader'),
  postcss: require.resolve('postcss-loader'),
  less: require.resolve('less-loader'),
  sass: require.resolve('sass-loader'),
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

        // pre loader: eslint
        { enforce: 'pre',
          test: /\.jsx?$/,
          loader: pathMap.eslint,
          options: { configFile: path.resolve(__dirname, '.eslintrc.json')},
          exclude: /node_modules/ },

        // loaders for javascript
        { test: /\.jsx?$/, use: {
          loader: pathMap.babel,
          options: { presets: [pathMap.babelEnv, pathMap.babelReact]}},
          exclude: /(node_modules|bower_components)/ },
        { test: /\.tsx?$/, use: pathMap.typescript },
        { test: /\.json$/, use: pathMap.json },

        // loaders for css
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

        // loaders for vue
        { test: /\.vue$/, use: { loader: pathMap.vue,
          options: { postcss: [cssnext()]}}}
      ]
    },
    resolve: {
      alias: {},
      extensions: ['.js', '.jsx']
    },
    plugins: []
  }
}

exports.genBasicConfig = genBasicConfig
