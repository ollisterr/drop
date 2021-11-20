import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { RootStackParamList } from '../types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// reset entire navigation history to one screen (for example, on logout)
export const reset = (screen: keyof RootStackParamList) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screen }],
      }),
    );
  }
};
