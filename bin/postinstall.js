#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const lnk = require('lnk')

const NOT_FOUND = -1
const IN_CURRENT_DIR = 0
const AT_TOP_DIR = 1
const IN_BOTH = 2

const currentDir = path.resolve(__dirname, '..', 'node_modules')
const topDir = path.resolve(__dirname, '..', '..')
console.log('CURRENT_DIR', currentDir)
console.log('TOP_DIR', topDir)

function findModule (name) {
  if (fs.existsSync(path.join(currentDir, name))) {
    if (fs.existsSync(path.join(topDir, name))) {
      return IN_BOTH
    }
    return IN_CURRENT_DIR
  } else if (fs.existsSync(path.join(topDir, name))) {
    return AT_TOP_DIR
  } else {
    return NOT_FOUND
  }
}

function linkModule (name) {
  console.log('link', name, path.join(currentDir, name), topDir)
  lnk.sync(path.join(currentDir, name), topDir)
}

function checkModule (name) {
  if (findModule(name) === IN_CURRENT_DIR) {
    console.log('IN_CURRENT_DIR', name)
    linkModule(name)
  } else {
    console.log('NOTHING_HAPPEN', name)
  }
}

// checkModule('vue-loader')
checkModule('babel-preset-env')
checkModule('babel-preset-react')
