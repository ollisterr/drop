/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import { useGetConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGet } from '../api/consumption/consumption';
import useGlobalState from '../store';
import { Row, Spacer } from '../styles/components';
import theme from '../styles/theme';
import { Description, Subheading } from '../styles/typography';
import Card from './Card';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Chart() {
  const { user } = useGlobalState();

  const { data } =
    useGetConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGet(
      Number(user!.apartmentId),
      2,
    );

  const formattedData = (data ?? []).map(x => ({ ...x, y: x.consumption }));

  const week1 = formattedData.slice(0, 7);
  const week2 = formattedData.slice(7);

  const changeTrend = week1.map(day => {
    const comparisonDay = week2.find(x => x.index === day.index);
    return Math.round(day.consumption / comparisonDay.consumption);
  });

  return (
    <Card shadowed>
      <Subheading>Weekly trend</Subheading>

      <VictoryChart
        width={350}
        height={200}
        padding={{ left: 15, right: 0, bottom: 30, top: 30 }}
        domainPadding={{ x: [0, 50], y: 5 }}
      >
        <VictoryBar
          data={week2}
          barRatio={0.75}
          cornerRadius={8}
          alignment="middle"
          style={{
            data: { fill: theme.colors.greyLight },
          }}
        />

        <VictoryBar
          cornerRadius={8}
          alignment="start"
          barRatio={0.75}
          data={week1.reverse()}
          style={{
            data: {
              fill: theme.colors.primary,
              stroke: '#fff',
              strokeWidth: 2.5,
            },
          }}
        />

        <VictoryAxis
          tickValues={weekDays}
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: {
              color: theme.colors.grey,
              paddingLeft: 5,
            },
          }}
        />
      </VictoryChart>

      <Row>
        {changeTrend.map(x => (
          <Description
            style={{ flex: 1 }}
            weight="bold"
            align="center"
            color={x < 0 ? 'alert' : 'success'}
          >
            {x < 0 ? '-' : '+'}
            {x}%
          </Description>
        ))}
      </Row>

      <Spacer axis="y" />
    </Card>
  );
}
