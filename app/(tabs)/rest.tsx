import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Rest() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a0533', '#111318', '#0a0a0f']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe} edges={['top']}>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>REST</Text>
          <View style={styles.heartRateBadge}>
            <Text style={styles.heartRateNumber}>72</Text>
            <Text style={styles.heartRateLabel}>BPM</Text>
          </View>
        </View>

        <View style={styles.container2}>

          {/* Set Finished */}
          <Text style={styles.setFinished}>SET 2 FINISHED</Text>

          {/* Timer */}
          <Text style={styles.timerLabel}>REST TIME</Text>
          <Text style={styles.timer}>1:30</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Reps Completed */}
          <Text style={styles.repsLabel}>REPS COMPLETED</Text>
          <Text style={styles.repsCount}>12 / 15</Text>

          {/* Pills */}
          <View style={styles.pillsContainer}>
            <View style={styles.pillRow}>
              <View style={[styles.pill, { backgroundColor: '#22C55E' }]} />
              <Text style={styles.pillText}>10 reps — Good form</Text>
            </View>
            <View style={styles.pillRow}>
              <View style={[styles.pill, { backgroundColor: '#EAB308' }]} />
              <Text style={styles.pillText}>2 reps — Okay form</Text>
            </View>
            <View style={styles.pillRow}>
              <View style={[styles.pill, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.pillText}>0 reps — Bad form</Text>
            </View>
          </View>

          {/* Next Up */}
          <View style={styles.nextUpCard}>
            <Text style={styles.nextUpLabel}>NEXT UP</Text>
            <Text style={styles.nextUpExercise}>Preacher Curls</Text>
          </View>

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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff08',
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 4,
  },
  heartRateBadge: {
    backgroundColor: '#EF444422',
    borderWidth: 1,
    borderColor: '#EF444444',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
  },
  heartRateNumber: {
    color: '#EF4444',
    fontSize: 20,
    fontWeight: '800',
  },
  heartRateLabel: {
    color: '#EF444488',
    fontSize: 9,
    letterSpacing: 2,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  setFinished: {
    color: '#7C3AED',
    fontSize: 15,
    letterSpacing: 4,
    fontWeight: '700',
  },
  timerLabel: {
    color: '#555',
    fontSize: 15,
    letterSpacing: 3,
  },
  timer: {
    color: '#FFFFFF',
    fontSize: 96,
    fontWeight: '900',
    letterSpacing: 2,
    lineHeight: 100,
  },
  divider: {
    width: width * 0.4,
    height: 5,
    backgroundColor: '#ffffff15',
    marginVertical: 8,
  },
  repsLabel: {
    color: '#555',
    fontSize: 15,
    letterSpacing: 3,
  },
  repsCount: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '900',
  },
  pillsContainer: {
    gap: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pill: {
    width: 40,
    height: 16,
    borderRadius: 8,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  nextUpCard: {
    backgroundColor: '#1C1F26',
    borderRadius: 16,
    padding: 16,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#7C3AED33',
    marginTop: 8,
  },
  nextUpLabel: {
    color: '#7C3AED',
    fontSize: 9,
    letterSpacing: 3,
    fontWeight: '700',
    marginBottom: 4,
  },
  nextUpExercise: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});