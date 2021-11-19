import styled from '.';
import { Spacing } from './theme';

export const ScreenWrapper = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${p => p.theme.colors.white};
`;

export const Spacer = styled.View<{ axis?: 'x' | 'y'; spacing?: Spacing }>`
  flex-direction: ${p => (p.axis === 'y' ? 'column' : 'row')};
  width: ${p =>
    p.axis === 'y' ? '1px' : p.theme.spacing[p.spacing ?? 'default']};
  height: ${p =>
    p.axis === 'y' ? p.theme.spacing[p.spacing ?? 'default'] : '1px'};
`;
export const Row = styled.View<{
  justify?: 'center' | 'space-between' | 'flex-end' | 'space-between';
  align?: 'center' | 'space-between' | 'flex-end' | 'space-between';
}>`
  width: 100%;
  flex-direction: row;
  justify-content: ${p => p.justify ?? 'flex-start'};
  align-items: ${p => p.align ?? 'flex-start'};
`;
