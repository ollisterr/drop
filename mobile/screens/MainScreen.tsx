import * as React from "react";
import * as Notifications from "expo-notifications";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, ScrollView, TouchableOpacity } from "react-native";

import styled from "../styles";
import { Row, ScreenWrapper, Spacer } from "../styles/components";
import { H1, Text, Detail } from "../styles/typography";
import background from "../assets/images/rain-drops.jpg";
import DropSVG from "../assets/images/drop-icon.svg";
import LogoSVG from "../assets/images/drop-logo.svg";
import { Card, Button, KPICard, Rank, Chart } from "../components";
import useGlobalState from "../store";
import { useGetConsumptionKpisConsumptionDailyApartmentIdDateGet } from "../api/consumption/consumption";
import {
  useGetUserWeeklyTrendKpisWeeklyChangeApartmentIdGet,
  useHygieneScoresHygieneScoresGroupIdDateGet,
  useSustainabilityScoresSustainabilityScoresGroupIdDateGet,
} from "../api/kpi/kpi";

export default function MainScreen() {
  React.useEffect(() => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Achievement unlocked! 🥳",
        body: "Congratulations!",
        data: { data: "goes here" },
      },
      trigger: { seconds: 15 },
    });
  }, []);

  const insets = useSafeAreaInsets();

  const { user, logout, date } = useGlobalState();

  const { data: dailyData } =
    useGetConsumptionKpisConsumptionDailyApartmentIdDateGet(
      user!.apartmentId,
      date.toISOString().split("T")[0]
    );

  const { data: kpiData } = useGetUserWeeklyTrendKpisWeeklyChangeApartmentIdGet(
    user!.apartmentId
  );

  const { data: sustainabilityKpi } =
    useSustainabilityScoresSustainabilityScoresGroupIdDateGet(
      6,
      date.toISOString().split("T")[0]
    );

  const { data: boiData } = useHygieneScoresHygieneScoresGroupIdDateGet(
    6,
    date.toISOString().split("T")[0]
  );

  console.log(sustainabilityKpi);

  return (
    <ScreenWrapper>
      <BackgroundImage source={background} />

      <TouchableOpacity onPress={() => schedulePushNotification()}>
        <DropIcon insets={insets} />
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        <Content insets={insets}>
          <LogoIcon width={120} />

          <HeaderStats>
            <H1 color="primary">{dailyData?.consumption.toFixed(1) ?? 0}</H1>

            <Detail>liters of water</Detail>
            <Detail>consumed today</Detail>

            <Spacer axis="y" />

            <Row justify="center">
              <Text color="success" weight="bold">
                {kpiData}%
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

          <Spacer axis="y" />

          <Chart />

          <Spacer axis="y" spacing="xxlarge" />

          <Button onPress={logout}>Log out</Button>
        </Content>
      </ScrollView>
    </ScreenWrapper>
  );
}
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
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
  margin-top: ${(p) => p.insets.top}px;
  color: ${(p) => p.theme.colors.primaryLight};
  opacity: ${Platform.OS === "ios" ? 0.4 : 0.15};
`;

const LogoIcon = styled(LogoSVG)`
  align-self: center;
`;

const Content = styled.View<{
  insets: { top: number; bottom: number };
}>`
  width: 100%;
  padding-top: ${(p) => p.insets.top}px;
  padding-bottom: ${(p) => p.insets.bottom + 50}px;
  padding-horizontal: ${(p) => p.theme.spacing.default};
`;

const HeaderStats = styled.View`
  width: 70%;
  align-self: center;
  align-items: center;
`;
