import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useSessions } from '../../hooks/useSessions';
import { useEffect } from 'react';

const { width } = Dimensions.get('window')


export default function Complete(){

  const { saveSession } = useSessions();

  useEffect(() => {
    saveSession({
      split_name: 'Back Day',
      duration: 5400,
      calories: 320,
      form_score: 87,
      avg_bpm: 142,
      exercises: [],
    });
  }, []);
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a0533', '#111318', '#0a0a0f']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.inner}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerLabel}>WORKOUT COMPLETE</Text>
            <Text style={styles.headerTitle}>CRUSHED{'\n'}IT. 💪</Text>
            <Text style={styles.headerSub}>Great work today, Suha.</Text>
          </View>

          {/* Stats Grid */}
          <Text style={styles.sectionLabel}>YOUR STATS</Text>
          <View style={styles.grid}>

            <View style={styles.row}>
              <LinearGradient
                colors={['#1C1F26', '#111318']}
                style={styles.card}
              >
                <Text style={styles.cardNumber}>1:26</Text>
                <Text style={styles.cardLabel}>Duration</Text>
              </LinearGradient>

              <LinearGradient
                colors={['#1C1F26', '#111318']}
                style={styles.card}
              >
                <Text style={[styles.cardNumber, { color: '#F97316' }]}>320</Text>
                <Text style={styles.cardLabel}>Calories</Text>
              </LinearGradient>
            </View>

            <View style={styles.row}>
              <LinearGradient
                colors={['#1C1F26', '#111318']}
                style={styles.card}
              >
                <Text style={[styles.cardNumber, { color: '#22C55E' }]}>87%</Text>
                <Text style={styles.cardLabel}>Form Score</Text>
              </LinearGradient>

              <LinearGradient
                colors={['#1C1F26', '#111318']}
                style={styles.card}
              >
                <Text style={styles.cardNumber}>150</Text>
                <Text style={styles.cardLabel}>Avg BPM</Text>
              </LinearGradient>
            </View>

          </View>

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton}>
            <LinearGradient
              colors={['#9333EA', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.doneGradient}
            >
              <Text style={styles.doneText}>DONE</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
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
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 36,
  },
  headerLabel: {
    color: '#7C3AED',
    fontSize: 14,
    letterSpacing: 4,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '900',
    lineHeight: 52,
    letterSpacing: 1,
    marginBottom: 8,
  },
  headerSub: {
    color: '#555',
    fontSize: 18,
  },
  sectionLabel: {
    color: '#555',
    fontSize: 13,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 12,
  },
  grid: {
    gap: 12,
    marginBottom: 36,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#7C3AED22',
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  cardLabel: {
    color: '#555',
    fontSize: 14,
    letterSpacing: 1,
  },
  doneButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  doneGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 3,
  },
});