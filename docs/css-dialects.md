# CSS Dialects

## SASS/SCSS/LESS

According to the result of [State of JS 2016](https://stateofjs.com/2016/css/), SASS, SCSS, LESS are the most popular CSS dialects. So Dabao support them by default.

You can just write:

``` less
/* style.less */
body {
  h1 {
    color: #666;
  }
}
```

``` sass
/* style.sass */
body
  h1
    font-style: italic;
```

``` scss
/* style.scss */
body {
  h1 {
    text-decoration: underline;
  }
}
```

and `import` them into somewhere like:

```
// app.js
import './style.less'
import './style.sass'
import './style.scss'
```

So all above will work as well.

CSS Modules and Aphrodite are also popular as well but they don't need a pre-precessor so we do nothing about them.

## Why NOT Other Dialect?

Sorry for that. Maybe that's not popular enough to break simple which Dabao is keeping for. However of course any other opinion is welcome.

## How about PostCSS?

Dabao DO uses [PostCSS](http://postcss.org) just for compatibility and new CSS syntax, not dialects. You can check it out [here](./css.md).
