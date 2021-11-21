import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Button, Card, Header, OverlayButton } from '../components';
import {
  Input,
  Row,
  ScreenWrapper,
  shadowStyle,
  Spacer,
} from '../styles/components';
import styled from '../styles';
import theme from '../styles/theme';
import { Description, H3, Subheading } from '../styles/typography';
import { GroupStackParamList } from '../types';
import { useReadUsersUsersGet } from '../api/users/users';
import useGlobalState from '../store';
import { AXIOS_INSTANCE } from '../api/axios';

type User = {
  id: string;
  username: string;
};

export default function AddGroupScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GroupStackParamList, 'AddGroup'>>();

  const { username } = useGlobalState();

  const [isModalVisible, toggleIsModalVisible] = useState(false);

  const [input, setInput] = useState('');
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, toggleIsLoading] = useState(false);

  const addUser = (user: User) => {
    if (!isIncluded(user)) {
      setSelectedUsers(x => [...x, user]);
    }
  };

  const removeUser = (user: User) =>
    setSelectedUsers(x => x.filter(y => y.id !== user.id));

  const { data } = useReadUsersUsersGet<User[]>();

  const filteredData = (data ?? []).filter(
    x =>
      x.username !== username && // not self
      x.username.toLowerCase().includes(input.toLowerCase()),
  );

  const isIncluded = useCallback(
    (user: User) => {
      return !!selectedUsers.find(x => x.id === user.id);
    },
    [selectedUsers],
  );

  const submit = () => {
    toggleIsLoading(true);
    AXIOS_INSTANCE.post('/group', { name: groupName })
      .then(({ id }: any) => {
        toggleIsModalVisible(false);
        navigation.replace('Group', { groupId: id });
      })
      .finally(() => toggleIsLoading(false));
  };

  return (
    <ScreenWrapper>
      <Header title="Create Group" onBackPress={() => navigation.goBack()} />

      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 80 }}
        >
          <SelectedUserList style={shadowStyle}>
            {selectedUsers.map(user => (
              <UserButton onPress={() => removeUser(user)}>
                {user.username}
              </UserButton>
            ))}
          </SelectedUserList>

          {filteredData.map(user => (
            <TouchableOpacity
              key={user.id}
              onPress={() => addUser(user)}
              disabled={isIncluded(user)}
            >
              <UserCard style={shadowStyle}>
                <Subheading>@{user.username}</Subheading>

                <Spacer />

                <Ionicons
                  name={isIncluded(user) ? 'checkmark-circle' : 'add'}
                  size={32}
                  color={
                    theme.colors[isIncluded(user) ? 'success' : 'greyLight']
                  }
                />
              </UserCard>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Overlay>
          <Input
            style={shadowStyle}
            value={input}
            onChangeText={setInput}
            placeholder="Search users"
          />
        </Overlay>
      </View>

      <OverlayButton
        icon="chevron-forward"
        onPress={() => toggleIsModalVisible(true)}
        isLoading={isLoading}
        disabled={!selectedUsers.length}
      />

      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onRequestClose={() => {
          toggleIsModalVisible(!isModalVisible);
        }}
      >
        <ModalWrapper
          onPress={() => toggleIsModalVisible(false)}
          activeOpacity={1}
        >
          <TouchableOpacity activeOpacity={1}>
            <Card>
              <H3 color="grey" align="center">
                Set group name
              </H3>

              <Spacer axis="y" />

              <Input
                value={groupName}
                onChangeText={setGroupName}
                placeholder="Group name"
              />

              <Spacer axis="y" />

              <Button onPress={submit} loading={isLoading}>
                Create group
              </Button>
            </Card>
          </TouchableOpacity>
        </ModalWrapper>
      </Modal>
    </ScreenWrapper>
  );
}

const ModalWrapper = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  padding: ${p => p.theme.spacing.default};
`;

const UserCard = styled(Row)`
  justify-content: space-between;
  align-items: center;
  border-radius: ${p => p.theme.borderRadius.large};
  padding: ${p => p.theme.spacing.default};
  padding-left: ${p => p.theme.spacing.medium};
  background-color: ${p => p.theme.colors.white};
  margin-bottom: ${p => p.theme.spacing.default};
`;

const UserButton = ({ onPress, children }: TouchableOpacityProps) => {
  return (
    <UserButtonWrapper onPress={onPress} activeOpacity={0.6}>
      <Description color="white" weight="bold">
        {children}
      </Description>

      <Spacer />

      <Ionicons name="close" size={16} color={theme.colors.white} />
    </UserButtonWrapper>
  );
};

const SelectedUserList = styled.View`
  flex-flow: row wrap;
  width: 100%;
  margin-bottom: ${p => p.theme.spacing.default};
`;

const UserButtonWrapper = styled.TouchableOpacity`
  margin-right: ${p => p.theme.spacing.xxsmall};
  margin-bottom: 6px;
  flex-direction: row;
  align-items: center;
  border-radius: ${p => p.theme.borderRadius.pill};
  padding-vertical: ${p => p.theme.spacing.xsmall};
  padding-horizontal: ${p => p.theme.spacing.small};
  background-color: ${p => p.theme.colors.primaryDark};
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  padding: ${p => p.theme.spacing.default};
`;
