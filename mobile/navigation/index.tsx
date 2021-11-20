import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import useGlobalState, { AuthStatus } from '../store';
import { navigationRef } from './utils';

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
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen name="Main" component={MainScreen} />
      <BottomTab.Screen name="Groups" component={TabTwoScreen} />
    </BottomTab.Navigator>
  );
};
