## Install
```
npm i ajanuw-preview-select.js
```

## Use
```js
import { PreviewSelect, Mask } from "ajanuw-preview-select.js";
new PreviewSelect({
  select: ".image",
  curve: "cubic-bezier(0.05, 0.75, 0.85, 1.1)"
}).to({
  "border-radius": "20px",
  transform: "scale(1.2)"
});
```

## Used in browser
```html
<img src="https://i.loli.net/2019/11/07/TvjyJgGObWcBLAN.jpg" />

<script src="../dist/preview-select.js"></script>
<script>
const { PreviewSelect, Mask } = previewSelect;
new PreviewSelect({
  select: "img",
  curve: "cubic-bezier(0.05, 0.75, 0.85, 1.1)"
}).to({
  "border-radius": "20px",
  "transform": "scale(1.2)"
});
</script>
```

- [example](https://januwa.github.io/preview-select.js/dist/index.html)