import React, { ReactNode } from 'react';
import { ImageBackgroundProps, StyleProp, ViewStyle } from 'react-native';

import styled from '../styles';
import theme, { Color } from '../styles/theme';

export interface CardProps {
  children: ReactNode;
  color?: Color;
  shadowed?: boolean;
  flex?: boolean;
  source?: ImageBackgroundProps['source'];
}

export default function Card({
  children,
  color = 'white',
  shadowed = false,
  flex = false,
  source,
}: CardProps) {
  return (
    <Wrapper style={[shadowed && shadowStyle]} shouldFlex={flex}>
      {source && (
        <>
          <Background source={source} />

          <BackgroundColor color={color} />
        </>
      )}

      <Content color={!source ? color : undefined}>{children}</Content>
    </Wrapper>
  );
}

const shadowStyle: StyleProp<ViewStyle> = {
  shadowOffset: { height: 5, width: 0 },
  shadowColor: theme.colors.black,
  shadowOpacity: 0.15,
  shadowRadius: 5,
  elevation: 10,
};

const Wrapper = styled.View<{
  shouldFlex: boolean;
}>`
  border-radius: ${p => p.theme.borderRadius.large};
  background-color: ${p => p.theme.colors.white};
  ${p => p.shouldFlex && 'flex: 1;'}
  overflow: hidden;
`;

const Background = styled.ImageBackground`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const BackgroundColor = styled.View<{ color: Color }>`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${p => p.theme.colors[p.color]};
  opacity: 0.5;
`;

const Content = styled.View<{ color?: Color }>`
  padding: ${p => p.theme.spacing.default};
  padding-bottom: ${p => p.theme.spacing.medium};
  ${p => p.color && `background-color: ${p.theme.colors[p.color]}`};
`;
