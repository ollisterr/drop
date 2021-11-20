import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GroupType, GroupCard, KPICard } from '../components';
import styled from '../styles';
import { Row, ScreenWrapper, shadowStyle, Spacer } from '../styles/components';
import theme from '../styles/theme';

import { H2 } from '../styles/typography';
import { GroupStackParamList } from '../types';

const testData: GroupType[] = [
  {
    id: 'poikamiehet',
    name: 'Poikamiehet',
    score: 67,
    rank: 3,
    participants: ['Timo', 'Taku', 'Jonesus', 'Kaabriel', 'Hesekiel'],
  },
];

export default function GroupsScreen() {
  const insets = useSafeAreaInsets();

  const navigation =
    useNavigation<StackNavigationProp<GroupStackParamList, 'Groups'>>();

  return (
    <ScreenWrapper>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 32,
        }}
      >
        <H2>Shower Buddies</H2>

        <Spacer axis="y" />

        <Row bordered>
          <KPICard
            kpi="Top 3"
            description="Three weeks in a row"
            color="success"
          />

          <Spacer />

          <KPICard
            kpi="450 l"
            description="liters of water saved more than your friends"
            color="primaryLight"
          />
        </Row>

        <Spacer axis="y" spacing="large" />

        {testData.map(group => (
          <GroupCard key={group.id} {...group} />
        ))}
      </ScrollView>

      <AddGroupButton
        bottom={insets.bottom}
        style={shadowStyle}
        onPress={() => navigation.navigate('AddGroup')}
        activeOpacity={0.6}
      >
        <Ionicons
          name="add"
          size={32}
          color={theme.colors.white}
          style={{ alignSelf: 'center' }}
        />
      </AddGroupButton>
    </ScreenWrapper>
  );
}

const AddGroupButton = styled.TouchableOpacity<{ bottom: number }>`
  position: absolute;
  align-items: center;
  justify-content: center;
  right: ${p => p.theme.spacing.small};
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 999px;
  background-color: ${p => p.theme.colors.primaryDark};
`;
