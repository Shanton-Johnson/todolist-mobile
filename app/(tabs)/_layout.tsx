// app/(tabs)/_layout.tsx
import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.background,
          height: 90 + insets.bottom / 2,
          paddingBottom: insets.bottom / 2,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 5,
          elevation: 5,
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color={focused ? Colors.primary : Colors.inactive}
            />
          ),
        }}
      />

      {/* Calendar Tab */}
      <Tabs.Screen
        name="calendar/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={26}
              color={focused ? Colors.primary : Colors.inactive}
            />
          ),
        }}
      />

      {/* Add Button */}
      <Tabs.Screen
        name="add/index"
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.addButton}
              onPress={() => router.push('/(tabs)/add/index' as any)}
            >
              <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Focus Tab */}
      <Tabs.Screen
        name="focus/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'timer' : 'timer-outline'}
              size={26}
              color={focused ? Colors.primary : Colors.inactive}
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={26}
                color={focused ? Colors.primary : Colors.inactive}
              />
              <View style={styles.notificationDot} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3b30',
  },
});
