import * as React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, ScrollView } from 'react-native';
import styled from '../styles';
import { Row, ScreenWrapper, Spacer } from '../styles/components';
import { H1, Text, Detail } from '../styles/typography';
import background from '../assets/images/rain-drops.jpg';
import DropSVG from '../assets/images/drop-icon.svg';
import LogoSVG from '../assets/images/drop-logo.svg';
import Card from '../components/Card';
import KPICard from '../components/KPICard';
import Rank from '../components/Rank';
import Chart from '../components/Chart';

export default function MainScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper>
      <BackgroundImage source={background} />

      <DropIcon insets={insets} />

      <ScrollView style={{ flex: 1 }}>
        <Content insets={insets}>
          <LogoIcon width={120} />

          <HeaderStats>
            <H1 color="primary">20,5l</H1>

            <Detail>liters of water</Detail>
            <Detail>consumed today</Detail>

            <Spacer axis="y" />

            <Row justify="center">
              <Text color="success" weight="bold">
                -10%
              </Text>

              <Spacer spacing="xxsmall" />

              <Text>from last week</Text>
            </Row>
          </HeaderStats>

          <Spacer axis="y" spacing="xlarge" />

          <Card shadowed>
            <Row align="center" justify="space-between">
              <Rank rank={1} groupName="Taloyhtio Oy AB" />

              <Spacer spacing="small" />

              <Rank rank={3} groupName="Poikamiehet" />
            </Row>
          </Card>

          <Spacer axis="y" />

          <Row>
            <KPICard
              kpi="55,0 l"
              description="water spared this week"
              color="primaryDark"
            />

            <Spacer />

            <KPICard
              kpi="35 €"
              description="saved from last week"
              color="success"
            />
          </Row>

          <Spacer axis="y" spacing="xxlarge" />

          <Chart />
        </Content>
      </ScrollView>
    </ScreenWrapper>
  );
}

const BackgroundImage = styled.Image`
  position: absolute;
  z-index: -2;
  width: 100%;
  opacity: 0.5;
`;

const DropIcon = styled(DropSVG)<{ insets: any }>`
  position: absolute;
  z-index: -1;
  align-self: center;
  margin-top: ${p => p.insets.top}px;
  color: ${p => p.theme.colors.primaryLight};
  opacity: ${Platform.OS === 'ios' ? 0.4 : 0.15};
`;

const LogoIcon = styled(LogoSVG)`
  align-self: center;
`;

const Content = styled.View<{
  insets: { top: number; bottom: number };
}>`
  width: 100%;
  padding-top: ${p => p.insets.top}px;
  padding-bottom: ${p => p.insets.bottom + 50}px;
  padding-horizontal: ${p => p.theme.spacing.default};
`;

const HeaderStats = styled.View`
  width: 70%;
  align-self: center;
  align-items: center;
`;
