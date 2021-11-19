import React from 'react';
import Card, { CardProps } from './Card';
import { H2, Text } from '../styles/typography';
import background from '../assets/images/rain-drops-dark.jpg';

interface Props extends Omit<CardProps, 'children'> {
  kpi: string;
  description: string;
}

export default function KPICard({
  kpi,
  description,
  color = 'primary',
}: Props) {
  return (
    <Card color={color} flex source={background}>
      <H2 color="white">{kpi}</H2>

      <Text color="white">{description}</Text>
    </Card>
  );
}
