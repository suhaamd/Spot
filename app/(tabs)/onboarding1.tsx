import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function Onboarding1() {
  const [sex, setSex] = useState('male');

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
            <View style={styles.progressDot} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerLabel}>STEP 1 OF 2</Text>
            <Text style={styles.headerTitle}>LET'S GET{'\n'}TO KNOW{'\n'}YOU.</Text>
            <Text style={styles.headerSub}>This helps Spot personalise your experience.</Text>
          </View>

          {/* Inputs */}
          <View style={styles.inputs}>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>YOUR NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#333"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>DATE OF BIRTH</Text>
              <TextInput
                style={styles.input}
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#333"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>SEX</Text>
              <View style={styles.pillRow}>
                <TouchableOpacity
                  style={[styles.pill, sex === 'male' && styles.pillActive]}
                  onPress={() => setSex('male')}
                >
                  <Text style={[styles.pillText, sex === 'male' && styles.pillTextActive]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pill, sex === 'female' && styles.pillActive]}
                  onPress={() => setSex('female')}
                >
                  <Text style={[styles.pillText, sex === 'female' && styles.pillTextActive]}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton}>
            <LinearGradient
              colors={['#9333EA', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.nextGradient}
            >
              <Text style={styles.nextText}>NEXT →</Text>
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
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#7C3AED22',
  },
  pillRow: {
    flexDirection: 'row',
    gap: 12,
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
  },
  pillActive: {
    backgroundColor: '#7C3AED22',
    borderColor: '#7C3AED',
  },
  pillText: {
    color: '#555',
    fontSize: 15,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
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