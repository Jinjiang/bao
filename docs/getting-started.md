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

The whole demo has been [here](https://github.com/Jinjiang/dabao/tree/master/examples/simple).

### Run Dabao

Now we run the command:

``` bash
$ dabao app.js --output dist/bundle.js
```

Then you can see a new file `dist/bundle.js` generated. It's the generated code by _Dabao_.

The argument `--output` is to define where to output the generated code (You can also use `-o` for short).

### Hava a Check

Now to have a check, we can run it in Node.js:

``` bash
$ node dist/bundle.js
> Hello World
```

### Using NPM Scripts

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

### Using NPX

[`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a new way to run npm packages in `npm@5.2.0+`. You can just run `npx dabao` without installing _Dabao_ globally:

``` bash
npx dabao app.js -o dist/bundle.js
```

That works the same.
