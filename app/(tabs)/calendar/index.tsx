// app/(tabs)/calendar/index.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Month Selector */}
      <View style={styles.monthRow}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={20} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.monthText}>FEBRUARY</Text>
          <Text style={styles.yearText}>2022</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Days of the week */}
      <View style={styles.daysRow}>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
          <TouchableOpacity key={i} style={[styles.dayContainer, day === 'WED' && styles.activeDay]}>
            <Text
              style={[
                styles.dayText,
                day === 'SUN' && styles.sunday,
                day === 'SAT' && styles.saturday,
                day === 'WED' && styles.activeDayText,
              ]}
            >
              {day}
            </Text>
            <Text style={[styles.dateText, day === 'WED' && styles.activeDateText]}>{6 + i}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Today / Completed Buttons */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.filterTextActive}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <ScrollView style={styles.tasksContainer}>
        {[
          { title: 'Do Math Homework', time: 'Today At 16:45', label: 'University', color: '#6A5AE0', id: 1 },
          { title: 'Tack out dogs', time: 'Today At 18:20', label: 'Home', color: '#F06263', id: 2 },
          { title: 'Business meeting with CEO', time: 'Today At 08:15', label: 'Work', color: '#F2B75A', id: 3 },
        ].map(task => (
          <View key={task.id} style={styles.taskCard}>
            <Ionicons name="ellipse-outline" size={20} color="#aaa" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskTime}>{task.time}</Text>
            </View>
            <View style={[styles.labelTag, { backgroundColor: task.color + '33' }]}>
              <Text style={[styles.labelText, { color: task.color }]}>{task.label}</Text>
            </View>
            <View style={styles.taskId}>
              <MaterialIcons name="flag" size={14} color="#aaa" />
              <Text style={styles.taskIdText}>{task.id}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingTop: 50, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '600' },

  monthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  monthText: { color: 'white', fontSize: 14, textAlign: 'center' },
  yearText: { color: '#aaa', fontSize: 12, textAlign: 'center' },

  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: 'center',
    paddingVertical: 6,
    width: 40,
    borderRadius: 10,
  },
  dayText: { color: '#bbb', fontSize: 12, marginBottom: 4 },
  dateText: { color: '#ccc', fontSize: 14 },
  sunday: { color: '#F06263' },
  saturday: { color: '#F06263' },
  activeDay: { backgroundColor: '#2B2B2B' },
  activeDayText: { color: '#fff' },
  activeDateText: { color: '#6A5AE0', fontWeight: '700' },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeFilter: { backgroundColor: '#6A5AE0' },
  filterText: { color: '#bbb' },
  filterTextActive: { color: 'white', fontWeight: '600' },

  tasksContainer: { flex: 1 },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  taskTitle: { color: 'white', fontSize: 16, marginBottom: 4 },
  taskTime: { color: '#aaa', fontSize: 12 },
  labelTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 6,
  },
  labelText: { fontSize: 12, fontWeight: '600' },
  taskId: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  taskIdText: { color: '#aaa', fontSize: 12 },
});
