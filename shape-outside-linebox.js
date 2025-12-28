class SHAPE_OUTSIDE_LINEBOX extends HTMLElement {
  static get observedAttributes() { return ['tag', 'text']; }

  constructor() {
    super();
  }

  connectedCallback() {

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create spans
    const tag = document.createElement((this.getAttribute('tag') || 'div').toLowerCase());
    //tag.setAttribute("class", "shape-outside-linebox");
    tag.setAttribute("class", "shape-outside-linebox");

    const floatSide = (this.getAttribute('float-side') || 'left').toLowerCase();
    tag.style.cssFloat = floatSide;
    tag.style.textAlign = floatSide;
    tag.style.margin = 0;
    tag.style.maxWidth = '75%';
    tag.style.textWrap = 'balance'


    const textAttr = this.getAttribute('text');
    tag.textContent = textAttr !== null ? textAttr : elementText || '';

    shadow.appendChild(tag);


    let textShape = tag;

    let textShapeStyle = getComputedStyle(textShape);
    let textShapeSize = parseFloat(textShapeStyle.getPropertyValue('font-size'));
    
    let textShapeRange = document.createRange();
    textShapeRange.selectNodeContents(textShape);


    let textShapeRects = textShapeRange.getClientRects();
    console.log(textShape);
    // Get the container's position to use as an offset for absolute positioning
    let containerRect = textShape.getBoundingClientRect();
    let containerStyle = window.getComputedStyle(textShape);
    let containerPaddingLeft = parseFloat(containerStyle.paddingLeft);
    let containerPaddingTop = parseFloat(containerStyle.paddingTop);
    let containerWidth = parseFloat(containerStyle.width);

    // Create shape margin
    let shapeMargin =  textShapeSize / 2;  

    let shapeString = '';

    for (let j = 0; j < textShapeRects.length; j++) {
      let textShapeRect = textShapeRects[j];
console.log(textShapeRect);

      let textShapeRectWidth = textShapeRect.width;
      console.log('new' + textShapeRectWidth);

      let textShapeOffset = 0;
      if (floatSide == 'right') {
        textShapeOffset = containerWidth - textShapeRectWidth;
      }
      
      let separator = ``;
      
      if (j > 0) {
        separator = `, `;
      };
      
      if (floatSide == 'left') {
        shapeString = shapeString + separator + `
          ${textShapeRect.left - containerRect.left + containerPaddingLeft + textShapeOffset}px ${textShapeRect.top  - containerRect.top + containerPaddingTop}px, 
          ${((textShapeRect.right + shapeMargin - containerRect.left + containerPaddingLeft + textShapeOffset) / textShapeSize)}em ${textShapeRect.top  - containerRect.top + containerPaddingTop}px, 
          ${((textShapeRect.right + shapeMargin - containerRect.left + containerPaddingLeft + textShapeOffset) / textShapeSize)}em ${(textShapeRect.top  - containerRect.top + containerPaddingTop + textShapeSize)}px, 
          ${textShapeRect.left - containerRect.left + containerPaddingLeft + textShapeOffset}px ${(textShapeRect.top  - containerRect.top + containerPaddingTop + textShapeSize)}px`;
      } else {
        shapeString = shapeString + separator + `
          ${((textShapeRect.right - containerRect.left + containerPaddingLeft + textShapeOffset) / textShapeSize)}em ${textShapeRect.top  - containerRect.top + containerPaddingTop}px, 
          ${textShapeRect.left - containerRect.left + containerPaddingLeft + textShapeOffset - shapeMargin}px ${textShapeRect.top  - containerRect.top + containerPaddingTop}px, 
          ${textShapeRect.left - containerRect.left + containerPaddingLeft + textShapeOffset - shapeMargin}px ${(textShapeRect.top  - containerRect.top + containerPaddingTop + textShapeSize)}px,
          ${((textShapeRect.right - containerRect.left + containerPaddingLeft + textShapeOffset) / textShapeSize)}em ${(textShapeRect.top  - containerRect.top + containerPaddingTop + textShapeSize)}px`;
      }
    }
    console.log(shapeString);
    tag.style.shapeOutside = `polygon(${shapeString})`;






    // Attach the created elements to the shadow dom

  }
}
customElements.define('shape-outside-linebox', SHAPE_OUTSIDE_LINEBOX);



