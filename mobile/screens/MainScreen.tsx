import * as React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from '../styles';
import { Row, ScreenWrapper, Spacer } from '../styles/components';
import { H1, Text, Detail } from '../styles/typography';
import background from '../assets/images/rain-drops.jpg';
import DropSVG from '../assets/images/drop-icon.svg';
import LogoSVG from '../assets/images/drop-logo.svg';

export default function MainScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScreenWrapper>
      <BackgroundImage source={background} />

      <DropIcon />

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
      </Content>
    </ScreenWrapper>
  );
}

const BackgroundImage = styled.Image`
  position: absolute;
  z-index: -2;
  width: 100%;
  opacity: 0.5;
`;

const DropIcon = styled(DropSVG)`
  position: absolute;
  z-index: -1;
  align-self: center;
  top: 0;
  color: ${p => p.theme.colors.primaryLight};
  opacity: 0.15;
`;

const LogoIcon = styled(LogoSVG)`
  align-self: center;
`;

const Content = styled.View<{ insets: { top: number; bottom: number } }>`
  padding-top: ${p => p.insets.top}px;
  padding-bottom: ${p => p.insets.bottom}px;
`;

const HeaderStats = styled.View`
  width: 70%;
  align-self: center;
  align-items: center;
`;
