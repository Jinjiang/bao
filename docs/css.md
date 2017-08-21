# CSS

## CSS Syntax

There are two major problems in CSS syntax itself today:

1. Compat with the past as much as possible.
2. Support the future as fast as possible.

### CSS Compatibility

Dabao uses `autoprefixer` by default to solve this problem. It will ensure the CSS code which has compatibility issue today works for all morden browsers. And it uses default `autoprefixer` config because it's stable and wide enough.

For example:

``` css
todo
```

### CSS Next

Dabao also uses `cssnext` by default which can support developers writing new CSS syntax (for example: variables) for all morden browsers with nothing worry about.

For example:

``` css
todo
```

All above are supported by `cssnext` plugin in `PostCSS` loader in webpack (`autoprefixer` is also contained in `cssnext`).

## CSS Dialects

### SASS/SCSS/LESS

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

### Why NOT Other Dialect?

Sorry for that. Maybe that's not popular enough to break simple which Dabao is keeping for. However of course any other opinion is welcome.
