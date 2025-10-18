// app/(tabs)/index.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Sort / Filter Button */}
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="filter-outline" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Screen Title */}
        <Text style={styles.headerTitle}>Index</Text>

        {/* Profile Button */}
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={require('@/assets/images/profile.jpg')} // 👈 replace with your profile image
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Empty State */}
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/empty-tasks.png')} // 👈 replace with your illustration
          style={styles.illustration}
          resizeMode="contain"
        />
        <Text style={styles.title}>What do you want to do today?</Text>
        <Text style={styles.subtitle}>Tap + to add your tasks</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60, // space for header
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  illustration: {
    width: 250,
    height: 200,
    marginBottom: 32,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#A1A1AA',
    fontSize: 14,
    textAlign: 'center',
  },
});
