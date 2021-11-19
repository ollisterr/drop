import { css } from '.';
import { px } from './style.utils';

const theme = {
  colors: {
    // accents
    primary: '#0079BD',
    primaryLight: '#55ADFF',
    primaryDark: '#003A5B',

    success: '#42B1A4',
    alert: '#C93000',

    // greys
    black: '#373737',
    white: '#fff',
    grey: '#7C7C7C',
    lightgrey: '#E5E5E5',
    whitesmoke: '#F0F0F0',
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
      font-size: ${px(100)};
      font-weight: 600;
      margin-top: -${px(50)};
      margin-bottom: -${px(50)};
    `,
    h2: css`
      font-family: NATS;
      font-size: ${px(64)};
      font-weight: 600;
      margin-top: -${px(32)};
      margin-bottom: -${px(32)};
    `,
    h3: css`
      font-family: NATS;
      font-size: ${px(36)};
      text-transform: uppercase;
      margin-top: -${px(18)};
      margin-bottom: -${px(18)};
    `,
    subheading: css`
      font-family: 'Open Sans Medium';
      font-size: ${px(16)};
    `,
    body: css`
      font-family: 'Open Sans Regular';
      font-size: ${px(16)};
    `,
    detail: css`
      font-family: 'Open Sans Regular';
      font-size: ${px(14)};
    `,
  },
};

export type Theme = typeof theme;

export type Color = keyof Theme['colors'];

export type Spacing = keyof Theme['spacing'];

export default theme;
