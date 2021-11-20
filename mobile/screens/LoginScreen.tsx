import React, { useEffect, useRef, useState } from 'react';
import { Animated, BackHandler, Easing } from 'react-native';
import styled from '../styles';
import { Input, ScreenWrapper, Spacer } from '../styles/components';
import { Text } from '../styles/typography';
import LogoIcon from '../assets/images/drop-logo-anti-drop.svg';
import DropIcon from '../assets/images/drop-logo-drop.svg';
import background from '../assets/images/rain-drops.jpg';
import { Button, TextButton } from '../components';
import useGlobalState from '../store';
import theme from '../styles/theme';

export default function LoginScreen() {
  const [showWelcomeScreen, toggleShowWelcomeScreen] = useState(true);

  const dropAnim = useRef(new Animated.Value(1)).current;
  const fadeDrop = useRef(new Animated.Value(1)).current;
  const fadeDrop2 = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.4)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (showWelcomeScreen) {
          return false;
        }
        toggleShowWelcomeScreen(true);
        return true;
      },
    );

    setTimeout(() => {
      Animated.sequence([
        Animated.timing(dropAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.bezier(0.51, 0.13, 0.9, 0.42),
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            easing: Easing.bezier(0.18, 0.54, 0.37, 0.85),
            useNativeDriver: true,
          }),
          // incoming
          Animated.timing(fadeDrop2, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
          }),
          // out
          Animated.timing(fadeDrop, {
            toValue: 0,
            delay: 100,
            duration: 50,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          delay: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 500,
          delay: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);

    return () => backhandler.remove();
  }, []);

  return (
    <ScreenWrapper>
      <Background source={background} />

      <ContentWrapper>
        <LogoWrapper>
          <Animated.View style={{ opacity: fadeAnim }}>
            <LogoIcon width={120} />
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              top: 35,
              left: 70,
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: theme.colors.primary,
              opacity: fadeDrop,
              transform: [
                {
                  translateY: dropAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -300],
                  }),
                },
              ],
            }}
          />

          <DropWrapper
            style={{
              opacity: fadeDrop2,
              transform: [{ scaleY: scaleAnim }],
            }}
          >
            <DropIcon width={120} />
          </DropWrapper>
        </LogoWrapper>

        <Spacer axis="y" spacing="large" />

        <Animated.View style={{ opacity: fadeAnim2 }}>
          {showWelcomeScreen ? (
            <WelcomeText next={() => toggleShowWelcomeScreen(false)} />
          ) : (
            <LoginView />
          )}
        </Animated.View>
      </ContentWrapper>
    </ScreenWrapper>
  );
}

const Background = styled.Image`
  position: absolute;
  z-index: -2;
  width: 100%;
  opacity: 0.5;
`;

const LogoWrapper = styled.View`
  width: 120px;
`;

const DropWrapper = styled(Animated.View)`
  position: absolute;
  width: 100%;
`;

const WelcomeText = ({ next }: { next: () => void }) => (
  <Content>
    <Text color="grey" align="center">
      With great shower comes great responsibility.
    </Text>

    <Spacer axis="y" spacing="large" />

    <Text color="grey" align="center">
      Drop your daily water consumption with transparent insights.
    </Text>

    <Spacer axis="y" spacing="xxlarge" />

    <Button onPress={next}>Let's bath</Button>
  </Content>
);

const LoginView = () => {
  const { login } = useGlobalState();

  const [input, setInput] = useState('');
  const [loading, toggleLoading] = useState(false);

  const submit = (username: string) => {
    toggleLoading(true);
    new Promise(resolve => {
      setTimeout(resolve, 1000);
    })
      .then(() => {
        login(username);
      })
      .finally(() => toggleLoading(false));
  };

  return (
    <Content>
      <Text color="grey" align="center">
        Add a username so that you're shower buddies can find you.
      </Text>

      <Spacer axis="y" spacing="large" />

      <Input
        value={input}
        onChangeText={setInput}
        placeholder="Username"
        align="center"
      />

      <Spacer axis="y" spacing="medium" />

      <Button onPress={() => submit(input)} loading={loading}>
        Log in
      </Button>

      <Spacer axis="y" spacing="xxlarge" />

      <TextButton onPress={() => submit('suihku-ukko')} disabled={loading}>
        Skip log in for now
      </TextButton>
    </Content>
  );
};

const Content = styled.View`
  width: 70%;
`;

const ContentWrapper = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: ${p => p.theme.spacing.default};
  padding-top: 50%;
`;
