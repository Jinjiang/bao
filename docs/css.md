# CSS Syntax

There are two major problems in CSS syntax itself today:

1. Compat with the past as much as possible.
2. Support the future as fast as possible.

## CSS Compatibility

Dabao uses `autoprefixer` by default to solve this problem. It will ensure the CSS code which has compatibility issue today works for all morden browsers. And it uses default `autoprefixer` config because it's stable and wide enough.

For example:

``` css
todo
```

## CSS Next

Dabao also uses `cssnext` by default which can support developers writing new CSS syntax (for example: variables) for all morden browsers with nothing worry about.


For example:

``` css
todo
```

All above are supported by `cssnext` plugin in `PostCSS` loader in webpack.
