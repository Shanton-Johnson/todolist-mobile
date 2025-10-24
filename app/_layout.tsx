import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* This loads the (tabs) group */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
