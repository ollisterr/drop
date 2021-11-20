import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GroupType, GroupCard, KPICard, OverlayButton } from '../components';
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

      <OverlayButton
        icon="add"
        onPress={() => navigation.navigate('AddGroup')}
      />
    </ScreenWrapper>
  );
}
