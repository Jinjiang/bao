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
    const content = fs.readFileSync('./.dabao.alias.json')
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
    const content = fs.readFileSync('./.dabao.shared.json')
    return JSON.parse(content)
  } catch (e) {
    console.warn('[Warning] File parsing error: .dabao.shared.json')
    console.warn(e)
    return {}
  }
}

function getCommonChunksConfig () {
  const chunks = readCommonChunksRc()
  for (const filename in chunks) {
    const moduleNames = chunks[filename]
    if (typeof moduleNames === 'string') {
      const moduleName = moduleNames
      chunks[filename] = [moduleName]
    } else if (Array.isArray(moduleNames)) {
      chunks[filename] = moduleNames.filter(moduleName => typeof moduleName === 'string')
      if (chunks[filename].length === 0) {
        console.warn(`[Warning] Shared parsing: no legal module name found in ${filename}`)
        delete chunks[filename]
      }
    } else {
      console.warn(`[Warning] Shared parsing: invalid config for ${filename}`)
      delete chunks[filename]
    }
  }
  return chunks
}

exports.getAliasConfig = getAliasConfig
exports.getCommonChunksConfig = getCommonChunksConfig
