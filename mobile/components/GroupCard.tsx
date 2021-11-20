import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RankNumber } from '.';
import styled from '../styles';
import { shadowStyle, Spacer } from '../styles/components';
import theme from '../styles/theme';
import { Description, Subheading } from '../styles/typography';
import { GroupStackParamList } from '../types';

export type GroupType = {
  id: string;
  name: string;
  score: number;
  rank: number;
  participants: string[];
};

export default function GroupCard({
  id,
  name,
  score,
  rank,
  participants,
}: GroupType) {
  const navigation =
    useNavigation<StackNavigationProp<GroupStackParamList, 'Groups'>>();

  const people = useMemo(() => {
    const str = participants.reduce((acc, curr) => {
      if (acc.length > 30) {
        return acc;
      }
      const newStr = `${acc}, ${curr}`;
      return newStr.length > 30 ? `${newStr}...` : newStr;
    });
    return str;
  }, [participants]);

  return (
    <Wrapper
      style={shadowStyle}
      onPress={() => navigation.navigate('Group', { groupId: id })}
    >
      <RankNumber rank={rank} />

      <Spacer />

      <View style={{ flex: 1 }}>
        <Subheading>{name}</Subheading>

        <Description>with {people}</Description>
      </View>

      <Ionicons
        name="chevron-forward"
        size={32}
        color={theme.colors.greyLight}
      />
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: ${p => p.theme.borderRadius.large};
  background-color: ${p => p.theme.colors.white};
  padding: ${p => p.theme.spacing.default};
`;
