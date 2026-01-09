class SHAPE_OUTSIDE_LINE_BOX extends HTMLElement {
  static get observedAttributes() { return ['tag', 'float-side', 'max-width', 'text']; }

  constructor() {
    super();
  }

  connectedCallback() {

    // Create HTML element and identifying class (defaults to 'div' if no tag attribute is supplied)
    const tag = document.createElement((this.getAttribute('tag') || 'div').toLowerCase());
    tag.setAttribute("class", "shape-outside-line-box");

    // Set initial values with fallback defaults

    // Not a great demo if nothing floats around it, so set a default if one isn't supplied
    const floatSide = (this.getAttribute('float-side') || 'left').toLowerCase();

    // Also less interesting if the element is full-width, so setting a default of 50%
    const maxWidth = (this.getAttribute('max-width') || '50%');

    // Assign float and matching text alignment
    tag.style.cssFloat = floatSide;
    tag.style.textAlign = floatSide;

    //tag.style.margin = 0;
    tag.style.maxWidth = maxWidth;

    // Stylistic choice for more balanced layout
    tag.style.textWrap = 'balance'


    const textAttr = this.getAttribute('text');
    tag.textContent = textAttr !== null ? textAttr : elementText || '';

    this.appendChild(tag);

    function lineboxWrap() {

      // Select the element to apply shape-outside to
      let textShape = tag;

      // Get computed styles and font size (for em unit and shape margin calculations)
      let textShapeStyle = getComputedStyle(textShape);
      let textShapeSize = parseFloat(textShapeStyle.getPropertyValue('font-size'));
      
      // Create array of text line boxes
      let textShapeRange = document.createRange();
      textShapeRange.selectNodeContents(textShape);
      let textShapeRects = textShapeRange.getClientRects();

      // Get the container's position to use as an offset for absolute positioning
      let containerRect = textShape.getBoundingClientRect();

      // Get container's margin and padding to use as offsets
      let containerMarginInlineStart = parseFloat(textShapeStyle.marginInlineStart);
      let containerMarginBlockStart = parseFloat(textShapeStyle.marginBlockStart);
      let containerPaddingInlineStart = parseFloat(textShapeStyle.paddingInlineStart);
      let containerPaddingBlockStart = parseFloat(textShapeStyle.paddingBlockStart);
      let offsetInlineStart = containerMarginInlineStart + containerPaddingInlineStart;
      let offsetBlockStart = containerMarginBlockStart + containerPaddingBlockStart;

      // Create shape margin (instead of applying shape-margin property)
      let shapeMargin =  textShapeSize / 2;  

      // Create string to contain shape-outside polygon points
      let shapeString = '';

      // Loop through each line box rect to build shape-outside polygon points
      for (let j = 0; j < textShapeRects.length; j++) {
        let textShapeRect = textShapeRects[j];

        // Create separator for multiple polygon points
        let separator = ``;
        if (j > 0) {
          separator = `, `;
        };
        
        // Build shape-outside polygon points based on float side
        if (floatSide == 'left') {
          shapeString = shapeString + separator + `
            ${textShapeRect.left - containerRect.left + offsetInlineStart}px ${textShapeRect.top  - containerRect.top + offsetBlockStart}px, 
            ${((textShapeRect.right + shapeMargin - containerRect.left + offsetInlineStart) / textShapeSize)}em ${textShapeRect.top  - containerRect.top + offsetBlockStart}px, 
            ${((textShapeRect.right + shapeMargin - containerRect.left + offsetInlineStart) / textShapeSize)}em ${(textShapeRect.top  - containerRect.top + offsetBlockStart + textShapeSize)}px, 
            ${textShapeRect.left - containerRect.left + offsetInlineStart}px ${(textShapeRect.top  - containerRect.top + offsetBlockStart + textShapeSize)}px`;
        } else {
          shapeString = shapeString + separator + `
            ${((textShapeRect.right - containerRect.left + offsetInlineStart) / textShapeSize)}em ${textShapeRect.top  - containerRect.top + offsetBlockStart}px, 
            ${textShapeRect.left - containerRect.left + offsetInlineStart - shapeMargin}px ${textShapeRect.top  - containerRect.top + offsetBlockStart}px, 
            ${textShapeRect.left - containerRect.left + offsetInlineStart - shapeMargin}px ${(textShapeRect.top  - containerRect.top + offsetBlockStart + textShapeSize)}px,
            ${((textShapeRect.right - containerRect.left + offsetInlineStart) / textShapeSize)}em ${(textShapeRect.top  - containerRect.top + offsetBlockStart + textShapeSize)}px`;
        }
      }

      // Apply the calculated shape-outside polygon to the element
      tag.style.shapeOutside = `polygon(${shapeString})`;

    }

    // Call the function initially
    lineboxWrap();

    // Recalculate on window resize
    window.addEventListener("load", (event) => {
      lineboxWrap();
    });

    // Recalculate on window resize
    window.addEventListener("resize", (event) => {
      lineboxWrap();
    });

  }
}
customElements.define('shape-outside-line-box', SHAPE_OUTSIDE_LINE_BOX);



