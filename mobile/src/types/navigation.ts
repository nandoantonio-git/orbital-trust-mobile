import type { AlertResponse } from './alert';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  AlertDetail: { alertId: string; alertData?: AlertResponse };
  History: undefined;
  Settings: undefined;
  About: undefined;
};
