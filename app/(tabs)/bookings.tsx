import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function BookingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText type="title" style={styles.title}>
        Bookings
      </ThemedText>
      <View style={styles.empty}>
        <View style={[styles.emptyIcon, { backgroundColor: colors.accentLight }]}>
          <IconSymbol name="calendar.badge.plus" size={40} color={colors.accent} />
        </View>
        <ThemedText type="subtitle">No upcoming bookings</ThemedText>
        <ThemedText style={[styles.emptyText, { color: colors.subtle }]}>
          Browse facilities on the home page to make your first booking.
        </ThemedText>
      </View>
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 80,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 20,
  },
});
