import { css } from '.';
import { px } from './style.utils';

const theme = {
  px,
  colors: {
    // accents
    primary: '#0079BD',
    primaryLight: '#55ADFF',
    primaryDark: '#003A5B',

    success: '#42B1A4',
    alert: '#C93000',
    victory: '#FFD700',

    // greys
    black: '#373737',
    white: '#fff',
    grey: '#7C7C7C',
    greyLight: '#E5E5E5',
    whitesmoke: '#F0F0F0',
  },
  borderRadius: {
    small: px(5),
    default: px(10),
    large: px(30),
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
      font-size: ${px(40)};
      font-weight: 600;
      margin-top: -${px(20)};
      margin-bottom: -${px(20)};
    `,
    h3: css`
      font-family: NATS;
      font-size: ${px(28)};
      text-transform: uppercase;
      margin-top: -${px(14)};
      margin-bottom: -${px(14)};
    `,
    subheading: css`
      font-family: 'Open Sans Bold';
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
