const copyText = async (elements) => {
  // Copy to the clipboard
  const doc = document.createDocumentFragment();
  const element = document.createElement("div");
  doc.appendChild(element);
  elements.forEach((el) => element.appendChild(el.cloneNode(true)));

  if ("clipboard" in navigator) {
    try {
      await navigator.clipboard.writeText(element.innerText);
    } catch (err) {
      // Unable to copy
      throw new Error("copy failed");
    }
  } else {
    let currentRange;
    try {
      document.execCommand("copy");
      const selection = window.getSelection();

      // Save the current selection
      currentRange =
        selection.rangeCount === 0 ? null : selection.getRangeAt(0);

      // Select the text content of code element
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (err) {
      // Unable to copy
      throw new Error("copy failed");
    } finally {
      // Restore the previous selection
      selection.removeAllRanges();
      currentRange && selection.addRange(currentRange);
    }
  }
};

const template = document.createElement("template");
template.innerHTML = `
          <style>
              :host {
                  display: block;
              }
          </style>
          <slot></slot>
          <slot name="button"></slot>
      `;

export class CopyComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    this._copy = this.copy.bind(this);
    this.addEventListener("click", this._copy);
  }

  disconnectedCallback() {
    this.disconnectObserver();
    this.removeEventListener("click", this._copy);
  }

  async copy(e) {
    if (
      e &&
      !e
        .composedPath()
        .some(
          (maybeButton) =>
            typeof maybeButton.getAttribute === "function" &&
            maybeButton.getAttribute("slot") === "button"
        )
    ) {
      // not clicked button
      return;
    }
    const slottedElements = this.shadowRoot
      .querySelector("slot:not([name])")
      .assignedElements({
        flatten: true,
      });
    if (slottedElements && slottedElements.length) {
      try {
        await copyText(slottedElements);
        this.dispatchEvent(
          new CustomEvent("copy", {
            bubbles: true,
            cancelable: true,
            composed: true,
          })
        );
      } catch (e) {
        this.dispatchEvent(
          new CustomEvent("copy-failed", {
            bubbles: true,
            composed: true,
            cancelable: true,
          })
        );
      }
    } else {
      console.error("Not slotted elements found to copy.");
    }
  }
}
