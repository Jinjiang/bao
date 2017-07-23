const { Bao } = require('dabao')

const bao = new Bao({
  input: 'app.js',
  output: 'dist/bundle.js'
})

bao.build()
// bao.build(true)
