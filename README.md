
## Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .small-image {
        width: 300px;
        transition: all 1s;
      }
    </style>
  </head>
  <body>
    <img
      class="small-image"
      src="https://i.loli.net/2019/11/07/TvjyJgGObWcBLAN.jpg"
    />

    <img
      class="small-image"
      src="https://i.loli.net/2019/08/29/rsjvxKEl7TiPAQt.jpg"
    />

    <img
      class="small-image"
      src="https://i.loli.net/2019/08/09/OvVzMqpF3jmI8lE.jpg"
    />
    <img
      class="small-image"
      src="https://i.loli.net/2019/08/17/6WGClBhUoswvyd9.jpg"
    />
    <img
      class="small-image"
      src="https://i.loli.net/2019/08/29/rsjvxKEl7TiPAQt.jpg"
    />

    <img
      class="small-image"
      src="https://i.loli.net/2019/08/09/OvVzMqpF3jmI8lE.jpg"
    />
    <img
      class="small-image"
      src="https://i.loli.net/2019/08/29/rsjvxKEl7TiPAQt.jpg"
    />

    <img
      class="small-image"
      src="https://i.loli.net/2019/08/09/OvVzMqpF3jmI8lE.jpg"
    />
    <img
      class="small-image"
      src="https://i.loli.net/2019/08/17/6WGClBhUoswvyd9.jpg"
    />

    <script src="../dist/preview-select.js"></script>
    <script>
      const { PreviewSelect } = previewSelect;
      new PreviewSelect({ select: "img" }).to({
        "border-radius": "20px",
        transform: "scale(1.1) rotate(-30deg)"
      });
    </script>
  </body>
</html>
```