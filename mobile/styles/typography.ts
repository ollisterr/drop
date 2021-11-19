import styled, { css } from '.';
import { Color } from './theme';

const BaseText = styled.Text<{
  color?: Color;
  align?: 'left' | 'right' | 'center';
}>`
  color: ${p => p.theme.colors[p.color ?? 'black']};
  text-align: ${p => p.align ?? 'left'};
`;

export const Text = styled(BaseText)<{ weight?: 'medium' | 'bold' }>`
  ${p => p.theme.typography.body}
  ${p =>
    p.weight &&
    css`
      font-family: ${p.weight === 'medium'
        ? 'Open Sans Medium'
        : 'Open Sans Bold'};
      font-weight: ${p.weight === 'bold' ? 600 : 400};
    `}
`;

export const Subheading = styled(Text)`
  ${p => p.theme.typography.subheading}
`;

export const H1 = styled(BaseText)`
  ${p => p.theme.typography.h1}
`;

export const H2 = styled(BaseText)`
  ${p => p.theme.typography.h2}
`;

export const H3 = styled(BaseText)`
  ${p => p.theme.typography.h3}
`;
