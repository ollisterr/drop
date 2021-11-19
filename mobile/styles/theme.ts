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
};

export type Theme = typeof theme;

export type Color = keyof Theme["colors"];

export type Spacing = keyof Theme["spacing"];

export default theme;