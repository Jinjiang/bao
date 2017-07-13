/**
 * @fileOverview
 * Read rc files to set more configuration.
 */

const fs = require('fs')
const path = require('path')

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

exports.getAliasConfig = getAliasConfig
