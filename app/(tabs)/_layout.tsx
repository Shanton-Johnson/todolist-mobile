// app/(tabs)/_layout.tsx
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { AddTaskModal } from '../../components/AddTaskModal';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: Colors.background,
            borderTopColor: Colors.background,
            height: 90 + insets.bottom / 2,
            paddingBottom: insets.bottom / 2,
          },
        }}
      >
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

        <Tabs.Screen
          name="add/index"
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
              >
                <Ionicons name="add" size={32} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />

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

        <Tabs.Screen
          name="profile/index"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={26}
                color={focused ? Colors.primary : Colors.inactive}
              />
            ),
          }}
        />
      </Tabs>

      <AddTaskModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </>
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
  },
});
