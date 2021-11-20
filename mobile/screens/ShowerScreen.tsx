import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components';
import { ScreenWrapper, Spacer } from '../styles/components';
import { Text } from '../styles/typography';
import background from '../assets/images/rain-drops.jpg';
import OrasIcon from '../assets/images/oras-logo.svg';
import styled from '../styles';

export default function ShowerScreen() {
  const [isShowering, toggleIsShowering] = useState(false);

  const insets = useSafeAreaInsets();

  const toggleShowering = () => {
    toggleIsShowering(x => !x);
  };

  return (
    <ScreenWrapper insets={insets} withPadding align="center">
      <BackgroundImage source={background} />

      <OrasIcon width={120} height={120} color="red" />

      <Spacer axis="y" spacing="xlarge" />

      <Text align="center">
        With Oras Smart Taps, the application will know when you are showering.
      </Text>

      <Spacer axis="y" />

      <Text align="center">
        However, for demo purposes, press button to toggle showering
      </Text>

      <Spacer axis="y" spacing="xlarge" />

      <Button
        onPress={toggleShowering}
        color={isShowering ? 'alert' : 'primary'}
      >
        {isShowering ? 'Stop showering' : 'Start showering'}
      </Button>
    </ScreenWrapper>
  );
}

const BackgroundImage = styled.Image`
  position: absolute;
  z-index: -2;
  width: 150%;
  opacity: 0.5;
  top: 0;
  right: 0;
  left: 0;
`;
