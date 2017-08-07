#!/usr/bin/env node

const cli = require('cli')
const { Bao } = require('../src/bao')

cli.parse({
  output: ['o', 'The output file path.', 'file'],
  hashname: [false, 'Add hashname suffix in output names.', 'bool', false],
  dev: ['d', 'Dev mode (including watching file changes).', 'bool', false],
  watch: ['w', 'Watch file changes. (deprecated)', 'bool', false]
})

cli.main(function (args, options) {
  const input = args[0]
  const { output, watch, dev, hashname } = options

  const bao = new Bao({
    input, output, hashname
  })
  bao.build(watch || dev)
})
