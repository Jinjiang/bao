import './src/style.less'
import './src/style.sass'
import './src/style.scss'

import './src/autoprefixer.css'
import './src/cssnext.css'
import './src/postcss.less'
import './src/postcss.scss'

console.log('CSS Compilers')

import Vue from 'vue'
import Foo from './src/foo.vue'

new Vue({
  el: '#app',
  render: h => h(Foo)
})
