import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/context/auth-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText type="title" style={styles.title}>
        Profile
      </ThemedText>

      <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.avatar, { backgroundColor: colors.accentLight }]}>
          <IconSymbol name="person.fill" size={32} color={colors.accent} />
        </View>
        <View>
          <ThemedText type="subtitle">{user?.email?.split('@')[0] ?? 'User'}</ThemedText>
          <ThemedText style={[styles.email, { color: colors.subtle }]}>
            {user?.email ?? 'user@example.com'}
          </ThemedText>
        </View>
      </View>

      <View style={[styles.menuSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {[
          { icon: 'gear' as const, label: 'Settings' },
          { icon: 'bell.fill' as const, label: 'Notifications' },
          { icon: 'questionmark.circle' as const, label: 'Help & Support' },
        ].map((item, index, arr) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.menuItem,
              index < arr.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
            activeOpacity={0.6}>
            <IconSymbol name={item.icon} size={20} color={colors.subtle} />
            <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
            <IconSymbol name="chevron.right" size={14} color={colors.subtle} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { borderColor: '#EF4444' }]}
        onPress={handleLogout}
        activeOpacity={0.7}>
        <ThemedText style={styles.logoutText}>Sign Out</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    fontSize: 14,
    marginTop: 2,
  },
  menuSection: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
  },
  logoutButton: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});
