// app/(tabs)/focus/index.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function FocusScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Focus Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text: { color: 'white', fontSize: 20 },
});
