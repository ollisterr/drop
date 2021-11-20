import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import styled from '../styles';
import { Detail } from '../styles/typography';

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

export default function TextButton({ children, ...props }: ButtonProps) {
  return (
    <ButtonWrapper {...props}>
      <ButtonText color="primary" align="center" weight="bold">
        {children}
      </ButtonText>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.TouchableOpacity`
  padding-vertical: ${p => p.theme.spacing.small};
  padding-horizontal: ${p => p.theme.spacing.medium};
  border-radius: ${p => p.theme.borderRadius.large};
`;

const ButtonText = styled(Detail)`
  text-decoration: underline;
`;
