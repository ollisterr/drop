import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import useGlobalState, { AuthStatus } from '../store';
import { navigationRef } from './utils';
import { Description } from '../styles/typography';
import theme from '../styles/theme';
import styled from '../styles';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { authStatus, checkAuth } = useGlobalState();

  React.useEffect(() => {
    checkAuth();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} linking={LinkingConfiguration}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authStatus !== AuthStatus.UNAUTHENTICATED ? (
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64 + insets.bottom,
        },
        tabBarIconStyle: { display: 'none' },
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarLabel: (props: any) => (
            <BottomTabLabel icon="stats-chart" title="Stats" {...props} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Shower"
        component={TabTwoScreen}
        options={{
          tabBarLabel: (props: any) => (
            <BottomTabLabel icon="water" title="Let's bath" {...props} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Groups"
        component={TabTwoScreen}
        options={{
          tabBarLabel: (props: any) => (
            <BottomTabLabel icon="people" title="Groups" {...props} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

interface TabProps {
  title: string;
  focused?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

const BottomTabLabel = ({ focused, title, icon }: TabProps) => {
  const color = theme.colors[focused ? 'primaryLight' : 'grey'];

  return (
    <TabWrapper>
      <Ionicons name={icon} size={32} color={color} />

      <Description color={focused ? 'primaryLight' : 'grey'} align="center">
        {title}
      </Description>
    </TabWrapper>
  );
};

const TabWrapper = styled.View`
  align-items: center;
  padding: ${p => p.theme.spacing.xsmall};
`;
