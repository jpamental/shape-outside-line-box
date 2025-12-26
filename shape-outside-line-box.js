function outlineText() {
  const lineboxWraps = document.getElementsByClassName('linebox-wrap');

  for (let i = 0; i < lineboxWraps.length; i++) {

    let textShape = lineboxWraps[i];

    let textShapeStyle = getComputedStyle(textShape);
    let textShapeSize = parseFloat(textShapeStyle.getPropertyValue('font-size'));
    

    let textShapeFloat = 'left';

    if (textShape.classList.contains('linebox-float-right')) {
      textShapeFloat = 'right';
    }

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
      console.log(textShapeRectWidth);

      let textShapeOffset = 0;
      if (textShapeFloat == 'right') {
        textShapeOffset = containerWidth - textShapeRectWidth;
      }
      
      let separator = ``;
      
      if (j > 0) {
        separator = `, `;
      };
      
      if (textShapeFloat == 'left') {
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
    //console.log(shapeString);
    textShape.style.float = textShapeFloat;
    textShape.style.textAlign = textShapeFloat;
    textShape.style.shapeOutside = `polygon(${shapeString})`;

  }



}


window.addEventListener("load", (event) => {
  outlineText();
});

window.addEventListener("resize", (event) => {
  outlineText();
});
