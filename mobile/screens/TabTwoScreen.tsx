import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { H1, Text } from '../styles/typography';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <H1>Tab Two</H1>
      <View style={styles.separator} />
      <Text>Tässä on tekstiä niin maan perkelesti</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
