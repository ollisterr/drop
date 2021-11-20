import React from 'react-native';
import background from '../assets/images/rain-drops.jpg';
import styled from '../styles';

const BackgroundImage = () => {
  return <Background source={background} />;
};

const Background = styled.Image`
  position: absolute;
  z-index: -2;
  width: 100%;
  opacity: 0.5;
`;

export default BackgroundImage;
