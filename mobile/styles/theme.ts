import { css } from ".";
import { px } from "./style.utils";

const theme = {
  colors: {
    // accents
    primary: "#0079BD",
    primaryLight: "#55ADFF",
    primaryDark: "#003A5B",

    // greys
    black: "#373737",
    grey: "#7C7C7C",
    lightgrey: "#E5E5E5",
    whitesmoke: "#F0F0F0",
  },
  borderRadius: {
    small: px(3),
    default: px(5),
    large: px(10),
    pill: px(9999),
  },
  spacing: {
    none: 0,
    xxsmall: px(4),
    xsmall: px(8),
    small: px(12),
    default: px(16),
    medium: px(24),
    large: px(32),
    xlarge: px(48),
    xxlarge: px(64),
    xxxlarge: px(128),
  },
  typography: {
      h1: css`
        font-family: NATS;
        font-size: ${px(32)};
        font-weight: 600;
      `,
      h2: css`
        font-family: NATS;
        font-size: ${px(24)};
        font-weight: 600;
      `,
      h3: css`
        font-family: NATS;
        font-size: ${px(16)};
        text-transform: uppercase;
      `,
      body: css`
        font-family: Open Sans, sans-serif;
        font-size: ${px(16)};
      `,
      detail: css`
        font-family: Open Sans, sans-serif;
        font-size: ${px(12)};
      `
  }
};

export type Theme = typeof theme;

export type Color = keyof Theme["colors"];

export type Spacing = keyof Theme["spacing"];

export default theme;