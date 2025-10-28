// app/(tabs)/focus/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 200;
const STROKE_WIDTH = 12;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DEFAULT_DURATION = 30 * 60; // 30 minutes

const sampleApps = [
  { id: '1', name: 'Instagram', time: 4 * 60 * 60 },
  { id: '2', name: 'Twitter', time: 3 * 60 * 60 },
  { id: '3', name: 'Facebook', time: 60 * 60 },
  { id: '4', name: 'Telegram', time: 30 * 60 },
  { id: '5', name: 'Gmail', time: 45 * 60 },
];

export default function FocusScreen() {
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [remaining, setRemaining] = useState(DEFAULT_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [weekly, setWeekly] = useState<number[]>([2.5 * 3600, 3.5 * 3600, 5 * 3600, 3 * 3600, 4 * 3600, 4.5 * 3600, 2 * 3600].map(Math.floor));

  const intervalRef = useRef<number | null>(null);
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            handleStop(true);
            return 0;
          }
          setElapsed((e) => e + 1);
          return r - 1;
        });
      }, 1000) as unknown as number;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    const progress = Math.min(1, elapsed / duration);
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [elapsed, duration]);

  function handleStart() {
    if (remaining === 0) {
      setRemaining(duration);
      setElapsed(0);
    }
    setIsRunning(true);
  }

  function handleStop(auto = false) {
    setIsRunning(false);
    const todayIndex = new Date().getDay();
    setWeekly((w) => {
      const next = [...w];
      next[todayIndex] = (next[todayIndex] || 0) + elapsed;
      return next;
    });

    if (auto) {
      setRemaining(0);
    }

    setTimeout(() => {
      setElapsed(0);
      setRemaining(duration);
      animatedProgress.setValue(0);
    }, 800);
  }

  function toggle() {
    if (isRunning) handleStop(false);
    else handleStart();
  }

  function formatTime(s: number) {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const ss = Math.floor(s % 60)
      .toString()
      .padStart(2, '0');
    return `${mm}:${ss}`;
  }

  const progressInterpolation = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  const maxWeekly = Math.max(...weekly, 1);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Focus Mode</Text>

        <View style={styles.timerRow}>
          <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
            <Circle
              stroke="#3a3a3a"
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
            />

            <AnimatedCircle
              stroke="#8b7cff"
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={`${CIRCUMFERENCE}`}
              strokeDashoffset={progressInterpolation}
              rotation="-90"
              originX={CIRCLE_SIZE / 2}
              originY={CIRCLE_SIZE / 2}
            />
          </Svg>

          <View style={styles.timerOverlay} pointerEvents="none">
            <Text style={styles.timerText}>{formatTime(remaining)}</Text>
          </View>
        </View>

        <Text style={styles.hint}>While your focus mode is on, all of your notifications will be off</Text>

        <TouchableOpacity style={styles.button} onPress={toggle} activeOpacity={0.8}>
          <Text style={styles.buttonText}>{isRunning ? 'Stop Focusing' : 'Start Focusing'}</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.pill}><Text style={styles.pillText}>This Week</Text></View>
          </View>

          <View style={styles.chartRow}>
            {weekly.map((val, idx) => {
              const barHeight = (val / maxWeekly) * 140;
              const dayLabel = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][idx];
              const isToday = idx === new Date().getDay();
              return (
                <View key={idx} style={styles.barColumn}>
                  <View style={[styles.bar, { height: barHeight, backgroundColor: isToday ? '#8b7cff' : '#666' }]} />
                  <Text style={[styles.barLabel, isToday && styles.barLabelToday]}>{dayLabel}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Applications</Text>

          <FlatList
            data={sampleApps}
            keyExtractor={(i) => i.id}
            scrollEnabled={false}
            style={{ width: '100%' }}
            renderItem={({ item }) => (
              <View style={styles.appRow}>
                <View style={styles.appLeft}>
                  <View style={styles.appIcon}>
                    <MaterialIcons name="apps" size={20} color="#fff" />
                  </View>
                  <View>
                    <Text style={styles.appName}>{item.name}</Text>
                    <Text style={styles.appTime}>You spent {Math.floor(item.time / 60)}m on {item.name} today</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.infoBtn}>
                  <MaterialIcons name="info-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b0b0b' },
  container: { flex: 1, padding: 20 },
  title: { color: '#fff', marginTop: 8, fontSize: 18, textAlign: 'center' },
  timerRow: { marginTop: 18, marginBottom: 10, justifyContent: 'center', alignItems: 'center' },
  timerOverlay: { position: 'absolute', width: CIRCLE_SIZE, height: CIRCLE_SIZE, justifyContent: 'center', alignItems: 'center' },
  timerText: { color: '#fff', fontSize: 28, fontWeight: '500' },
  hint: { color: '#bfbfbf', marginTop: 8, textAlign: 'center', width: '80%', alignSelf: 'center' },
  button: { backgroundColor: '#8b7cff', paddingVertical: 12, paddingHorizontal: 26, borderRadius: 8, marginTop: 14, alignSelf: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  section: { width: '100%', marginTop: 22 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { color: '#fff', fontSize: 18 },
  pill: { backgroundColor: '#2a2a2a', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  pillText: { color: '#ddd' },
  chartRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 6, height: 160 },
  barColumn: { alignItems: 'center', width: (width - 60) / 8 },
  bar: { width: 22, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  barLabel: { color: '#bfbfbf', marginTop: 6, fontSize: 12 },
  barLabelToday: { color: '#ff5a5f', fontWeight: '600' },
  appRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#141414', padding: 12, borderRadius: 8, marginBottom: 10 },
  appLeft: { flexDirection: 'row', alignItems: 'center' },
  appIcon: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  appName: { color: '#fff', fontSize: 16 },
  appTime: { color: '#bfbfbf', fontSize: 12 },
  infoBtn: { width: 36, height: 36, borderRadius: 6, backgroundColor: '#2a2a2a', justifyContent: 'center', alignItems: 'center' },
});