import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Settings() {
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
            <Text style={styles.headerLabel}>APP</Text>
            <Text style={styles.headerTitle}>SETTINGS.</Text>
          </View>

          {/* Preferences */}
          <Text style={styles.sectionLabel}>PREFERENCES</Text>
          {[
            { label: 'Feedback Mode', value: 'Visual' },
            { label: 'Voice Guidance', value: 'Off' },
            { label: 'Rest Timer', value: '90 sec' },
            { label: 'Units', value: 'Metric' },
          ].map((item, i) => (
            <TouchableOpacity key={i}>
              <LinearGradient
                colors={['#1C1F26', '#111318']}
                style={styles.settingRow}
              >
                <Text style={styles.settingLabel}>{item.label}</Text>
                <View style={styles.settingRight}>
                  <Text style={styles.settingValue}>{item.value}</Text>
                  <Text style={styles.settingArrow}>→</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}

          {/* Device */}
          <Text style={styles.sectionLabel}>DEVICE</Text>
          {[
            { label: 'Spot Band', value: 'Connected', valueColor: '#22C55E' },
            { label: 'Bluetooth', value: 'On', valueColor: '#FFFFFF' },
          ].map((item, i) => (
            <TouchableOpacity key={i}>
              <LinearGradient
                colors={['#1C1F26', '#111318']}
                style={styles.settingRow}
              >
                <Text style={styles.settingLabel}>{item.label}</Text>
                <View style={styles.settingRight}>
                  <Text style={[styles.settingValue, { color: item.valueColor }]}>{item.value}</Text>
                  <Text style={styles.settingArrow}>→</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}

          {/* Account */}
          <Text style={styles.sectionLabel}>ACCOUNT</Text>
          {[
            { label: 'Notifications', value: '' },
            { label: 'Privacy Policy', value: '' },
          ].map((item, i) => (
            <TouchableOpacity key={i}>
              <LinearGradient
                colors={['#1C1F26', '#111318']}
                style={styles.settingRow}
              >
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Text style={styles.settingArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}

          {/* Log Out */}
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
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
  sectionLabel: {
    color: '#555',
    fontSize: 13,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  settingRow: {
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ffffff08',
  },
  settingLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    color: '#555',
    fontSize: 15,
  },
  settingArrow: {
    color: '#7C3AED',
    fontSize: 14,
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 8,
    marginBottom: 32,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});