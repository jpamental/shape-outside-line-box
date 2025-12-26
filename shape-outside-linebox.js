class SHAPE_OUTSIDE_LINEBOX extends HTMLElement {
    constructor() {
        super();

        this.Loaded;
    }

    connectedCallback() {

console.log('Query Selector : ' ,this.querySelector('h1'))
        if(!this.Loaded)
            this.TraceText();
    }

    async TraceText() {

function TraceText() {
  console.log('First child element:', this.firstElementChild);
  const textElement = this.firstElementChild;
  const textShape = textElement.innerHTML;

  const textShapeRange = document.createRange();
  textShapeRange.selectNodeContents(textShape);

  const textShapeRects = textShapeRange.getClientRects();

  var shapeString = '';

  for (let i = 0; i < textShapeRects.length; i++) {
      const textShapeRect = textShapeRects[i];
    
          var separator = ``;
    if (i > 0) {
      separator = `, `;
    };
    shapeString = shapeString + separator + `${textShapeRect.left}px ${textShapeRect.top}px, ${textShapeRect.right}px ${textShapeRect.top}px, ${textShapeRect.right}px ${textShapeRect.bottom}px, ${textShapeRect.left}px ${textShapeRect.bottom}px`;

  }
  //console.log(shapeString);
  textShape.style.shapeOutside = `polygon(${shapeString})`;

}

window.addEventListener("load", (event) => {
  TraceText();
});

window.addEventListener("resize", (event) => {
  TraceText();
});

window.addEventListener("change", (event) => {
  TraceText();
});

    }
}

customElements.define('shape-outside-linebox', SHAPE_OUTSIDE_LINEBOX);



