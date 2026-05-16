import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a0533', '#111318', '#0a0a0f']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerLabel}>YOUR</Text>
            <Text style={styles.headerTitle}>PROFILE.</Text>
          </View>

          {/* Avatar */}
          <View style={styles.avatarSection}>
            <LinearGradient
              colors={['#9333EA', '#7C3AED']}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>S</Text>
            </LinearGradient>
            <View style={styles.avatarInfo}>
              <Text style={styles.avatarName}>Suha</Text>
              <Text style={styles.avatarMember}>Member since April 2026</Text>
            </View>
          </View>

          {/* Stats Row */}
          <LinearGradient
            colors={['#1C1F26', '#111318']}
            style={styles.statsCard}
          >
            <View style={styles.stat}>
              <Text style={styles.statNumber}>47</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={[styles.statNumber, { color: '#22C55E' }]}>84%</Text>
              <Text style={styles.statLabel}>Avg Form</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={[styles.statNumber, { color: '#F97316' }]}>12.4k</Text>
              <Text style={styles.statLabel}>Total Cal</Text>
            </View>
          </LinearGradient>

          {/* Info Rows */}
          <Text style={styles.sectionLabel}>MY INFO</Text>

          {[
            { label: 'Goal', value: 'Build Muscle' },
            { label: 'Weight', value: '70 kg' },
            { label: 'Height', value: '175 cm' },
            { label: 'Experience', value: 'Intermediate' },
          ].map((item, i) => (
            <LinearGradient
              key={i}
              colors={['#1C1F26', '#111318']}
              style={styles.infoRow}
            >
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </LinearGradient>
          ))}

          {/* Edit Button */}
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111318',
  },
  safe: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 24,
    marginBottom: 24,
  },
  headerLabel: {
    color: '#7C3AED',
    fontSize: 14,
    letterSpacing: 4,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 2,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  avatarInfo: {
    flex: 1,
  },
  avatarName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  avatarMember: {
    color: '#555',
    fontSize: 14,
  },
  statsCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#7C3AED22',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    color: '#555',
    fontSize: 13,
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#ffffff15',
  },
  sectionLabel: {
    color: '#555',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ffffff08',
  },
  infoLabel: {
    color: '#555',
    fontSize: 16,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  editButton: {
    borderRadius: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#7C3AED',
    marginTop: 8,
    marginBottom: 32,
  },
  editButtonText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});