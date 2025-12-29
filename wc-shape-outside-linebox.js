class SHAPE_OUTSIDE_LINEBOX extends HTMLElement {
  static get observedAttributes() { return ['tag', 'text', 'max-width']; }

  constructor() {
    super();
  }

  connectedCallback() {

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create element and classes
    const tag = document.createElement((this.getAttribute('tag') || 'div').toLowerCase());
    tag.setAttribute("class", "shape-outside-linebox");

    const floatSide = (this.getAttribute('float-side') || 'left').toLowerCase();
    const maxWidth = (this.getAttribute('max-width') || '75%');
    tag.style.cssFloat = floatSide;
    tag.style.textAlign = floatSide;
    tag.style.margin = 0;
    tag.style.maxWidth = maxWidth;
    tag.style.textWrap = 'balance'


    const textAttr = this.getAttribute('text');
    tag.textContent = textAttr !== null ? textAttr : elementText || '';

    shadow.appendChild(tag);

    function lineboxWrap() {

        let textShape = tag;

        let textShapeStyle = getComputedStyle(textShape);
        let textShapeSize = parseFloat(textShapeStyle.getPropertyValue('font-size'));
        
        let textShapeRange = document.createRange();
        textShapeRange.selectNodeContents(textShape);


        let textShapeRects = textShapeRange.getClientRects();

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

          let textShapeRectWidth = textShapeRect.width;

          let separator = ``;
          
          if (j > 0) {
            separator = `, `;
          };
          
          if (floatSide == 'left') {
            shapeString = shapeString + separator + `
              ${textShapeRect.left - containerRect.left + containerPaddingLeft}px ${textShapeRect.top  - containerRect.top + containerPaddingTop}px, 
              ${((textShapeRect.right + shapeMargin - containerRect.left + containerPaddingLeft) / textShapeSize)}em ${textShapeRect.top  - containerRect.top + containerPaddingTop}px, 
              ${((textShapeRect.right + shapeMargin - containerRect.left + containerPaddingLeft) / textShapeSize)}em ${(textShapeRect.top  - containerRect.top + containerPaddingTop + textShapeSize)}px, 
              ${textShapeRect.left - containerRect.left + containerPaddingLeft}px ${(textShapeRect.top  - containerRect.top + containerPaddingTop + textShapeSize)}px`;
          } else {
            shapeString = shapeString + separator + `
              ${((textShapeRect.right - containerRect.left + containerPaddingLeft) / textShapeSize)}em ${textShapeRect.top  - containerRect.top + containerPaddingTop}px, 
              ${textShapeRect.left - containerRect.left + containerPaddingLeft - shapeMargin}px ${textShapeRect.top  - containerRect.top + containerPaddingTop}px, 
              ${textShapeRect.left - containerRect.left + containerPaddingLeft - shapeMargin}px ${(textShapeRect.top  - containerRect.top + containerPaddingTop + textShapeSize)}px,
              ${((textShapeRect.right - containerRect.left + containerPaddingLeft) / textShapeSize)}em ${(textShapeRect.top  - containerRect.top + containerPaddingTop + textShapeSize)}px`;
          }
        }
        tag.style.shapeOutside = `polygon(${shapeString})`;

    }
    lineboxWrap();

    window.addEventListener("resize", (event) => {
      lineboxWrap();
    });





    // Attach the created elements to the shadow dom

  }
}
customElements.define('shape-outside-linebox', SHAPE_OUTSIDE_LINEBOX);



