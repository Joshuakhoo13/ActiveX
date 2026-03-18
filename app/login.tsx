import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '@/context/auth-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <View style={styles.header}>
        <View style={[styles.logoContainer, { backgroundColor: colors.accentLight }]}>
          <IconSymbol name="figure.run" size={48} color={colors.accent} />
        </View>
        <ThemedText type="title" style={styles.appName}>
          ActiveX
        </ThemedText>
        <ThemedText style={[styles.tagline, { color: colors.subtle }]}>
          Book courts, find games, stay active
        </ThemedText>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.label, { color: colors.subtle }]}>Email</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="you@example.com"
            placeholderTextColor={colors.subtle}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.label, { color: colors.subtle }]}>Password</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Enter your password"
            placeholderTextColor={colors.subtle}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: colors.accent }]}
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.loginButtonText}>Sign In</ThemedText>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotButton}>
          <ThemedText style={[styles.forgotText, { color: colors.accent }]}>
            Forgot password?
          </ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <ThemedText style={{ color: colors.subtle }}>
          Don't have an account?{' '}
          <ThemedText style={{ color: colors.accent, fontWeight: '600' }}>Sign Up</ThemedText>
        </ThemedText>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    marginBottom: 6,
  },
  tagline: {
    fontSize: 15,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  loginButton: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  forgotButton: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
});
