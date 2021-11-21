import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AXIOS_INSTANCE } from './api/axios';
import { navigate, reset } from './navigation/utils';
import { getPersistedData, persistData, resetPersistedData } from './utils';

export enum AuthStatus {
  UNAUTHENTICATED = 'unauthenticated',
  ANONYMOUS = 'anom',
  AUTHENTICATED = 'authenticated',
}

type User = {
  username: string;
  apartmentId: number;
};

type GlobalContext = {
  user: User | null;
  authStatus: AuthStatus;
  login: (user?: User) => void;
  logout: () => void;
  checkAuth: () => void;
  updateUser: () => void;
  date: Date;
};

const GlobalStateContext = createContext<GlobalContext | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GlobalContext['user']>(null);
  const [authStatus, setAuthStatus] = useState<GlobalContext['authStatus']>(
    AuthStatus.UNAUTHENTICATED,
  );

  const date = useMemo(() => {
    const currentDate = new Date();
    currentDate.setFullYear(2020);
    return currentDate;
  }, []);

  const updateUser = () =>
    AXIOS_INSTANCE.get('/me').then(({ data }) => login(data));

  const checkAuth = () => {
    if (!user) {
      getPersistedData('username')
        .then(value => {
          if (value) {
            AXIOS_INSTANCE.post('/login', {
              username: value,
              password: 'kakka',
            })
              .then(updateUser)
              .catch(() => {
                setAuthStatus(AuthStatus.UNAUTHENTICATED);
              });
          } else {
            setAuthStatus(AuthStatus.UNAUTHENTICATED);
            navigate('Login');
          }
        })
        .catch(() => {
          setAuthStatus(AuthStatus.UNAUTHENTICATED);
          navigate('Login');
        });
    } else {
      setAuthStatus(AuthStatus.AUTHENTICATED);
      navigate('Root', { screen: 'Main' });
    }
  };

  useEffect(checkAuth, [user]);

  const logout = () => {
    setAuthStatus(AuthStatus.UNAUTHENTICATED);
    setUser(null);
    resetPersistedData('username');
    reset('Login');
  };

  const login = (userData?: User | null) => {
    if (userData) {
      setUser(userData);
      persistData('username', userData.username);
      reset('Root');
      setAuthStatus(AuthStatus.AUTHENTICATED);
    } else {
      logout();
    }
  };

  const state = useMemo(() => {
    return { user, authStatus, login, logout, checkAuth, updateUser, date };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authStatus]);

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export default function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) throw new Error('Missing GlobalStateProvider!');
  return context;
}
