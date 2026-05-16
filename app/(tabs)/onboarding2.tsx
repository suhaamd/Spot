import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function Onboarding2() {
  const [goal, setGoal] = useState('muscle');
  const [split, setSplit] = useState('yes');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a0533', '#111318', '#0a0a0f']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.inner}>

          {/* Progress */}
          <View style={styles.progress}>
            <View style={[styles.progressDot, { backgroundColor: '#7C3AED' }]} />
            <View style={[styles.progressDot, { backgroundColor: '#7C3AED' }]} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerLabel}>STEP 2 OF 2</Text>
            <Text style={styles.headerTitle}>YOUR{'\n'}FITNESS{'\n'}PROFILE.</Text>
            <Text style={styles.headerSub}>Help Spot understand your goals.</Text>
          </View>

          {/* Inputs */}
          <View style={styles.inputs}>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>YOUR GOAL</Text>
              <View style={styles.pillRow}>
                {['Lose Weight', 'Build Muscle', 'Endurance'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.pill, goal === g && styles.pillActive]}
                    onPress={() => setGoal(g)}
                  >
                    <Text style={[styles.pillText, goal === g && styles.pillTextActive]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.inputLabel}>HEIGHT</Text>
                <TextInput
                  style={styles.input}
                  placeholder="175 cm"
                  placeholderTextColor="#333"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.inputLabel}>WEIGHT</Text>
                <TextInput
                  style={styles.input}
                  placeholder="70 kg"
                  placeholderTextColor="#333"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>DO YOU HAVE A SPLIT?</Text>
              <View style={styles.splitRow}>
                <TouchableOpacity
                  style={[styles.splitPill, split === 'yes' && styles.pillActive]}
                  onPress={() => setSplit('yes')}
                >
                  <Text style={[styles.pillText, split === 'yes' && styles.pillTextActive]}>I have one</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.splitPill, split === 'no' && styles.pillActive]}
                  onPress={() => setSplit('no')}
                >
                  <Text style={[styles.pillText, split === 'no' && styles.pillTextActive]}>Not yet</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

          {/* Let's Go Button */}
          <TouchableOpacity style={styles.nextButton}>
            <LinearGradient
              colors={['#9333EA', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.nextGradient}
            >
              <Text style={styles.nextText}>LET'S GO →</Text>
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
    paddingTop: 24,
    justifyContent: 'center',
  },
  progress: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  progressDot: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#333',
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
    fontSize: 44,
    fontWeight: '900',
    lineHeight: 44,
    letterSpacing: 1,
    marginBottom: 8,
  },
  headerSub: {
    color: '#555',
    fontSize: 15,
  },
  inputs: {
    gap: 20,
    marginBottom: 32,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    color: '#555',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1C1F26',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 18,
    color: '#FFFFFF',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#7C3AED22',
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#1C1F26',
    borderWidth: 1,
    borderColor: '#7C3AED22',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  pillActive: {
    backgroundColor: '#7C3AED22',
    borderColor: '#7C3AED',
  },
  pillText: {
    color: '#555',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  splitRow: {
    flexDirection: 'row',
    gap: 12,
  },
  splitPill: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#1C1F26',
    borderWidth: 1,
    borderColor: '#7C3AED22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  nextGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 3,
  },
});