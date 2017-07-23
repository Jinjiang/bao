# Multi-Target Example

## Config

```js
// .dabao.shared.json
{
  "vendor.js": ["vue", "vuex", "vue-router"]
}
```

```js
// .dabao.target.json
{
  "dir": "dist",
  "target": ["app.js", "app2.js"]
}
```

## Usage

```bash
npm i
npm run build
# npm run watch
```
