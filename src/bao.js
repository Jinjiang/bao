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

    const entriesConfig = getEntriesConfig()
    if (entriesConfig && !isEmptyObject(entriesConfig.entryMap)) {
      const { entryMap, outputPath } = entriesConfig
      console.log('[entries]', outputPath, entryMap)
      webpackConfig.entry = entryMap
      webpackConfig.output.path = outputPath
      webpackConfig.output.filename = '[name]'
    } else {
      webpackConfig.entry = this.input
      webpackConfig.output.path = path.dirname(this.output)
      webpackConfig.output.filename = path.basename(this.output)
    }

    const aliasConfig = getAliasConfig()
    if (!isEmptyObject(aliasConfig)) {
      console.log('[alias]', aliasConfig)
      webpackConfig.resolve.alias = aliasConfig
    }

    const commonChunksConfig = getCommonChunksConfig()
    if (!isEmptyObject(commonChunksConfig)) {
      updateEntryFromStringToMap(webpackConfig)
      console.log('[shared]', commonChunksConfig)
      const outputPath = webpackConfig.output.path
      for (const name in commonChunksConfig) {
        const filepath = path.resolve(outputPath, name)
        const filename = path.relative(outputPath, filepath)
        if (!webpackConfig.entry[filename]) {
          webpackConfig.entry[filename] = commonChunksConfig[name]
          webpackConfig.plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
              name: filename,
              filename,
              minChunks: Infinity
            })
          )
        } else {
          console.warn(`[Warning] Shared filename existed! ${name}`)
        }
      }
    }
    return webpackConfig
  }
}

function isEmptyObject (obj) {
  return Object.keys(obj).length === 0
}

function updateEntryFromStringToMap (webpackConfig) {
  if (typeof webpackConfig.entry === 'string') {
    const entryMap = {}
    entryMap[webpackConfig.output.filename] = webpackConfig.entry
    webpackConfig.entry = entryMap
    webpackConfig.output.filename = '[name]'
  }
}

exports.Bao = Bao
