// app/(tabs)/calendar/index.tsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useTaskStore } from '@/stores/taskStore';

const DAY_ITEM_WIDTH = 50;
const DAY_ITEM_HEIGHT = 70;

export default function CalendarScreen() {
  const { tasks } = useTaskStore();
  const [selectedTab, setSelectedTab] = useState<'today' | 'completed'>('today');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const flatListRef = useRef<FlatList>(null);

  // Generate all days in the current month
  const monthDays = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        date: date.getDate(),
        fullDate: date,
      };
    });
  }, [selectedDate]);

  // Scroll to selected day on mount or month change
  useEffect(() => {
    const index = monthDays.findIndex(
      (d) => d.fullDate.toDateString() === selectedDate.toDateString()
    );
    if (index !== -1) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // center
      });
    }
  }, [monthDays, selectedDate]);

  const filteredTasks = useMemo(() => {
    if (!tasks.length) return [];
    return tasks.filter((task) => {
      if (!task.date) return false;
      const taskDate = new Date(task.date);
      const sameDay =
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear();
      return selectedTab === 'today' ? sameDay : false;
    });
  }, [tasks, selectedDate, selectedTab]);

  const hasTasksOnDate = (date: Date) =>
    tasks.some((t) => t.date && new Date(t.date).toDateString() === date.toDateString());

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Calendar</Text>

        <TouchableOpacity>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Month Navigation */}
      <View style={styles.monthRow}>
        <TouchableOpacity
          onPress={() =>
            setSelectedDate((d) => new Date(d.setMonth(d.getMonth() - 1)))
          }
        >
          <Ionicons name="chevron-back" size={18} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.monthText}>
            {selectedDate.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()}
          </Text>
          <Text style={styles.yearText}>{selectedDate.getFullYear()}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            setSelectedDate((d) => new Date(d.setMonth(d.getMonth() + 1)))
          }
        >
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Weekdays Scrollable */}
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={monthDays}
        keyExtractor={(item) => item.fullDate.toDateString()}
        getItemLayout={(_, index) => ({
          length: DAY_ITEM_WIDTH,
          offset: DAY_ITEM_WIDTH * index,
          index,
        })}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        style={{ maxHeight: DAY_ITEM_HEIGHT }}
        renderItem={({ item }) => {
          const isSelected =
            selectedDate.toDateString() === item.fullDate.toDateString();
          return (
            <TouchableOpacity
              onPress={() => setSelectedDate(item.fullDate)}
              style={[styles.dayContainer, isSelected && styles.selectedDay]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayLabel,
                  item.day === 'SUN' && { color: '#F77B72' },
                  isSelected && { color: '#fff', fontWeight: '700' },
                ]}
              >
                {item.day}
              </Text>
              <View style={styles.dateWrapper}>
                <Text
                  style={[
                    styles.dateLabel,
                    isSelected && { color: '#fff', fontWeight: '700' },
                  ]}
                >
                  {item.date}
                </Text>
                {hasTasksOnDate(item.fullDate) && <View style={styles.dot} />}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedTab === 'today' && styles.activeToggle]}
          onPress={() => setSelectedTab('today')}
        >
          <Text
            style={[
              styles.toggleText,
              selectedTab === 'today' && styles.activeToggleText,
            ]}
          >
            Today
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedTab === 'completed' && styles.activeToggle,
          ]}
          onPress={() => setSelectedTab('completed')}
        >
          <Text
            style={[
              styles.toggleText,
              selectedTab === 'completed' && styles.activeToggleText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={require('@/assets/images/empty-tasks.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>No tasks for this date</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Ionicons name="ellipse-outline" size={20} color={Colors.primary} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                {item.date && (
                  <Text style={styles.taskTime}>
                    {new Date(item.date).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                )}
              </View>
              {item.priority && (
                <View style={styles.priorityTag}>
                  <Ionicons name="flag-outline" size={12} color="#aaa" />
                  <Text style={styles.priorityText}>{item.priority}</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 5 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  profileImage: { width: 30, height: 30, borderRadius: 15 },

  monthRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10, gap: 10 },
  monthText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  yearText: { color: '#888', fontSize: 12, textAlign: 'center' },

  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DAY_ITEM_WIDTH,
    height: DAY_ITEM_HEIGHT,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  selectedDay: {
    backgroundColor: Colors.primary,
  },
  dayLabel: { color: '#aaa', fontSize: 10 },
  dateWrapper: { alignItems: 'center', position: 'relative' },
  dateLabel: { color: '#fff', fontWeight: '600', marginTop: 4 },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#fff', position: 'absolute', bottom: -6 },

  toggleContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, paddingHorizontal: 10 },
  toggleButton: { flex: 1, marginHorizontal: 8, paddingVertical: 10, borderRadius: 10, backgroundColor: Colors.card, alignItems: 'center' },
  activeToggle: { backgroundColor: Colors.primary },
  toggleText: { color: '#aaa', fontWeight: '500' },
  activeToggleText: { color: '#fff' },

  taskCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, marginHorizontal: 15, marginTop: 12, borderRadius: 12, padding: 12 },
  taskTitle: { color: '#fff', fontWeight: '500', fontSize: 15 },
  taskTime: { color: '#aaa', fontSize: 12, marginTop: 3 },
  priorityTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.input, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6 },
  priorityText: { color: '#aaa', fontSize: 12, marginLeft: 3 },

  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  illustration: { width: 200, height: 160, marginBottom: 20 },
  emptyText: { color: '#aaa', fontSize: 14 },
});
