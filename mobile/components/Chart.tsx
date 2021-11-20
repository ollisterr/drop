import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import { Subheading } from '../styles/typography';
import Card from './Card';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const thisWeekData = [
    { x: 1, y: 13000 },
    { x: 2, y: 16500 },
    { x: 3, y: 14250 },
    { x: 4, y: 19000 },
    { x: 5, y: 19000 },
    { x: 6, y: 19000 },
    { x: 7, y: 19000 },
];

const lastWeekData = [
    { x: 1, y: 10000 },
    { x: 2, y: 14000 },
    { x: 3, y: 15000 },
    { x: 4, y: 12000 },
    { x: 5, y: 18000 },
    { x: 6, y: 20000 },
    { x: 7, y: 17000 },
];

export default function Chart() {
    return (
        <Card shadowed>
            <Subheading>Weekly trend</Subheading>

            <VictoryChart
                width={350}
                height={250}
                padding={{ left: 20, right: 20, bottom: 50, top: 0 }}
                domainPadding={{ x: [0, 50], y: 5 }}
            >
                <VictoryBar
                    data={lastWeekData}
                    barRatio={0.75}
                    cornerRadius={8}
                    alignment="middle"
                    style={{
                        data: { fill: '#c43a31' },
                    }}
                />

                <VictoryBar
                    cornerRadius={8}
                    alignment="start"
                    barRatio={0.75}
                    data={thisWeekData}
                    style={{
                        data: { stroke: '#fff', strokeWidth: 2.5 },
                    }}
                />

                <VictoryAxis
                    tickValues={weekDays}
                    style={{ axis: { stroke: 'transparent' } }}
                />
            </VictoryChart>
        </Card>
    );
}
