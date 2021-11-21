import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KPICard, Header } from '../components';
import { Row, ScreenWrapper, Spacer } from '../styles/components';
import theme from '../styles/theme';
import styled from '../styles';
import { Text, H3 } from '../styles/typography';

import { GroupStackParamList } from '../types';

const testData = [
  {
    id: 'morjens',
    username: 'Jonesus',
    sustainability: 89,
    vitals: 67,
    score: 12,
  },
  {
    id: 'Taku',
    username: 'Taku',
    sustainability: 65,
    vitals: 72,
    score: 18,
  },
  {
    id: 'kukkku',
    username: 'Timo',
    sustainability: 55,
    vitals: 43,
    score: 41,
  },
  {
    id: 'lebens',
    username: 'Lebens67',
    sustainability: 12,
    vitals: 17,
    score: 78,
  },
];

export default function GroupScreen() {
  const insets = useSafeAreaInsets();

  const navigation =
    useNavigation<StackNavigationProp<GroupStackParamList, 'Group'>>();

  const groupName = 'Junction2021';

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
          <TouchableOpacity onPress={schedulePushNotification}>
            <KPICard
              kpi="Top 3"
              description="Three weeks in a row"
              color="success"
            />
          </TouchableOpacity>

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
            <H3 color={i === 0 ? 'victory' : undefined}>#{i + 1}</H3>

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

            <Text weight="bold">{user.vitals}</Text>

            <Spacer />

            <Ionicons name="leaf" size={20} color={theme.colors.success} />

            <Spacer spacing="xxsmall" />

            <Text weight="bold">{user.sustainability}</Text>
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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Jonesus beat you at hygiene! 😱',
      body: 'What are you gonna do about it?',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 15 },
  });
}
