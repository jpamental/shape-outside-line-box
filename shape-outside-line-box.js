function outlineText() {
  const lineboxWraps = document.getElementsByClassName('linebox-wrap');

  for (let i = 0; i < lineboxWraps.length; i++) {

    let textShape = lineboxWraps[i];

    let textShapeStyle = getComputedStyle(textShape);
    let textShapeSize = parseFloat(textShapeStyle.getPropertyValue('font-size'));
    console.log(textShapeSize);

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

    // Create shape margin
    let shapeMargin =  textShapeSize / 2;
    

    var shapeString = '';

    for (let j = 0; j < textShapeRects.length; j++) {
        let textShapeRect = textShapeRects[j];
      
            var separator = ``;
      if (j > 0) {
        separator = `, `;
      };
      shapeString = shapeString + separator + `
        ${textShapeRect.left - containerRect.left + containerPaddingLeft}px ${textShapeRect.top  - containerRect.top + containerPaddingTop}px, 
        ${((textShapeRect.right + shapeMargin - containerRect.left + containerPaddingLeft) / textShapeSize)}em ${textShapeRect.top  - containerRect.top + containerPaddingTop}px, 
        ${((textShapeRect.right + shapeMargin - containerRect.left + containerPaddingLeft) / textShapeSize)}em ${(textShapeRect.top  - containerRect.top + containerPaddingTop + textShapeSize)}px, 
        ${textShapeRect.left - containerRect.left + containerPaddingLeft}px ${(textShapeRect.top  - containerRect.top + containerPaddingTop + textShapeSize)}px`;

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

window.addEventListener("change", (event) => {
  outlineText();
});
