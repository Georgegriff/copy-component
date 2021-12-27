# copy-component

A Vanilla web component to wrap copy-able text/html elements and add their inner text to the clipboard.

<div align="center">
  <a href="https://griffa.dev/demos/copy-component/">
    <img src="https://raw.githubusercontent.com/Georgegriff/copy-component/main/copy-component.png?raw=true" width="400" height="52" alt="Screenshot of the copy component">
  </a>
</div>

- Zero dependencies
- Browser support: Modern, requires support for Web Component APIs (v1).

[Live Demos](https://griffa.dev/demos/copy-component/)

Usage:

```js
// assumes resolving from node_modules or import as a esm module in your html.
import "copy-component";
```

Wrap html elements for example some pre formatted code:

```html
<copy-component>
  <pre><code class="language-js">
  console.log("some code")
</code></pre>
  <button slot="button">Copy</button>
</copy-component>
```

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/G2G221OBA)

## Events

- `copy` - Fired on copy success
- `copy-failed` - Fired on copy failed

```js
document.querySelector("copy-component").addEventListener("copy", () => {
  // do something e.g. change your button text to "Copied"
});
```

## Programmatic API

Because this is a web component it can expose properties on the html element that can be accessed by javascript.

Say you have the following html without a copy button, you could trigger copying via code.

```html
<copy-component>
  <pre><code class="language-js">
  console.log("some code")
</code></pre>
</copy-component>
```

like so:

```js
await document.querySelector("copy-component").copy();
```

## Load from CDN:

```html
<script type="module">
  import copyComponent from "https://cdn.skypack.dev/copy-component";
</script>
```

## Use within a static site generator:

TODO
