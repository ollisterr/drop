import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import styled from '../styles';
import theme from '../styles/theme';
import { shadowStyle } from '../styles/components';

interface Props extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  isLoading?: boolean;
}

export default function OverlayButton({
  icon,
  onPress,
  isLoading,
  disabled = false,
  ...props
}: Props) {
  return (
    <OverlayWrapper disabled={!!disabled}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        {...props}
        style={[shadowStyle, props.style]}
        disabled={disabled}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.colors.white} />
        ) : (
          <Ionicons name={icon} size={24} color={theme.colors.white} />
        )}
      </TouchableOpacity>
    </OverlayWrapper>
  );
}

const OverlayWrapper = styled.TouchableOpacity<{ disabled: boolean }>`
  position: absolute;
  align-items: center;
  justify-content: center;
  right: ${p => p.theme.spacing.small};
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 999px;
  background-color: ${p => p.theme.colors.primaryDark};
  ${p => p.disabled && 'opacity: 0.4;'}
`;
