import Color from 'jsxstyle/lib/Color';

const primaryColor = Color.rgb(10, 0, 0);
const secondaryColor = Color.alpha(primaryColor, .8);

const LayoutConstants = {
  primaryColor: primaryColor,
  secondaryColor: secondaryColor,
  gridUnit: 8,
  sans: '"Helvetica Neue", Arial, sans-serif'
};

export default LayoutConstants;
