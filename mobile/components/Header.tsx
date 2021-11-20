import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from '../styles';
import { Row, Spacer } from '../styles/components';
import theme from '../styles/theme';
import { H2 } from '../styles/typography';

interface Props {
  title: string;
  onBackPress: () => void;
}

export default function Header({ title, onBackPress }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Wrapper topPadding={insets.top} align="center">
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons
          name="chevron-back"
          size={28}
          color={theme.colors.greyLight}
        />
      </TouchableOpacity>

      <Spacer spacing="medium" />

      <H2>{title}</H2>
    </Wrapper>
  );
}

const Wrapper = styled(Row)<{ topPadding: number }>`
  padding-top: ${p => p.topPadding || 15}px;
  padding-bottom: 15px;
  padding-horizontal: ${p => p.theme.spacing.default};
  border-bottom-width: 1px;
  border-color: ${p => p.theme.colors.greyLight};
`;
