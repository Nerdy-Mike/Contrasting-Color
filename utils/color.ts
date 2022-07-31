const COLOUR_HEX_WHITE = "#FFFFFF";
const COLOUR_HEX_BLACK = "#000000";

export const colourStrengths = [
  { value: 1 },
  { value: 0.75 },
  { value: 0.5 },
  { value: 0.25 },
  { value: 0.125 },
];

export function hexToRGBArray(colour: string): Array<number> | undefined {
  if (!colour) return;

  if (colour.charAt(0) === "#") {
    // eslint-disable-next-line no-param-reassign
    colour = colour.substr(1);
  }

  if (colour.length === 3) {
    // eslint-disable-next-line no-param-reassign
    colour =
      colour.charAt(0) +
      colour.charAt(0) +
      colour.charAt(1) +
      colour.charAt(1) +
      colour.charAt(2) +
      colour.charAt(2);
  }

  if (colour.length !== 6) {
    throw new Error(`Invalid hex colour: ${colour}`);
  }

  const rgb = [];

  for (let i = 0; i <= 2; i++) {
    rgb[i] = parseInt(colour.substr(i * 2, 2), 16);
  }

  return rgb;
}

// Luma is a weighted sum of the R, G, and B values, adjusted for human perception of relative brightness.
export function luma(colour: string): number {
  if (!colour) return;

  let rgb = typeof colour === "string" ? hexToRGBArray(colour) : colour;

  // https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
  rgb = rgb?.map((bitValue) => {
    const value = bitValue / 255;

    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; // SMPTE C, Rec. 709 weightings
}

// https://www.w3.org/TR/WCAG20/
export function contrast(colour1: string, colour2: string): number {
  if (!colour1 || !colour2) return;

  const lum1 = luma(colour1);
  const lum2 = luma(colour2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

export function contrastingColour(background: string, defaultColour = COLOUR_HEX_BLACK): string {
  if (!background) {
    return defaultColour;
  }

  const firstContrast = contrast(COLOUR_HEX_BLACK, background);
  const secondContrast = contrast(COLOUR_HEX_WHITE, background);
  return firstContrast > secondContrast ? COLOUR_HEX_BLACK : COLOUR_HEX_WHITE;
}


export default contrastingColour;


