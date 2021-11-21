import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { GlobalStateProvider } from './store';
import { ThemeProvider } from './styles';
import theme from './styles/theme';

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Notifications.scheduleNotificationAsync({
  content: {
    title: 'Remember to drink water!',
  },
  trigger: {
    seconds: 30 * 20,
    repeats: false,
  },
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token =>
      setExpoPushToken(token as string),
    );
  }, []);

  Notifications.cancelAllScheduledNotificationsAsync();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStateProvider>
          <SafeAreaProvider>
            <Navigation />

            <StatusBar />
          </SafeAreaProvider>
        </GlobalStateProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
