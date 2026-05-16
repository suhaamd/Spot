import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { router } from 'expo-router';

export default function RootLayout() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.replace('/login');
      }
    }
  }, [session, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}