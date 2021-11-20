import styled, { css } from '.';
import { Color } from './theme';

type TextProps = {
  color?: Color;
  align?: 'left' | 'right' | 'center';
  weight?: 'medium' | 'bold';
};

const BaseText = styled.Text<TextProps>`
  color: ${p => p.theme.colors[p.color ?? 'black']};
  text-align: ${p => p.align ?? 'left'};
`;

const weightedStyle = css<TextProps>`
  ${p =>
    p.weight &&
    css`
      font-family: ${p.weight === 'medium'
        ? 'Open Sans Medium'
        : 'Open Sans Bold'};
      font-weight: ${p.weight === 'bold' ? 600 : 400};
    `}
`;

export const Text = styled(BaseText)<TextProps>`
  ${p => p.theme.typography.body}
  ${weightedStyle}
`;

export const Subheading = styled(Text)<TextProps>`
  ${p => p.theme.typography.subheading}
  ${weightedStyle}
`;

export const Detail = styled(Text)<TextProps>`
  ${p => p.theme.typography.detail}
  ${weightedStyle}
`;

export const Description = styled(Text)<TextProps>`
  ${p => p.theme.typography.detail}
  font-size: ${p => p.theme.px(10)};
  ${weightedStyle}
`;

export const H1 = styled(BaseText)<TextProps>`
  ${p => p.theme.typography.h1}
`;

export const H2 = styled(BaseText)<TextProps>`
  ${p => p.theme.typography.h2}
`;

export const H3 = styled(BaseText)<TextProps>`
  ${p => p.theme.typography.h3}
`;
