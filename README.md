# Web component: shape-outside-line-box
A web component that will create a polygon shape around the supplied text string, allowing following text to wrap around it. This was inspired by some examples created for some of my conference talks and web typography newsletter. Read more about the technique and original inspiration here:
- [We’re doing it wrong: there is no ‘one perfect design’ or layout](https://rwt.io/typography-tips/were-doing-it-wrong-there-no-one-perfect-design-or-layout)
- [Zen and the art of knowing what to hold (and what to let slip—or be slippery)](https://rwt.io/typography-tips/zen-and-art-knowing-what-hold-and-what-let-slip-or-be-slippery)
- [Example on CodePen](https://codepen.io/jpamental/full/PoZEprx)

## Usage
Initially designed to typeset headings so that paragraph text could flow around in an interesting and dynamic way, it could be applied to any text element.
- Add a link reference to your page to include `wc-shape-outside-line-box.js`
- Insert the `<shape-outside-line-box tag="[html tag]" max-width="[n%]" float-side="[left or right]" text="[your text]"></shape-outside-line-box>` custom tag in your page
  - **`tag`**: the desired containing HTML tag (defaults to a `div` if not supplied)
  - **`max-width`**: maximum width of the element as a percentage of the containing element (defaults to `50%` if not supplied)
  - **`float-side`**: side to which the element should float (with matching text alignment (defaults to `left` if not supplied)
  - **`text`**: the text to be included in the new element (REQUIRED)

## Example
The `example.html` file contains a working example page to demonstrate the effect. It is also published here: 
https://jpamental.github.io/shape-outside-line-box/example.html

