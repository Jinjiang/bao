/**
 * @fileOverview
 * Main Class to config and build.
 *
 * Bao#input
 * Bao#output
 *
 * Bao#build(isWatchMode)
 */

const path = require('path')
const webpack = require('webpack')

const { genBasicConfig } = require('./config')
const { getAliasConfig, getCommonChunksConfig } = require('./runtime-config')

class Bao {

  constructor (config) {
    const { input, output } = config
    this.input = path.resolve(input || 'index.js')
    this.output = path.resolve(output || 'bundle.js')
  }

  build (isWatchMode) {
    const webpackConfig = this._genWebpackConfig()
    const compiler = webpack(webpackConfig)
    // @todo: error handling & stats info
    if (isWatchMode) {
      compiler.watch({}, (err, stats) => {
        console.log('[updated]')
      })
    } else {
      compiler.run((err, stats) => {
        console.log('[done]')
      })
    }
  }

  _genWebpackConfig () {
    const webpackConfig = genBasicConfig()
    const aliasConfig = getAliasConfig()
    const commonChunksConfig = getCommonChunksConfig()
    webpackConfig.entry = this.input
    webpackConfig.output.path = path.dirname(this.output)
    webpackConfig.output.filename = path.basename(this.output)
    if (isEmptyObject(aliasConfig)) {
      webpackConfig.resolve.alias = aliasConfig
      console.log('[alias]', aliasConfig)
    }
    if (isEmptyObject(commonChunksConfig)) {
      for (const name in commonChunksConfig) {
        // @todo: webpackConfig.entry
        webpackConfig.plugins.push(
          new webpack.optimize.CommonsChunkPlugin({
            // @todo:
            // name
            filename,
            minChunks: Infinity
          })
        )
      }
      console.log('[shared]', commonChunksConfig)
    }
    return webpackConfig
  }
}

function isEmptyObject (obj) {
  return Object.keys(obj).length === 0
}

exports.Bao = Bao
