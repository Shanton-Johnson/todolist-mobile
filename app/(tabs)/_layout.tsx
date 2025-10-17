import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useRef, useEffect } from 'react';
import Modal from 'react-native-modal';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const taskInputRef = useRef<TextInput>(null);

  // 👇 Focus input when modal becomes visible
  useEffect(() => {
    if (isModalVisible) {
      const timer = setTimeout(() => {
        taskInputRef.current?.focus();
      }, 300); // waits for slide-up animation
      return () => clearTimeout(timer);
    }
  }, [isModalVisible]);

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
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 5,
            elevation: 5,
          },
        }}
      >
        {/* Home */}
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

        {/* Calendar */}
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

        {/* Floating Add Button */}
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

        {/* Focus */}
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

        {/* Profile */}
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

      {/* Add Task Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        useNativeDriverForBackdrop
        backdropTransitionOutTiming={0}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={400}
        animationOutTiming={300}
        style={styles.modal}
        customBackdrop={
          <BlurView
            intensity={60}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        }
        avoidKeyboard // 👈 keeps modal above keyboard
      >
        <View style={styles.modalContainer}>
          <View style={styles.swipeIndicator} />
          <Text style={styles.modalTitle}>Add Task</Text>

          <TextInput
            ref={taskInputRef}
            style={styles.input}
            placeholder="Task title"
            placeholderTextColor="#aaa"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            placeholderTextColor="#aaa"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Icon Row */}
          <View style={styles.iconRow}>
            <Ionicons name="time-outline" size={22} color="#aaa" />
            <Ionicons name="happy-outline" size={22} color="#aaa" />
            <Ionicons name="flag-outline" size={22} color="#aaa" />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                console.log('Task added:', taskTitle, description);
                setTaskTitle('');
                setDescription('');
                setModalVisible(false);
              }}
            >
              <Ionicons name="arrow-up-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  swipeIndicator: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#444',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.input,
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    padding: 10,
  },
});
