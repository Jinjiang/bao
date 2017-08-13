# Getting Started

First of all, you need to [install](installation.md) _Dabao_. It's just an one-time shooting.

## The Simplest Demo

Create a empty repo and 2 JavaScript files `app.js` and `foo.js`.

``` js
// app.js
import { foo } from './foo'
foo()
```

``` js
// foo.js
export function foo () {
  console.log('Hello World')
}

export function bar () {
  console.log('Hello World 2')
}
```

The file `app.js` is the entry file of this repo. It imports file `foo.js`.

Now we run the command:

``` bash
$ dabao app.js --output dist/bundle.js
```

Then you can see a new file `dist/bundle.js` generated. It's the generated code by _Dabao_.

The argument `--output` is to define where to output the generated code (You can also use `-o` for short).

Now to have a check, we can run it in Node.js:

``` bash
$ node dist/bundle.js
> Hello World
```

You can also put the command in the toolchain by `npm scripts` for example:

``` json
{
  "name": "dabao-example-simple",
  ...
  "scripts": {
    "build": "dabao app.js -o dist/bundle.js"
  },
  "devDependencies": {
    "dabao": "*"
  }
}
```

The whole example has been [here](https://github.com/Jinjiang/dabao/tree/master/examples/simple).

Next, we will see how _Dabao_ makes [new syntax of JavaScript](javascript.md) works in all morden browsers.
