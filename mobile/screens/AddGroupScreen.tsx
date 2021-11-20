import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Header } from '../components';
import { ScreenWrapper } from '../styles/components';
import { GroupStackParamList } from '../types';

export default function AddGroupScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GroupStackParamList, 'AddGroup'>>();

  return (
    <ScreenWrapper>
      <Header title="Create Group" onBackPress={() => navigation.goBack()} />
    </ScreenWrapper>
  );
}
