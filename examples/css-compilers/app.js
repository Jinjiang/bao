import Vue from 'vue';

import './src/style.less';
import './src/style.sass';
import './src/style.scss';

import './src/autoprefixer.css';
import './src/cssnext.css';
import './src/postcss.less';
import './src/postcss.scss';

import Foo from './src/foo.vue';

console.log('CSS Compilers');

const app = new Vue({
  el: '#app',
  render: h => h(Foo),
});
console.log(app);
