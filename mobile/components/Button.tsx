import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import styled from '../styles';
import theme, { Color } from '../styles/theme';
import { Text } from '../styles/typography';

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  loading?: boolean;
  color?: Color;
}

export default function Button({
  children,
  loading = false,
  color,
  ...props
}: ButtonProps) {
  return (
    <ButtonWrapper {...props} color={color}>
      <Text color="white" align="center" weight="bold">
        {children}
      </Text>

      {loading && <LoadingAnimation color={theme.colors.white} />}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.TouchableOpacity<{ color?: Color }>`
  padding-vertical: ${p => p.theme.spacing.small};
  padding-horizontal: ${p => p.theme.spacing.medium};
  background-color: ${p => p.theme.colors[p.color ?? 'primary']};
  border-radius: ${p => p.theme.borderRadius.large};
  align-items: center;
`;

const LoadingAnimation = styled.ActivityIndicator`
  position: absolute;
  align-self: center;
  top: 0;
  bottom: 0;
  right: ${p => p.theme.spacing.medium};
`;
