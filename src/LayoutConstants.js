var Color = require('jsxstyle/lib/Color');

const primaryColor = Color.rgb(10, 0, 0);
const secondaryColor = Color.alpha(primaryColor, .8);

// AirBnb Colors
const turq = Color.rgb(0, 209, 193);
const green = Color.rgb(63, 179, 79);
const orange = Color.rgb(255, 180, 0);
const pink = Color.rgb(255, 90, 95);
const darkBlue = Color.rgb(56, 59, 60);

// Email colors
const gray = Color.rgb(89, 95, 108);
const black = Color.rgb(20, 24, 35);
const blue = Color.rgb(0, 112, 255);

const LayoutConstants = {
  black,
  primaryColor,
  secondaryColor,
  turq,
  green,
  orange,
  pink,
  darkBlue,
  gridUnit: 8,
  u: 8,
  sans: "-apple-system,BlinkMacSystemFont,\"Helvetica Neue\",Helvetica,Arial,sans-serif",
};

module.exports = LayoutConstants;
