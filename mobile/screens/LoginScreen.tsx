import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import styled from '../styles';
import { ScreenWrapper, Spacer } from '../styles/components';
import { Text } from '../styles/typography';
import LogoIcon from '../assets/images/drop-logo.svg';
import background from '../assets/images/rain-drops.jpg';
import { Button, TextButton } from '../components';
import useGlobalState from '../store';

export default function LoginScreen() {
  const [showWelcomeScreen, toggleShowWelcomeScreen] = useState(true);

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

    return () => backhandler.remove();
  });

  return (
    <ScreenWrapper>
      <Background source={background} />

      <ContentWrapper>
        <LogoIcon width={120} />

        <Spacer axis="y" spacing="large" />

        {showWelcomeScreen ? (
          <WelcomeText next={() => toggleShowWelcomeScreen(false)} />
        ) : (
          <LoginView />
        )}
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

      <Input value={input} onChangeText={setInput} placeholder="Username" />

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
  padding-top: 25%;
`;

const Input = styled.TextInput`
  ${p => p.theme.typography.body}
  width: 100%;
  border-radius: ${p => p.theme.borderRadius.large};
  padding-vertical: ${p => p.theme.spacing.small};
  padding-horizontal: ${p => p.theme.spacing.large};
  border: solid 3px ${p => p.theme.colors.primaryLight};
  background-color: ${p => p.theme.colors.white};
  text-align: center;
`;
