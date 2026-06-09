import AsyncStorage from '@react-native-async-storage/async-storage';

const VALID_EMAIL = 'fiap@teste.com';
const VALID_PASSWORD = '123456';
export const SESSION_KEY = '@orbital_trust/session';

export async function login(email: string, password: string): Promise<boolean> {
  const isValid =
    email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD;

  if (!isValid) return false;

  await AsyncStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: VALID_EMAIL, authenticatedAt: new Date().toISOString() }),
  );

  return true;
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await AsyncStorage.getItem(SESSION_KEY);
  return session !== null;
}
