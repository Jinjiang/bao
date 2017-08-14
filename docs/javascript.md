# ES Syntax

## Using Babel

[Babel](http://babeljs.io) is a JavaScript compiler which allow you write code with new syntax today without worry about browser support. We have put [`babel-loader`](https://webpack.js.org/loaders/babel-loader/) into default webpack config in Dabao.

We choose `babel-preset-env` which includes `babel-preset-2015`, `babel-preset-2016` and `babel-preset-2017` but exclude `stage-x` plugins. Because these rules `babel-preset-env` supports are stable and common enough for both web developers and modern browsers.

### Why Babel?

Babel is one the most popular JS compilers...

### What Syntax We May Know But NOT Supported in Dabao?

* function binding
* decorators

Note: We will consider make a versioning issue to keep the preset upgrading in the future.

## Supporting React (JSX) and Vue

Dabao also supports React (JSX) and Vue. Check [JS Frameworks](js-frameworks.md) for more.
