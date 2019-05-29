// Horizontal line drawing function
function horizLine(currentY, strokeColor) {
// Define default and input objects
  const defaults = {
    x1: 0,
    y1: 10,
    x2: 10000,
    y2: 10,
    w: 1,
    s: 'black',
  };
  const inputs = {
    y1: currentY,
    y2: currentY,
    s: strokeColor,
  };

  // Combine default and input objects into new object
  const mergedLine = Object.assign({}, defaults, inputs);

  // Define line based on merged object
  const line = {
    x1: mergedLine.x1,
    y1: mergedLine.y1,
    x2: mergedLine.x2,
    y2: mergedLine.y2,
    strokeWidth: mergedLine.w,
    stroke: mergedLine.s,
  };

  return line;
}

// Diagonal line drawing function
function diagLine(angle, currentX, strokeColor) {
  // Define default and input objects
  const defaults = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 10000,
    w: 1,
    s: 'gray',
    r: 'rotate(0, 0, 0)',
  };
  const inputs = {
    x1: currentX,
    x2: currentX,
    s: strokeColor,
    r: `rotate(${angle}, ${currentX}, 0)`,
  };
  // Combine default and input objects into new object
  const mergedLine = Object.assign({}, defaults, inputs);
  // Define line based on merged object
  const line = {
    x1: mergedLine.x1,
    y1: mergedLine.y1,
    x2: mergedLine.x2,
    y2: mergedLine.y2,
    strokeWidth: mergedLine.w,
    stroke: mergedLine.s,
    transform: mergedLine.r,
  };

  return line;
}

// Accpets inputs and produces array of lines.
function lineGroup(inputs) {
  // Calculate line spacing period from user inputs in nib widths
  const lineS = (inputs.aH + inputs.xH + inputs.dH + inputs.iS);
  const lineArray = [];

  // Generates array of the 4 basic horizontal lines.
  for (
    // The +1 is to address the margin clipping problem
    let y = inputs.tM + 1;
    y + inputs.aH + inputs.xH + inputs.dH <= inputs.pH;
    y += lineS
  ) {
    const aLine = horizLine(y, inputs.bC);

    const xLine = horizLine(y + inputs.aH, inputs.bC);

    const bLine = horizLine(y + inputs.aH + inputs.xH, inputs.bC);

    const dLine = horizLine(y + inputs.aH + inputs.xH + inputs.dH, inputs.bC);

    lineArray.push(aLine, xLine, bLine, dLine);
  }

  // Generates array of verticality lines
  for (
    // Starting X is left margin plus the vertical spacing
    let x = inputs.lM + inputs.vS;
    // To cover page in diag lines, need to generate lines far past the right margin. Placholder.
    x <= 10000;
    // Increment by the spacing between vert lines
    x += inputs.vS
  ) {
    const vLine = diagLine(inputs.vA, x, inputs.vC);

    lineArray.push(vLine);
  }

  // Generates array of pen angle lines
  for (
    let x = inputs.lM + inputs.pS;
    // Placeholder, will need to cover visible page in lines
    x <= 10000;
    x += inputs.pS
  ) {
    const pALine = diagLine(90 - inputs.pA, x, inputs.pC);

    lineArray.push(pALine);
  }

  return lineArray;
}

export default lineGroup;
