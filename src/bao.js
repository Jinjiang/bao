/**
 * @fileOverview
 * Main Class to config and build.
 *
 * Bao#input
 * Bao#output
 *
 * Bao#build(isDevMode)
 */

const path = require('path')
const webpack = require('webpack')

const { genBasicConfig } = require('./config')
const {
  getAliasConfig,
  getCommonChunksConfig,
  getTargetConfig
} = require('./runtime-config')

class Bao {

  constructor (config) {
    const { input, output, hashname } = config
    this.input = path.resolve(input || 'index.js')
    this.output = path.resolve(output || 'bundle.js')
    this.hashname = !!hashname
  }

  build (isDevMode) {
    const webpackConfig = this._genWebpackConfig(isDevMode)
    const compiler = webpack(webpackConfig)
    // @todo: error handling & stats info
    if (isDevMode) {
      compiler.watch({}, (err, stats) => {
        console.log('[updated]')
      })
    } else {
      compiler.run((err, stats) => {
        console.log('[done]')
      })
    }
  }

  _genWebpackConfig (isDevMode) {
    const webpackConfig = genBasicConfig(isDevMode)

    const targetConfig = getTargetConfig()
    if (targetConfig && !isEmptyObject(targetConfig.map)) {
      const { map, dir } = targetConfig
      console.log('[target]', dir, map)
      webpackConfig.entry = map
      webpackConfig.output.path = dir
      webpackConfig.output.filename = '[name]'
    } else {
      const outputInfo = path.parse(this.output)
      webpackConfig.entry = this.input
      webpackConfig.output.path = path.dirname(this.output)
      webpackConfig.output.filename = path.basename(`${
        outputInfo.name
      }${
        this.hashname ? '.[hash]' : ''
      }${
        outputInfo.ext
      }`)
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

function hasJSExtName (filename) {
  return filename.match(/\.js$/)
}

function removeJSExtName (filename) {
  return filename.replace(/\.js$/, '')
}

exports.Bao = Bao
