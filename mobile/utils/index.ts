import AsyncStorage from '@react-native-async-storage/async-storage';

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function fadeColor(color: string, fade: number) {
  const rgb = hexToRgb(color);
  if (!rgb) {
    return null;
  }
  const { r, g, b } = rgb;
  return `rgba(${r}, ${g}, ${b}, ${fade})`;
}

export const persistData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e: any) {
    throw Error(e);
  }
};

export const getPersistedData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    return null;
  }
};

export const resetPersistedData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    throw Error(e);
  }
};
