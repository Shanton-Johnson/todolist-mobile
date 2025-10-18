// app/(tabs)/calendar/index.tsx
import React, { useState } from 'react';
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

export default function CalendarScreen() {
  const [selectedTab, setSelectedTab] = useState<'today' | 'completed'>('today');
  const [selectedDate, setSelectedDate] = useState<number>(9);

  const days = [
    { day: 'SUN', date: 6 },
    { day: 'MON', date: 7 },
    { day: 'TUE', date: 8 },
    { day: 'WED', date: 9 },
    { day: 'THU', date: 10 },
    { day: 'FRI', date: 11 },
    { day: 'SAT', date: 12 },
  ];

  const tasks = [
    {
      id: '1',
      title: 'Do Math Homework',
      time: 'Today At 16:45',
      category: 'University',
      categoryColor: '#4F6EF7',
      priority: 1,
    },
    {
      id: '2',
      title: 'Tack out dogs',
      time: 'Today At 18:20',
      category: 'Home',
      categoryColor: '#F77B72',
      priority: 2,
    },
    {
      id: '3',
      title: 'Business meeting with CEO',
      time: 'Today At 08:15',
      category: 'Work',
      categoryColor: '#F7C84F',
      priority: 3,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Calendar</Text>

        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* ---------- MONTH NAV ---------- */}
      <View style={styles.monthRow}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={18} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.monthText}>FEBRUARY</Text>
          <Text style={styles.yearText}>2022</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ---------- WEEK DAYS ---------- */}
      <View style={styles.weekRow}>
        {days.map((d) => (
          <TouchableOpacity
            key={d.date}
            style={[
              styles.dayContainer,
              selectedDate === d.date && styles.selectedDay,
            ]}
            onPress={() => setSelectedDate(d.date)}
          >
            <Text
              style={[
                styles.dayLabel,
                d.day === 'SUN' ? { color: '#F77B72' } : {},
              ]}
            >
              {d.day}
            </Text>
            <Text
              style={[
                styles.dateLabel,
                selectedDate === d.date && { color: Colors.primary },
              ]}
            >
              {d.date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------- TOGGLE BUTTONS ---------- */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedTab === 'today' && styles.activeToggle,
          ]}
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

      {/* ---------- TASK LIST ---------- */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <TouchableOpacity>
              <Ionicons name="ellipse-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskTime}>{item.time}</Text>
            </View>

            <View style={[styles.categoryTag, { backgroundColor: item.categoryColor + '22' }]}>
              <Text style={[styles.categoryText, { color: item.categoryColor }]}>
                {item.category}
              </Text>
            </View>

            <View style={styles.priorityTag}>
              <Ionicons name="flag-outline" size={12} color="#aaa" />
              <Text style={styles.priorityText}>{item.priority}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  profileImage: { width: 30, height: 30, borderRadius: 15 },

  monthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  monthText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  yearText: { color: '#888', fontSize: 12, textAlign: 'center' },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: 8,
  },
  dayContainer: { alignItems: 'center', flex: 1, paddingVertical: 6 },
  selectedDay: {
    backgroundColor: Colors.input,
    borderRadius: 8,
  },
  dayLabel: { color: '#aaa', fontSize: 12 },
  dateLabel: { color: '#fff', fontWeight: '600', marginTop: 3 },

  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  toggleButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.card,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: Colors.primary,
  },
  toggleText: { color: '#aaa', fontWeight: '500' },
  activeToggleText: { color: '#fff' },

  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 15,
    marginTop: 12,
    borderRadius: 12,
    padding: 12,
  },
  taskTitle: { color: '#fff', fontWeight: '500', fontSize: 15 },
  taskTime: { color: '#aaa', fontSize: 12, marginTop: 3 },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryText: { fontSize: 12, fontWeight: '500' },
  priorityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.input,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: { color: '#aaa', fontSize: 12, marginLeft: 3 },
});
