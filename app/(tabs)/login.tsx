import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../hooks/useAuth';
import { router } from 'expo-router';

export default function Login() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAuth() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password, name);
        Alert.alert('Success', 'Account created! You can now log in.');
        setIsSignUp(false);
      } else {
        await signIn(email, password);
        router.replace('/');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a0533', '#111318', '#0a0a0f']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.inner}>

          <View style={styles.header}>
            <Text style={styles.headerLabel}>WELCOME TO</Text>
            <Text style={styles.headerTitle}>SPOT.</Text>
            <Text style={styles.headerSub}>Your gym buddy awaits.</Text>
          </View>

          <View style={styles.inputs}>
            {isSignUp && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>YOUR NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#333"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor="#333"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#333"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleAuth}
            disabled={loading}
          >
            <LinearGradient
              colors={['#9333EA', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginGradient}
            >
              <Text style={styles.loginText}>
                {loading ? 'LOADING...' : isSignUp ? 'SIGN UP' : 'LOG IN'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsSignUp(s => !s)}
          >
            <Text style={styles.switchText}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <Text style={styles.switchLink}>
                {isSignUp ? 'Log in' : 'Sign up'}
              </Text>
            </Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            By continuing you agree to Spot's Terms & Privacy Policy
          </Text>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111318' },
  safe: { flex: 1 },
  inner: {
    flex: 1, paddingHorizontal: 24, justifyContent: 'center',
  },
  header: { marginBottom: 40 },
  headerLabel: {
    color: '#7C3AED', fontSize: 11, letterSpacing: 4,
    fontWeight: '700', marginBottom: 8,
  },
  headerTitle: {
    color: '#FFFFFF', fontSize: 64, fontWeight: '900',
    letterSpacing: 2, lineHeight: 64, marginBottom: 8,
  },
  headerSub: { color: '#555', fontSize: 14 },
  inputs: { gap: 16, marginBottom: 32 },
  inputContainer: { gap: 8 },
  inputLabel: { color: '#555', fontSize: 9, letterSpacing: 3, fontWeight: '600' },
  input: {
    backgroundColor: '#1C1F26', borderRadius: 14, height: 52,
    paddingHorizontal: 18, color: '#FFFFFF', fontSize: 14,
    borderWidth: 1, borderColor: '#7C3AED22',
  },
  loginButton: { borderRadius: 14, overflow: 'hidden', marginBottom: 24 },
  loginGradient: { height: 56, alignItems: 'center', justifyContent: 'center' },
  loginText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', letterSpacing: 3 },
  switchButton: { alignItems: 'center', marginBottom: 24 },
  switchText: { color: '#555', fontSize: 13 },
  switchLink: { color: '#7C3AED', fontWeight: '700' },
  terms: { color: '#333', fontSize: 11, textAlign: 'center', lineHeight: 16 },
});