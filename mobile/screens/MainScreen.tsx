import * as React from 'react';

import styled from '../styles';
import { Row, ScreenWrapper, Spacer } from '../styles/components';
import { H1, Text, Detail } from '../styles/typography';
import background from '../assets/images/rain-drops.jpg';
import DropSVG from '../assets/images/drop-icon.svg';

export default function MainScreen() {
  return (
    <ScreenWrapper>
      <BackgroundImage source={background} />

      <DropIcon />

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
  width: 80%;
  top: 0;
  color: ${p => p.theme.colors.primaryLight};
  opacity: 0.15;
`;

const HeaderStats = styled.View`
  width: 70%;
  align-self: center;
  align-items: center;
  margin-top: 20%;
`;
