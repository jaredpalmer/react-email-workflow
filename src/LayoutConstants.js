var Color = require('jsxstyle/lib/Color');

const primaryColor = Color.rgb(10, 0, 0);
const secondaryColor = Color.alpha(primaryColor, .8);
const turq = Color.rgb(0,209,193);
const green = Color.rgb(63,179,79);
const orange = Color.rgb(255,180,0);
const pink = Color.rgb(255,90,95);
const darkBlue = Color.rgb(56,59,60);

const LayoutConstants = {
  primaryColor,
  secondaryColor,
  turq,
  green,
  orange,
  pink,
  darkBlue,
  gridUnit: 8,
  sans: '-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif',
};

module.exports = LayoutConstants;
