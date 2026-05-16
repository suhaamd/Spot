import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useSessions } from '../../hooks/useSessions';

export default function History() {
  const { getSessions } = useSessions();
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    try {
      const data = await getSessions();
      setSessions(data);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  }

  function getScoreColor(score: number) {
    if (score >= 80) return '#22C55E';
    if (score >= 60) return '#EAB308';
    return '#EF4444';
  }

  function formatDuration(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a0533', '#111318', '#0a0a0f']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <Text style={styles.headerLabel}>YOUR</Text>
            <Text style={styles.headerTitle}>HISTORY.</Text>
          </View>

          {sessions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No sessions yet</Text>
              <Text style={styles.emptySub}>Complete a workout to see it here</Text>
            </View>
          ) : (
            sessions.map((session, i) => (
              <TouchableOpacity key={i}>
                <LinearGradient
                  colors={['#1C1F26', '#111318']}
                  style={styles.sessionCard}
                >
                  <View style={styles.sessionLeft}>
                    <Text style={styles.sessionName}>{session.split_name}</Text>
                    <Text style={styles.sessionDay}>
                      {formatDate(session.created_at)} · {formatDuration(session.duration)}
                    </Text>
                  </View>
                  <View style={styles.sessionRight}>
                    <Text style={[styles.sessionScore, { color: getScoreColor(session.form_score) }]}>
                      {session.form_score}%
                    </Text>
                    <Text style={styles.sessionArrow}>→</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          )}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111318' },
  safe: { flex: 1, paddingHorizontal: 24 },
  header: { paddingTop: 24, marginBottom: 24 },
  headerLabel: {
    color: '#7C3AED', fontSize: 11, letterSpacing: 4,
    fontWeight: '700', marginBottom: 4,
  },
  headerTitle: {
    color: '#FFFFFF', fontSize: 52, fontWeight: '900', letterSpacing: 2,
  },
  emptyState: {
    alignItems: 'center', paddingTop: 80,
  },
  emptyTitle: {
    color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginBottom: 8,
  },
  emptySub: { color: '#555', fontSize: 14 },
  sessionCard: {
    borderRadius: 18, padding: 20,
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
    borderWidth: 1, borderColor: '#ffffff08',
  },
  sessionLeft: { flex: 1 },
  sessionName: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  sessionDay: { color: '#555', fontSize: 12 },
  sessionRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sessionScore: { fontSize: 16, fontWeight: '800' },
  sessionArrow: { color: '#7C3AED', fontSize: 16 },
});