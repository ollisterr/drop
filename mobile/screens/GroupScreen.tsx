import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KPICard, Header } from '../components';
import { Row, ScreenWrapper, Spacer } from '../styles/components';
import theme from '../styles/theme';
import styled from '../styles';
import { Text, H3 } from '../styles/typography';

import { GroupStackParamList } from '../types';

const testData = [
  {
    id: 'poikamiehet',
    username: 'Poikamiehet',
    score: 67,
  },
  {
    id: 'poikamiehet',
    username: 'Kannis',
    score: 67,
  },
  {
    id: 'poikamiehet',
    username: 'Tuhuri',
    score: 67,
  },
  {
    id: 'poikamiehet',
    username: 'Lebens67',
    score: 67,
  },
];

export default function GroupScreen() {
  const insets = useSafeAreaInsets();

  const navigation =
    useNavigation<StackNavigationProp<GroupStackParamList, 'Group'>>();

  const groupName = 'Poikamiehet';

  return (
    <ScreenWrapper>
      <Header title={groupName} onBackPress={() => navigation.goBack()} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 32,
        }}
      >
        <Spacer axis="y" />

        <Row>
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

        {testData.map((user, i) => (
          <UserCard key={user.id}>
            <H3 color={i < 3 ? 'victory' : undefined}>#{i + 1}</H3>

            <Spacer />

            <Text>{user.username}</Text>

            <Spacer fill />

            <Ionicons
              name="water"
              size={20}
              color={theme.colors.primaryLight}
            />

            <Spacer spacing="xxsmall" />

            <Text weight="bold">{user.score}</Text>

            <Spacer />

            <Ionicons
              name="fitness-outline"
              size={20}
              color={theme.colors.alert}
            />

            <Spacer spacing="xxsmall" />

            <Text weight="bold">{user.score}</Text>

            <Spacer />

            <Ionicons name="leaf" size={20} color={theme.colors.success} />

            <Spacer spacing="xxsmall" />

            <Text weight="bold">{user.score}</Text>
          </UserCard>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const UserCard = styled(Row)`
  align-items: center;
  border-color: ${p => p.theme.colors.greyLight};
  padding-vertical: ${p => p.theme.spacing.default};
  border-width: 0px;
  border-bottom-width: 1px;
`;
