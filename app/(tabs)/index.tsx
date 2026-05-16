import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a0533', '#111318', '#0a0a0f']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good Afternoon,</Text>
              <Text style={styles.name}>Suha 👋</Text>
            </View>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
          </View>

          {/* Today Card */}
          <LinearGradient
            colors={['#2D1B69', '#1C1F26']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.todayCard}
          >
            <Text style={styles.todayLabel}>TODAY'S WORKOUT</Text>
            <Text style={styles.workoutName}>BACK{'\n'}DAY.</Text>
            <Text style={styles.hypeMessage}>Get that big backk ma'am!</Text>

            <View style={styles.workoutMeta}>
              <View style={styles.metaStat}>
                <Text style={styles.metaNumber}>6</Text>
                <Text style={styles.metaLabel}>Exercises</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaStat}>
                <Text style={styles.metaNumber}>45</Text>
                <Text style={styles.metaLabel}>Min Est.</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaStat}>
                <Text style={styles.metaNumber}>3</Text>
                <Text style={styles.metaLabel}>Sets Each</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>START WORKOUT</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* This Week */}
          <Text style={styles.sectionLabel}>THIS WEEK</Text>
          <View style={styles.weekRow}>
            <LinearGradient colors={['#1C1F26', '#111318']} style={styles.weekCard}>
              <Text style={styles.weekNumber}>3</Text>
              <Text style={styles.weekLabel}>Sessions{'\n'}Done</Text>
            </LinearGradient>
            <LinearGradient colors={['#1C1F26', '#111318']} style={styles.weekCard}>
              <Text style={styles.weekNumber}>2</Text>
              <Text style={styles.weekLabel}>Sessions{'\n'}Left</Text>
            </LinearGradient>
            <LinearGradient 
              colors={['#1C1F26', '#111318']} 
              style={[styles.weekCard, { borderColor: '#F9731633' }]}
            >
              <Text style={[styles.weekNumber, { color: '#F97316' }]}>1240</Text>
              <Text style={styles.weekLabel}>Calories{'\n'}Burned</Text>
            </LinearGradient>
          </View>

          {/* Session History */}
          <Text style={styles.sectionLabel}>HISTORY</Text>
          <TouchableOpacity>
            <LinearGradient
              colors={['#1C1F26', '#111318']}
              style={styles.historyCard}
            >
              <View>
                <Text style={styles.historyTitle}>Session History</Text>
                <Text style={styles.historySub}>View all past workouts</Text>
              </View>
              <Text style={styles.historyArrow}>→</Text>
            </LinearGradient>
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
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    marginBottom: 24,
  },
  greeting: {
    color: '#555',
    fontSize: 13,
    letterSpacing: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  proBadge: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  proBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  todayCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#7C3AED44',
  },
  todayLabel: {
    color: '#7C3AED',
    fontSize: 9,
    letterSpacing: 4,
    fontWeight: '700',
    marginBottom: 8,
  },
  workoutName: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '900',
    lineHeight: 52,
    letterSpacing: 2,
    marginBottom: 8,
  },
  hypeMessage: {
    color: '#888',
    fontSize: 13,
    marginBottom: 24,
  },
  workoutMeta: {
    flexDirection: 'row',
    backgroundColor: '#ffffff08',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  metaStat: {
    flex: 1,
    alignItems: 'center',
  },
  metaNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  metaLabel: {
    color: '#555',
    fontSize: 10,
    letterSpacing: 1,
  },
  metaDivider: {
    width: 1,
    backgroundColor: '#ffffff15',
  },
  startButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 3,
  },
  sectionLabel: {
    color: '#555',
    fontSize: 9,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 12,
  },
  weekRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  weekCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#7C3AED22',
    alignItems: 'center',
  },
  weekNumber: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 4,
  },
  weekLabel: {
    color: '#555',
    fontSize: 9,
    letterSpacing: 1,
    textAlign: 'center',
  },
  historyCard: {
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff08',
    marginBottom: 32,
  },
  historyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  historySub: {
    color: '#555',
    fontSize: 12,
  },
  historyArrow: {
    color: '#7C3AED',
    fontSize: 22,
  },
});