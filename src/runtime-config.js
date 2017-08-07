/**
 * @fileOverview
 * Read rc files to set more configuration.
 */

const fs = require('fs')
const path = require('path')

/**
 * `.dabao.alias.json`:
 * Key-value pairs about alias name and the real file path.
 */

function readAliasRc () {
  if (!fs.existsSync('./.dabao.alias.json')) {
    return {}
  }
  try {
    const content = fs.readFileSync('./.dabao.alias.json', { encoding: 'utf-8' })
    return JSON.parse(content)
  } catch (e) {
    console.warn('[Warning] File parsing error: .dabao.alias.json')
    console.warn(e)
    return {}
  }
}

function getAliasConfig () {
  const alias = readAliasRc()
  for (const name in alias) {
    try {
      alias[name] = path.resolve(alias[name])
    } catch (e) {
      console.warn(`[Warning] Alias parsing: ${name} - ${alias[name]}`)
      console.warn(e)
      delete alias[name]
    }
  }
  return alias
}

/**
 * '.dabao.shared.json':
 * Key-value pairs about common chunk filenames and lists of shared module names.
 */

function readCommonChunksRc () {
  if (!fs.existsSync('./.dabao.shared.json')) {
    return {}
  }
  try {
    const content = fs.readFileSync('./.dabao.shared.json', { encoding: 'utf-8' })
    return JSON.parse(content)
  } catch (e) {
    console.warn('[Warning] File parsing error: .dabao.shared.json')
    console.warn(e)
    return {}
  }
}

function getCommonChunksConfig () {
  const chunks = readCommonChunksRc()
  const finalMap = {}
  for (const filename in chunks) {
    const name = trimJSExtName(filename)
    const moduleNames = chunks[filename]
    if (typeof moduleNames === 'string') {
      const moduleName = moduleNames
      finalMap[name] = [moduleName]
    } else if (Array.isArray(moduleNames)) {
      finalMap[name] = moduleNames.filter(moduleName => typeof moduleName === 'string')
      if (finalMap[name].length === 0) {
        console.warn(`[Warning] Shared parsing: no legal module name found in ${filename}`)
        delete finalMap[name]
      }
    } else {
      console.warn(`[Warning] Shared parsing: invalid config for ${filename}`)
    }
  }
  return finalMap
}

/**
 * '.dabao.target.json'
 * Key-value pairs about multi-entries.
 */

function readTargetRc () {
  if (!fs.existsSync('./.dabao.target.json')) {
    return {}
  }
  try {
    const content = fs.readFileSync('./.dabao.target.json', { encoding: 'utf-8' })
    return JSON.parse(content)
  } catch (e) {
    console.warn('[Warning] File parsing error: .dabao.target.json')
    console.warn(e)
    return {}
  }
}

function getTargetConfig () {
  const { target, dir } = readTargetRc()
  const finalDir = path.resolve(dir || '.')
  const finalMap = {}
  if (!target) {
    return null
  }
  if (Array.isArray(target)) {
    target.forEach(value => {
      try {
        const input = path.resolve(value)
        const output = path.relative('.', input)
        finalMap[trimJSExtName(output)] = input
      } catch (e) {
        console.warn(`[Warning] target parsing: ${value}`)
        console.warn(e)
      }
    })
  } else {
    for (const key in target) {
      try {
        const value = target[key]
        const input = path.resolve(key)
        const output = path.relative('.', path.resolve(value))
        finalMap[trimJSExtName(output)] = input
      } catch (e) {
        console.warn(`[Warning] target parsing: ${key} - ${value}`)
        console.warn(e)
      }
    }
  }
  return {
    map: finalMap,
    dir: finalDir
  }
}

function trimJSExtName (filename) {
  return filename.replace(/\.js$/, '')
}

/**
 * '.dabao.banner'
 * Add Banner to each generated file.
 */

function getBannerConfig () {
  const filename = './.dabao.banner'
  if (fs.existsSync(filename)) {
    return fs.readFileSync(filename, { encoding: 'utf-8' })
  }
}

exports.getAliasConfig = getAliasConfig
exports.getCommonChunksConfig = getCommonChunksConfig
exports.getTargetConfig = getTargetConfig
exports.getBannerConfig = getBannerConfig
