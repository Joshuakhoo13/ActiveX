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
  const { login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    const result = isRegister
      ? await register(email, password, name)
      : await login(email, password);
    setLoading(false);

    if (result.ok) {
      router.replace('/(tabs)');
    } else {
      Alert.alert(isRegister ? 'Registration Failed' : 'Login Failed', result.error);
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
        {isRegister && (
          <View style={styles.inputGroup}>
            <ThemedText style={[styles.label, { color: colors.subtle }]}>Name</ThemedText>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.card, borderColor: colors.border, color: colors.text },
              ]}
              placeholder="Your name"
              placeholderTextColor={colors.subtle}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.label, { color: colors.subtle }]}>Email</ThemedText>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.card, borderColor: colors.border, color: colors.text },
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
              { backgroundColor: colors.card, borderColor: colors.border, color: colors.text },
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
          style={[styles.submitButton, { backgroundColor: colors.accent }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.submitButtonText}>
              {isRegister ? 'Create Account' : 'Sign In'}
            </ThemedText>
          )}
        </TouchableOpacity>

        {!isRegister && (
          <TouchableOpacity style={styles.forgotButton}>
            <ThemedText style={[styles.forgotText, { color: colors.accent }]}>
              Forgot password?
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <ThemedText style={{ color: colors.subtle }}>
            {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          </ThemedText>
          <TouchableOpacity onPress={() => setIsRegister(!isRegister)} hitSlop={16}>
            <ThemedText style={{ color: colors.accent, fontWeight: '600' }}>
              {isRegister ? 'Sign In' : 'Sign Up'}
            </ThemedText>
          </TouchableOpacity>
        </View>
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
  submitButton: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonText: {
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
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
