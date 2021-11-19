import * as React from 'react';

import styled from '../styles';
import { Row, ScreenWrapper, Spacer } from '../styles/components';
import { H1, Text } from '../styles/typography';

export default function MainScreen() {
  return (
    <ScreenWrapper>
      <HeaderStats>
        <H1>20,5l</H1>

        <Text>liters of water consumed today</Text>

        <Row justify="center">
          <Text color="success" weight="bold">
            -10%
          </Text>

          <Spacer spacing="xsmall" />

          <Text>compared to next week</Text>
        </Row>
      </HeaderStats>
    </ScreenWrapper>
  );
}

const HeaderStats = styled.View`
  width: 70%;
  align-self: center;
  align-items: center;
  border-width: 2px;
`;
