# Not suitable for production

This is an ongoing project. The current version of this plugin is still in early stage.

## viewer360

Viewer360 enables you to show a 360 spin of a product, using a list of images ideally 36 or higher

## Install

```
npm install @azgh/viewer360
```

Or

```
yarn add @azgh/viewer360
```

> This package exposes a default export ESM or CJS <br>
> You can also use a UMD version exposing a global function viewer360

<br>

## Usage guide

Import

```js
import viewer360 from "@azgh/viewer360";

const imgs = ["img url"]; // ideally 36 or more images

// You can sepecify your custom fetch
const fetcher = (imgUrl) => {
  // use your custom fetch tool
  // return a blob
};

viewer360({
  containerId: "viewer360",
  imgs,
  fetcher, // optional
});
```

Then in your view add the container div

```html
<div id="viewer360" class="viewer360"></div>
```

The included style don't force any width or height on the container.<br>
So don't forget to add a height or width in your css for the class viewer360
