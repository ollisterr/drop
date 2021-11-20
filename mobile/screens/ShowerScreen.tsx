import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import { Animated, LayoutChangeEvent, View } from 'react-native';
import { Button } from '../components';
import { ScreenWrapper, Spacer } from '../styles/components';
import background from '../assets/images/rain-drops.jpg';
import OrasIcon from '../assets/images/oras-logo.svg';
import styled from '../styles';
import theme from '../styles/theme';

const START_VALUE = 0.73;
const DURATION = 60 * 1000;

export default function ShowerScreen() {
  const [isShowering, toggleIsShowering] = useState(false);
  const [size, setSize] = useState<{ height: number; width: number }>();

  const anim = useRef(new Animated.Value(START_VALUE)).current;
  const [progress, setProgress] = useState(START_VALUE);

  const animationRef = useRef<LottieView>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    anim.addListener(({ value }) => setProgress(value));

    return () => anim.removeAllListeners();
  }, []);

  const toggleShowering = () => {
    if (isShowering) {
      anim.stopAnimation();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration: progress * DURATION,
        useNativeDriver: false,
      }).start();
    }
    toggleIsShowering(x => !x);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    setSize({ height, width });
  };

  const color = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.grey, theme.colors.white],
  });

  return (
    <View style={{ flex: 1 }}>
      <BackgroundImage source={background} />

      <BackgroundWrapper onLayout={onLayout}>
        <LottieView
          ref={animationRef}
          style={{
            width: size?.width ?? 1000,
            height: size?.height ?? 1000,
            backgroundColor: 'transparent',
          }}
          progress={anim}
          // eslint-disable-next-line global-require
          source={require('../assets/lottie/water-animation.json')}
        />
      </BackgroundWrapper>

      <ScreenWrapper insets={insets} withPadding align="center" noBackground>
        <OrasIcon width={120} height={120} color="red" />

        <Spacer axis="y" spacing="xlarge" />

        <Text style={{ color }}>
          With Oras Smart Taps, the application will know when you are
          showering.
        </Text>

        <Spacer axis="y" />

        <Text style={{ color }}>
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
    </View>
  );
}

const Text = styled(Animated.Text)`
  ${p => p.theme.typography.body}
  text-align: center;
`;

const BackgroundWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 102%;
  flex: 1;
  background-color: red;
  z-index: -1;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  z-index: -2;
  width: 150%;
  opacity: 0.5;
  top: 0;
  right: 0;
  left: 0;
`;
