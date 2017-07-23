const { Bao } = require('../../src/bao')

const bao = new Bao({
  input: 'app.js',
  // output: 'dist/app.js'
})

bao.build()
// bao.build(true)
