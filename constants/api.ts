import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getDevServerHost = () => {
  const debuggerHost = Constants.expoConfig?.hostUri ?? Constants.manifest2?.extra?.expoGo?.debuggerHost;
  if (debuggerHost) {
    return debuggerHost.split(':')[0];
  }
  return Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
};

export const API_BASE_URL = `http://${getDevServerHost()}:8000`;
