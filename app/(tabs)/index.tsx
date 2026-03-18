import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/context/auth-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

const FACILITIES = [
  { id: '1', name: 'Tennis Court', icon: 'tennisball.fill' as const, slots: 3 },
  { id: '2', name: 'Basketball Court', icon: 'basketball.fill' as const, slots: 1 },
  { id: '3', name: 'Swimming Pool', icon: 'figure.pool.swim' as const, slots: 5 },
  { id: '4', name: 'Badminton Court', icon: 'figure.badminton' as const, slots: 2 },
  { id: '5', name: 'Football Field', icon: 'soccerball' as const, slots: 0 },
  { id: '6', name: 'Gym', icon: 'dumbbell.fill' as const, slots: 8 },
];

const UPCOMING = [
  { id: '1', facility: 'Tennis Court A', date: 'Today', time: '4:00 PM - 5:00 PM' },
  { id: '2', facility: 'Swimming Pool', date: 'Tomorrow', time: '7:00 AM - 8:00 AM' },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user } = useAuth();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <View>
            <ThemedText style={[styles.greetingLabel, { color: colors.subtle }]}>
              Welcome back,
            </ThemedText>
            <ThemedText type="title">{user?.email?.split('@')[0] ?? 'Athlete'}</ThemedText>
          </View>
          <TouchableOpacity
            style={[styles.avatar, { backgroundColor: colors.accentLight }]}
            activeOpacity={0.7}>
            <IconSymbol name="person.fill" size={22} color={colors.accent} />
          </TouchableOpacity>
        </View>

        {UPCOMING.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="subtitle">Upcoming Bookings</ThemedText>
            <View style={{ gap: 10, marginTop: 12 }}>
              {UPCOMING.map((booking) => (
                <View
                  key={booking.id}
                  style={[styles.bookingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.bookingIcon, { backgroundColor: colors.accentLight }]}>
                    <IconSymbol name="calendar" size={20} color={colors.accent} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ThemedText style={styles.bookingFacility}>{booking.facility}</ThemedText>
                    <ThemedText style={[styles.bookingTime, { color: colors.subtle }]}>
                      {booking.date} &middot; {booking.time}
                    </ThemedText>
                  </View>
                  <IconSymbol name="chevron.right" size={16} color={colors.subtle} />
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <ThemedText type="subtitle">Facilities</ThemedText>
          <View style={styles.facilityGrid}>
            {FACILITIES.map((facility) => (
              <TouchableOpacity
                key={facility.id}
                style={[styles.facilityCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                activeOpacity={0.7}>
                <View style={[styles.facilityIcon, { backgroundColor: colors.accentLight }]}>
                  <IconSymbol name={facility.icon} size={28} color={colors.accent} />
                </View>
                <ThemedText style={styles.facilityName}>{facility.name}</ThemedText>
                <ThemedText
                  style={[
                    styles.facilitySlots,
                    { color: facility.slots > 0 ? colors.accent : '#EF4444' },
                  ]}>
                  {facility.slots > 0 ? `${facility.slots} slots open` : 'Fully booked'}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  greeting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  greetingLabel: {
    fontSize: 15,
    marginBottom: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 28,
  },
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  bookingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingFacility: {
    fontSize: 15,
    fontWeight: '600',
  },
  bookingTime: {
    fontSize: 13,
    marginTop: 2,
  },
  facilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  facilityCard: {
    width: '47%',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  facilityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facilityName: {
    fontSize: 15,
    fontWeight: '600',
  },
  facilitySlots: {
    fontSize: 13,
    fontWeight: '500',
  },
});
