#!/usr/bin/env node

const cli = require('cli')
const { Bao } = require('../src/bao')

cli.parse({
  output: ['o', 'The output file path.', 'file'],
  watch: ['w', 'Watch file changes.', 'bool', false]
})

cli.main(function (args, options) {
  const input = args[0]
  const { output, watch } = options

  if (input) {
    const bao = new Bao({
      input, output
    })
    bao.build(watch)
  }
})
