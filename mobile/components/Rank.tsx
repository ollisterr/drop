import React from 'react';
import { View } from 'react-native';
import styled from '../styles';
import { Row, Spacer } from '../styles/components';
import { Description, Detail, H3 } from '../styles/typography';

interface Props {
  rank: number;
  groupName: string;
}

export default function Rank({ rank, groupName }: Props) {
  return (
    <Row align="center" style={{ flex: 1 }}>
      <RankNumber rank={rank} />

      <Spacer spacing="xsmall" />

      <View style={{ flex: 1 }}>
        <Description>ranked in</Description>

        <Detail weight="bold">{groupName}</Detail>
      </View>
    </Row>
  );
}

export const RankNumber = ({ rank }: { rank: number }) => (
  <RankWrapper>
    <H3 color="primaryDark">#{rank}</H3>
  </RankWrapper>
);

const RankWrapper = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  width: 42px;
  height: 42px;
  border-width: 3px;
  border-color: ${p => p.theme.colors.victory};
`;
