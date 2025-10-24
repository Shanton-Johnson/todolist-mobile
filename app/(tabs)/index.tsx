import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  LayoutAnimation,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskStore } from '@/stores/taskStore';
import { Colors } from '@/constants/Colors';
import { AddTaskModal } from '@/components/AddTaskModal';

export default function HomeScreen() {
  const { tasks, removeTask } = useTaskStore();
  const [editTask, setEditTask] = useState<any | null>(null);

  // Sort tasks by priority then date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.priority !== b.priority) return (b.priority || 0) - (a.priority || 0);
    if (a.date && b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
    return 0;
  });

  // Handle task deletion
  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to remove this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            removeTask(id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderTask = ({ item }: any) => (
    <View style={styles.taskCard}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => setEditTask(item)}
        activeOpacity={0.85}
      >
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle} numberOfLines={1}>
            {item.title}
          </Text>
          {item.priority && (
            <View style={styles.priorityBadge}>
              <Ionicons name="flag" size={14} color="#fff" />
              <Text style={styles.priorityText}>{item.priority}</Text>
            </View>
          )}
        </View>

        {item.description && (
          <Text style={styles.taskDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}

        {item.date && (
          <Text style={styles.taskDate}>
            {new Date(item.date).toLocaleString()}
          </Text>
        )}
      </TouchableOpacity>

      {/* Themed delete button */}
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="filter-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Your Tasks</Text>

        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={require('@/assets/images/profile.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      {sortedTasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={require('@/assets/images/empty-tasks.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.title}>What do you want to do today?</Text>
          <Text style={styles.subtitle}>Tap + to add your tasks</Text>
        </View>
      ) : (
        <FlatList
          data={sortedTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.taskList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add/Edit Task Modal */}
      <AddTaskModal
        visible={!!editTask}
        onClose={() => setEditTask(null)}
        taskToEdit={editTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  iconButton: { padding: 4 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '700' },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  profileImage: { width: '100%', height: '100%' },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  illustration: { width: 250, height: 200, marginBottom: 32, opacity: 0.9 },
  title: { color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: '#A1A1AA', fontSize: 14, textAlign: 'center' },

  taskList: { paddingHorizontal: 20, paddingBottom: 30 },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTitle: { color: '#fff', fontSize: 16, fontWeight: '600', flex: 1, marginRight: 10 },
  taskDescription: { color: '#ccc', fontSize: 14, marginTop: 6 },
  taskDate: { color: '#888', fontSize: 12, marginTop: 8 },
  priorityBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  priorityText: { color: '#fff', marginLeft: 4, fontSize: 12 },
  deleteButton: { marginLeft: 12, padding: 6, justifyContent: 'center', alignItems: 'center' },
});
