import React, { ReactNode } from 'react';
import { ImageBackgroundProps } from 'react-native';

import styled from '../styles';
import { shadowStyle } from '../styles/components';
import { Color } from '../styles/theme';

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
        <BackgroundWrapper>
          <Background source={source} />

          <BackgroundColor color={color} />
        </BackgroundWrapper>
      )}

      <Content color={!source ? color : undefined}>{children}</Content>
    </Wrapper>
  );
}

const Wrapper = styled.View<{
  shouldFlex: boolean;
}>`
  border-radius: ${p => p.theme.borderRadius.large};
  ${p => p.shouldFlex && 'flex: 1;'}
`;

const BackgroundWrapper = styled.View`
  border-radius: ${p => p.theme.borderRadius.large};
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Background = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

const BackgroundColor = styled.View<{ color: Color }>`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: ${p => p.theme.borderRadius.large};
  background-color: ${p => p.theme.colors[p.color]};
  opacity: 0.5;
`;

const Content = styled.View<{ color?: Color }>`
  padding: ${p => p.theme.spacing.default};
  border-radius: ${p => p.theme.borderRadius.large};
  ${p => p.color && `background-color: ${p.theme.colors[p.color]}`};
`;
