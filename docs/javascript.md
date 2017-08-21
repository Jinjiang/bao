# JavaScript

## Using Babel

[Babel](http://babeljs.io) is a JavaScript compiler which allow you write code with new syntax today without worry about browser support. We have put [`babel-loader`](https://webpack.js.org/loaders/babel-loader/) into default webpack config in Dabao.

We choose `babel-preset-env` which includes `babel-preset-2015`, `babel-preset-2016` and `babel-preset-2017` but exclude `stage-x` plugins. Because these rules `babel-preset-env` supports are stable and common enough for both web developers and modern browsers.

### Why Babel?

Babel is one the most popular JS compilers. So we choose Babel which is easy to understand.

### Why `babel-preset-env`? My browser has supported ES6.

There are quite amount of users using browser without ES6/7 support. On consideration of common situation first, Dabao chooses `babel-preset-env` which will compiles all new stable syntax into ES5. And it won't cause obvious side affects in new browsers which has support ES6/7. It even also let developers reproduce and discuss the ways workaround with each others under the same Babel config when they suffer runtime bugs.

### What Syntax We May Know But NOT Supported in Dabao?

* function binding
* decorators

Note: We will consider make a versioning issue to keep the preset upgrading in the future.

## TypeScript

TypeScript is not a JS framework exactly. But we put this part here because besides with `*.ts` files on their own, Dabao could also parse:

* in Angular with `*.tx` files
* in React with `*.tsx` files or `*.ts` files
* in Vue with `<script lang="typescript">` in `*.vue` files

So you can write TypeScript just for free in almost all situations.

## Vue (SFC)

Dabao could load `*.vue` files with [`vue-loader`](https://vue-loader.vuejs.org/) by default for [Vue.js](https://vuejs.org/).

You can freely `import` any `*.vue` files as normal. For example:

``` js
// app.js
const Foo = require('./foo.vue')
console.log(Foo)
```

``` html
<!-- foo.vue -->
<template>
  <div>Hello World</div>
</template>
```

And run:

``` bash
dabao app.js -o dist/bundle.js
```

will generate a bundle which has converted `foo.vue` into component definition in JavaScript.

The whole demo has been [here](https://github.com/Jinjiang/dabao/tree/master/examples/vue).

## JSX (React)

Dabao could parse `*.jsx` file into JavaScript by converting tags into `React.createElement(...)` because it uses `babel-preset-react` at the same time. For example:

``` js
const Bar = require('./bar.jsx')
console.log(Bar)
```

``` jsx
// const React = { // for testing
//   createElement: () => '[virtual-DOM]'
// }
module.exports = <div>Hello World</div>
```

It will generate a file which includes `React.createElement("div",null,"Hello World")`.

The whole demo has been [here](https://github.com/Jinjiang/dabao/tree/master/examples/react).
