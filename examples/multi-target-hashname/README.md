# Multi-Target Hashname Example

## Config

```js
// .dabao.shared.json
{
  "vendor": ["vue", "vuex", "vue-router"]
}
```

```js
// .dabao.target.json
{
  "dir": "dist",
  "target": ["app", "app2"]
}
```

## Usage

```bash
npm i
npm run build
# npm run watch
```
