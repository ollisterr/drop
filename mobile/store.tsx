import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { navigate } from './navigation/utils';
import { getPersistedData, persistData, resetPersistedData } from './utils';

export enum AuthStatus {
  UNAUTHENTICATED = 'unauthenticated',
  ANONYMOUS = 'anom',
  AUTHENTICATED = 'authenticated',
}

type GlobalContext = {
  username: string | null;
  authStatus: AuthStatus;
  login: (username?: string) => void;
  logout: () => void;
  checkAuth: () => void;
};

const GlobalStateContext = createContext<GlobalContext | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<GlobalContext['username']>(null);
  const [authStatus, setAuthStatus] = useState<GlobalContext['authStatus']>(
    AuthStatus.UNAUTHENTICATED,
  );

  const checkAuth = () => {
    if (!username) {
      getPersistedData('username')
        .then(value => {
          if (value) {
            setUsername(value);
            setAuthStatus(AuthStatus.AUTHENTICATED);
            navigate('Root', { screen: 'Main' });
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

  useEffect(checkAuth, [username]);

  const logout = () => {
    setAuthStatus(AuthStatus.UNAUTHENTICATED);
    setUsername(null);
    resetPersistedData('username');
    navigate('Login');
  };

  const login = (user?: string) => {
    if (user) {
      setAuthStatus(AuthStatus.AUTHENTICATED);
      setUsername(user);
      persistData('username', user);
    } else {
      setAuthStatus(AuthStatus.ANONYMOUS);
    }
    navigate('Root', { screen: 'Main' });
  };

  const state = useMemo(() => {
    return { username, authStatus, login, logout, checkAuth };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, authStatus]);

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
