import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Header, OverlayButton } from '../components';
import {
  Input,
  Row,
  ScreenWrapper,
  shadowStyle,
  Spacer,
} from '../styles/components';
import styled from '../styles';
import theme from '../styles/theme';
import { Description, Subheading } from '../styles/typography';
import { GroupStackParamList } from '../types';

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

const userData: User[] = [
  { firstName: 'Kakka-Poika', lastName: 'Tarkiainen', id: 'kakka' },
  { firstName: 'Little', lastName: 'Timothy', id: 'penis' },
  { firstName: 'Jonesus', lastName: 'Pyllynhajur', id: 'sasdaasd' },
  { firstName: 'Olli', lastName: 'Vitunhyväkoodari', id: 'loordi' },
  { firstName: 'Maestro', lastName: 'Loordi', id: 'askj' },
];

export default function AddGroupScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GroupStackParamList, 'AddGroup'>>();

  const [input, setInput] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, toggleIsLoading] = useState(false);

  const addUser = (user: User) => {
    if (!isIncluded(user)) {
      setSelectedUsers(x => [...x, user]);
    }
  };

  const removeUser = (user: User) =>
    setSelectedUsers(x => x.filter(y => y.id !== user.id));

  const data = userData;

  const isIncluded = useCallback(
    (user: User) => {
      return !!selectedUsers.find(x => x.id === user.id);
    },
    [selectedUsers],
  );

  const submit = () => {
    toggleIsLoading(true);
    new Promise(resolve => {
      setTimeout(() => resolve({ id: 'asdlkjasd' }), 1000);
    })
      .then(({ id }: any) => {
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
                {user.firstName}{' '}
                {selectedUsers.filter(x => x.firstName === user.firstName)
                  .length > 1
                  ? user.lastName.charAt(0)
                  : ''}
              </UserButton>
            ))}
          </SelectedUserList>

          {data.map(user => (
            <UserCard key={user.id} style={shadowStyle}>
              <Subheading>
                {user.firstName} {user.lastName}
              </Subheading>

              <Spacer />

              <TouchableOpacity
                onPress={() => addUser(user)}
                disabled={isIncluded(user)}
              >
                <Ionicons
                  name={isIncluded(user) ? 'checkmark-circle' : 'add'}
                  size={32}
                  color={
                    theme.colors[isIncluded(user) ? 'success' : 'greyLight']
                  }
                />
              </TouchableOpacity>
            </UserCard>
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
        onPress={submit}
        isLoading={isLoading}
        disabled={!selectedUsers.length}
      />
    </ScreenWrapper>
  );
}

const UserCard = styled(Row)`
  justify-content: space-between;
  align-items: center;
  border-radius: ${p => p.theme.borderRadius.large};
  padding: ${p => p.theme.spacing.default};
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
