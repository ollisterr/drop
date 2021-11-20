import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { GlobalStateProvider } from './store';
import { ThemeProvider } from './styles';
import theme from './styles/theme';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStateProvider>
        <SafeAreaProvider>
          <Navigation />

          <StatusBar />
        </SafeAreaProvider>
      </GlobalStateProvider>
    </ThemeProvider>
  );
}
