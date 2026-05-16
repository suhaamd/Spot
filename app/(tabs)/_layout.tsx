import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1C1F26',
          borderTopColor: '#ffffff08',
          borderTopWidth: 1,
          paddingBottom: 34,
          paddingTop: 8,
          height: 80,
        },
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#555',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>⌂</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="session"
        options={{
          title: 'SESSION',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>◎</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'HISTORY',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>≡</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>◉</Text>
          ),
        }}
      />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="rest" options={{ href: null }} />
      <Tabs.Screen name="complete" options={{ href: null }} />
      <Tabs.Screen name="login" options={{ href: null }} />
      <Tabs.Screen name="onboarding1" options={{ href: null }} />
      <Tabs.Screen name="onboarding2" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}