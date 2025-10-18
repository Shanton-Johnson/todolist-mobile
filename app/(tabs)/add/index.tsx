// app/(tabs)/add/index.tsx
import { AddTaskModal } from '@/components/AddTaskModal';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AddScreen() {
  const [visible, setVisible] = useState(false);

  const handleAddTask = (task: {
    title: string;
    description: string;
    date: Date | null;
    priority: number | null;
  }) => {
    console.log('New task:', task);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setVisible(true)}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      <AddTaskModal
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
