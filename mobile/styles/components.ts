import { StyleProp, ViewStyle } from 'react-native';
import styled, { css } from '.';
import theme, { Spacing } from './theme';

export const ScreenWrapper = styled.View<{
  withPadding?: boolean;
  insets?: { top?: number; left?: number; bottom?: number; right?: number };
  align?: 'center' | 'flex-end';
  noBackground?: boolean;
}>`
  width: 100%;
  flex: 1;
  background-color: ${p =>
    p.noBackground ? 'transparent' : p.theme.colors.white};
  ${p => !!p.withPadding && `padding: ${p.theme.spacing.default};`}
  ${p => !!p.insets?.left && `padding-left: ${p.insets?.left}px;`}
  ${p => !!p.insets?.right && `padding-right: ${p.insets?.right}px;`}
  ${p => !!p.insets?.bottom && `padding-bottom: ${p.insets?.bottom}px;`}
  ${p => !!p.insets?.top && `padding-top: ${p.insets?.top}px;`}
  ${p =>
    p.align &&
    css`
      align-items: ${p.align};
      justify-content: ${p.align};
    `}
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
  bordered?: boolean;
}>`
  width: 100%;
  flex-direction: row;
  justify-content: ${p => p.justify ?? 'flex-start'};
  align-items: ${p => p.align ?? 'flex-start'};
  ${p =>
    p.bordered &&
    css`
      border-color: ${p.theme.colors.greyLight};
      border-top-width: 1px;
      border-bottom-width: 1px;
      padding-vertical: ${p.theme.spacing.default};
    `}
`;

export const shadowStyle: StyleProp<ViewStyle> = {
  shadowOffset: { height: 5, width: 0 },
  shadowColor: theme.colors.black,
  shadowOpacity: 0.15,
  shadowRadius: 5,
  elevation: 10,
};

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${p => p.theme.colors.greyLight};
`;

export const Input = styled.TextInput<{ align?: 'left' | 'center' | 'right' }>`
  ${p => p.theme.typography.body}
  width: 100%;
  border-radius: ${p => p.theme.borderRadius.large};
  padding-vertical: ${p => p.theme.spacing.small};
  padding-horizontal: ${p => p.theme.spacing.large};
  border: solid 3px ${p => p.theme.colors.primaryLight};
  background-color: ${p => p.theme.colors.white};
  text-align: ${p => p.align ?? 'left'};
`;
