import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { login } from '../services/authService';
import type { RootStackParamList } from '../types/navigation';
import { useResponsive } from '../utils/responsive';

type LoginNavProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen(): JSX.Element {
  const navigation = useNavigation<LoginNavProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { fontSizes, spacing } = useResponsive();
  const disabled = email.trim().length === 0 || password.length === 0 || submitting;

  const handleLogin = async () => {
    if (disabled) return;

    setSubmitting(true);
    setError('');

    try {
      const success = await login(email, password);

      if (!success) {
        setError('Email ou senha inválidos.');
        return;
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={[styles.content, { padding: spacing.lg }]}>
        <View style={styles.brand}>
          <Text style={[styles.logo, { fontSize: fontSizes.h1 }]}>Orbital Trust</Text>
          <Text style={[styles.subtitle, { fontSize: fontSizes.body }]}>
            Acesse o painel de alertas ambientais.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={[styles.label, { fontSize: fontSizes.label }]}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="fiap@teste.com"
            placeholderTextColor="#6b7280"
            style={[styles.input, { fontSize: fontSizes.body }]}
            value={email}
          />

          <Text style={[styles.label, { fontSize: fontSizes.label }]}>Senha</Text>
          <TextInput
            onChangeText={setPassword}
            placeholder="123456"
            placeholderTextColor="#6b7280"
            secureTextEntry
            style={[styles.input, { fontSize: fontSizes.body }]}
            value={password}
          />

          {error.length > 0 && (
            <Text style={[styles.errorText, { fontSize: fontSizes.caption }]}>
              {error}
            </Text>
          )}

          <Pressable
            accessibilityRole="button"
            disabled={disabled}
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.button,
              disabled && styles.buttonDisabled,
              pressed && !disabled && styles.buttonPressed,
            ]}
          >
            {submitting ? (
              <ActivityIndicator color="#0a0a0a" size="small" />
            ) : (
              <Text style={[styles.buttonText, { fontSize: fontSizes.label }]}>
                Entrar
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a0a0a',
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    maxWidth: 480,
    width: '100%',
  },
  brand: {
    marginBottom: 32,
  },
  logo: {
    color: '#00d4ff',
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#cbd5e1',
    lineHeight: 22,
  },
  form: {
    backgroundColor: '#1a1a2e',
    borderColor: '#26324a',
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  label: {
    color: '#e5e7eb',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0f172a',
    borderColor: '#334155',
    borderRadius: 8,
    borderWidth: 1,
    color: '#f8fafc',
    marginBottom: 14,
    minHeight: 48,
    paddingHorizontal: 14,
  },
  errorText: {
    color: '#f87171',
    fontWeight: '600',
    marginBottom: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00d4ff',
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#0a0a0a',
    fontWeight: '800',
  },
});
