# copy-to-clipboard

A Vanilla web component to wrap copy-able text/html elements and add their inner text to the clipboard.

- Zero dependencies
- Browser support: Modern, requires support for Web Component APIs (v1).

Usage:

```js
// assumes resolving from node_modules or import as a esm module in your html.
import "copy-to-clipboard";
```

Wrap html elements for example some pre formatted code:

```html
<copy-to-clipboard>
  <pre><code class="language-js">
  console.log("some code")
</code></pre>
  <button slot="button">Copy</button>
</copy-to-clipboard>
```

## Programmatic API

Because this is a web component it can expose properties on the html element that can be accessed by javascript.

Say you have the following html without a copy button, you could trigger copying via code.

```html
<copy-to-clipboard>
  <pre><code class="language-js">
  console.log("some code")
</code></pre>
</copy-to-clipboard>
```

like so:

```js
await document.querySelector("copy-to-clipboard").copy();
```

## Load from CDN:

TODO

```html

```

## Use within a static site generator:

TODO
