import { grey } from "@mui/material/colors";

// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }) {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = "DINPro-Regular"; // Local Font
const FONT_HEADERS = "Din-STD-Engschrift"; // Local Font
const FONT_BOLD = "DINAlternate-Bold"; // Local Font

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    color: grey[800],
    textTransform: "uppercase",
    fontFamily: FONT_HEADERS,
    lineHeight: 80 / 64,
    fontSize: pxToRem(26),
    ...responsiveFontSizes({ sm: 28, md: 32, lg: 34 }),
  },
  h2: {
    color: grey[800],
    textTransform: "uppercase",
    fontFamily: FONT_HEADERS,
    lineHeight: 64 / 48,
    fontSize: pxToRem(25),
    ...responsiveFontSizes({ sm: 27, md: 31, lg: 33 }),
  },
  h3: {
    color: grey[800],
    textTransform: "uppercase",
    fontFamily: FONT_HEADERS,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontFamily: FONT_HEADERS,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontFamily: FONT_HEADERS,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    color: grey[800],
    textTransform: "uppercase",
    fontFamily: FONT_HEADERS,
    letterSpacing: "0.8px",
    lineHeight: 28 / 18,
    fontWeight: 500,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    color: grey[800],
    fontFamily: FONT_BOLD,
    lineHeight: 1.5,
    fontWeight: 500,
    fontSize: pxToRem(14),
  },
  subtitle2: {
    color: grey[800],
    fontFamily: FONT_BOLD,
    lineHeight: 22 / 14,
    fontWeight: 500,
    fontSize: pxToRem(16),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(14),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(16),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 200,
    fontSize: pxToRem(16),
    textTransform: "capitalize",
    fontFamily: FONT_HEADERS,
  },
  htmlBody1: {
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    '& strong': {
      color: "#5e9f00"
    }
  }
};

export default typography;
