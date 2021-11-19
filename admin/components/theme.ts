import "styled-components";
import { css } from "styled-components";

export type Theme = typeof theme;

const theme = {
  colors: {
    // accents
    primary: "#0079BD",
    primaryLight: "#55ADFF",
    primaryDark: "#003A5B",

    success: "#42B1A4",
    alert: "#C93000",

    // greys
    black: "#373737",
    white: "#fff",
    grey: "#7C7C7C",
    lightgrey: "#E5E5E5",
    whitesmoke: "#F0F0F0",
  },
  borderRadius: {
    small: "3px",
    default: "5px",
    large: "10px",
    pill: "9999px",
  },
  spacing: {
    none: 0,
    xxsmall: "4px",
    xsmall: "8px",
    small: "12px",
    default: "16px",
    medium: "24px",
    large: "32px",
    xlarge: "48px",
    xxlarge: "64px",
    xxxlarge: "128px",
  },
  typography: {
    h1: css`
      font-family: NATS;
      font-size: ${"100px"};
      font-weight: 600;
      margin-top: -${"50px"};
      margin-bottom: -${"50px"};
    `,
    h2: css`
      font-family: NATS;
      font-size: ${"64px"};
      font-weight: 600;
      margin-top: -${"32px"};
      margin-bottom: -${"32px"};
    `,
    h3: css`
      font-family: NATS;
      font-size: ${"36px"};
      text-transform: uppercase;
      margin-top: -${"18px"};
      margin-bottom: -${"18px"};
    `,
    subheading: css`
      font-family: "Open Sans Medium";
      font-size: ${"16px"};
    `,
    body: css`
      font-family: "Open Sans Regular";
      font-size: ${"16px"};
    `,
    detail: css`
      font-family: "Open Sans Regular";
      font-size: ${"14px"};
    `,
  },
};

export type Color = keyof Theme["colors"];

export type Spacing = keyof Theme["spacing"];

export default theme;
