#!/usr/bin/env node

const cli = require('cli')
const { Bao } = require('../src/bao')

cli.parse({
  output: ['o', 'The output file path.', 'file'],
  dev: ['d', 'Dev mode (including watching file changes).', 'bool', false],
  watch: ['w', 'Watch file changes. (deprecated)', 'bool', false]
})

cli.main(function (args, options) {
  const input = args[0]
  const { output, watch, dev } = options

  const bao = new Bao({
    input, output
  })
  bao.build(watch || dev)
})
