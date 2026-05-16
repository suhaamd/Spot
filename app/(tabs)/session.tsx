import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useSpotML } from '../../hooks/useSpotML';
import { useSpotVoice } from '../../hooks/SpotVoice';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Session() {
  const { ready, exercise, formInfo } = useSpotML();

  const [seconds, setSeconds] = useState(0);
  const [reps, setReps] = useState(0);
  const [set, setSet] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };


  const { askSpot, isSpeaking, isThinking } = useSpotVoice({
    exercise: exercise,
    formScore: formInfo.text,
    setNumber: set,
    totalSets: 3,
    calories: Math.floor(seconds * 0.1),
    duration: formatTime(seconds),
  });

  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  useEffect(() => {
    if (ready && !paused) {
      setReps(r => r + 1);
    }
  }, [formInfo]);


  const circleColor = formInfo.color;


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a0533', '#111318', '#0a0a0f']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe} edges={['top']}>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.timerLabel}>SESSION TIME</Text>
            <Text style={styles.timer}>{formatTime(seconds)}</Text>
          </View>
          <View style={styles.heartRateContainer}>
            <View style={styles.heartRateBadge}>
              <Text style={styles.heartRateNumber}>72</Text>
              <Text style={styles.heartRateLabel}>BPM</Text>
            </View>
          </View>
        </View>

        {/* Next Up */}
        <View style={styles.nextUpContainer}>
          <Text style={styles.nextUpLabel}>NEXT UP</Text>
          <Text style={styles.nextUpExercise}>Preacher Curls</Text>
        </View>

        {/* Form Indicator */}
        <View style={styles.formHero}>
          <LinearGradient
            colors={[`${circleColor}22`, `${circleColor}05`]}
            style={[styles.formCircleOuter, { borderColor: `${circleColor}33` }]}
          >
            <LinearGradient
              colors={[`${circleColor}44`, `${circleColor}11`]}
              style={[styles.formCircleInner, { borderColor: `${circleColor}66` }]}
            >
              <Text style={styles.repNumber}>{reps}</Text>
              <Text style={[styles.repLabel, { color: circleColor }]}>REPS</Text>
            </LinearGradient>
          </LinearGradient>

          <View style={[styles.formStatus, {
            backgroundColor: `${circleColor}15`,
            borderColor: `${circleColor}33`
          }]}>
            <View style={[styles.formDot, { backgroundColor: circleColor }]} />
            <Text style={[styles.formText, { color: circleColor }]}>
              {ready ? formInfo.text : 'LOADING MODEL...'}
            </Text>
          </View>
        </View>

        {/* Exercise Info */}
        <View style={styles.exerciseContainer}>
          <View style={styles.exerciseLeft}>
            <Text style={styles.exerciseLabel}>NOW</Text>
            <Text style={styles.exerciseName}>{exercise}</Text>
          </View>
          <View style={styles.setInfo}>
            <Text style={styles.setNumber}>{set}</Text>
            <Text style={styles.setLabel}>OF 3 SETS</Text>
            <View style={styles.dotsRow}>
              {[1, 2, 3].map(i => (
                <View
                  key={i}
                  style={[styles.dot, { backgroundColor: i <= set ? '#22C55E' : '#333' }]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.caloriesContainer}>
            <Text style={styles.caloriesNumber}>{Math.floor(seconds * 0.1)}</Text>
            <Text style={styles.caloriesLabel}>KCAL</Text>
          </View>

          <TouchableOpacity onPress={() => router.push('/complete')}>
            <Text style={styles.stopText}>STOP</Text>
            </TouchableOpacity>

          {/* Mic Button */}
          <TouchableOpacity
            style={[styles.micButton, (isSpeaking || isThinking) && styles.micButtonActive]}
            onPress={() => askSpot()}
          >
            <Text style={styles.micIcon}>
              {isThinking ? '⏳' : isSpeaking ? '🔊' : '🎤'}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => { setSeconds(0); setReps(0); }}>
            <Text style={styles.stopText}>STOP</Text>
          </TouchableOpacity> */}
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111318' },
  safe: { flex: 1 },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8,
  },
  timerLabel: { color: '#555', fontSize: 13, letterSpacing: 3, marginBottom: 4 },
  timer: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', letterSpacing: 2 },
  heartRateContainer: { alignItems: 'flex-end' },
  heartRateBadge: {
    backgroundColor: '#EF444422', borderWidth: 1, borderColor: '#EF444444',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center',
  },
  heartRateNumber: { color: '#EF4444', fontSize: 20, fontWeight: '800' },
  heartRateLabel: { color: '#EF444488', fontSize: 9, letterSpacing: 2 },
  nextUpContainer: {
    paddingHorizontal: 24, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#ffffff08',
  },
  nextUpLabel: { color: '#7C3AED', fontSize: 13, letterSpacing: 3, fontWeight: '700', marginBottom: 2 },
  nextUpExercise: { color: '#555', fontSize: 14, fontWeight: '600' },
  formHero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  formCircleOuter: {
    width: width * 0.72, height: width * 0.72, borderRadius: width * 0.36,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1,
  },
  formCircleInner: {
    width: width * 0.58, height: width * 0.58, borderRadius: width * 0.29,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1.5,
  },
  repNumber: { color: '#FFFFFF', fontSize: 96, fontWeight: '900', lineHeight: 100 },
  repLabel: { fontSize: 14, letterSpacing: 4, fontWeight: '700' },
  formStatus: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20,
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1,
  },
  formDot: { width: 8, height: 8, borderRadius: 4 },
  formText: { fontSize: 11, letterSpacing: 3, fontWeight: '700' },
  exerciseContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-end', paddingHorizontal: 24, paddingBottom: 20,
  },
  exerciseLeft: {
    flex: 1,
    marginRight: 12,
  },
  exerciseLabel: { color: '#555', fontSize: 11, letterSpacing: 3, marginBottom: 4 },
  exerciseName: { color: '#FFFFFF', fontSize: 24, fontWeight: '900', lineHeight: 28, letterSpacing: 1 },
  setInfo: { alignItems: 'flex-end', minWidth: 80 },
  setNumber: { color: '#7C3AED', fontSize: 36, fontWeight: '900', lineHeight: 36 },
  setLabel: { color: '#555', fontSize: 10, letterSpacing: 2, marginBottom: 8 },
  dotsRow: { flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  bottomBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingVertical: 20,
    backgroundColor: '#1C1F26', borderTopWidth: 1, borderTopColor: '#ffffff08',
  },
  caloriesContainer: { alignItems: 'center' },
  caloriesNumber: { color: '#F97316', fontSize: 22, fontWeight: '800' },
  caloriesLabel: { color: '#555', fontSize: 9, letterSpacing: 2 },
  pauseButton: {
    backgroundColor: '#7C3AED', width: 64, height: 64,
    borderRadius: 32, alignItems: 'center', justifyContent: 'center',
  },
  pauseIcon: { flexDirection: 'row', gap: 5 },
  pauseBar: { width: 4, height: 18, backgroundColor: '#FFFFFF', borderRadius: 2 },
  micButton: {
    backgroundColor: '#1C1F26',
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#7C3AED33',
  },
  micButtonActive: {
    borderColor: '#7C3AED',
    backgroundColor: '#7C3AED22',
  },
  micIcon: { fontSize: 20 },
  stopText: { color: '#EF4444', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
}

);