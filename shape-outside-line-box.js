function outlineHeader() {
  const textShape = document.getElementById('text-shape');

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
  textShape.style.float = `left`;
  textShape.style.shapeOutside = `polygon(${shapeString})`;
  //textShape.style.shapeMargin = `.35rem`;

}

window.addEventListener("load", (event) => {
  outlineHeader();
});

window.addEventListener("resize", (event) => {
  outlineHeader();
});

window.addEventListener("change", (event) => {
  outlineHeader();
});
