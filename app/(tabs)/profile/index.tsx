// app/(tabs)/profile/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/100x100.png?text=User' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Martha Hays</Text>
      </View>

      <View style={styles.taskStats}>
        <View style={styles.taskBox}>
          <Text style={styles.taskNumber}>10</Text>
          <Text style={styles.taskLabel}>Task left</Text>
        </View>
        <View style={styles.taskBox}>
          <Text style={styles.taskNumber}>5</Text>
          <Text style={styles.taskLabel}>Task done</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <MenuItem icon={<Feather name="settings" size={20} color="#fff" />} label="App Settings" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <MenuItem icon={<Feather name="user" size={20} color="#fff" />} label="Change account name" />
        <MenuItem icon={<Feather name="key" size={20} color="#fff" />} label="Change account password" />
        <MenuItem icon={<Feather name="image" size={20} color="#fff" />} label="Change account image" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Uptodo</Text>
        <MenuItem icon={<Feather name="info" size={20} color="#fff" />} label="About Us" />
        <MenuItem icon={<Feather name="help-circle" size={20} color="#fff" />} label="FAQ" />
        <MenuItem icon={<MaterialCommunityIcons name="message-question-outline" size={20} color="#fff" />} label="Help & Feedback" />
        <MenuItem icon={<Feather name="thumbs-up" size={20} color="#fff" />} label="Support Us" />
      </View>

      <TouchableOpacity style={styles.logout}>
        <Feather name="log-out" size={20} color="red" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuLeft}>
        {icon}
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  taskStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  taskBox: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
  },
  taskNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  taskLabel: {
    color: '#999',
    fontSize: 14,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 15,
    marginBottom: 8,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuLabel: {
    color: 'white',
    fontSize: 16,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 30,
    justifyContent: 'center',
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
  },
});
