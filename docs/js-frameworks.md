# JS Frameworks

## Vue

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

## React

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

## TypeScript

TypeScript is not a JS framework exactly. But we put this part here because besides with `*.ts` files on their own, Dabao could also parse:

* in Angular with `*.tx` files
* in React with `*.tsx` files or `*.ts` files
* in Vue with `<script lang="typescript">` in `*.vue` files

So you can write TypeScript just for free in almost all situations.

Next, we will talk about supporting [CSS dialects](./css-dialects.md).
